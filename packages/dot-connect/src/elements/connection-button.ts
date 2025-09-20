import {
  users as usersIcon,
  wallet as walletIcon,
  wallets as walletsIcon,
} from "../icons/index.js";
import { observableSignal } from "../observable-signal.js";
import { accounts$, connectedWallets$ } from "../stores.js";
import { DotConnectElement } from "./components/element.js";
import "./connection-dialog.js";
import { signal } from "@lit-labs/signals";
import { css, html } from "lit";
import { customElement } from "lit/decorators.js";

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

  readonly #dialogOpen = signal(false);

  readonly #connectedWallets = observableSignal(this, connectedWallets$, []);

  readonly #accounts = observableSignal(this, accounts$, []);

  override render() {
    return html`
      <button
        id="button"
        part="button"
        @click=${() => this.#dialogOpen.set(true)}
      >
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
      <dc-connection-dialog
        ?open=${this.#dialogOpen.get()}
        @close=${() => this.#dialogOpen.set(false)}
      ></dc-connection-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-connection-button": ConnectionButton;
  }
}
