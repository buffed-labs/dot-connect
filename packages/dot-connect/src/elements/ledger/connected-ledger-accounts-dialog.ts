import { logAndThrow } from "../../utils.js";
import { DotConnectElement } from "../components/element.js";
import "./connected-ledger-account-list-item.js";
import { Task } from "@lit/task";
import type { LedgerWallet } from "@reactive-dot/wallet-ledger";
import { css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("dc-connected-ledger-accounts-dialog")
export class ConnectedLedgerAccountsDialog extends DotConnectElement {
  private static accountIncrement = 3;

  @property({ type: Boolean })
  open = false;

  @property({ attribute: false })
  wallet!: LedgerWallet;

  @state()
  protected accountCount = ConnectedLedgerAccountsDialog.accountIncrement;

  #connectLedgerTask = new Task(this, {
    task: ([wallet]) =>
      wallet === undefined
        ? Promise.withResolvers<
            Awaited<ReturnType<LedgerWallet["getConnectedAccount"]>>
          >().promise
        : wallet.getConnectedAccount().catch(logAndThrow),
    args: () => [this.wallet] as const,
    autoRun: false,
  });

  protected override willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has("wallet")) {
      this.#connectLedgerTask.run();
    }

    if (changedProperties.has("open")) {
      if (this.open) {
        this.#connectLedgerTask.run();
        this.accountCount = ConnectedLedgerAccountsDialog.accountIncrement;
      }
    }
  }

  static override styles = [
    super.styles,
    css`
      p {
        text-align: center;
      }

      #retry-button,
      #load-more-button {
        margin-block-start: 0.5rem;
        width: 100%;
      }
    `,
  ];

  protected override render() {
    return html`
      <dc-dialog
        ?open=${this.open}
        @close=${(event: Event) =>
          this.dispatchEvent(new Event(event.type, event))}
      >
        <span slot="title">Connectable accounts</span>
        <div slot="content">
          ${this.#connectLedgerTask.render({
            pending: () => html`<p>Connect your Ledger device to continue.</p>`,
            complete: () => html`
              ${Array.from({ length: this.accountCount }).map(
                (_, index) =>
                  html`<dc-connected-ledger-account-list-item
                    .wallet=${this.wallet}
                    accountPath=${index}
                  ></dc-connected-ledger-account-list-item>`,
              )}
              <button
                id="load-more-button"
                @click=${() =>
                  (this.accountCount +=
                    ConnectedLedgerAccountsDialog.accountIncrement)}
              >
                Load more accounts
              </button>
            `,
            error: () =>
              html`<p>Failed to connect Ledger device.</p>
                <button
                  id="retry-button"
                  @click=${() => this.#connectLedgerTask.run()}
                >
                  Try again
                </button>`,
          })}
        </div>
      </dc-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-connected-ledger-accounts-dialog": ConnectedLedgerAccountsDialog;
  }
}
