import { urlFromSvg } from "../utils.js";
import type { BaseWalletInfo, WalletConfig } from "./types.js";
import type { Wallet } from "@reactive-dot/core/wallets.js";
import { html } from "lit";

export const polkadotVault: WalletConfig<BaseWalletInfo> = {
  selector: (wallet: Wallet) => wallet.id === "polkadot-vault",
  name: "Polkadot Vault",
  icon: urlFromSvg(
    html`<svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="g2" transform="translate(0,-8)">
        <rect
          y="8"
          width="80"
          height="80"
          rx="40"
          fill="#e6007a"
          id="rect1"
          x="0"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M 40,74.5625 C 54.6701,74.5625 66.5625,62.6701 66.5625,48 66.5625,33.3299 54.6701,21.4375 40,21.4375 25.3299,21.4375 13.4375,33.3299 13.4375,48 13.4375,62.6701 25.3299,74.5625 40,74.5625 Z m 6.8605,-27.4863 c -1.3979,1.7521 -2.798,3.7072 -2.798,5.9486 v 7.2408 c 0,2.2006 -1.7839,3.9844 -3.9844,3.9844 -2.2005,0 -3.9843,-1.7838 -3.9843,-3.9844 v -7.2408 c 0,-2.2414 -1.4001,-4.1965 -2.798,-5.9486 -1.1826,-1.4822 -1.8895,-3.3607 -1.8895,-5.4043 0,-4.7894 3.8825,-8.6719 8.6718,-8.6719 4.7894,0 8.6719,3.8825 8.6719,8.6719 0,2.0436 -0.7069,3.9221 -1.8895,5.4043 z"
          fill="#ffffff"
          id="path1"
        />
      </g>
    </svg>`,
  ),
};
