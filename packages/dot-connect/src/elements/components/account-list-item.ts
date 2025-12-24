import { DotConnectElement } from "./element.js";
import "./list-item.js";
import "dot-identicon";
import { css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

@customElement("dc-account-list-item")
export class AccountListItem extends DotConnectElement {
  static override readonly styles = [
    super.styles,
    css`
      polkadot-identicon {
        --size: 100%;
        --background-color: var(--surface-container-color);
      }
    `,
  ];
  @property()
  address!: string;

  @property()
  name?: string;

  @property({ type: Boolean })
  clickable = false;

  @property({ type: Boolean })
  pending = false;

  @property()
  type?: "checkbox" | undefined;

  @property({ type: Boolean })
  checked = false;

  get shortenedAddress() {
    return this.address.slice(0, 6) + "..." + this.address.slice(-6);
  }

  protected override render() {
    return html`<dc-list-item
      ?clickable=${this.clickable}
      ?pending=${this.pending}
      type=${ifDefined(this.type)}
      ?checked=${this.checked}
    >
      <div class="icon" slot="leading">
        <polkadot-identicon address=${this.address}></polkadot-identicon>
      </div>
      <span slot="headline">${this.name ?? this.shortenedAddress}</span>
      ${this.name === undefined
        ? nothing
        : html`<span slot="supporting">${this.shortenedAddress}</span>`}
      <slot name="trailing" slot="trailing"></slot>
    </dc-list-item>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-account-list-item": AccountListItem;
  }
}
