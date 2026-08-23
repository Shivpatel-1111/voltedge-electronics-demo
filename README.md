# VoltEdge Electronics — Premium E-Commerce Website

A static, client-ready website for **VoltEdge Electronics**, a modern
technology and electronics retailer. Built with plain HTML5, Tailwind CSS
(via CDN), custom CSS and vanilla ES6+ JavaScript — no backend, database,
authentication or payment gateway of any kind.

## Design concept

- **Palette:** dark navy (`#0b0f1d` / `#080b14`), electric blue (`#3b6dff`),
  cyan glow accent (`#4fd8ff`), white and light gray — a modern technology
  brand palette with subtle radial gradients and glassmorphism panels.
- **Type:** Space Grotesk (display headings, geometric and technical) paired
  with Inter (body copy and UI). Prices use tabular figures for clean
  alignment.
- **Signature motif:** a recurring "circuit trace" language — glowing gold-
  free blue trace lines under eyebrows, a faint PCB-style grid on dark
  sections, and node-dot dividers — reinforcing the electronics/technology
  identity instead of a generic storefront look.

## File structure

```
voltedge-electronics/
├── index.html            Homepage — hero, flash deals, categories, tabs,
│                          reviews, newsletter
├── products.html          Full catalog — sidebar filters, search, sort
├── product-details.html   Dynamic product page (reads ?id= from the URL)
├── deals.html              All current discounts, sorted by biggest savings
├── contact.html            Contact info, map placeholder, contact form
├── css/
│   ├── style.css          Design tokens, components, circuit motif, glass
│   └── responsive.css     Small-screen refinements & overflow guards
├── js/
│   └── main.js            Product data, cart/wishlist (localStorage demo),
│                          filters/sort/search, quick-view + specs modals,
│                          countdown timer, tabs, form validation
├── assets/
│   ├── images/            (imagery loaded from Unsplash CDN for this demo)
│   ├── icons/              (icons rendered via Lucide, loaded from CDN)
│   └── fonts/               (fonts loaded from Google Fonts CDN)
├── favicon.svg
└── README.md
```

## Features implemented

- Sticky, blurring navigation with search, wishlist, account and cart icons,
  live cart/wishlist badge counts, and an animated mobile hamburger menu
- Hero banner with a glassmorphism product showcase panel
- Flash deals section with a live countdown timer (persists across reloads
  via `localStorage` for a consistent demo experience)
- Nine visual category cards linking into pre-filtered catalog views
- Full product listing page with sidebar filters: category, max-price
  slider, live text search, and sort (price, rating, name)
- Trending / Best Sellers / New Arrivals tabbed section on the homepage
- Product cards with wishlist toggle, "Add to Cart", and a hover Quick View
- **Quick View modal** — fast preview with quantity selector and cart/wishlist
  actions, without leaving the current page
- **Dynamic product-details page** with its own **Full Specifications modal**
  (a second, distinct modal) plus a "You May Also Like" related-products rail
- Customer review cards, animated scroll reveals, and a newsletter form with
  validation and a success state
- Contact page with a validated contact form and success confirmation
- Semantic HTML, meta description, Open Graph tags, SVG favicon, alt text on
  every image, and `loading="lazy"` on below-the-fold imagery

## Notes for going live

- Swap the Unsplash demo photography and generic brand names (Nova, Samtech,
  Orbit, Vantec, Raidon, Sonari, Lumio) for your real product photography and
  supplier catalog.
- Replace the map placeholder with a Google Maps or Mapbox embed and API key.
- Connect the cart, checkout and newsletter/contact forms to a real backend,
  payment processor, and email service — this build is intentionally
  frontend-only, per the static-site requirement.
- Cart and wishlist state is stored in the browser's `localStorage` purely for
  demo continuity across pages; it is not a real order or payment system.

## Testing checklist

- [x] Navigation, search redirect, and category deep-links work across pages
- [x] Mobile menu opens/closes and locks body scroll
- [x] Category, price, search and sort filters return correct live results
- [x] Wishlist and cart counts persist and update across all five pages
- [x] Quick View modal and the separate Full Specifications modal both open,
      trap focus visually, and close via backdrop click, X, or Escape
- [x] Quantity selectors clamp between 1 and 10 on all add-to-cart flows
- [x] Newsletter and contact forms block submission until valid, then show a
      success state
- [x] Flash-deal countdown ticks correctly and persists across reloads
- [x] Layout verified at 320px, 375px, 425px, tablet, laptop and large-desktop
      widths with no horizontal scroll
- [x] No console errors on load
