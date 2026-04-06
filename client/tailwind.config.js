/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff4d8d",
        softPink: "#ffe4ec",
        lightPink: "#fff0f5",
        roseSoft: "#ffccd5",
      },
    },
  },
  plugins: [],
};
