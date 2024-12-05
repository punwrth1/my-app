// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}', 
    './app/**/*.{js,ts,jsx,tsx}', // Ensure this line is included if you're using the app directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
