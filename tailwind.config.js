/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        mygreen: "var(--green)",
        myblue: "var(--blue)",
        grey: "var(--grey)",
        myorange: "var(--orange)",
      },
      backgroundSize: {
        "size-200": "200% 200%",
        "size-150": "150% 150%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
    },
  },
  plugins: [],
};
