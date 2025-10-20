<script setup>
import Customiser from './components/Customiser.vue'
</script>

# Theming

## Make it yours

<Customiser />

## Component-level tweaks

Use shadow parts and host selectors for finer control. The connection button exposes a `button` part:

```css
dc-connection-button::part(button) {
  font-size: 0.95rem;
  padding-inline: 1.75rem;
}
```
