// ⚠️ OBS: ändringar här i kräver omstart av dev-servern !!!
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        third: "var(--color-third)",
        sparkle: "var(--color-sparkle)",
        border: "var(--color-border)",
      },
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
