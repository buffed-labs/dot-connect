import {
  copy as copyIcon,
  users as usersIcon,
  wallet as walletIcon,
} from "../icons/index.js";
import { observableSignal } from "../observable-signal.js";
import { connectedWallets$, walletConfigs, wallets$ } from "../stores.js";
import { getDownloadUrl } from "../utils.js";
import type { InjectedWalletInfo, WalletConfig } from "../wallets/types.js";
import "./add-readonly-account-dialog.js";
import "./components/dialog.js";
import { DotConnectElement } from "./components/element.js";
import "./components/list-item.js";
import "./components/qr-code.js";
import "./ledger/connected-ledger-accounts-dialog.js";
import "./ledger/ledger-dialog.js";
import { computed, signal } from "@lit-labs/signals";
import {
  connectWallet,
  disconnectWallet,
} from "@reactive-dot/core/internal/actions.js";
import { DeepLinkWallet, type Wallet } from "@reactive-dot/core/wallets.js";
import type { LedgerWallet } from "@reactive-dot/wallet-ledger";
import type { PolkadotVaultWallet } from "@reactive-dot/wallet-polkadot-vault";
import type { ReadonlyWallet } from "@reactive-dot/wallet-readonly";
import { css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { join } from "lit/directives/join.js";
import { when } from "lit/directives/when.js";
import { filter } from "rxjs";
import { effect } from "signal-utils/subtle/microtask-effect";

declare global {
  interface HTMLElementTagNameMap {
    "dc-connection-dialog": ConnectionDialog;
  }
}

@customElement("dc-connection-dialog")
export class ConnectionDialog extends DotConnectElement {
  static override styles = [
    super.styles,
    css`
      :host {
        display: contents;
      }

      h3 {
        font-size: 0.8em;
        margin: 1rem 0.5rem 0.5rem 0.5rem;
      }

      section:first-child h3 {
        margin-top: 0;
      }

      hr {
        margin-inline-start: 3.2rem;
        margin-inline-end: 0.5rem;
        border: none;
        border-bottom: 0.5px solid var(--outline-color);
      }

      *[slot="footer"] > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 0.5rem;
      }

      #learn-more {
        padding: 0;
      }
    `,
  ];

  @property({ type: Boolean })
  open = false;

  @property()
  variant: "modal" | "non-modal" = "modal";

  readonly #availableWallets = observableSignal(this, wallets$, []);

  readonly #connectedWallets = observableSignal(this, connectedWallets$, []);

  readonly #installedWallets = computed(() =>
    this.#availableWallets
      .get()
      .filter((wallet) => wallet.id.startsWith("injected/")),
  );

  readonly #deepLinkWallets = computed(() =>
    this.#availableWallets
      .get()
      .filter((wallet) => wallet instanceof DeepLinkWallet),
  );

  readonly #hardwareWallets = computed(() =>
    this.#availableWallets
      .get()
      .filter(
        (wallet) =>
          (wallet.id === "ledger" && "USB" in globalThis) ||
          wallet.id === "polkadot-vault",
      ),
  );

  readonly #readonlyWallets = computed(() =>
    this.#availableWallets.get().filter((wallet) => wallet.id === "readonly"),
  );

  readonly #recommendedWallets = computed(() =>
    this.#installedWallets.get().length > 0 ||
    this.#connectedWallets.get().length > 0
      ? []
      : walletConfigs
          .get()
          .filter(
            (config): config is WalletConfig<InjectedWalletInfo> =>
              "downloadUrl" in config &&
              DownloadableWallet.shouldRender(
                config as WalletConfig<InjectedWalletInfo>,
              ) &&
              !this.#installedWallets
                .get()
                .some((wallet) => config.selector(wallet)),
          ),
  );

  show() {
    this.open = true;
  }

  close() {
    this.open = false;
  }

  override render() {
    return html`<dc-dialog
      variant=${this.variant}
      ?open=${this.open}
      @close=${(event: Event) => {
        this.close();
        this.dispatchEvent(new Event(event.type, event));
      }}
    >
      <slot slot="trigger" name="trigger"></slot>
      <span slot="title">Connect wallet</span>
      <div slot="content">
        ${when(
          this.#installedWallets.get().length > 0,
          () =>
            html`<section>
              <header><h3>Installed</h3></header>
              <ul>
                ${join(
                  this.#installedWallets
                    .get()
                    .map(
                      (wallet) =>
                        html`<dc-wallet .wallet=${wallet}></dc-wallet>`,
                    ),
                  html`<hr />`,
                )}
              </ul>
            </section>`,
        )}
        ${when(
          this.#hardwareWallets.get().length > 0,
          () =>
            html`<section>
              <header><h3>Hardware</h3></header>
              <ul>
                ${join(
                  this.#hardwareWallets.get().map((wallet) => {
                    switch (wallet.id) {
                      case "ledger":
                        return html`<dc-ledger-wallet
                          .wallet=${wallet}
                        ></dc-ledger-wallet>`;
                      case "polkadot-vault":
                        return html`<dc-polkadot-vault-wallet
                          .wallet=${wallet}
                        ></dc-polkadot-vault-wallet>`;
                      default:
                        return nothing;
                    }
                  }),
                  html`<hr />`,
                )}
              </ul>
            </section>`,
        )}
        ${when(
          this.#deepLinkWallets.get().length > 0,
          () =>
            html`<section>
              <header><h3>Remote</h3></header>
              <ul>
                ${join(
                  this.#deepLinkWallets
                    .get()
                    .map(
                      (wallet) =>
                        html`<dc-deep-link-wallet
                          .wallet=${wallet}
                        ></dc-deep-link-wallet>`,
                    ),
                  html`<hr />`,
                )}
              </ul>
            </section>`,
        )}
        ${when(
          this.#readonlyWallets.get().length > 0,
          () =>
            html`<section>
              <header><h3>Others</h3></header>
              <ul>
                ${join(
                  this.#readonlyWallets
                    .get()
                    .map(
                      (wallet) =>
                        html`<dc-readonly-wallet
                          .wallet=${wallet}
                        ></dc-readonly-wallet>`,
                    ),
                  html`<hr />`,
                )}
              </ul>
            </section>`,
        )}
        ${when(
          this.#recommendedWallets.get().length > 0,
          () =>
            html`<section>
              <header><h3>Popular</h3></header>
              <ul>
                ${join(
                  this.#recommendedWallets
                    .get()
                    .map(
                      (wallet) =>
                        html`<dc-downloadable-wallet
                          .wallet=${wallet}
                        ></dc-downloadable-wallet>`,
                    ),
                  html`<hr />`,
                )}
              </ul>
            </section>`,
        )}
      </div>
      <div slot="footer">
        <div>
          <span>New to Web3 wallets?</span>
          <a
            id="learn-more"
            class="button text"
            href="https://polkadot.com/get-started/wallets/"
            target="_blank"
            >Learn more</a
          >
        </div>
      </div>
    </dc-dialog>`;
  }
}

abstract class BaseWalletConnection<
  TWallet extends Wallet = Wallet,
> extends DotConnectElement {
  @property({ attribute: false })
  wallet!: TWallet;

  protected get walletInfo() {
    return walletConfigs.get().find((config) => config.selector(this.wallet));
  }

  readonly #connectedWallets = observableSignal(this, connectedWallets$, []);

  readonly #accounts = observableSignal(this, () => this.wallet.accounts$, []);

  protected readonly connected = computed(() =>
    this.#connectedWallets.get().includes(this.wallet),
  );

  protected readonly pending = signal(false);

  static override readonly styles = [
    super.styles,
    css`
      button,
      .button {
        min-width: 5rem;
      }

      #connection-status.connected {
        color: var(--success-color);
      }
    `,
  ];

  protected override render() {
    return html`<dc-list-item ?pending=${this.pending.get()}>
      <div slot="leading" class="icon">
        ${this.walletInfo === undefined
          ? walletIcon({ size: "100%" })
          : html`<img src=${this.walletInfo.icon.href} />`}
      </div>
      <span slot="headline">${this.walletInfo?.name ?? this.wallet.name}</span>
      <span
        id="connection-status"
        slot="supporting"
        class=${classMap({ connected: this.connected.get() })}
        >${this.connected.get()
          ? html`Connected | ${this.#accounts.get().length}
              <span class="icon">${usersIcon({ size: "1em" })}</span>`
          : "Not connected"}</span
      >
      ${this.trailing()}
    </dc-list-item>`;
  }

  protected trailing() {
    return html``;
  }
}

@customElement("dc-wallet")
export class WalletConnection extends BaseWalletConnection {
  protected override trailing() {
    return html`<button
      slot="trailing"
      class=${classMap({
        success: !this.connected.get(),
        error: this.connected.get(),
        sm: true,
      })}
      @click=${async () => {
        if (this.pending.get()) {
          return;
        }

        try {
          this.pending.set(true);
          if (this.connected.get()) {
            await disconnectWallet(this.wallet);
          } else {
            await connectWallet(this.wallet);
          }
        } catch (error) {
          console.error(error);
        } finally {
          this.pending.set(false);
        }
      }}
    >
      ${this.connected.get() ? "Disconnect" : "Connect"}
    </button>`;
  }
}

@customElement("dc-deep-link-wallet")
export class DeepLinkWalletConnection extends BaseWalletConnection<DeepLinkWallet> {
  readonly #uri = signal<string | undefined>(undefined);

  constructor() {
    super();

    effect(() => {
      if (this.connected.get()) {
        this.#uri.set(undefined);
      }
    });
  }

  protected override trailing() {
    return html`<button
      slot="trailing"
      class=${classMap({
        success: !this.connected.get(),
        error: this.connected.get(),
        sm: true,
      })}
      @click=${async () => {
        if (this.pending.get()) {
          return;
        }

        try {
          this.pending.set(true);
          if (this.connected.get()) {
            await disconnectWallet(this.wallet);
          } else {
            const { uri } = await this.wallet.initiateConnectionHandshake();
            this.#uri.set(uri);
          }
        } catch (error) {
          console.error(error);
        } finally {
          this.pending.set(false);
        }
      }}
    >
      ${this.connected.get() ? "Disconnect" : "Connect"}
    </button>`;
  }

  static override styles = [
    super.styles,
    css`
      #qr-code-container {
        display: flex;
        justify-content: center;
      }

      #url-container {
        display: flex;
        justify-content: center;

        button {
          padding: 0;
          cursor: copy;

          svg {
            vertical-align: -0.125em;
          }
        }
      }
    `,
  ];

  protected override render() {
    return html`<div style="display: content;">
      ${super.render()}
      ${this.#uri.get() === undefined
        ? nothing
        : html`<dc-dialog
            ?open=${true}
            @close=${() => this.#uri.set(undefined)}
            modal
          >
            <span slot="title">Scan QR code</span>
            <div slot="content">
              <div id="qr-code-container">
                <dc-qr-code
                  data=${this.#uri.get()!}
                  .logoSrc=${this.walletInfo?.icon.href}
                ></dc-qr-code>
              </div>
              <div id="url-container">
                <button
                  class="text info"
                  @click=${() =>
                    globalThis.navigator.clipboard.writeText(this.#uri.get()!)}
                >
                  Copy link ${copyIcon({ size: "1em" })}
                </button>
              </div>
            </div>
          </dc-dialog>`}
    </div>`;
  }
}

@customElement("dc-ledger-wallet")
export class LedgerWalletConnection extends BaseWalletConnection<LedgerWallet> {
  @state()
  protected open: false | "manage" | "connect" = false;

  protected override trailing() {
    return html`<button
      slot="trailing"
      class=${classMap({
        success: !this.connected.get(),
        info: this.connected.get(),
        sm: true,
      })}
      @click=${() => (this.open = this.connected.get() ? "manage" : "connect")}
    >
      ${this.connected.get() ? "Manage" : "Connect"}
    </button>`;
  }

  protected override render() {
    return html`
      ${super.render()}
      ${when(
        this.open === "manage",
        () =>
          html`<dc-ledger-dialog
            open
            @close=${() => (this.open = false)}
            .wallet=${this.wallet}
          ></dc-ledger-dialog>`,
      )}
      ${when(
        this.open === "connect",
        () =>
          html`<dc-connected-ledger-accounts-dialog
            open
            @close=${() => (this.open = false)}
            .wallet=${this.wallet}
          ></dc-connected-ledger-accounts-dialog>`,
      )}
    `;
  }
}

@customElement("dc-polkadot-vault-wallet")
export class PolkadotVaultWalletConnection extends BaseWalletConnection<PolkadotVaultWallet> {
  @state()
  protected manageDialogOpen: boolean = false;

  readonly accountRequest = observableSignal(this, () =>
    this.wallet.request$.pipe(
      filter((request) => request === undefined || request?.type === "account"),
    ),
  );

  protected override trailing() {
    return html`<button
      slot="trailing"
      class=${classMap({
        success: !this.connected.get(),
        info: this.connected.get(),
        sm: true,
      })}
      @click=${async () => {
        if (this.connected.get()) {
          this.manageDialogOpen = true;
        } else {
          this.wallet.accountStore.add(await this.wallet.getNewAccount());
        }
      }}
    >
      ${this.connected.get() ? "Manage" : "Connect"}
    </button>`;
  }

  protected override render() {
    return html`
      ${super.render()}
      ${when(
        this.manageDialogOpen,
        () =>
          html`<dc-local-wallet-dialog
            open
            .wallet=${this.wallet}
            @close=${() => (this.manageDialogOpen = false)}
            @request-new-account=${async () =>
              this.wallet.accountStore.add(await this.wallet.getNewAccount())}
          ></dc-local-wallet-dialog>`,
      )}
      ${when(
        this.accountRequest.get() !== undefined,
        () =>
          html`<dc-polkadot-vault-account-scanner-dialog
            .request=${this.accountRequest.get()!}
          ></dc-polkadot-vault-account-scanner-dialog>`,
      )}
    `;
  }
}

@customElement("dc-readonly-wallet")
export class ReadonlyWalletConnection extends BaseWalletConnection<ReadonlyWallet> {
  @state()
  protected manageDialogOpen = false;

  @state()
  protected addDialogOpen = false;

  protected override trailing() {
    return html`<button
      slot="trailing"
      class=${classMap({
        success: !this.connected.get(),
        info: this.connected.get(),
        sm: true,
      })}
      @click=${() => {
        if (this.connected.get()) {
          this.manageDialogOpen = true;
        } else {
          this.addDialogOpen = true;
        }
      }}
    >
      ${this.connected.get() ? "Manage" : "Connect"}
    </button>`;
  }

  protected override render() {
    return html`
      ${super.render()}
      ${when(
        this.manageDialogOpen,
        () =>
          html`<dc-local-wallet-dialog
            open
            .wallet=${this.wallet}
            @close=${() => (this.manageDialogOpen = false)}
            @request-new-account=${() => (this.addDialogOpen = true)}
          ></dc-local-wallet-dialog>`,
      )}
      ${when(
        this.addDialogOpen,
        () =>
          html`<dc-add-readonly-account-dialog
            open
            @close=${() => (this.addDialogOpen = false)}
            .wallet=${this.wallet}
          ></dc-add-readonly-account-dialog>`,
      )}
    `;
  }
}

@customElement("dc-downloadable-wallet")
export class DownloadableWallet extends DotConnectElement {
  @property({ attribute: false })
  wallet!: InjectedWalletInfo;

  // TODO: this is a hack
  static shouldRender(wallet: InjectedWalletInfo) {
    return wallet.recommended === true && getDownloadUrl(wallet) !== undefined;
  }

  get #downloadUrl() {
    return getDownloadUrl(this.wallet);
  }

  static override styles = [
    super.styles,
    css`
      button,
      .button {
        min-width: 5rem;
      }
    `,
  ];

  protected override render() {
    if (this.#downloadUrl === undefined) {
      return nothing;
    }

    const isMobile =
      this.#downloadUrl.platform === "android" ||
      this.#downloadUrl.platform === "ios";

    return html`<dc-list-item>
      <div slot="leading" class="icon">
        <img src=${this.wallet.icon.href} />
      </div>
      <span slot="headline">${this.wallet.name}</span>
      <!-- No way to detect wether or not wallet is installed on mobile browser -->
      ${isMobile ? nothing : html`<span slot="supporting">Not installed</span>`}
      <a
        class="button info sm"
        slot="trailing"
        href=${this.#downloadUrl.url}
        target="_blank"
        >Get</a
      >
    </dc-list-item>`;
  }
}
