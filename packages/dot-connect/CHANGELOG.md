# dot-connect

## 0.25.1

### Patch Changes

- [#419](https://github.com/buffed-labs/dot-connect/pull/419) [`867ee36`](https://github.com/buffed-labs/dot-connect/commit/867ee360428efb1f1facdc0136388f4b41e5616c) Thanks [@tien](https://github.com/tien)! - Fixed possible dangling video stream.

## 0.25.0

### Minor Changes

- [#418](https://github.com/buffed-labs/dot-connect/pull/418) [`4a9e9d7`](https://github.com/buffed-labs/dot-connect/commit/4a9e9d7433db027df73b687f97fc6a58e2b34276) Thanks [@tien](https://github.com/tien)! - Added support for Polkadot Vault.

### Patch Changes

- [#415](https://github.com/buffed-labs/dot-connect/pull/415) [`f43d882`](https://github.com/buffed-labs/dot-connect/commit/f43d8829693dda6cd568726f8a521c48403b8bc4) Thanks [@tien](https://github.com/tien)! - Improved popover fallback performance.

## 0.24.0

### Minor Changes

- [#412](https://github.com/buffed-labs/dot-connect/pull/412) [`1a73945`](https://github.com/buffed-labs/dot-connect/commit/1a739455500651a60044a4ae16438f23051af27c) Thanks [@tien](https://github.com/tien)! - Connection dialog is now non-modal by default and anchored to the connection button.

## 0.23.3

### Patch Changes

- [#406](https://github.com/buffed-labs/dot-connect/pull/406) [`c45ae02`](https://github.com/buffed-labs/dot-connect/commit/c45ae026ceae9f07c83a74e2dd42a099bb088e69) Thanks [@tien](https://github.com/tien)! - Fixed incorrect light-mode button color.

## 0.23.2

### Patch Changes

- [#404](https://github.com/buffed-labs/dot-connect/pull/404) [`a271055`](https://github.com/buffed-labs/dot-connect/commit/a271055277286781ffd8d96a6b11be879cd176c8) Thanks [@tien](https://github.com/tien)! - Improved focus styling & accessibility.

## 0.23.1

### Patch Changes

- [#399](https://github.com/buffed-labs/dot-connect/pull/399) [`c91210d`](https://github.com/buffed-labs/dot-connect/commit/c91210d890e751e862010f44f258835220957162) Thanks [@tien](https://github.com/tien)! - Renamed wallet's "logo" to "icon".

## 0.23.0

### Minor Changes

- [#392](https://github.com/buffed-labs/dot-connect/pull/392) [`24eb3c7`](https://github.com/buffed-labs/dot-connect/commit/24eb3c76ff2e3f96b45cfdf9ac5fc193d8a18513) Thanks [@tien](https://github.com/tien)! - Added "learn more" footer.

## 0.22.3

### Patch Changes

- [#391](https://github.com/buffed-labs/dot-connect/pull/391) [`b747edf`](https://github.com/buffed-labs/dot-connect/commit/b747edf7d5c9ecb8852255af9d9d6d72d7f1679b) Thanks [@tien](https://github.com/tien)! - Prefer the entire `ReactiveDot.Config` object for the setup function.

  ## Before

  ```ts
  export const config = defineConfig({
    // ...
    wallets: [new InjectedWalletProvider()],
  });

  registerDotConnect({
    wallets: config.wallets ?? [],
  });
  ```

  ## After

  ```ts
  export const config = defineConfig({
    // ...
    wallets: [new InjectedWalletProvider()],
  });

  registerDotConnect(config);
  ```

- Updated dependencies [[`e8de38a`](https://github.com/buffed-labs/dot-connect/commit/e8de38a3b9596bcf20862db2b0b80153fa960f94)]:
  - dot-identicon@0.1.6

## 0.22.2

### Patch Changes

- [#375](https://github.com/buffed-labs/dot-connect/pull/375) [`7f0480a`](https://github.com/buffed-labs/dot-connect/commit/7f0480ab93f6211a84ccbecf44fc9c27542c81de) Thanks [@tien](https://github.com/tien)! - Applied `display: inline-flex` to web-component `host`.

- Updated dependencies [[`7f0480a`](https://github.com/buffed-labs/dot-connect/commit/7f0480ab93f6211a84ccbecf44fc9c27542c81de), [`7b79d5c`](https://github.com/buffed-labs/dot-connect/commit/7b79d5ca75e7d8b26b42f6a109e5319365a3879f), [`b1775ca`](https://github.com/buffed-labs/dot-connect/commit/b1775ca0ec6d5ddcaff4d0e29a760095255a60af)]:
  - dot-identicon@0.1.4

## 0.22.1

### Patch Changes

- [#359](https://github.com/buffed-labs/dot-connect/pull/359) [`2e2c486`](https://github.com/buffed-labs/dot-connect/commit/2e2c486eab7763217643fd5e907ff38aac63cf74) Thanks [@tien](https://github.com/tien)! - Fixed incorrect ledger account count.

## 0.22.0

### Minor Changes

- [#353](https://github.com/buffed-labs/dot-connect/pull/353) [`1de6441`](https://github.com/buffed-labs/dot-connect/commit/1de644111dea05001c1ada8898c7441f72d29cf5) Thanks [@tien](https://github.com/tien)! - Updated default fonts.

## 0.21.0

### Minor Changes

- [#350](https://github.com/buffed-labs/dot-connect/pull/350) [`a67bfcd`](https://github.com/buffed-labs/dot-connect/commit/a67bfcd3371f9a2d0cc43a7c64d349a35f844312) Thanks [@tien](https://github.com/tien)! - Updated the wallet identifier for Nova Wallet. Nova Wallet now correctly injects its own wallet instance, eliminating the need for the Polkadot.{js} hack.

### Patch Changes

- [#352](https://github.com/buffed-labs/dot-connect/pull/352) [`092918a`](https://github.com/buffed-labs/dot-connect/commit/092918aacbc58f725bc8f1c79e4e80185677f7a6) Thanks [@tien](https://github.com/tien)! - Bumped dependencies.

- Updated dependencies [[`092918a`](https://github.com/buffed-labs/dot-connect/commit/092918aacbc58f725bc8f1c79e4e80185677f7a6)]:
  - dot-identicon@0.1.3

## 0.20.0

### Minor Changes

- [#348](https://github.com/buffed-labs/dot-connect/pull/348) [`304ab16`](https://github.com/buffed-labs/dot-connect/commit/304ab16b1d3a046683111bfa08a7ecba7335e37b) Thanks [@tien](https://github.com/tien)! - Added support for a dark color scheme for the Bittensor logo.

## 0.19.1

### Patch Changes

- [#346](https://github.com/buffed-labs/dot-connect/pull/346) [`5e8626a`](https://github.com/buffed-labs/dot-connect/commit/5e8626afe838eeeabdd31a25bf1606c2ac204ac4) Thanks [@tien](https://github.com/tien)! - Resolved an issue where certain network accounts were not included in the total count calculation.

## 0.19.0

### Minor Changes

- [#336](https://github.com/buffed-labs/dot-connect/pull/336) [`5779276`](https://github.com/buffed-labs/dot-connect/commit/57792769c97b01bcda8b5398e53210765689ba44) Thanks [@tien](https://github.com/tien)! - Added Bittensor wallet metadata.

### Patch Changes

- [#333](https://github.com/buffed-labs/dot-connect/pull/333) [`af93b0c`](https://github.com/buffed-labs/dot-connect/commit/af93b0c8c0fe23aed67f4e0c0f8df907ca942cf8) Thanks [@tien](https://github.com/tien)! - Replaced Preact with TC39 signals.

- Updated dependencies [[`af93b0c`](https://github.com/buffed-labs/dot-connect/commit/af93b0c8c0fe23aed67f4e0c0f8df907ca942cf8)]:
  - dot-identicon@0.1.2

## 0.18.0

### Minor Changes

- [#313](https://github.com/buffed-labs/dot-connect/pull/313) [`99d8ca4`](https://github.com/buffed-labs/dot-connect/commit/99d8ca420f795b719470ab6cd45bfefff9f6a75e) Thanks [@tien](https://github.com/tien)! - Fixed an issue where the connection button text would sometimes break into two lines.

## 0.17.0

### Minor Changes

- [#310](https://github.com/buffed-labs/dot-connect/pull/310) [`5448cbb`](https://github.com/buffed-labs/dot-connect/commit/5448cbb6c45aea319e2727d9e98e755d0c9569a8) Thanks [@tien](https://github.com/tien)! - Always initialize wallets on usage.

## 0.16.0

### Minor Changes

- [#306](https://github.com/buffed-labs/dot-connect/pull/306) [`a4ef76c`](https://github.com/buffed-labs/dot-connect/commit/a4ef76c775be2b7d7c75126e8401b71270b14764) Thanks [@tien](https://github.com/tien)! - Made button styleable.

### Patch Changes

- [#303](https://github.com/buffed-labs/dot-connect/pull/303) [`b87ee3a`](https://github.com/buffed-labs/dot-connect/commit/b87ee3a43f48b19c6b9f651f0f6d7c8b4df83597) Thanks [@tien](https://github.com/tien)! - Removed unnecessary container elements.

- [#307](https://github.com/buffed-labs/dot-connect/pull/307) [`595b283`](https://github.com/buffed-labs/dot-connect/commit/595b2839ede75059839ddcbcecdb7e75a456409e) Thanks [@tien](https://github.com/tien)! - Removed `display: contents`, allowing custom elements to have margin, padding, etc.

- [#305](https://github.com/buffed-labs/dot-connect/pull/305) [`6eb9c8d`](https://github.com/buffed-labs/dot-connect/commit/6eb9c8db30d2a697fe9b47112d99d47eafd4c62f) Thanks [@tien](https://github.com/tien)! - Made font fallbacks overridable

- Updated dependencies [[`595b283`](https://github.com/buffed-labs/dot-connect/commit/595b2839ede75059839ddcbcecdb7e75a456409e)]:
  - dot-identicon@0.1.1

## 0.15.0

### Minor Changes

- [#289](https://github.com/buffed-labs/dot-connect/pull/289) [`2e1f97c`](https://github.com/buffed-labs/dot-connect/commit/2e1f97c9676e8d14e9e1feaadc0946a4a8b67854) Thanks [@tien](https://github.com/tien)! - Added direct Mimir wallet detection.

## 0.14.2

### Patch Changes

- [#285](https://github.com/buffed-labs/dot-connect/pull/285) [`bf9baa3`](https://github.com/buffed-labs/dot-connect/commit/bf9baa3068c9600d8a23c7f77789e65ba3fb1ac8) Thanks [@tien](https://github.com/tien)! - Fixed Nova Wallet detection.

## 0.14.1

### Patch Changes

- [#270](https://github.com/buffed-labs/dot-connect/pull/270) [`b6e787a`](https://github.com/buffed-labs/dot-connect/commit/b6e787a4c5d662c68a223c14c565245a411fe2dd) Thanks [@tien](https://github.com/tien)! - Fixed accounts state not updating in some cases.

- [#268](https://github.com/buffed-labs/dot-connect/pull/268) [`6109de4`](https://github.com/buffed-labs/dot-connect/commit/6109de48bdc29b33c3d1bd52c0373b17d8c86d3a) Thanks [@tien](https://github.com/tien)! - Fixed an infinite event dispatch loop when adding or removing accounts from Ledger.

## 0.14.0

### Minor Changes

- [#258](https://github.com/buffed-labs/dot-connect/pull/258) [`569d64b`](https://github.com/buffed-labs/dot-connect/commit/569d64bac8a7b44033a86ec9e0786d24f6518a86) Thanks [@tien](https://github.com/tien)! - Added Mimir wallet metadata.

## 0.13.2

### Patch Changes

- [#214](https://github.com/buffed-labs/dot-connect/pull/214) [`d303ff0`](https://github.com/buffed-labs/dot-connect/commit/d303ff0ac07b385eb27beeac08c739f1cfbcbb6d) Thanks [@tien](https://github.com/tien)! - Fixed missing assets in bundle.

## 0.13.1

### Patch Changes

- [#212](https://github.com/buffed-labs/dot-connect/pull/212) [`dcb8215`](https://github.com/buffed-labs/dot-connect/commit/dcb8215d1570284192f1f8386224079719727d32) Thanks [@tien](https://github.com/tien)! - Applied workaround for Vite static asset URL [bug](https://github.com/vitejs/vite/issues/8427).

## 0.13.0

### Minor Changes

- [#209](https://github.com/buffed-labs/dot-connect/pull/209) [`0b1c10b`](https://github.com/buffed-labs/dot-connect/commit/0b1c10bf4cbe03ae21951a7fb8bd739bdd7e0836) Thanks [@tien](https://github.com/tien)! - Added function for getting wallet's metadata.

## 0.12.1

### Patch Changes

- [#195](https://github.com/buffed-labs/dot-connect/pull/195) [`6cb5afb`](https://github.com/buffed-labs/dot-connect/commit/6cb5afb83ebadeb6e6552937d21091d3c1e05015) Thanks [@tien](https://github.com/tien)! - Fixed an issue where Ledger logic was being triggered before the dialog opened.

## 0.12.0

### Minor Changes

- [#183](https://github.com/buffed-labs/dot-connect/pull/183) [`5d1161e`](https://github.com/buffed-labs/dot-connect/commit/5d1161e87a890a89d49032ebe05ea214ce87fe1a) Thanks [@tien](https://github.com/tien)! - Added compatibility with the latest version of ReactiveDOT.

## 0.11.3

### Patch Changes

- [#180](https://github.com/buffed-labs/dot-connect/pull/180) [`a2618ba`](https://github.com/buffed-labs/dot-connect/commit/a2618ba91fc8810743599c3381c9f4d434c2f8d0) Thanks [@tien](https://github.com/tien)! - Fixed unhandled connection errors causing certain test runners to halt unexpectedly.

## 0.11.2

### Patch Changes

- [#167](https://github.com/buffed-labs/dot-connect/pull/167) [`2d3f70f`](https://github.com/buffed-labs/dot-connect/commit/2d3f70fb81e6b35d3da1eb4c08d9df862e70aa01) Thanks [@tien](https://github.com/tien)! - Bumped ReactiveDOT.

## 0.11.1

### Patch Changes

- [#162](https://github.com/buffed-labs/dot-connect/pull/162) [`a70ae51`](https://github.com/buffed-labs/dot-connect/commit/a70ae51158c01989694b21c60990aa16bf18bcee) Thanks [@tien](https://github.com/tien)! - Fixed issue where readonly wallet array are not accepted.

## 0.11.0

### Minor Changes

- [#142](https://github.com/buffed-labs/dot-connect/pull/142) [`065ede4`](https://github.com/buffed-labs/dot-connect/commit/065ede45acd36f510a3fde751d63991ee8a26715) Thanks [@tien](https://github.com/tien)! - Added a button to copy deeplink wallets’ URL.

## 0.10.0

### Minor Changes

- [#105](https://github.com/buffed-labs/dot-connect/pull/105) [`1b24435`](https://github.com/buffed-labs/dot-connect/commit/1b24435fb516c0412b0e45b2ea8a54e00891b842) Thanks [@tien](https://github.com/tien)! - Added Ledger wallet support.

## 0.9.0

### Minor Changes

- [#108](https://github.com/buffed-labs/dot-connect/pull/108) [`665174c`](https://github.com/buffed-labs/dot-connect/commit/665174c276217e0187bba82cf60491b9e276edec) Thanks [@tien](https://github.com/tien)! - Added support for dismissing dialog by clicking on the backdrop.

- [#100](https://github.com/buffed-labs/dot-connect/pull/100) [`3a1d6c8`](https://github.com/buffed-labs/dot-connect/commit/3a1d6c804473ce99013acb384e8e0e035a777c7e) Thanks [@tien](https://github.com/tien)! - BREAKING: removed JSX type extension.

### Patch Changes

- [#104](https://github.com/buffed-labs/dot-connect/pull/104) [`2c1832f`](https://github.com/buffed-labs/dot-connect/commit/2c1832f20b489102e3fd5d6c88d9f1b96571d49c) Thanks [@tien](https://github.com/tien)! - Added support for passing unsupported wallets in the options configuration.

- [#87](https://github.com/buffed-labs/dot-connect/pull/87) [`adb9443`](https://github.com/buffed-labs/dot-connect/commit/adb9443e13184f4ce4b00f5773a6105747228861) Thanks [@tien](https://github.com/tien)! - Retrieve the number of connected accounts directly from the wallet.

## 0.8.1

### Patch Changes

- [#85](https://github.com/buffed-labs/dot-connect/pull/85) [`f67fe30`](https://github.com/buffed-labs/dot-connect/commit/f67fe3084734d9e76b88b92e18ea43a909ca66f0) Thanks [@tien](https://github.com/tien)! - Updated button with improved contrast for dark mode.

## 0.8.0

### Minor Changes

- [#79](https://github.com/buffed-labs/dot-connect/pull/79) [`d4d47be`](https://github.com/buffed-labs/dot-connect/commit/d4d47be4cf23f920d810a0cea61ea802ca2a4adc) Thanks [@tien](https://github.com/tien)! - Changed the default color palette to a more neutral one.

### Patch Changes

- [#83](https://github.com/buffed-labs/dot-connect/pull/83) [`0f89d05`](https://github.com/buffed-labs/dot-connect/commit/0f89d05a1e75c5905d8bc2984d703a712879301d) Thanks [@tien](https://github.com/tien)! - Increased default button padding.

## 0.7.0

### Minor Changes

- [#74](https://github.com/buffed-labs/dot-connect/pull/74) [`2cefdde`](https://github.com/buffed-labs/dot-connect/commit/2cefddee904ec04f2b08adfd5d492a42f007e190) Thanks [@tien](https://github.com/tien)! - Updated hover, reveal, and click interaction to an always-visible button for improved usability, including better support for touch devices.

## 0.6.0

### Minor Changes

- [#23](https://github.com/buffed-labs/dot-connect/pull/23) [`61d071d`](https://github.com/buffed-labs/dot-connect/commit/61d071d20d9c8314b9683defacea53bb8696caa1) Thanks [@tien](https://github.com/tien)! - Add source and declaration maps for improved debugging and type checking.

- [#47](https://github.com/buffed-labs/dot-connect/pull/47) [`51fa8b7`](https://github.com/buffed-labs/dot-connect/commit/51fa8b7e62cd3f48e47db13d6e992758cb2f67e0) Thanks [@tien](https://github.com/tien)! - Added React wrapper components.

## 0.5.0

### Minor Changes

- [#20](https://github.com/buffed-labs/dot-connect/pull/20) [`5fd7b62`](https://github.com/buffed-labs/dot-connect/commit/5fd7b6215b26616c16705a798dd592b3eaf92022) Thanks [@tien](https://github.com/tien)! - Add methods for manually showing and closing the connection dialog.

## 0.4.0

### Minor Changes

- [#14](https://github.com/buffed-labs/dot-connect/pull/14) [`966b35b`](https://github.com/buffed-labs/dot-connect/commit/966b35ba675e1fe39a491a22033cc758e4f999be) Thanks [@tien](https://github.com/tien)! - Display the number of connected accounts for each wallet.

## 0.3.0

### Minor Changes

- [#8](https://github.com/buffed-labs/dot-connect/pull/8) [`641c142`](https://github.com/buffed-labs/dot-connect/commit/641c1426b786bc59827d4cd48536059c493cf7a9) Thanks [@tien](https://github.com/tien)! - Support Reactive DOT version 0.5.0.

### Patch Changes

- [#9](https://github.com/buffed-labs/dot-connect/pull/9) [`37078c9`](https://github.com/buffed-labs/dot-connect/commit/37078c9e3ff563c6eb41e2c2263ea2da030e4eac) Thanks [@tien](https://github.com/tien)! - Check for `WalletConnect` wallet without importing any dependencies.
