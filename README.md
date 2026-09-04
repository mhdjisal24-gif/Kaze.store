# CASE STORE

A minimal, mobile-friendly online store for shoes, watches and accessories.

## Features
- Product grid and category filters
- Search
- Shopping cart
- Customer checkout form
- One-click WhatsApp ordering with the complete order details
- Responsive mobile/desktop design
- No database required for the basic WhatsApp-order workflow

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL.

## Change the WhatsApp number

Open `src/main.jsx` and change:

```js
const WHATSAPP_NUMBER = "919876543210";
```

Use your full WhatsApp number with country code, without `+`, spaces or dashes.

Example for an Indian number:
`919876543210`

## Add your own products

Edit the `products` array in `src/main.jsx`.

For production, replace the demo Unsplash image URLs with your own product images.

## Deploy to Vercel

Push this folder to GitHub, import the repository into Vercel, and use the default Vite build settings:
- Build command: `npm run build`
- Output directory: `dist`
