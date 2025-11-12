import { polkadotVault } from "../../wallets/polkadot-vault.js";
import { DotConnectElement } from "../components/element.js";
import "../components/qr-scanner.js";
import type { QrScannerEventMap } from "../components/qr-scanner.js";
import { Binary } from "@polkadot-api/substrate-bindings";
import { mergeUint8 } from "@polkadot-api/utils";
import type { VaultRequest } from "@reactive-dot/wallet-polkadot-vault";
import { css, html, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { choose } from "lit/directives/choose.js";

@customElement("dc-polkadot-vault-signature-scanner-dialog")
export class PolkadotVaultSignatureScannerDialog extends DotConnectElement {
  static override styles = [
    super.styles,
    css`
      #button-container {
        display: flex;
        padding: 0 20px;
        > * {
          flex: 1;
        }
      }
    `,
  ];

  @property({ attribute: false })
  request!: Extract<VaultRequest, { type: "signature" }>;

  #frames: Uint8Array[] = [];

  @state()
  private frame?: Uint8Array = undefined;

  #internalId?: ReturnType<typeof setInterval> = undefined;

  @state()
  private step: 1 | 2 = 1;

  protected override willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has("request")) {
      clearInterval(this.#internalId);

      this.#frames = this.#createFrames(this.request.data);
      this.frame = this.#frames[0]!;

      if (this.#frames.length > 1) {
        let index = 0;
        this.#internalId = setInterval(() => {
          this.frame = this.#frames[index]!;
          index = (index + 1) % this.#frames.length;
        }, 300);
      }
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.#internalId);
    this.request.response.reject(new Error("Cancelled"));
  }

  protected override render() {
    return html`<dc-dialog
      open
      @close=${(event: Event) => {
        this.request.response.reject(new Error("Cancelled"));
        this.dispatchEvent(new Event(event.type, event));
      }}
      ><span slot="title">Scan QR Code</span>
      <div slot="content">
        ${choose(this.step, [
          [
            1,
            () =>
              html`${this.frame === undefined
                  ? nothing
                  : html`<div class="center">
                      <dc-qr-code
                        .data=${this.frame}
                        .logoSrc=${polkadotVault.icon.toString()}
                      ></dc-qr-code>
                    </div>`}
                <div id="button-container">
                  <button @click=${() => this.step++}>Next</button>
                </div>`,
          ],
          [
            2,
            () =>
              html`${this.frame === undefined
                  ? nothing
                  : html`<div class="center" style="margin-bottom: 25px">
                      <dc-qr-scanner
                        @qr-code-value=${(
                          event: QrScannerEventMap["qr-code-value"],
                        ) => this.request.response.resolve(event.detail.value)}
                        @qr-code-error=${(
                          event: QrScannerEventMap["qr-code-error"],
                        ) => this.request.response.reject(event.detail.error)}
                      ></dc-qr-scanner>
                    </div>`}
                <div id="button-container">
                  <button class="info" @click=${() => this.step--}>Back</button>
                </div>`,
          ],
        ])}
      </div>
      <span slot="footer">
        ${choose(this.step, [
          [1, () => "Scan QR code with the Polkadot Vault app on your phone"],
          [2, () => "Scan the Polkadot Vault QR code"],
        ])}
      </span>
    </dc-dialog>`;
  }

  #createFrames(payload: Uint8Array): Uint8Array[] {
    const frames = [];
    const frameSize = 256;

    let idx = 0;
    while (idx < payload.length) {
      frames.push(payload.subarray(idx, idx + frameSize));
      idx += frameSize;
    }

    return frames.map(
      (f, i): Uint8Array =>
        mergeUint8([
          new Uint8Array([0x00]),
          Binary.fromHex(frames.length.toString(16).padStart(4, "0")).asBytes(),
          Binary.fromHex(i.toString(16).padStart(4, "0")).asBytes(),
          f,
        ]),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-polkadot-vault-signature-scanner-dialog": PolkadotVaultSignatureScannerDialog;
  }
}
