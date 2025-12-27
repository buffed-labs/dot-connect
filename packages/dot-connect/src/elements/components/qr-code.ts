import { wallet as walletIcon } from "../../icons/index.js";
import { DotConnectElement } from "./element.js";
import { type TemplateResult, css, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  create as createQrCode,
  type QRCode,
  type QRCodeErrorCorrectionLevel,
} from "qrcode";

@customElement("dc-qr-code")
export class QrCode extends DotConnectElement {
  @property()
  ecl: QRCodeErrorCorrectionLevel = "M";

  @property()
  data!: string | Uint8Array;

  @property({ type: Number })
  size = 320;

  @property()
  logoSrc?: string;

  @property({ type: Number })
  logoSize = 50;

  @property({ type: Number })
  logoMargin = 10;

  #padding = 20;

  get #size() {
    return this.size - this.#padding * 2;
  }

  get #logoWrapperSize() {
    return this.logoSize + this.logoMargin * 2;
  }

  static override readonly styles = [
    super.styles,
    css`
      svg {
        all: revert;
      }

      #container {
        inline-size: min-content;
      }

      #qr-code-container {
        position: relative;
        inline-size: min-content;
      }

      #logo-container {
        position: absolute;
        inset: 0;
        display: flex;

        img {
          margin: auto;
          border-color: rgba(0, 0, 0, 0.06);
          border-radius: min(1.2rem, var(--max-border-radius));
        }
      }
    `,
  ];

  protected override render() {
    return html`
      <div id="container" style=${styleMap({ padding: `${this.#padding}px` })}>
        <div id="qr-code-container">
          <div id="logo-container">
            ${this.logoSrc === undefined
              ? walletIcon({ size: this.logoSize })
              : html`<img
                  src=${this.logoSrc}
                  style=${styleMap({
                    width: `${this.logoSize}px`,
                    height: `${this.logoSize}px`,
                  })}
                />`}
          </div>
          <svg height=${this.#size} width=${this.#size}>
            <title>QR Code</title>
            <defs>
              <clipPath id="clip-wrapper">
                <rect
                  height=${this.#logoWrapperSize}
                  width=${this.#logoWrapperSize}
                />
              </clipPath>
              <clipPath id="clip-logo">
                <rect height=${this.logoSize} width=${this.logoSize} />
              </clipPath>
            </defs>
            <rect fill="transparent" height=${this.#size} width=${this.#size} />
            ${this.#generateDots()}
          </svg>
        </div>
      </div>
    `;
  }

  #generateMatrix(
    value: string | Uint8Array,
    errorCorrectionLevel: QRCodeErrorCorrectionLevel,
  ) {
    const arr = Array.prototype.slice.call(
      createQrCode(
        typeof value === "string" ? value : [{ mode: "byte", data: value }],
        { errorCorrectionLevel },
      ).modules.data,
      0,
    );
    const sqrt = Math.sqrt(arr.length);
    return arr.reduce(
      (rows, key, index) =>
        (index % sqrt === 0
          ? rows.push([key])
          : rows[rows.length - 1].push(key)) && rows,
      [],
    ) as Array<QRCode[]>;
  }

  #generateDots() {
    const dots: TemplateResult<2>[] = [];
    const matrix = this.#generateMatrix(this.data, this.ecl);
    const cellSize = this.#size / matrix.length;
    const qrList = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];

    qrList.forEach(({ x, y }) => {
      const x1 = (matrix.length - 7) * cellSize * x;
      const y1 = (matrix.length - 7) * cellSize * y;
      for (let i = 0; i < 3; i++) {
        dots.push(
          svg`<rect
            height=${cellSize * (7 - i * 2)}
            key=${`${i}-${x}-${y}`}
            rx=${(i - 2) * -5 + (i === 0 ? 2 : 0)}
            ry=${(i - 2) * -5 + (i === 0 ? 2 : 0)}
            width=${cellSize * (7 - i * 2)}
            x=${x1 + cellSize * i}
            y=${y1 + cellSize * i}
            style=${styleMap({
              fill:
                i % 2 !== 0
                  ? "var(--surface-color)"
                  : "var(--on-surface-color)",
            })}
          />`,
        );
      }
    });

    const clearArenaSize = Math.floor((this.logoSize + 25) / cellSize);
    const matrixMiddleStart = matrix.length / 2 - clearArenaSize / 2;
    const matrixMiddleEnd = matrix.length / 2 + clearArenaSize / 2 - 1;

    matrix.forEach((row, outerIndex) => {
      row.forEach((_, innerIndex) => {
        if (matrix[outerIndex]![innerIndex]) {
          if (
            !(
              (outerIndex < 7 && innerIndex < 7) ||
              (outerIndex > matrix.length - 8 && innerIndex < 7) ||
              (outerIndex < 7 && innerIndex > matrix.length - 8)
            )
          ) {
            if (
              !(
                outerIndex > matrixMiddleStart &&
                outerIndex < matrixMiddleEnd &&
                innerIndex > matrixMiddleStart &&
                innerIndex < matrixMiddleEnd
              )
            ) {
              dots.push(
                svg`<circle
                  cx=${outerIndex * cellSize + cellSize / 2}
                  cy=${innerIndex * cellSize + cellSize / 2}
                  key="circle-${outerIndex}-${innerIndex}"
                  r=${cellSize / 3}
                  style=${styleMap({
                    fill: "var(--on-surface-color)",
                  })}
                />`,
              );
            }
          }
        }
      });
    });

    return dots;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-qr-code": QrCode;
  }
}
