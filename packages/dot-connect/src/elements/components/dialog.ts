import { close as closeIcon } from "../../icons/index.js";
import { DotConnectElement } from "./element.js";
import { css, html, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { createRef, ref } from "lit/directives/ref.js";

@customElement("dc-dialog")
export class Dialog extends DotConnectElement {
  static override get styles() {
    return [
      super.styles,
      css`
        :host {
          --border-radius: min(1.5rem, var(--max-border-radius));
        }

        dialog {
          width: 100dvw;

          @media (min-width: 25rem) {
            width: revert;
            min-width: min(23rem, 100dvw);

            &[popover] {
              min-width: min(max(23rem, anchor-size(width)), 100dvw);
            }
          }

          box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.32);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--border-radius);
          padding: 0;
          background-color: var(--surface-color);

          opacity: 0;
          translate: 0 0.5rem;

          transition:
            opacity 0.25s,
            translate 0.25s,
            overlay 0.25s allow-discrete,
            display 0.25s allow-discrete;

          &:popover-open,
          &[open] {
            opacity: 1;
            translate: 0 0;

            @starting-style {
              opacity: 0;
              translate: 0 0.5rem;
            }
          }
        }

        dialog[popover] {
          --gap: 0.5rem;

          max-height: calc(100dvh - anchor-size(height) - var(--gap));
          margin: auto;
          margin-bottom: 0;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;

          @media (min-width: 25rem) {
            max-height: 100dvh;
            inset: auto;
            inset-block-start: calc(anchor(outside) + var(--gap));
            inset-inline-start: anchor(inside);
            margin: 0;
            border-bottom-left-radius: var(--border-radius);
            border-bottom-right-radius: var(--border-radius);

            position-try:
              most-height flip-block,
              flip-inline;
          }
        }

        dialog:not([popover]) {
          &::backdrop {
            background-color: rgba(0, 0, 0, 0);
            backdrop-filter: blur(0px);
            transition:
              background-color 0.25s,
              backdrop-filter 0.25s,
              overlay 0.25s allow-discrete,
              display 0.25s allow-discrete;
          }

          &[open]::backdrop {
            background-color: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);

            @starting-style {
              background-color: rgba(0, 0, 0, 0);
              backdrop-filter: blur(0px);
            }
          }
        }

        header {
          position: sticky;
          top: 0;

          display: flex;
          align-items: center;
          gap: 1rem;

          padding: 1rem 1.2rem;
          background-color: var(--surface-color);

          h2 {
            flex: 1;
            font-size: 1em;
            text-align: center;
            margin-inline-start: 2rem;
          }
        }

        #close-button {
          padding: 0;
        }

        #content {
          margin: 0 1.2rem 1.2rem 1.2rem;
        }

        footer {
          display: flex;
          color: color-mix(in srgb, currentcolor, transparent 15%);
          font-size: 0.75em;
          position: sticky;
          bottom: 0;
          background-color: var(--surface-color);

          ::slotted(*) {
            flex: 1;
            padding: 1rem 1.2rem;
            border-top: 0.5px solid var(--outline-color);
          }

          ::slotted(span) {
            display: block;
            text-align: center;
          }
        }
      `,
    ];
  }

  @property({ type: Boolean })
  open = false;

  #variant: "modal" | "non-modal" = "modal";

  @property()
  get variant() {
    // TODO: Remove once Firefox supports anchor positioning
    if (!CSS.supports("anchor-name", "--anchor-name")) {
      return "modal";
    }

    // TODO: Remove once Safari doesn't have the bug where `togglePopover({ source })` doesn't work
    if (!("userAgentData" in globalThis.navigator)) {
      return "modal";
    }

    return this.#variant;
  }
  set variant(value: "modal" | "non-modal") {
    this.#variant = value;
  }

  readonly #dialogRef = createRef<HTMLDialogElement>();

  protected override updated(changedProperties: PropertyValues) {
    if (changedProperties.has("open")) {
      if (this.open) {
        this.show();
      } else {
        this.close();
      }
    }
  }

  show(options?: { source?: Element }) {
    if (this.variant === "modal") {
      this.#dialogRef.value?.showModal();
    } else {
      this.#dialogRef.value?.togglePopover(
        // @ts-expect-error TS doesn't know about the popover options yet
        { ...options, force: true },
      );
    }
  }

  close() {
    if (this.variant === "modal") {
      this.#dialogRef.value?.close();
    } else {
      this.#dialogRef.value?.togglePopover(false);
    }
  }

  #onTriggerSlotChangeCleanup?: () => void;

  #onTriggerSlotChange(event: Event) {
    this.#onTriggerSlotChangeCleanup?.();

    const target = (event.target as HTMLSlotElement)
      .assignedElements({
        flatten: true,
      })
      .at(0);

    if (target !== undefined) {
      const onClick = () => this.show({ source: target });

      target.addEventListener("click", onClick);

      this.#onTriggerSlotChangeCleanup = () =>
        this.removeEventListener("click", onClick);
    }
  }

  #isBackdropClick(event: MouseEvent) {
    if (this.#dialogRef.value === undefined) {
      return false;
    }

    if (this.#dialogRef.value !== event.target) {
      return false;
    }

    const boundingClientRect = this.#dialogRef.value.getBoundingClientRect();

    return (
      event.clientX < boundingClientRect.left ||
      event.clientX > boundingClientRect.right ||
      event.clientY < boundingClientRect.top ||
      event.clientY > boundingClientRect.bottom
    );
  }

  override render() {
    return html`<slot
        name="trigger"
        @slotchange=${this.#onTriggerSlotChange}
      ></slot>
      <dialog
        ${ref(this.#dialogRef)}
        id="dialog"
        popover=${ifDefined(this.variant === "modal" ? undefined : "auto")}
        @toggle=${(event: ToggleEvent) => {
          this.dispatchEvent(new Event(event.type, event));

          if (event.newState === "closed") {
            this.dispatchEvent(new Event("close", event));
          }
        }}
        @close=${(event: Event) => {
          this.dispatchEvent(new Event(event.type, event));
        }}
        @pointerdown=${(event: MouseEvent) => {
          if (this.variant === "modal" && this.#isBackdropClick(event)) {
            this.#dialogRef.value?.addEventListener(
              "pointerup",
              (event) => {
                if (this.#isBackdropClick(event)) {
                  this.#dialogRef.value?.close();
                }
              },
              { once: true },
            );
          }
        }}
      >
        <header>
          <h2><slot name="title"></slot></h2>
          <button
            id="close-button"
            class="icon"
            popovertarget=${ifDefined(
              this.variant === "modal" ? undefined : "dialog",
            )}
            popovertargetaction=${ifDefined(
              this.variant === "modal" ? undefined : "hide",
            )}
            @click=${() => {
              if (this.variant === "modal") {
                this.close();
              }
            }}
            autofocus
          >
            ${closeIcon({ size: "1rem" })}
          </button>
        </header>
        <div id="content">
          <slot name="content"></slot>
        </div>
        <footer id="footer">
          <slot name="footer"></slot>
        </footer>
      </dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dc-dialog": Dialog;
  }
}
