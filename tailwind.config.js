/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      carrot: "#FF6F0F", // 당근 오렌지
      carrotGrayBg: "#F5F5F7", // 페이지 배경
      carrotBorder: "#E4E4E7",
      carrotText: "#222222",
    },
    fontFamily: {
      sans: ["Apple SD Gothic Neo", "Noto Sans KR", "system-ui", "sans-serif"],
    },
  },
};
export const plugins = [];
