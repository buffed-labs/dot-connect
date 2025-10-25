import type { Wallet } from "@reactive-dot/core/wallets.js";

export type BaseWalletInfo = {
  name: string;
  icon: URL;
};

export type Platform = "chrome" | "firefox" | "ios" | "android";

export type InjectedWalletInfo = BaseWalletInfo & {
  platforms: Platform[];
  recommended?: boolean;
  downloadUrl?:
    | undefined
    | string
    | {
        chrome?: string;
        firefox?: string;
        default?: string;
      }
    | {
        ios?: string;
        android?: string;
      };
};

export type WalletInfo = BaseWalletInfo | InjectedWalletInfo;

export type WalletConfig<TWalletInfo extends BaseWalletInfo> = TWalletInfo & {
  selector: (wallet: Wallet) => boolean;
};
