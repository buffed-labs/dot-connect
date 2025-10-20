# Getting Started

Add DOTConnect to a ReactiveDOT app in a few small steps.

## Install packages

1. Create your ReactiveDOT project by following the [official setup guide](https://reactivedot.dev/react/getting-started/setup).
2. Add DOTConnect:

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

3. Install any wallet-specific dependencies you need (Ledger, WalletConnect, etc.) using the [ReactiveDOT guide](https://reactivedot.dev/react/getting-started/connect-wallets#install-optional-dependencies).

## Register DOTConnect

Use the same ReactiveDOT config you already maintain; DOTConnect only needs the highlighted line:

```ts
// ...
// [!code focus]
import { registerDotConnect } from "dot-connect";

// ReactiveDOT config - follow the official guide for your project.
export const config = defineConfig({
  // ...
  wallets: [
    new InjectedWalletProvider(),
    new LedgerWallet(),
    new WalletConnect({
      // ...
    }),
    // ...
  ],
});

// ...

registerDotConnect(config); // [!code focus]
```

`registerDotConnect` creates the custom elements and passes through the wallet config.

## Load fonts once

Import DOTConnect fonts in your global CSS or entry module:

```ts
import "dot-connect/font.css";
```

```css
@import "dot-connect/font.css";
```

## Render the UI

### Web component

```html
<dc-connection-button></dc-connection-button>
```

### React wrapper

```tsx
import { ConnectionButton } from "dot-connect/react.js";

export function App() {
  return <ConnectionButton />;
}
```

## Manually control the dialog

### Vanilla JS

```html
<dc-connection-dialog id="wallet-dialog"></dc-connection-dialog>
<button type="button" onclick="document.getElementById('wallet-dialog').show()">
  Open dialog
</button>
<script>
  const walletDialog = document.getElementById("wallet-dialog");
  // Call walletDialog.close() when you want to hide it again, e.g. on backdrop clicks.
</script>
```

### React

```tsx
import { ConnectionDialog } from "dot-connect/react.js";
import { useState } from "react";

export function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ConnectionDialog open={open} onClose={() => setOpen(false)} />
      <button type="button" onClick={() => setOpen(true)}>
        Open dialog
      </button>
    </>
  );
}
```

## Accounts API

Check the [ReactiveDOT docs](https://reactivedot.dev/react/getting-started/connect-wallets#display-available-accounts) for the latest guidance on listing accounts and reacting to wallet state.
