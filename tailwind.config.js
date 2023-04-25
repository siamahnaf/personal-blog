/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      screens: {
        xxs: "0px", // Double Extra Small Devices
        xs: "360px", // Extra Small Devices
        sm: "480px", // Small Devices
        msm: "576px", // Medium Small Medium Devices
        lsm: "640px", // Large Small Medium Devices
        smd: "768px", // Small Medium Devices
        md: "992px", // Medium Devices
        lg: "1200px", // Large Devices
        xl: "1400px", // Extra Large Devices
      },
      colors: {
        main: "#ff9800",
        dark: "#1B1F3A"
      },
      fontFamily: {
        "sans": ['var(--font-mulish)']
      },
    }
  },
  plugins: []
}

