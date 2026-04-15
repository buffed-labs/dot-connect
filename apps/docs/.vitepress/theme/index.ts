// sort-imports-ignore
import type { Theme } from "vitepress";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import DefaultTheme from "vitepress/theme";

import "dot-connect/font.css";
import "./style.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    enhanceAppWithTabs(app);
  },
} satisfies Theme;
