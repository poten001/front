// import plugin from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "neutral-50": "#FAFAFA",
        "neutral-100": "#F5F5F5",
        "neutral-200": "#EEEEEE",
        "neutral-300": "#E1E1E1",
        "neutral-400": "#CACACA",
        "neutral-500": "#8E8E8E",
        "neutral-600": "#4B4B4B",
        "neutral-700": "#1F1F1F",
        "primary-100": "#FFFCF2",
        "primary-200": "#FFF9E2",
        "primary-300": "#FFF5CB",
        "primary-400": "#FFF1B3",
        "primary-500": "#FFEEA4",
        "primary-600": "#FBE587",
        "secondary-100": "#FFEFEB",
        "secondary-200": "#FFDFD8",
        "secondary-300": "#FFC0B0",
        "secondary-400": "#FF9074",
        "secondary-500": "#FF6740",
        "secondary-600": "#FA4214",
        "kakao-btn": "#FEE501",
        "kakao-text": "#262200",
      },
      boxShadow: {
        xs: "0px 1px 2px rgba(16, 24, 40, 0.05)",
        sm: "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
        md: "0px 12px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)",
        lg: "0px 12px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)",
        xl: "0px 10px 28px -4px rgba(16, 24, 40, 0.15), 0px 17px 12px -4px rgba(16, 24, 40, 0.02)",
        "2xl": "0px 24px 36px -12px rgba(16, 24, 40, 0.22)",
        tab: "0px -3px 28px -10px rgba(16, 24, 40, 0.1)",
      },
      fontFamily: {
        pretendard: ["pretendard"],
      },
      // fontSize: {
      //   "body-s": "10px",
      //   "body-m": "14px",
      //   "body-l": ["18px", "150%"],
      //   h1: ["20px", "150%"],
      //   h2: ["18px", "150%"],
      //   h3: ["14px", "150%"],
      //   "btn-s": "14px",
      //   "btn-m": "16px",
      //   "btn-l": "18px",
      // },
    },
  },
  plugins: [
    // plugin(function ({ addUtilities, theme }) {
    //   const newUtilities = {
    //     ".font-body-s": {
    //       fontSize: theme("fontSize.body-s")[0],
    //       fontWeight: theme("fontWeight.normal"),
    //     },
    //     ".font-body-m": {
    //       fontSize: theme("fontSize.body-m")[0],
    //       fontWeight: theme("fontWeight.regular"),
    //     },
    //     ".font-body-l": {
    //       fontSize: theme("fontSize.body-l")[0],
    //       fontWeight: theme("fontWeight.semibold"),
    //     },
    //   };
    //   addUtilities(newUtilities, ["responsive", "hover"]);
    // }),
  ],
};
