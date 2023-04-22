/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1440px",
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      colors: {
        aqua: {
          DEFAULT: "#05bfff75",
        },
        slate: {
          DEFAULT: "#2B3741",
        },
        charcoal: {
          darker: "#2B3236",
          DEFAULT: "#354859",
          lighter: "#4D6775",
        },
        grey: {
          lighter: "#C2C2C2",
          DEFAULT: "#B0B0B0",
          darker: "#6F848F",
        },
        green: {
          DEFAULT: "#26A433",
        },
        blue: {
          lighter: "#00314C",
          DEFAULT: "#3C9DD2",
          darker: "#002235",
        },
        red: {
          DEFAULT: "#ff0000",
        },
        modal: {
          DEFAULT: "#8c8c8c33",
        },
      },
      spacing: {
        12.5: "3.125rem",
        "1/10": "10%",
        "1/8": "12.5%",
        "1/5": "20%",
        "9/20": "45%",
        "11/20": "55%",
        "4/5": "80%",
      },
      fontSize: {
        "2xs": "0.8125rem",
      },
    },
  },
  plugins: [],
};
