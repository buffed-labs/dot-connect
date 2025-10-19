import "./elements/connection-button.js";
import "./elements/connection-dialog.js";
import "./elements/ledger/ledger-dialog.js";
import { walletsOrProviders$ } from "./stores.js";
import type { Config } from "@reactive-dot/core";
import type { Wallet, WalletProvider } from "@reactive-dot/core/wallets.js";

export { getWalletMetadata } from "./get-wallet-metadata.js";

export type Options = {
  wallets: Array<Wallet | WalletProvider>;
};

export function registerDotConnect(config: Config): void;
/** @deprecated Use `registerDotConnect(config: Config)` instead. */
export function registerDotConnect(options: Options): void;
export function registerDotConnect(config: Config | Options) {
  walletsOrProviders$.next(config.wallets ?? []);
}
