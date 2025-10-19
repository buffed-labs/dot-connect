# Getting started

## Installation

### Set up a Reactive DOT application

Start by setting up your Reactive DOT application. Follow the guide [here](https://reactivedot.dev/react/getting-started/setup).

### Add DOTConnect as a dependency

::: code-group

```sh [npm]
npm add dot-connect
```

```sh [yarn]
yarn add dot-connect
```

```sh [pnpm]
pnpm add dot-connect
```

:::

### Install optional dependencies

Install any optional dependencies based on the wallet types you want to support by following this [documentation](https://reactivedot.dev/react/getting-started/connect-wallets#install-optional-dependencies).

## Setup config

Configure your project by adding the following code:

```ts
import { defineConfig } from "@reactive-dot/core";
import { InjectedWalletProvider } from "@reactive-dot/core/wallets.js";
import { LedgerWallet } from "@reactive-dot/wallet-ledger";
import { WalletConnect } from "@reactive-dot/wallet-walletconnect";
import { registerDotConnect } from "dot-connect";

// ...

// More information on how to set up your config: https://reactivedot.dev/react/getting-started/setup#create-config
export const config = defineConfig({
  // ...
  wallets: [
    new InjectedWalletProvider(),
    new LedgerWallet(),
    new WalletConnect({
      projectId: "WALLET_CONNECT_PROJECT_ID",
      providerOptions: {
        metadata: {
          name: "APP_NAME",
          description: "APP_DESCRIPTION",
          url: "APP_URL",
          icons: ["APP_ICON"],
        },
      },
      chainIds: [
        // https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-13.md
        "polkadot:91b171bb158e2d3848fa23a9f1c25182", // Polkadot
      ],
    }),
  ],
});

// Register dot-connect custom elements & configure supported wallets
registerDotConnect(config);
```

## Import required fonts

To import the necessary fonts, use one of the following methods:

```ts
import "dot-connect/font.css";
```

Or

```css
@import "dot-connect/font.css";
```

## Usage

### Add a connection button

Add a connection button to your application using a web component. You can include it in your HTML or JSX.

#### Using HTML

```html
<!-- ... -->
<body>
  <dc-connection-button></dc-connection-button>
</body>
```

#### Using React

```tsx
import { ConnectionButton } from "dot-connect/react.js";

function App() {
  return (
    <div>
      <ConnectionButton />
    </div>
  );
}
```

### Manually trigger the connection dialog

Use the `dc-connection-dialog` element to manually control the connection dialog.

#### With Vanilla JS

Invoke the `show()` and `close()` methods on the dialog element:

```html
<dc-connection-dialog id="connection-dialog"></dc-connection-dialog>
<script>
  const dialog = document.getElementById("connection-dialog");

  dialog.show();
  dialog.close();
</script>
```

#### With React

```tsx
import { ConnectionDialog } from "dot-connect/react.js";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <ConnectionDialog open={open} onClose={() => setOpen(false)} />
      <button onClick={() => setOpen(true)}>Open dialog</button>
    </div>
  );
}
```

## Account management

Access accounts via the Reactive DOT API. For more details and examples, refer to the documentation [here](https://reactivedot.dev/react/getting-started/connect-wallets#display-available-accounts).
