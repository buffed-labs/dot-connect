import { genericChainSpec } from "../../consts.js";
import { observableSignal } from "../../observable-signal.js";
import "../components/account-list-item.js";
import { DotConnectElement } from "../components/element.js";
import "./connected-ledger-accounts-dialog.js";
import { getAccounts } from "@reactive-dot/core/internal/actions.js";
import type { WalletAccount } from "@reactive-dot/core/wallets.js";
import type { LedgerWallet } from "@reactive-dot/wallet-ledger";
import "dot-identicon";
import { css, html, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";
import { when } from "lit/directives/when.js";
import { of } from "rxjs";

@customElement("dc-ledger-dialog")
export class LedgerDialog extends DotConnectElement {
  @property({ type: Boolean })
  open = false;

  @property({ attribute: false })
  wallet!: LedgerWallet;

  @state()
  protected addDialogOpen = false;

  @state()
  protected connectedAccounts = observableSignal(
    this,
    of([] as WalletAccount[]),
    [],
  );

  protected override updated(changedProperties: PropertyValues) {
    if (changedProperties.has("wallet")) {
      this.connectedAccounts = observableSignal(
        this,
        getAccounts([this.wallet], undefined, genericChainSpec),
        [],
      );
    }
  }

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
        <span slot="title">Ledger</span>
        <section slot="content">
          <header>
            <h3>Connected accounts</h3>
            <button class="text" @click=${() => (this.addDialogOpen = true)}>
              Add more
            </button>
          </header>
          ${repeat(
            this.connectedAccounts.get(),
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
                >${this.connectedAccounts.get().length <= 1 ||
                index === this.connectedAccounts.get().length - 1
                  ? nothing
                  : html`<hr />`}`,
          )}
        </section>
      </dc-dialog>
      ${when(
        this.addDialogOpen,
        () =>
          html`<dc-connected-ledger-accounts-dialog
            open
            @close=${() => (this.addDialogOpen = false)}
            .wallet=${this.wallet}
          ></dc-connected-ledger-accounts-dialog>`,
      )}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-ledger-dialog": LedgerDialog;
  }
}
