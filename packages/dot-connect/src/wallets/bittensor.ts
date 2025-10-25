import { urlFromSvg } from "../utils.js";
import type { InjectedWalletInfo, WalletConfig } from "./types.js";
import type { Wallet } from "@reactive-dot/core/wallets.js";
import { html } from "lit";

export const bittensor: WalletConfig<InjectedWalletInfo> = {
  selector: (wallet: Wallet) =>
    wallet.id === "injected/@opentensor/bittensor-extension",
  name: "Bittensor",
  platforms: ["chrome"],
  icon: urlFromSvg(
    html`<svg
      id="a"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 34.44 36.91"
    >
      <style>
        @media (prefers-color-scheme: dark) {
          :root {
            fill: #fff;
          }
        }
      </style>
      <path
        d="M20.88,28.32V13.19c0-3.78-3.12-6.86-6.9-6.86V30.51c0,4.81,4.08,6.4,6.6,6.4,2.09,0,3.27-.36,4.69-1.36-3.98-.42-4.39-2.82-4.39-7.23Z"
      />
      <path
        d="M6.29,0C2.82,0,0,2.87,0,6.34H28.15c3.47,0,6.29-2.87,6.29-6.34H6.29Z"
      />
    </svg>`,
  ),
  downloadUrl: {
    chrome:
      "https://chromewebstore.google.com/detail/bittensor-wallet/bdgmdoedahdcjmpmifafdhnffjinddgc",
    default: "https://bittensor.com/wallet",
  },
};
