---
layout: home

hero:
  name: DOTConnect
  text: Wallets connector for Substrate DApps
  image:
    src: /purse.png
    alt: DOTConnect
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/buffed-labs/dot-connect
features:
  - title: Full wallet coverage
    icon: ✨
    details: Injected, hardware, deep link, and WalletConnect wallets all work out of the box when ReactiveDOT supports them.
  - title: Framework friendly
    icon: 🧩
    details: Use the web components directly or drop in the React bindings for the same experience.
  - title: Fast theming
    icon: 🎨
    details: Tweak CSS variables or shadow parts to ship a branded wallet flow within minutes.
---

<script setup>
import Customiser from './components/Customiser.vue'
</script>

## Live playground

Preview exactly what ships while you tweak colors, fonts, and radius.

<Customiser />
