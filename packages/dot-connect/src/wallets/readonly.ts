import { urlFromSvg } from "../utils.js";
import type { BaseWalletInfo, WalletConfig } from "./types.js";
import type { Wallet } from "@reactive-dot/core/wallets.js";
import { html } from "lit";

export const readonly: WalletConfig<BaseWalletInfo> = {
  selector: (wallet: Wallet) => wallet.id === "readonly",
  name: "Watch Only",
  icon: urlFromSvg(
    html`<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentcolor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <style>
        @media (prefers-color-scheme: dark) {
          :root {
            stroke: #fff;
          }
        }
      </style>
      <path
        d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>`,
  ),
};
