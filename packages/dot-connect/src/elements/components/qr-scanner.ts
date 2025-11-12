import { scanQr as scanQrIcon } from "../../icons/index.js";
import { DotConnectElement } from "./element.js";
import { css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

export type QrScannerEventMap = {
  "qr-code-value": CustomEvent<{ value: string }>;
  "qr-code-error": CustomEvent<{ error: unknown }>;
};

@customElement("dc-qr-scanner")
export class QrScanner extends DotConnectElement {
  override dispatchEvent<T extends keyof QrScannerEventMap>(
    event: QrScannerEventMap[T],
  ) {
    return super.dispatchEvent(event);
  }

  @property({ type: Boolean })
  responsive = false;

  static override styles = css`
    :host {
      display: inline-flex;
    }

    :host([responsive]) {
      width: var(--stretch);
    }

    #container {
      display: flex;
      flex: 1;
      position: relative;
      border-radius: min(1rem, var(--max-border-radius));
      background-color: var(--surface-container-color);
      overflow: hidden;
    }

    #fallback-container {
      position: absolute;
      inset: 0;
      margin: auto;
      width: fit-content;
      height: fit-content;
    }

    #video {
      flex: 1;
      display: block;
      object-fit: cover;
      aspect-ratio: 1 / 1;
      width: 100%;
      max-width: 300px;

      :host([responsive]) & {
        width: 0;
        max-width: 100%;
      }
    }
  `;

  @query("#video")
  private videoElement!: HTMLVideoElement;

  override connectedCallback(): void {
    super.connectedCallback();
    import("@undecaf/barcode-detector-polyfill").then(
      async ({ BarcodeDetectorPolyfill }) => {
        try {
          const stream = await this.#createStream();

          this.videoElement.srcObject = stream;

          if (
            stream.getVideoTracks()[0]?.getSettings()?.facingMode ===
            "environment"
          ) {
            this.videoElement.style.transform = "none";
          } else {
            this.videoElement.style.transform = "scaleX(-1)";
          }

          await this.videoElement.play();

          const barcodeDetector = new BarcodeDetectorPolyfill({
            formats: ["qr_code"],
          });

          while (true) {
            const barcodes = await barcodeDetector.detect(this.videoElement);
            const barcode = barcodes[0]!;

            if (barcode !== undefined) {
              this.dispatchEvent(
                new CustomEvent("qr-code-value", {
                  detail: { value: barcode.rawValue },
                }),
              );
            }

            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        } catch (error) {
          this.dispatchEvent(
            new CustomEvent("qr-code-error", { detail: { error } }),
          );
        }
      },
    );
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.#stopStream();
  }

  protected override render() {
    return html`<div id="container">
      <div id="fallback-container">${scanQrIcon({ size: 64 })}</div>
      <video
        id="video"
        width=${ifDefined(this.responsive ? undefined : "300")}
        height=${ifDefined(this.responsive ? undefined : "300")}
      ></video>
    </div>`;
  }

  #stream?: Promise<MediaStream> = undefined;

  #createStream() {
    this.#stopStream();
    return (this.#stream = navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "user" }, aspectRatio: { ideal: 1 } },
    }));
  }

  #stopStream() {
    this.#stream?.then((stream) =>
      stream.getTracks().forEach((track) => track.stop()),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-qr-scanner": QrScanner;
  }
}
