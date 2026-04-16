# Theming

w3-kit uses a CSS variable-based theming system. All colors, radii, and surface effects reference CSS custom properties, so changing the entire visual language of the library is a single CSS block.

## How It Works

The stylesheet shipped with w3-kit (`w3-kit/styles`) declares a set of CSS variables on `:root`. Components read these variables at render time. To customize, override the variables in your own CSS — no JavaScript required.

```css
/* Override in your global stylesheet */
:root {
  --w3-accent: #10B981;        /* Emerald green instead of indigo */
  --w3-radius: 1rem;           /* Rounder corners */
  --w3-font-family: "Geist", system-ui, sans-serif;
}
```

## Core Theme Variables

### Accent Color

The primary interactive color used for buttons, active states, links, and badges.

```css
--w3-accent: #6366F1;          /* Default: indigo-500 */
--w3-accent-hover: #4F46E5;    /* Darker on hover */
--w3-accent-subtle: #6366F115; /* Low-opacity tint for backgrounds */
```

### Radius

Controls the border radius applied to cards, buttons, and input fields:

```css
--w3-radius: 0.75rem;          /* Default: 12px */
--w3-radius-sm: 0.5rem;        /* Small elements */
--w3-radius-lg: 1rem;          /* Large cards */
--w3-radius-full: 9999px;      /* Pills and badges */
```

### Typography

```css
--w3-font-family: "Inter", system-ui, sans-serif;
--w3-font-mono: "JetBrains Mono", ui-monospace, monospace;
```

## Dark Mode

w3-kit supports dark mode via the `data-theme="dark"` attribute or the `prefers-color-scheme` media query. Surface and gray tokens automatically switch when the attribute is present.

```tsx
// Toggle dark mode
document.documentElement.setAttribute("data-theme", "dark");

// Or detect system preference
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
```

The standard Tailwind `dark:` variant also works if you configure `darkMode: "class"` in your Tailwind config.

## Custom Brand Example

Here is a complete theme override for a green-accented, high-contrast brand:

```css
:root {
  --w3-accent: #059669;
  --w3-accent-hover: #047857;
  --w3-accent-subtle: #05966915;

  --w3-radius: 0.5rem;
  --w3-radius-sm: 0.25rem;
  --w3-radius-lg: 0.75rem;

  --w3-font-family: "Geist", system-ui, sans-serif;
}

[data-theme="dark"] {
  --w3-background: #0A0A0A;
  --w3-surface: #111111;
  --w3-surface-elevated: #1A1A1A;
}
```

## Per-Component Overrides

For surgical changes to a single component, scope your override to the component's container:

```css
.my-special-swap-widget {
  --w3-accent: #F59E0B;
}
```

## Integration with Tailwind

If you use Tailwind, you can expose the w3-kit tokens as Tailwind colors in your config:

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        accent: "var(--w3-accent)",
        "accent-hover": "var(--w3-accent-hover)",
      },
    },
  },
};
```

Then use them with standard Tailwind utilities: `text-accent`, `bg-accent`, `border-accent-hover`.

## Figma Design Tokens

The w3-kit design system is maintained in Figma with Token Studio. Design tokens are exported directly to the CSS variables file, keeping the design and implementation in sync.

Download the Figma Community file from the w3-kit design system page to use the tokens in your own design work.
