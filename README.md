# MIND — React Landing Page

Responsive React/Vite implementation based on the supplied MIND wireframe and image assets.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Structure

- `src/App.jsx`: page structure and content
- `src/styles.css`: layout, responsive breakpoints and motion
- `src/components/Reveal.jsx`: intersection-based entrance animations
- `src/components/Parallax.jsx`: lightweight scroll parallax
- `public/assets`: renamed and organized image assets supplied with the wireframe
- `reference`: original wireframe and Figma HTML export

## Before launch

Replace the placeholder social links/phone number and connect the contact form to a real endpoint (Formspree, Netlify Forms, a custom API, etc.).
