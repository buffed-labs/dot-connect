import { html } from "lit";

import type { IconProps } from "./types.js";

export function close({ size = 24 }: IconProps) {
  return html`<svg
    width=${size}
    height=${size}
    viewBox="0 0 29 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke="currentcolor"
  >
    <g>
      <path d="M4.89252 4.23135L24.6915 24.0303" fill="none" data-nofill="true"></path>
      <path d="M24.6915 4.23135L4.89248 24.0303" fill="none" data-nofill="true"></path>
    </g>
  </svg>`;
}
