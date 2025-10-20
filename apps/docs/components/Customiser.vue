<script lang="ts" type="module">
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";

hljs.registerLanguage("css", css);
</script>

<script lang="ts" setup>
import WalletConnectionButton from "./WalletConnectionButton.vue";
import { ref, computed } from "vue";

const colourScheme = ref<"inherit" | "light" | "dark">("inherit");

const primary = ref("#ff2670");
const onPrimary = ref("#ffffff");

const surface = ref("#ffffff");
const surfaceDark = ref("#1e1e1e");

const onSurface = ref("#000000");
const onSurfaceDark = ref("#ffffff");

const info = ref("#007aff");
const infoDark = ref("#0a84ff");

const success = ref("#34c759");
const successDark = ref("#30d158");

const error = ref("#ff3b30");
const errorDark = ref("#ff453a");

const maxBorderRadius = ref(25);

const style = computed(() => ({
  colorScheme: colourScheme.value,
  "--dc-primary-color": primary.value,
  "--dc-on-primary-color": onPrimary.value,
  "--dc-surface-color": `light-dark(${surface.value}, ${surfaceDark.value})`,
  "--dc-on-surface-color": `light-dark(${onSurface.value}, ${onSurfaceDark.value})`,
  "--dc-info-color": `light-dark(${info.value}, ${infoDark.value})`,
  "--dc-success-color": `light-dark(${success.value}, ${successDark.value})`,
  "--dc-error-color": `light-dark(${error.value}, ${errorDark.value})`,
  "--dc-max-border-radius": maxBorderRadius.value + "px",
  "--dc-headline-font-family": "Unbounded, sans-serif",
  "--dc-body-font-family": "Manrope, sans-serif",
}));

function toCss(style: Record<string, any>) {
  const styles = Object.entries(style)
    .filter(([_, value]) => value !== "inherit")
    .reduce((acc, [key, value]) => {
      const convertedKey = key.replace(/[A-Z]/g, (match) => {
        return `-${match.toLowerCase()}`;
      });

      acc.push(`${convertedKey}: ${value}`);

      return acc;
    }, [] as string[])
    .map((style) => `${style};`)
    .join("\n  ");

  return `:root {
  ${styles}
}`;
}

const cssSnippet = computed(() => toCss(style.value));

const highlightedCss = computed(
  () => hljs.highlight(cssSnippet.value, { language: "css" }).value,
);
</script>

<template>
  <section>
    <form @submit.prevent="">
      <fieldset>
        <legend>Preview</legend>
        <div id="button-container" :style="style">
          <WalletConnectionButton />
        </div>
      </fieldset>
      <div id="options">
        <fieldset>
          <legend>Colour scheme</legend>
          <label
            ><input type="radio" value="inherit" v-model="colourScheme" />
            Inherit
          </label>
          <label
            ><input type="radio" value="light" v-model="colourScheme" />
            Light</label
          >
          <label
            ><input type="radio" value="dark" v-model="colourScheme" />
            Dark</label
          >
        </fieldset>
        <fieldset id="colours-fieldset">
          <legend>Colours</legend>
          <div id="colour-sections">
            <section>
              <label><input type="color" v-model="primary" /> Primary</label>
              <label
                ><input type="color" v-model="onPrimary" /> On-primary</label
              >
            </section>
            <section>
              <label><input type="color" v-model="surface" /> Surface</label>
              <label
                ><input type="color" v-model="surfaceDark" /> Surface
                (Dark)</label
              >
              <label
                ><input type="color" v-model="onSurface" /> On-surface</label
              >
              <label
                ><input type="color" v-model="onSurfaceDark" /> On-surface
                (Dark)</label
              >
            </section>
            <section>
              <label><input type="color" v-model="info" /> Info</label>
              <label
                ><input type="color" v-model="infoDark" /> Info (Dark)</label
              >
              <label><input type="color" v-model="success" /> Success</label>
              <label
                ><input type="color" v-model="successDark" /> Success
                (Dark)</label
              >
              <label><input type="color" v-model="error" /> Error</label>
              <label
                ><input type="color" v-model="errorDark" /> Error (Dark)</label
              >
            </section>
          </div>
        </fieldset>
        <fieldset>
          <legend>Radius</legend>
          <label for="max-border-radius">Maximum border radius</label>
          <input
            id="max-border-radius"
            type="range"
            min="0"
            max="25"
            v-model="maxBorderRadius"
          />
          <div>
            Value:
            <output for="max-border-radius">{{ maxBorderRadius }}px</output>
          </div>
        </fieldset>
      </div>
      <fieldset>
        <legend>CSS</legend>
        <div class="language-css vp-adaptive-theme">
          <pre><code class="language-css" v-html="highlightedCss"></code></pre>
        </div>
      </fieldset>
    </form>
  </section>
</template>

<style>
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

fieldset {
  border: 1px solid var(--vp-c-divider);
  border-radius: 1rem;

  /* Bug with Vue or VitePress */
  padding: 1rem !important;

  @container (max-width: 60rem) {
    flex-basis: 100%;
  }
}

legend {
  font-weight: bold;
}

label {
  display: flex;
  align-items: center;

  input {
    margin-right: 0.75em;
  }

  input[type="color"] {
    margin-right: 0.75em;
  }
}

label + label {
  margin-top: 0.5rem;
}

input[type="color"] {
  all: revert;
}

#button-container {
  padding: 1rem 0;
}

#options {
  container-type: inline-size;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

#colours-fieldset {
  flex: 1;
}

#colour-sections {
  display: flex;
  gap: 1rem;
}

/* Highlight.js GitHub light theme */
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

code.hljs {
  padding: 3px 5px;
}

.hljs {
  color: #24292e;
  background: #ffffff;
}

.hljs-doctag,
.hljs-keyword,
.hljs-meta .hljs-keyword,
.hljs-template-tag,
.hljs-template-variable,
.hljs-type,
.hljs-variable.language_ {
  color: #d73a49;
}

.hljs-title,
.hljs-title.class_,
.hljs-title.class_.inherited__,
.hljs-title.function_ {
  color: #6f42c1;
}

.hljs-attr,
.hljs-attribute,
.hljs-literal,
.hljs-meta,
.hljs-number,
.hljs-operator,
.hljs-selector-attr,
.hljs-selector-class,
.hljs-selector-id,
.hljs-variable {
  color: #005cc5;
}

.hljs-regexp,
.hljs-string,
.hljs-meta .hljs-string {
  color: #032f62;
}

.hljs-built_in,
.hljs-symbol {
  color: #e36209;
}

.hljs-comment,
.hljs-code,
.hljs-formula {
  color: #6a737d;
}

.hljs-name,
.hljs-quote,
.hljs-selector-pseudo,
.hljs-selector-tag {
  color: #22863a;
}

.hljs-subst {
  color: #24292e;
}

.hljs-section {
  color: #005cc5;
  font-weight: bold;
}

.hljs-bullet {
  color: #735c0f;
}

.hljs-emphasis {
  color: #24292e;
  font-style: italic;
}

.hljs-strong {
  color: #24292e;
  font-weight: bold;
}

.hljs-addition {
  color: #22863a;
  background-color: #f0fff4;
}

.hljs-deletion {
  color: #b31d28;
  background-color: #ffeef0;
}

/* Highlight.js GitHub dark overrides */
.dark pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

.dark code.hljs {
  padding: 3px 5px;
}

.dark .hljs {
  color: #c9d1d9;
  background: #0d1117;
}

.dark .hljs-doctag,
.dark .hljs-keyword,
.dark .hljs-meta .hljs-keyword,
.dark .hljs-template-tag,
.dark .hljs-template-variable,
.dark .hljs-type,
.dark .hljs-variable.language_ {
  color: #ff7b72;
}

.dark .hljs-title,
.dark .hljs-title.class_,
.dark .hljs-title.class_.inherited__,
.dark .hljs-title.function_ {
  color: #d2a8ff;
}

.dark .hljs-attr,
.dark .hljs-attribute,
.dark .hljs-literal,
.dark .hljs-meta,
.dark .hljs-number,
.dark .hljs-operator,
.dark .hljs-selector-attr,
.dark .hljs-selector-class,
.dark .hljs-selector-id,
.dark .hljs-variable {
  color: #79c0ff;
}

.dark .hljs-regexp,
.dark .hljs-string,
.dark .hljs-meta .hljs-string {
  color: #a5d6ff;
}

.dark .hljs-built_in,
.dark .hljs-symbol {
  color: #ffa657;
}

.dark .hljs-comment,
.dark .hljs-code,
.dark .hljs-formula {
  color: #8b949e;
}

.dark .hljs-name,
.dark .hljs-quote,
.dark .hljs-selector-pseudo,
.dark .hljs-selector-tag {
  color: #7ee787;
}

.dark .hljs-subst {
  color: #c9d1d9;
}

.dark .hljs-section {
  color: #1f6feb;
  font-weight: bold;
}

.dark .hljs-bullet {
  color: #f2cc60;
}

.dark .hljs-emphasis {
  color: #c9d1d9;
  font-style: italic;
}

.dark .hljs-strong {
  color: #c9d1d9;
  font-weight: bold;
}

.dark .hljs-addition {
  color: #aff5b4;
  background-color: #033a16;
}

.dark .hljs-deletion {
  color: #ffdcd7;
  background-color: #67060c;
}
</style>
