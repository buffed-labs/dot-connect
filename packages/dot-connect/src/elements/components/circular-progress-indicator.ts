import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { DotConnectElement } from "./element.js";

@customElement("dc-circular-progress-indicator")
export class CircularProgressIndicator extends DotConnectElement {
  static override readonly styles = [
    super.styles,
    css`
      svg {
        fill: var(--primary-color);
      }
    `,
  ];

  @property()
  size: string | number = "24";

  protected override render() {
    return html`
      <svg width=${this.size} height=${this.size} viewBox="0 0 24 24">
        <style>
          .spinner_GuJz {
            transform-origin: center;
            animation: spinner_STY6 1.5s linear infinite;
          }
          @keyframes spinner_STY6 {
            100% {
              transform: rotate(360deg);
            }
          }
        </style>
        <g class="spinner_GuJz">
          <circle cx="3" cy="12" r="2" />
          <circle cx="21" cy="12" r="2" />
          <circle cx="12" cy="21" r="2" />
          <circle cx="12" cy="3" r="2" />
          <circle cx="5.64" cy="5.64" r="2" />
          <circle cx="18.36" cy="18.36" r="2" />
          <circle cx="5.64" cy="18.36" r="2" />
          <circle cx="18.36" cy="5.64" r="2" />
        </g>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-circular-progress-indicator": CircularProgressIndicator;
  }
}
