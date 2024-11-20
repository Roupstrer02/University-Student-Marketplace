/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      // Custom color theme that we can implement. E.g,  
      // {
      //   bright: {
      //     "primary": "#000000",
      //     "secondary": "#ffffff",
      //     "accent": "#8585EB",
      //   },
      //   black: {
      //     "primary": "#fff",
      //     "secondary": "#fff",
      //     "accent": "#8585EB",
      //   },
      // },
      //Default daisyUI themes - https://daisyui.com/docs/themes/
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
};