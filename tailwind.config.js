/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      light: "var(--color-light)",
      lightBlue: "var(--color-light-blue)",
      darkBlue: "var(--color-dark-blue)",
      dark: "var(--color-dark)"
    },
    fontFamily: {
      prompt: ["Prompt", "sans-serif"],
      montserrat: ["Montserrat Alternates", "sans-serif"],
    },
  },
  plugins: [],
}
