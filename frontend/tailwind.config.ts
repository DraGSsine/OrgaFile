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
        "primary-forground-color": "var(--primary-forground-color)",
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
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
        17: "repeat(17, minmax(0, 1fr))",
        18: "repeat(18, minmax(0, 1fr))",
        19: "repeat(19, minmax(0, 1fr))",
        20: "repeat(20, minmax(0, 1fr))",
        21: "repeat(21, minmax(0, 1fr))",
        22: "repeat(22, minmax(0, 1fr))",
        23: "repeat(23, minmax(0, 1fr))",
        24: "repeat(24, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        16: "repeat(16, minmax(0, 1fr))",
        17: "repeat(17, minmax(0, 1fr))",
        18: "repeat(18, minmax(0, 1fr))",
        19: "repeat(19, minmax(0, 1fr))",
        20: "repeat(20, minmax(0, 1fr))",
        21: "repeat(21, minmax(0, 1fr))",
        22: "repeat(22, minmax(0, 1fr))",
        23: "repeat(23, minmax(0, 1fr))",
        24: "repeat(24, minmax(0, 1fr))",
      },
      gridColumnStart: {
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
        18: "18",
        19: "19",
        20: "20",
        21: "21",
        22: "22",
        23: "23",
        24: "24",
      },
      gridColumnEnd: {
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
        18: "18",
        19: "19",
        20: "20",
        21: "21",
        22: "22",
        23: "23",
        24: "24",
        25: "25",
      },
      gridRowStart: {
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
        18: "18",
        19: "19",
        20: "20",
        21: "21",
        22: "22",
        23: "23",
        24: "24",
      },
      gridRowEnd: {
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
        18: "18",
        19: "19",
        20: "20",
        21: "21",
        22: "22",
        23: "23",
        24: "24",
        25: "25",
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
              DEFAULT: "#0164ff",
            },
          },
        },
      },
    }),
    function ({ addBase }: { addBase: any }) {
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
