<script lang="ts" type="module">
import { defineConfig } from "@reactive-dot/core";
import { InjectedWalletProvider } from "@reactive-dot/core/wallets.js";
import { LedgerWallet } from "@reactive-dot/wallet-ledger";
import { MimirWalletProvider } from "@reactive-dot/wallet-mimir";
import { WalletConnect } from "@reactive-dot/wallet-walletconnect";
import { registerDotConnect } from "dot-connect";

const config = defineConfig({
  chains: {},
  wallets: [
    new InjectedWalletProvider(),
    new MimirWalletProvider(),
    new LedgerWallet(),
    new WalletConnect({
      projectId: "6089356d0a4448aeda421a025cc286c9",
      providerOptions: {
        metadata: {
          name: "DOTConnect demo",
          description: "Simple App showcasing DOTConnect",
          url: globalThis.location.origin,
          icons: ["https://walletconnect.com/walletconnect-logo.png"],
        },
      },
      chainIds: [
        "polkadot:91b171bb158e2d3848fa23a9f1c25182", // Polkadot
      ],
    }),
  ],
});

registerDotConnect(config);

export default {
  setup() {},
};
</script>

<template>
  <dc-connection-button></dc-connection-button>
</template>
