/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#DC143C",
          secondary: {
            DEFAULT: "#FF9C01",
            100: "#FF9001",
            200: "#FF8E01",
          },
          black: {
            DEFAULT: "#000",
            100: "#1E1E2D",
            200: "#232533",
          },
          gray: {
            100: "#CDCDE0",
          },
  
        },
        fontFamily: {
          pthin: ["Poppins-Thin", "sans-serif"],
          pextralight: ["Poppins-ExtraLight", "sans-serif"],
          plight: ["Poppins-Light", "sans-serif"],
          pregular: ["Poppins-Regular", "sans-serif"],
          pmedium: ["Poppins-Medium", "sans-serif"],
          psemibold: ["Poppins-SemiBold", "sans-serif"],
          pbold: ["Poppins-Bold", "sans-serif"],
          pextrabold: ["Poppins-ExtraBold", "sans-serif"],
          pblack: ["Poppins-Black", "sans-serif"],
          sanlight: ["SansitaSwashed-Light", "sans-serif"],
          sanregular: ["SansitaSwashed-Regular", "sans-serif"],
          sanmedium: ["SansitaSwashed-Medium", "sans-serif"],
          sansemibold: ["SansitaSwashed-SemiBold", "sans-serif"],
          sanbold: ["SansitaSwashed-Bold", "sans-serif"],
          sanextrabold: ["SansitaSwashed-ExtraBold", "sans-serif"],
          sanblack: ["SansitaSwashed-Black", "sans-serif"],
          satlight: ["Sansation-Light", "sans-serif"],
          satbold: ["Sansation-Bold", "sans-serif"],
          satregular: ["Sansation-Regular", "sans-serif"],
        },
      },
    },
    plugins: [],
  };
