import { close as closeIcon } from "../../icons/index.js";
import { DotConnectElement } from "./element.js";
import { css, html, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { createRef, ref } from "lit/directives/ref.js";

@customElement("dc-dialog")
export class Dialog extends DotConnectElement {
  static override styles = [
    super.styles,
    css`
      :host {
        --border-radius: min(1.5rem, var(--max-border-radius));
        --dialog-ease: 0.25s;

        display: contents;
      }

      dialog {
        inline-size: 100dvw;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.32);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: var(--border-radius);
        padding: 0;
        background-color: var(--surface-color);
        opacity: 0;
        translate: 0 0.5rem;
        transition:
          opacity var(--dialog-ease),
          translate var(--dialog-ease),
          overlay var(--dialog-ease) allow-discrete,
          display var(--dialog-ease) allow-discrete;

        @media (min-width: 30rem) {
          inline-size: revert;
          min-inline-size: min(23rem, 100dvw);

          &[popover] {
            min-inline-size: clamp(23rem, anchor-size(inline-size), 100dvw);
          }
        }

        &:is(:popover-open, [open]) {
          opacity: 1;
          translate: 0;

          @starting-style {
            opacity: 0;
            translate: 0 0.5rem;
          }
        }
      }

      dialog[popover] {
        --gap: 0.5rem;

        max-block-size: 100dvh;
        margin: auto auto 0;
        border-radius: var(--border-radius) var(--border-radius) 0 0;

        @media (min-width: 30rem) {
          max-block-size: calc(100dvh - anchor-size(block-size) - var(--gap));
          inset: auto;
          inset-block-start: calc(anchor(outside) + var(--gap));
          inset-inline-start: anchor(inside);
          margin: 0;
          border-radius: var(--border-radius);

          position-try:
            most-height flip-block,
            flip-inline;
        }
      }

      dialog:not([popover]) {
        &::backdrop {
          background-color: rgba(0, 0, 0, 0);
          backdrop-filter: blur(0);
          transition:
            background-color var(--dialog-ease),
            backdrop-filter var(--dialog-ease),
            overlay var(--dialog-ease) allow-discrete,
            display var(--dialog-ease) allow-discrete;
        }

        &[open]::backdrop {
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
        }

        /* https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Nesting_selector#cannot_represent_pseudo-elements */
        @starting-style {
          &[open]::backdrop {
            background-color: rgba(0, 0, 0, 0);
            backdrop-filter: blur(0);
          }
        }
      }

      header {
        position: sticky;
        inset-block-start: 0;

        display: flex;
        align-items: center;
        gap: 1rem;

        padding-block: 1rem;
        padding-inline: 1.2rem;
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
        margin-block: 0 1.2rem;
        margin-inline: 1.2rem;
      }

      footer {
        display: flex;
        color: color-mix(in oklab, currentcolor, transparent 15%);
        font-size: 0.75em;
        position: sticky;
        inset-block-end: 0;
        background-color: var(--surface-color);

        ::slotted(*) {
          flex: 1;
          padding-block: 1rem;
          padding-inline: 1.2rem;
          border-block-start: 0.5px solid var(--outline-color);
        }

        ::slotted(span) {
          display: block;
          text-align: center;
        }
      }
    `,
  ];

  @property({ type: Boolean })
  open = false;

  #variant: "modal" | "non-modal" = "modal";

  @property()
  get variant() {
    // TODO: Remove once anchor positioning is widely supported
    if (!CSS.supports("anchor-name", "--anchor-name")) {
      return "modal";
    }

    // Ensure newer version of Safari, as old versions have a buggy implementation
    if (!CSS.supports("position-try-fallbacks", "flip-x")) {
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

  override render() {
    return html`<slot
        name="trigger"
        @slotchange=${this.#onTriggerSlotChange}
      ></slot>
      <dialog
        ${ref(this.#dialogRef)}
        id="dialog"
        popover=${ifDefined(this.variant === "modal" ? undefined : "auto")}
        closedby=${ifDefined(this.variant === "non-modal" ? undefined : "any")}
        @toggle=${(event: ToggleEvent) => {
          this.dispatchEvent(new Event(event.type, event));

          if (event.newState === "closed") {
            this.dispatchEvent(new Event("close", event));
          }
        }}
        @close=${(event: Event) => {
          this.dispatchEvent(new Event(event.type, event));
        }}
      >
        <header>
          <h2><slot name="title"></slot></h2>
          <button
            id="close-button"
            class="icon"
            commandfor="dialog"
            command=${this.variant === "modal" ? "close" : "hide-popover"}
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
