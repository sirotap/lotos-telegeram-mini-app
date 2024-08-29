/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Change this line from 'media' to 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EEA734",
          // ... other colors ...
        },
        admin: {
          50: "#edf0f5",
          // ... other colors ...
        },
      },
    },
  },
};