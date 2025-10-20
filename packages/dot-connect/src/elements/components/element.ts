import { SignalWatcher } from "@lit-labs/signals";
import { LitElement, css, type CSSResultGroup } from "lit";

export abstract class DotConnectElement extends SignalWatcher(LitElement) {
  static override readonly styles: CSSResultGroup = css`
    * {
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
    }

    :host {
      all: initial;
      color-scheme: inherit;
      font-family: var(--body-font-family);
      color: var(--on-surface-color);
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

    button {
      color: var(--on-primary-color);
      font-weight: 600;
      border: none;
      border-radius: min(999px, var(--max-border-radius));
      background-color: var(--primary-color);
      padding: 0.8em 1.25rem;
      cursor: pointer;
      transition: scale 0.25s;

      &.sm,
      &.xs {
        padding: 0.6em 1.25em;
      }

      &.sm {
        font-size: 0.6rem;
      }

      &.xs {
        font-size: 0.5rem;
      }

      &.text {
        color: var(--primary-color);
        padding-inline-start: 0;
        padding-inline-end: 0;
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

      &.text,
      &.icon {
        background-color: transparent;
      }

      &:hover {
        scale: 1.04;
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
  `;
}
