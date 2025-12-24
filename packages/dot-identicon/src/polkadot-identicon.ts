import { generatePolkadotIcon } from "./icon.js";
import { css, html, LitElement, svg } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("polkadot-identicon")
export class PolkadotIdenticon extends LitElement {
  @property()
  address!: string;

  /** @deprecated use CSS property --size instead */
  @property()
  size?: string | number;

  /** @deprecated use CSS property --background-color instead */
  @property()
  backgroundColor?: string;

  static override styles = css`
    :host {
      display: inline-flex;
      width: var(--size, 24px);
      min-width: var(--size, 24px);
      max-width: var(--size, 24px);
      height: var(--size, 24px);
      min-height: var(--size, 24px);
      max-height: var(--size, 24px);
      aspect-ratio: 1;
    }

    button {
      cursor: copy;
    }
  `;

  override updated(changedProps: Map<string, unknown>) {
    if (changedProps.has("size") && this.size !== undefined) {
      this.style.setProperty(
        "--size",
        typeof this.size === "number" ? `${this.size}px` : this.size,
      );
    }

    if (
      changedProps.has("backgroundColor") &&
      this.backgroundColor !== undefined
    ) {
      this.style.setProperty("--background-color", this.backgroundColor);
    }
  }

  protected override render() {
    const circles = generatePolkadotIcon(this.address, {
      backgroundColor: `var(--background-color, transparent)`,
    });

    return html`<svg
      name=${this.address}
      width="100%"
      height="100%"
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
