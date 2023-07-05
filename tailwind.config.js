/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6E0FF5",
        secondary: "#D0C7E8",
        warning: "#FFA23C",
        success: "#01C6B5",
        danger: "#FF3360",
        "textPrimary": "#211543",
        "textSecondary": "#D0C7E8",
        "textInverted": "#ffffff",
        "bgPrimary": "#ffffff",
        "bgSecondary": "#F9F8FC",
        "bgInverted": "#211543",
      }

    },
  },
  plugins: [],
};
