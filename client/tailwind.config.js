module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandOrange: {
          50: "#ffebde",
          100: "#fdcab4",
          200: "#f7a887",
          300: "#f28659",
          400: "#ed642b",
          500: "#d44a12",
          600: "#a6390d",
          700: "#772808",
          800: "#491701",
          900: "#1f0400",
        },
        brandBlue: "#0265d2",
      },
      boxShadow: {
        brandOrange: "0px 10px 40px -10px",
      },
    },
  },
  plugins: [],
};
