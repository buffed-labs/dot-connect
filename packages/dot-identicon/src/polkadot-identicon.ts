import { generatePolkadotIcon } from "./icon.js";
import { css, html, LitElement, svg } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("polkadot-identicon")
export class PolkadotIdenticon extends LitElement {
  @property()
  address!: string;

  @property()
  size: string | number = 24;

  @property()
  backgroundColor: string = "transparent";

  static override styles = css`
    :host {
      display: contents;
    }

    button {
      cursor: copy;
    }
  `;

  protected override render() {
    const circles = generatePolkadotIcon(this.address, {
      backgroundColor: this.backgroundColor,
    });

    return html`<svg
      name=${this.address}
      width=${this.size}
      height=${this.size}
      viewBox="0 0 64 64"
    >
      ${circles.map(
        ({ cx, cy, r, fill }) =>
          svg`<circle cx=${cx} cy=${cy} r=${r} fill=${fill} />`,
      )}
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "polkadot-identicon": PolkadotIdenticon;
  }
}
