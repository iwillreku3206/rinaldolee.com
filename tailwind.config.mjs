/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      minHeight: {
        "1/2-screen": "50vh",
      },
      minWidth: {
        "4/5": "80%",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
