import { urlFromSvg } from "../utils.js";
import type { InjectedWalletInfo, WalletConfig } from "./types.js";
import type { Wallet } from "@reactive-dot/core/wallets.js";
import { html } from "lit";

export const subWallet: WalletConfig<InjectedWalletInfo> = {
  selector: (wallet: Wallet) => wallet.id === "injected/subwallet-js",
  name: "SubWallet",
  platforms: ["chrome", "firefox", "ios", "android"],
  icon: urlFromSvg(
    html`<svg
      viewBox="0 0 704 704"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_362_8013)">
        <rect
          width="704"
          height="704"
          rx="48"
          fill="url(#paint0_linear_362_8013)"
        />
        <g clip-path="url(#clip1_362_8013)">
          <path
            d="M512 285.599V218.99L245.286 112L192 139.06L192.281 346.38L391.824 426.727L285.251 472.104V437.013L236.324 417.152L192.281 437.967L192.281 564.94L245.333 592L512 471.688V386.345L272 290.283V232L462.417 308.08L512 285.599Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_362_8013"
          x1="352"
          y1="0"
          x2="352"
          y2="704"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#004BFF" />
          <stop offset="1" stop-color="#4CEAAC" />
        </linearGradient>
        <clipPath id="clip0_362_8013">
          <rect width="704" height="704" rx="16" fill="white" />
        </clipPath>
        <clipPath id="clip1_362_8013">
          <rect
            width="320"
            height="480"
            fill="white"
            transform="translate(192 112)"
          />
        </clipPath>
      </defs>
    </svg>`,
  ),
  recommended: true,
  downloadUrl: {
    chrome:
      "https://chrome.google.com/webstore/detail/subwallet-polkadot-extens/onhogfjeacnfoofkfgppdlbmlmnplgbn",
    firefox: "https://addons.mozilla.org/firefox/addon/subwallet",
    default: "https://www.subwallet.app/download.html",
  },
};
