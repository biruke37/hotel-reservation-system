/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hotel: {
          navy: {
            50: "#f0f4f8",
            100: "#d9e2ec",
            200: "#bcccdc",
            300: "#9fb3c8",
            400: "#829ab1",
            500: "#627d98",
            600: "#486581",
            700: "#334e68",
            800: "#243b53",
            900: "#102a43",
            950: "#0a1929",
          },
          gold: {
            50: "#fdf8ef",
            100: "#f9eed9",
            200: "#f2dbb3",
            300: "#e8c27d",
            400: "#d4a853",
            500: "#c9952e",
            600: "#b07a24",
            700: "#925d1f",
            800: "#784b20",
            900: "#633e1d",
          },
          cream: "#faf8f5",
        },
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "hotel-pattern":
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        hotel: "0 25px 50px -12px rgba(16, 42, 67, 0.15)",
        "hotel-lg": "0 32px 64px -12px rgba(16, 42, 67, 0.2)",
      },
    },
  },
  plugins: [],
};
