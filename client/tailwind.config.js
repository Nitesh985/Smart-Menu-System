import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        txtColor: {
          100: "#1d4ed8", //blue 700
          200: "#172554", // blue 950
          300: "#1e40af",
          400: "#fff", // white
        },
        // TODO:Check this out
        bgColor: {
          100: "rgb(var(--fallback-b3, oklch(var(--b3) / var(--tw-bg-opacity, 1))))",
          500: "#16a34a",
        },
      },
      fontFamily: {
        doto: ["Doto", "sans-serif"],
        garamond: {
          fontFamily: ["EB Garamond", "serif"],
          fontOpticalSizing: "auto",
          fontWeight: 500,
          fontStyle: "normal",
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["lofi", "winter", "night", "black", "autumn"],
  },
};
