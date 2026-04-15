import { createComponent } from "@lit/react";
import React from "react";

import { PolkadotIdenticon as PolkadotIdenticonElement } from "../polkadot-identicon.js";

export const PolkadotIdenticon = createComponent({
  tagName: "polkadot-identicon",
  elementClass: PolkadotIdenticonElement,
  react: React,
});
