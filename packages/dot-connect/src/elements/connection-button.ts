import {
  users as usersIcon,
  wallet as walletIcon,
  wallets as walletsIcon,
} from "../icons/index.js";
import { observableSignal } from "../observable-signal.js";
import { accounts$, connectedWallets$ } from "../stores.js";
import { DotConnectElement } from "./components/element.js";
import "./connection-dialog.js";
import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("dc-connection-button")
export class ConnectionButton extends DotConnectElement {
  static override styles = [
    super.styles,
    css`
      :host {
        display: inline-flex;
        font-size: 1.5em;
      }

      #button {
        width: 100%;
        text-wrap-mode: nowrap;
      }

      .icon {
        display: contents;
        > * {
          vertical-align: -0.125em;
        }
      }
    `,
  ];

  @property({ attribute: "dialog-variant" })
  dialogVariant: "modal" | "non-modal" = "non-modal";

  readonly #connectedWallets = observableSignal(this, connectedWallets$, []);

  readonly #accounts = observableSignal(this, accounts$, []);

  override render() {
    return html`
      <dc-connection-dialog variant=${this.dialogVariant}>
        <button id="button" part="button" slot="trigger">
          ${this.#connectedWallets.get().length > 0
            ? html`Connected | ${this.#connectedWallets.get().length}
                <span class="icon"
                  >${this.#connectedWallets.get().length === 1
                    ? walletIcon({ size: "1em" })
                    : walletsIcon({ size: "1em" })}</span
                >
                ${this.#accounts.get().length}
                <span class="icon">${usersIcon({ size: "1em" })}</span>`
            : html`Connect
                <span class="icon">${walletsIcon({ size: "1em" })}</span>`}
        </button>
      </dc-connection-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-connection-button": ConnectionButton;
  }
}
