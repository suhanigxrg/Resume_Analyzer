export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#16a34a",
        soft: "#f3f4f6",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.05)",
        hover: "0 10px 30px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
}