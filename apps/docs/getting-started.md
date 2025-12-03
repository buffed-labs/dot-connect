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

:::tabs key:framework
== React

```tsx
import { ConnectionButton } from "dot-connect/react.js";

export function App() {
  return <ConnectionButton />;
}
```

== Vue

```vue
<script lang="ts" setup>
// Import Vue-specific type definitions
import type {} from "dot-connect/vue.js";
</script>

<template>
  <dc-connection-button />
</template>
```

== Vanilla

```html
<dc-connection-button></dc-connection-button>
```

:::

## Manually control the dialog

:::tabs key:framework
== React

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

== Vue

```vue
<script lang="ts" setup>
// Import Vue-specific type definitions
import type {} from "dot-connect/vue.js";
import { ref } from "vue";

const open = ref(false);
</script>

<template>
  <dc-connection-dialog :open="open" @close="open = false" />
  <button type="button" @click="open = true">Open dialog</button>
</template>
```

== Vanilla

```html
<dc-connection-dialog id="wallet-dialog"></dc-connection-dialog>
<button type="button" onclick="document.getElementById('wallet-dialog').show()">
  Open dialog
</button>
<script>
  const walletDialog = document.getElementById("wallet-dialog");
  // Call walletDialog.close() when you want to hide it again.
</script>
```

:::

## Getting connected accounts

:::tabs key:framework
== React
Check the [ReactiveDOT docs](https://reactivedot.dev/react/getting-started/connect-wallets#display-available-accounts) for the latest guidance on listing accounts and reacting to wallet state.

== Vue
Check the [ReactiveDOT docs](https://reactivedot.dev/vue/getting-started/connect-wallets#display-available-accounts) for the latest guidance on listing accounts and reacting to wallet state.

== Vanilla

```ts
import { whenAccountsChanged } from "@reactive-dot/core";

whenAccountsChanged(config).subscribe((accounts) => {
  console.log(accounts);
});
```

:::
