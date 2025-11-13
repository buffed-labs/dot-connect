import { DotConnectElement } from "../components/element.js";
import "../components/qr-scanner.js";
import type { QrScannerEventMap } from "../components/qr-scanner.js";
import type { VaultRequest } from "@reactive-dot/wallet-polkadot-vault";
import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("dc-polkadot-vault-account-scanner-dialog")
export class PolkadotVaultAccountScannerDialog extends DotConnectElement {
  @property({ attribute: false })
  request!: Extract<VaultRequest, { type: "account" }>;

  static override styles = [
    super.styles,
    css`
      ol {
        margin-top: 0;
        padding-inline-start: 0;
        list-style: none;
      }

      li {
        position: relative;
      }

      li + li {
        margin-top: 0.5em;
      }

      li::before {
        content: counter(list-item);
        background: var(--surface-container-color);
        width: 2em;
        height: 2em;
        border-radius: 50%;
        display: inline-block;
        line-height: 2em;
        text-align: center;
        margin-right: 0.5em;
      }
    `,
  ];

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.request.response.reject(new Error("Cancelled"));
  }

  protected override render() {
    return html`<dc-dialog
      open
      @close=${(event: Event) => {
        this.request.response.reject(new Error("Cancelled"));
        this.dispatchEvent(new Event(event.type, event));
      }}
      ><span slot="title">Import Vault Account</span>
      <div slot="content">
        <ol>
          <li>Open Polkadot Vault on your device</li>
          <li>Approve camera permission</li>
          <li>Scan QR code</li>
        </ol>
        <dc-qr-scanner
          responsive
          @qr-code-value=${(event: QrScannerEventMap["qr-code-value"]) =>
            this.request.response.resolve(event.detail.value)}
          @qr-code-error=${(event: QrScannerEventMap["qr-code-error"]) =>
            this.request.response.reject(event.detail.error)}
        ></dc-qr-scanner></div
    ></dc-dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-polkadot-vault-account-scanner-dialog": PolkadotVaultAccountScannerDialog;
  }
}
