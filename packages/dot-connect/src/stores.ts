import { signal } from "@lit-labs/signals";
import {
  aggregateWallets,
  getAccounts,
  getConnectedWallets,
  initializeWallets,
} from "@reactive-dot/core/internal/actions.js";
import type { Wallet, WalletProvider } from "@reactive-dot/core/wallets.js";
import { BehaviorSubject } from "rxjs";
import { switchMap, tap } from "rxjs/operators";

import { genericChainSpec } from "./consts.js";
import { wallets as rawWalletConfigs } from "./wallets/index.js";

export const walletsOrProviders$ = new BehaviorSubject<Array<Wallet | WalletProvider>>([]);

export const wallets$ = walletsOrProviders$.pipe(
  switchMap(aggregateWallets),
  tap((wallets) => initializeWallets(wallets)),
);

export const connectedWallets$ = getConnectedWallets(wallets$);

export const accounts$ = getAccounts(wallets$, undefined, genericChainSpec);

export const walletConfigs = signal(rawWalletConfigs);
