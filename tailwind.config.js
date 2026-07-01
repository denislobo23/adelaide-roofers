/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Derived from real roofing materials, not generic trade-blue:
        ink: "#1B2430", // charcoal Colorbond at dusk
        steel: "#4A6076", // Colorbond bluish steel
        paper: "#FAF8F4", // warm, clean off-white
        mortar: "#E7E2D8", // sandy neutral for borders/cards
        clay: "#BC5B3A", // terracotta tile — the accent
        "clay-deep": "#9C4628",
        trust: "#2E6B52", // muted eucalyptus green for verified ticks
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        wrap: "72rem",
      },
    },
  },
  plugins: [],
};
