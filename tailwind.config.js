/** @type {import('tailwindcss').Config} */
import lineClamp from "@tailwindcss/line-clamp";
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      plugins: [lineClamp],
    },
  },
};
