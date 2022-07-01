// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}" , "./src/partials/**/*.{jsx,js}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(236,245,255)",
        main: "rgb(38,62,91)",
        gold: "rgb(254,206,56)",
      },
    },
  },
  plugins: [],
};
