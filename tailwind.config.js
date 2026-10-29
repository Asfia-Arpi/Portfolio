/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // EVERGREEN palette — change values here to re-theme the whole site.
        ivory: "#FAFAF5",
        sage: "#E8F0E9",
        mint: "#D1FAE5",
        teal: { DEFAULT: "#108981", dark: "#0B6B65" },
        forest: "#173D32",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Fraunces"', "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(23,61,50,0.18)",
        lift: "0 24px 50px -20px rgba(23,61,50,0.28)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: { floaty: "floaty 6s ease-in-out infinite" },
    },
  },
  plugins: [],
};
