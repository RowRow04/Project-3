/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        danger: colors.red,
        warning: colors.yellow,
        success: colors.green,
        background: "#F7F0E7",
        button: "#4A4E69",
      },
    },
  },
  plugins: [
    require("tailwindcss-animated"),
    require("tw-elements/dist/plugin"),
    ({ addVariant }) => {
      addVariant("child-span", "& > span");
    },
  ],
  corePlugins: {
    preflight: true,
  },
};
