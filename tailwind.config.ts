import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-1": "#0386d0",
        "blue-2": "#469fd1",
        "gray-1": "#9c9c9c",
        "blue-3": "#043873",
        "blue-4": "#fbc343",
        "blue-5": "#4f9cf9",
        "blue-6": "#4f9cf9",
        
        "green-1": "#00af1f",
        "green-2": "#40d73f",
        "green-3": "#9ecaa7",
        "green-4": "#d6ecd3",
        "yellow-1": "#f0df7b",
        "yellow-2": "#d9bf4e",
        "pink-1": "#ea9a9d",

        "dusty-rose": "#ba6c94",
        "dark-raspberry": "#9a316d",
        "light-pink": "#d8a7be",

        "bright-gold": "#fdb916",
        "light-cream": "#fff1d1",
        "orange-yellow": "#ffa340",
        "light-peach": "#ffe8b1",

        "yellow-green": "#a9cf4f",

        "navy-blue": "#002366",
        "crimson-red": "#DC143C",
        "green-leaf": "#50C878",
        "royal-purple": "#4B0082",
        "electric-blue": "#007FFF",
        "charcoal-black": "#333333",
        "golden-yellow": "#FFD700",
        "magenta": "#FF00FF",
        "teal-green": "#008080",
        "deep-orange": "#FF4500",

        "coral-sunset": "#fa8959",
        "creamy-white": "#faf8f5",
        "pale-blush": "#eee7e1",
        "minty-breeze": "#c5e3d8",
        "lemon-zes": "#d8d427",
        "peachy-keen": "#f9b28b",
        "golden-oak": "#e0a32d",

        "light-gray": "#e8e7e2",
        "snow-white": "#f7f7f7",
        "golden-beige": "#d7b683",
        "sage-green": "#9da898",
        "muted-olive": "#ced2c4",
        "sunshine-yellow": "#eec77c",

        "soft-gray": "#f2f0ef",
        "pale-stone": "#e3e2de",
        "blush-pink": "#ffd4d1",
        "lavendar-mist": "#e1dbff",


      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Add your custom font here
      },
    },
  },
  plugins: [],
};
export default config;
