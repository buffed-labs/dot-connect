import { bittensor } from "./bittensor.js";
import { ledger } from "./ledger.js";
import { mimir } from "./mimir.js";
import { nova } from "./nova.js";
import { polkadotJs } from "./polkadot-js.js";
import { polkadotVault } from "./polkadot-vault.js";
import { subWallet } from "./subwallet.js";
import { talisman } from "./talisman.js";
import { walletConnect } from "./walletconnect.js";

export const wallets = [
  talisman,
  polkadotJs,
  nova,
  subWallet,
  bittensor,
  ledger,
  polkadotVault,
  walletConnect,
  mimir,
];
