/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EEA734",
          100: "#FFFFFF",
          200: "#bfdbfe",
          
          500: "#000000",
          600: "#3A3A3",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        admin: {
          50: "#edf0f5",
          100: "#0e192d",
          150: "#4FD1C5",
          200: "#152543",
          250: "#F7FAFC",
        },
      },
    },
  },
};