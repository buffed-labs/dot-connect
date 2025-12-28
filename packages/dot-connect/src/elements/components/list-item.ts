import "./circular-progress-indicator.js";
import { DotConnectElement } from "./element.js";
import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { createRef, ref, type Ref } from "lit/directives/ref.js";
import { styleMap } from "lit/directives/style-map.js";

const composedEvent = Symbol("composedEvent");

@customElement("dc-list-item")
export class ListItem extends DotConnectElement {
  @property({ type: Boolean })
  clickable = false;

  @property({ type: Boolean })
  pending = false;

  @property()
  type?: "checkbox" | undefined;

  @property({ type: Boolean })
  checked = false;

  #checkboxRef: Ref<HTMLInputElement> = createRef();

  static override readonly styles = [
    super.styles,
    css`
      li {
        display: flex;
        align-items: center;

        border-radius: min(1rem, var(--max-border-radius));
        padding: 0.5rem;

        transition: backdrop-filter 0.125s;

        &.clickable {
          cursor: pointer;

          &:hover {
            backdrop-filter: invert(8%);

            @starting-style {
              backdrop-filter: invert(0);
            }
          }
        }
      }

      #leading {
        grid-area: leading;

        ::slotted(*) {
          margin-inline-end: 0.75rem;
        }

        ::slotted(.icon) {
          inline-size: 2rem;
          block-size: 2rem;
        }
      }

      #middle {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      #headline {
        grid-area: headline;
        font-weight: 500;
      }

      #supporting {
        grid-area: supporting;
        font-size: 0.75em;
        color: color-mix(in oklab, currentcolor, transparent 15%);
      }

      #trailing {
        grid-area: trailing;
        transition: opacity 0.125s;

        ::slotted(*) {
          margin-inline-start: 0.75rem;
        }

        ::slotted(.revealable) {
          opacity: 0;
        }

        ::slotted(:is(.icon, input[type="checkbox"])) {
          inline-size: 1.2rem;
          block-size: 1.2rem;
        }
      }

      li:hover #trailing ::slotted(.revealable) {
        opacity: 1;

        @starting-style {
          opacity: 0;
        }
      }

      #checkbox {
        pointer-events: none;
      }
    `,
  ];

  protected override render() {
    return html`<li
      class=${classMap({ clickable: this.clickable })}
      role=${ifDefined(this.clickable ? "button" : undefined)}
      @click=${() => {
        if (this.type === "checkbox") {
          this.#checkboxRef.value?.click();
        }
      }}
    >
      <div id="leading"><slot name="leading"></slot></div>
      <div id="middle">
        <header id="headline"><slot name="headline"></slot></header>
        <div id="supporting"><slot name="supporting"></slot></div>
      </div>
      <div
        id="trailing"
        style=${styleMap({ opacity: this.pending ? 1 : undefined })}
      >
        ${(() => {
          if (this.pending) {
            return html`<dc-circular-progress-indicator
              size="1.25rem"
            ></dc-circular-progress-indicator>`;
          }

          switch (this.type) {
            case "checkbox":
              return html`<input
                ${ref(this.#checkboxRef)}
                id="checkbox"
                type="checkbox"
                ?checked=${this.checked}
                @change=${(event: Event) => {
                  if (!(composedEvent in event)) {
                    this.#checkboxRef.value?.dispatchEvent(
                      Object.assign(
                        new Event(event.type, { ...event, composed: true }),
                        { [composedEvent]: true },
                      ),
                    );
                  }
                }}
              />`;
            default:
              return html`<slot name="trailing"></slot>`;
          }
        })()}
      </div>
    </li>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-list-item": ListItem;
  }
}
