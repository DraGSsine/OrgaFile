import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
        "3xl": "1920px",
        sm: "720px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "third-color": "var(--third-color)",
        "dark-primary-color": "var(--dark-primary-color)",
      },
      backgroundColor: {
        "image-color": "var(--image-color)",
        "video-color": "var(--video-color)",
        "audio-color": "var(--audio-color)",
        "document-color": "var(--document-color)",
        "pdf-color": "var(--pdf-color)",
        "xls-color": "var(--xls-color)",
        "ppt-color": "var(--ppt-color)",
        "txt-color": "var(--txt-color)",
        "zip-color": "var(--zip-color)",
        "doc-color": "var(--doc-color)",
        "primary-color": "var(--primary-color)",
        "dark-primary-color": "var(--dark-primary-color)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#0070F0",
            },
          },
        },
      },
    }),
    function ({ addBase }) {
      const newUtil = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(209, 213, 219, 0.5) rgba(0, 0, 0, 0)",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(209, 213, 219, 0.3)",
            borderRadius: "20px",
            border: "1px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(209, 213, 219, 0.3)",
          },
        },
      };
      addBase(newUtil, ["responsive", "hover"]);
    },
  ],
};
export default config;
