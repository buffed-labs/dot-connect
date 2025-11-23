import { DotConnectElement } from "./components/element.js";
import { getSs58AddressInfo } from "@polkadot-api/substrate-bindings";
import type { ReadonlyWallet } from "@reactive-dot/wallet-readonly";
import { css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("dc-add-readonly-account-dialog")
export class AddReadonlyAccountDialog extends DotConnectElement {
  static override styles = [
    super.styles,
    css`
      label {
        p {
          text-align: center;
          color: color-mix(in srgb, currentcolor, transparent 15%);
          font-size: 0.75em;
          margin: unset;
          padding-bottom: 0.25em;
        }
      }

      input {
        width: var(--stretch);
        margin-bottom: 1rem;
        padding: 0.5rem;
      }

      button {
        width: var(--stretch);
      }
    `,
  ];

  @property({ type: Boolean })
  open = false;

  @property({ attribute: false })
  wallet!: ReadonlyWallet;

  @state()
  protected address = "";

  get addressInfo() {
    return getSs58AddressInfo(this.address);
  }

  protected override render() {
    return html`
      <dc-dialog
        .open=${this.open}
        @close=${(event: Event) =>
          this.dispatchEvent(new Event(event.type, event))}
      >
        <span slot="title">View external account</span>
        <div slot="content">
          <form
            @submit=${(event: Event) => {
              event.preventDefault();

              if (this.addressInfo.isValid) {
                this.wallet.accountStore.add({
                  publicKey: this.addressInfo.publicKey,
                });
                this.dispatchEvent(new CloseEvent("close"));
              }
            }}
          >
            <label
              ><p>Paste account address you would like to monitor</p>
              <input
                type="text"
                .value="${this.address}"
                @input="${(event: InputEvent) =>
                  (this.address = (event.target as HTMLInputElement).value)}"
              />
            </label>
            <button type="submit" ?disabled=${!this.addressInfo.isValid}>
              Confirm
            </button>
          </form>
        </div>
      </dc-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-add-readonly-account-dialog": AddReadonlyAccountDialog;
  }
}
