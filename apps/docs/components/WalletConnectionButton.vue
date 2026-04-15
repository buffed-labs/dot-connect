<script lang="ts" setup>
import { defineClientComponent } from "vitepress";

const WalletConnectionButton = defineClientComponent(() => import("./_WalletConnectionButton.vue"));
</script>

<template>
  <WalletConnectionButton />
</template>
