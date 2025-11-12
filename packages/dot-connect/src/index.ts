import "./elements/connection-button.js";
import "./elements/connection-dialog.js";
import "./elements/polkadot-vault/polkadot-vault-account-scanner-dialog.js";
import "./elements/polkadot-vault/polkadot-vault-signature-scanner-dialog.js";
import { walletsOrProviders$ } from "./stores.js";
import type { Config } from "@reactive-dot/core";
import type { Wallet, WalletProvider } from "@reactive-dot/core/wallets.js";
import type { PolkadotVaultWallet } from "@reactive-dot/wallet-polkadot-vault";
import { html, nothing, render } from "lit";

export { getWalletMetadata } from "./get-wallet-metadata.js";

export type Options = {
  wallets: Array<Wallet | WalletProvider>;
};

export function registerDotConnect(config: Config): void;
/** @deprecated Use `registerDotConnect(config: Config)` instead. */
export function registerDotConnect(options: Options): void;
export function registerDotConnect(config: Config | Options) {
  config.wallets
    ?.filter(
      (wallet): wallet is PolkadotVaultWallet =>
        "id" in wallet && wallet.id === "polkadot-vault",
    )
    .forEach((wallet) => {
      const container = globalThis.document.createElement("div");

      globalThis.document.body.appendChild(container);

      wallet.request$.subscribe((request) => {
        render(nothing, container);
        switch (request?.type) {
          case "account":
            break;
          case "signature":
            render(
              html`<dc-polkadot-vault-signature-scanner-dialog
                .request=${request}
              ></dc-polkadot-vault-signature-scanner-dialog>`,
              container,
            );
            break;
        }
      });
    });

  walletsOrProviders$.next(config.wallets ?? []);
}
