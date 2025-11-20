import "../components/account-list-item.js";
import { DotConnectElement } from "../components/element.js";
import "../local-wallet-dialog.js";
import "./connected-ledger-accounts-dialog.js";
import type { LedgerWallet } from "@reactive-dot/wallet-ledger";
import "dot-identicon";
import { css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { when } from "lit/directives/when.js";

@customElement("dc-ledger-dialog")
export class LedgerDialog extends DotConnectElement {
  @property({ type: Boolean })
  open = false;

  @property({ attribute: false })
  wallet!: LedgerWallet;

  @state()
  protected addDialogOpen = false;

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
    return html`<dc-local-wallet-dialog
        .wallet=${this.wallet}
        ?open=${this.open}
        @close=${(event: Event) =>
          this.dispatchEvent(new Event(event.type, event))}
        @request-new-account=${() => (this.addDialogOpen = true)}
      >
      </dc-local-wallet-dialog>
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
