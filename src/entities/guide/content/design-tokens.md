# Design Tokens

Design tokens are the named values that define the visual language of w3-kit. Every color, spacing unit, and surface effect is expressed as a CSS variable, making the system fully overridable without touching component source code.

## Gray Scale

The gray scale runs from `--w3-gray-50` (near white) to `--w3-gray-950` (near black). In light mode these map to light grays; in dark mode the scale inverts automatically.

```css
--w3-gray-50:  #F9FAFB;
--w3-gray-100: #F3F4F6;
--w3-gray-200: #E5E7EB;
--w3-gray-300: #D1D5DB;
--w3-gray-400: #9CA3AF;
--w3-gray-500: #6B7280;
--w3-gray-600: #4B5563;
--w3-gray-700: #374151;
--w3-gray-800: #1F2937;
--w3-gray-900: #111827;
--w3-gray-950: #030712;
```

## Semantic Color Tokens

Semantic tokens give meaning to colors beyond their shade value. Use these in components rather than raw gray values so dark mode works automatically.

```css
--w3-background:         Background of the page
--w3-surface:            Card and panel backgrounds
--w3-surface-elevated:   Slightly raised surface (dropdowns, tooltips)
--w3-border:             Default border color
--w3-border-subtle:      Subtle divider lines
--w3-text-primary:       Primary text color
--w3-text-secondary:     Secondary and muted text
--w3-text-disabled:      Placeholder and disabled text
```

## Accent Tokens

```css
--w3-accent:        #6366F1   /* Primary interactive color */
--w3-accent-hover:  #4F46E5   /* Hover state */
--w3-accent-subtle: #6366F115 /* Background tint */
--w3-accent-border: #6366F133 /* Border tint */
```

## Status Tokens

Used in badges, alerts, and status indicators:

```css
--w3-success:        #10B981
--w3-success-subtle: #10B98115
--w3-warning:        #F59E0B
--w3-warning-subtle: #F59E0B15
--w3-error:          #EF4444
--w3-error-subtle:   #EF444415
--w3-info:           #3B82F6
--w3-info-subtle:    #3B82F615
```

## Glass Effect Tokens

The glass morphism effect used on cards and panels throughout w3-kit:

```css
--w3-glass-bg:     rgba(255, 255, 255, 0.05)
--w3-glass-border: rgba(255, 255, 255, 0.10)
--w3-glass-shadow: 0 4px 24px rgba(0, 0, 0, 0.12)
```

In light mode, these shift to slightly opaque white surfaces with subtle shadows. In dark mode they produce the characteristic frosted glass look.

## Chain Colors

Official brand colors for supported blockchains, used in chain badges and indicators:

```css
--w3-chain-ethereum:  #627EEA
--w3-chain-polygon:   #8247E5
--w3-chain-arbitrum:  #28A0F0
--w3-chain-optimism:  #FF0420
--w3-chain-base:      #0052FF
--w3-chain-solana:    #9945FF
--w3-chain-avalanche: #E84142
--w3-chain-bnb:       #F3BA2F
```

## Spacing Scale

w3-kit uses the standard 4-point spacing scale. Component padding and gaps reference Tailwind utility classes rather than custom tokens, so the spacing scale integrates directly with your Tailwind config.

## Typography Scale

```css
--w3-text-xs:   0.75rem  / 1rem
--w3-text-sm:   0.875rem / 1.25rem
--w3-text-base: 1rem     / 1.5rem
--w3-text-lg:   1.125rem / 1.75rem
--w3-text-xl:   1.25rem  / 1.75rem
--w3-text-2xl:  1.5rem   / 2rem
```

## Using Tokens in Custom Components

Reference tokens directly in your own component styles to stay visually consistent with the rest of the design system:

```tsx
<div
  style={{
    background: "var(--w3-glass-bg)",
    border: "1px solid var(--w3-glass-border)",
    borderRadius: "var(--w3-radius)",
    color: "var(--w3-text-primary)",
  }}
>
  Custom component that matches w3-kit styling
</div>
```

Or with Tailwind using CSS variable references:

```tsx
<div className="rounded-[var(--w3-radius)] border border-[var(--w3-border)]">
  ...
</div>
```
