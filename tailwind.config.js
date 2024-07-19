/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fredericka: ['"Fredericka the Great"', "cursive"], // Adding custom font
      },
    },
  },
  plugins: [],
};
