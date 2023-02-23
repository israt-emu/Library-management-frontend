/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--text-color)",
        main: "var(--main-color)",
        second: "var(--secondary-color)",
        fill: "var(--background-color)",
        border: "var(--border-color)",
        outline: "var(--outline-color)",
        grey: "var(--grey-color)",
        link: "var(--link-icon-color)",
        link_hover: "var(--link-hover-color)",
        link_active: "var(--link-active-color)",
        placeholder: "var(--placeholder-text-color)",
        modalBg: "var(--modal-bg-color)",
        sidebar_text: "var(--sidebar-text-color)",
        nav_hover: "var(--nav-icon-hover)",
        content_bg: "var(--content-bg-color)",
      },
    },
  },
  plugins: [],
};
