import { genericChainSpec } from "../consts.js";
import { getWalletMetadata } from "../get-wallet-metadata.js";
import { observableSignal } from "../observable-signal.js";
import "./components/account-list-item.js";
import { DotConnectElement } from "./components/element.js";
import { getAccounts } from "@reactive-dot/core/internal/actions.js";
import type {
  LocalWallet,
  PolkadotSignerAccount,
} from "@reactive-dot/core/wallets.js";
import "dot-identicon";
import { css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";

@customElement("dc-local-wallet-dialog")
export class LocalWalletDialog extends DotConnectElement {
  @property({ type: Boolean })
  open = false;

  @property({ attribute: false })
  wallet!: LocalWallet<Pick<PolkadotSignerAccount, "id">>;

  #connectedAccounts = observableSignal(
    this,
    () => getAccounts([this.wallet], undefined, genericChainSpec),
    [],
  );

  static override styles = [
    super.styles,
    css`
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 0 0.5rem 1rem 0.5rem;

        h3 {
          font-size: 0.8em;
        }
      }

      hr {
        margin-inline-start: 3.2rem;
        margin-inline-end: 0.5rem;
        border: none;
        border-bottom: 0.5px solid var(--outline-color);
      }

      button.text {
        padding: 0;
      }
    `,
  ];

  protected override render() {
    return html`<dc-dialog
      ?open=${this.open}
      @close=${(event: Event) =>
        this.dispatchEvent(new Event(event.type, event))}
    >
      <span slot="title"
        >${getWalletMetadata(this.wallet)?.name ?? this.wallet.name}</span
      >
      <section slot="content">
        <header>
          <h3>Connected accounts</h3>
          <button
            class="text"
            @click=${() =>
              this.dispatchEvent(new CustomEvent("request-new-account"))}
          >
            Add more
          </button>
        </header>
        ${repeat(
          this.#connectedAccounts.get(),
          (account) => account.id,
          (account, index) =>
            html`<dc-account-list-item
                address=${account.address}
                name=${ifDefined(account.name)}
              >
                <button
                  slot="trailing"
                  class="error sm"
                  @click=${() => this.wallet.accountStore.delete(account)}
                >
                  Remove
                </button></dc-account-list-item
              >${this.#connectedAccounts.get().length <= 1 ||
              index === this.#connectedAccounts.get().length - 1
                ? nothing
                : html`<hr />`}`,
        )}
      </section>
    </dc-dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-local-wallet-dialog": LocalWalletDialog;
  }
}
