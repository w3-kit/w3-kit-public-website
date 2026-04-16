# Accessibility

w3-kit components are built to meet WCAG 2.1 AA standards. This page explains the patterns used and how to extend them in your own work.

## Keyboard Navigation

Every interactive element in the library is fully keyboard accessible:

| Key | Behavior |
|-----|----------|
| `Tab` | Move focus to the next interactive element |
| `Shift+Tab` | Move focus to the previous element |
| `Enter` / `Space` | Activate buttons, links, checkboxes |
| `Escape` | Close dialogs, dropdowns, and tooltips |
| `Arrow keys` | Navigate within menus, tab lists, and selects |

### Focus Indicators

Focus rings use the accent color token and maintain a minimum 3:1 contrast ratio against their background:

```css
:focus-visible {
  outline: 2px solid var(--w3-accent);
  outline-offset: 2px;
}
```

Do not suppress focus rings with `outline: none` unless you provide an equivalent custom focus indicator.

## ARIA Patterns

### Dialog / Modal

All dialog components use `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` pointing to the dialog title. Focus is trapped inside the dialog while it is open and restored to the trigger element on close.

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">Connect Wallet</h2>
  ...
</div>
```

### Tabs

Tab components follow the WAI-ARIA Tabs pattern with `role="tablist"`, `role="tab"`, and `role="tabpanel"`. Arrow keys navigate between tabs.

### Comboboxes and Selects

Token selectors and network switchers use the combobox pattern (`role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-activedescendant`) to ensure screen readers announce the currently focused option.

### Live Regions

Transient feedback (transaction submitted, error occurred) uses `role="status"` and `aria-live="polite"` so screen reader users hear announcements without being interrupted mid-task.

```tsx
<div role="status" aria-live="polite" aria-atomic="true">
  {transactionHash ? `Transaction submitted: ${transactionHash}` : ""}
</div>
```

## Color Contrast

The default w3-kit theme meets WCAG AA contrast requirements:

- Normal text on surface backgrounds: ≥ 4.5:1
- Large text (18pt+ or 14pt bold): ≥ 3:1
- UI components and focus indicators: ≥ 3:1

When you override accent or surface colors, verify contrast ratios using a tool like [Accessible Colors](https://accessible-colors.com) or the browser DevTools accessibility panel.

## Status and State Communication

Information is never conveyed by color alone. Status badges always include text labels alongside colored indicators. Error messages appear as text beneath form fields, not just as red borders.

```tsx
/* Incorrect — color only */
<div style={{ borderColor: error ? "red" : "green" }} />

/* Correct — color + text */
<input aria-invalid={!!error} aria-describedby="field-error" />
{error && (
  <p id="field-error" role="alert" style={{ color: "var(--w3-error)" }}>
    {error.message}
  </p>
)}
```

## Form Labels

All form inputs have associated `<label>` elements. Do not rely on `placeholder` text as a substitute for labels — placeholders disappear when the user starts typing.

```tsx
/* Correct */
<label htmlFor="amount">Amount</label>
<input id="amount" type="number" placeholder="0.0" />

/* Incorrect */
<input type="number" placeholder="Amount" />
```

## Images and Icons

Decorative icons (purely visual) use `aria-hidden="true"`. Meaningful icons that convey information include an `aria-label`:

```tsx
/* Decorative */
<ArrowRight aria-hidden="true" />

/* Meaningful */
<AlertTriangle aria-label="Warning: insufficient balance" />
```

NFT images and token logos include descriptive `alt` text:

```tsx
<img src={nft.imageUrl} alt={`${nft.name} — ${nft.collection}`} />
<img src={token.logoURI} alt={`${token.symbol} logo`} />
```

## Testing Accessibility

Run automated checks with [axe-core](https://www.deque.com/axe/) integrated into your test suite:

```bash
npm install --save-dev @axe-core/react
```

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

if (import.meta.env.DEV) {
  const axe = await import("@axe-core/react");
  axe.default(React, ReactDOM, 1000);
}
```

Supplement automated checks with manual keyboard testing and screen reader testing (NVDA/JAWS on Windows, VoiceOver on macOS/iOS).
