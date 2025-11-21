import { defineConfig } from "vitepress";
import llmstxt from "vitepress-plugin-llms";

export default defineConfig({
  title: "DOTConnect",
  description: "Wallets connector for Substrate DApps",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { property: "og:image", content: "/social-card.png" }],
    ["meta", { property: "twitter:image", content: "/social-card.png" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Unbounded:wght@200..900&display=swap",
        rel: "stylesheet",
      },
    ],
  ],
  themeConfig: {
    logo: { src: "/purse.png", alt: "DOTConnect" },
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/getting-started" },
    ],
    sidebar: [
      { text: "Getting started", link: "/getting-started" },
      { text: "Theming", link: "/theming" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/buffed-labs/dot-connect" },
    ],
  },
  vite: {
    plugins: [llmstxt()],
  },
});
