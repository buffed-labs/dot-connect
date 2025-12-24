import type { PolkadotIdenticon } from "../polkadot-identicon.js";
import type { DefineCustomElement } from "./define-custom-element.js";

declare module "vue" {
  interface GlobalComponents {
    "polkadot-identicon": DefineCustomElement<PolkadotIdenticon>;
  }
}
