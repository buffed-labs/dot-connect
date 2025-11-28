import { SignalWatcher } from "@lit-labs/signals";
import { LitElement, css, type CSSResultGroup } from "lit";

export abstract class DotConnectElement extends SignalWatcher(LitElement) {
  static override readonly styles: CSSResultGroup = css`
    * {
      box-sizing: border-box;

      &:focus-visible {
        outline: 2px solid
          light-dark(
            color-mix(in srgb, var(--primary-color) 75%, transparent),
            color-mix(in srgb, var(--primary-color) 50%, transparent)
          );
        outline-offset: 2px;
      }
    }

    :host([hidden]) {
      display: none;
    }

    :host {
      all: initial;
      color-scheme: inherit;
      font-family: var(--body-font-family);
      color: var(--on-surface-color);

      --headline-font-family: var(
        --dc-headline-font-family,
        Unbounded,
        system-ui,
        sans-serif
      );
      --body-font-family: var(
        --dc-body-font-family,
        Manrope,
        system-ui,
        sans-serif
      );

      --primary-color: var(--dc-primary-color, #ff2670);
      --on-primary-color: var(--dc-on-primary-color, #ffffff);

      --surface-color: var(--dc-surface-color, light-dark(#ffffff, #1e1e1e));
      --on-surface-color: var(
        --dc-on-surface-color,
        light-dark(#000000, #ffffff)
      );

      --surface-container-color: color-mix(
        in srgb,
        var(--on-surface-color),
        transparent 95%
      );

      --outline-color: color-mix(
        in srgb,
        var(--on-surface-color) 25%,
        transparent
      );

      --info-color: var(--dc-info-color, light-dark(#007aff, #0a84ff));
      --success-color: var(--dc-success-color, light-dark(#34c759, #30d158));
      --error-color: var(--dc-error-color, light-dark(#ff3b30, #ff453a));

      --max-border-radius: var(--dc-max-border-radius, 999px);

      /* Firefox */
      @supports (width: -moz-available) {
        --stretch: -moz-available;
      }

      /* Safari */
      @supports (width: -webkit-fill-available) {
        --stretch: -webkit-fill-available;
      }

      /* Chromium */
      @supports (width: stretch) {
        --stretch: stretch;
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: var(--headline-font-family);
      margin: 0;
    }

    a {
      color: var(--primary-color);
      font-weight: bolder;
      text-decoration: none;
      transition: scale 0.25s;

      &:hover {
        scale: 1.04;
      }
    }

    button,
    a.button {
      display: inline-block;
      text-align: center;

      color: var(--on-primary-color);
      font-weight: 600;
      border: none;
      border-radius: min(999px, var(--max-border-radius));
      background-color: var(--primary-color);
      padding: 0.8em 1.25rem;
      cursor: pointer;
      transition: scale 0.25s;

      &[disabled] {
        filter: grayscale(1);
        cursor: not-allowed;
        pointer-events: none;
      }

      &.sm,
      &.xs {
        padding: 0.6em 1.25em;

        &.icon {
          padding: 0.6em;
        }
      }

      &.sm {
        font-size: 0.6rem;
      }

      &.xs {
        font-size: 0.5rem;
      }

      &.text {
        color: var(--primary-color);
      }

      &.info {
        color: var(--info-color);
      }

      &.success {
        color: var(--success-color);
      }

      &.error {
        color: var(--error-color);
      }

      &.info,
      &.success,
      &.error {
        background-color: var(--surface-container-color);
      }

      &.icon {
        display: inline-flex;
        padding: 0.8em;
        color: var(--on-surface-color);
      }

      &.text,
      &.icon {
        background-color: transparent;
      }

      &:hover {
        scale: 1.06;
      }

      &:active {
        scale: 1;
        filter: brightness(1.125);
      }
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    input:focus-visible {
      outline-offset: revert;
    }

    input[type="text"] {
      border: 1px solid var(--outline-color);
      border-radius: min(0.25em, var(--max-border-radius));
      background-color: var(--surface-container-color);
    }

    .center {
      display: grid;
      place-items: center;
    }
  `;
}
