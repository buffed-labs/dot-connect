---
"dot-connect": patch
---

Prefer the entire `ReactiveDot.Config` object for the setup function.

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
