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
