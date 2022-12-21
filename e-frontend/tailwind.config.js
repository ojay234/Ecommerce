/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        black_bg: "#272727",
        green: "#14A76C",
        coral: "#FF652F",
        light_yellow: "#FFE400",
        gray_bg: "#747474",
        "opaque-black": "rgba(0,0,0,0.35)",
      },
      fontFamily: {
        body: ["Montserrat", "san-serif"],
        head: ["Roboto", "san-serif"],
        font1: ["Darker Grotesque", "san-serif"],
      },
    },
  },
  plugins: [],
};
