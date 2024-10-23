/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
module.exports = {
  content: [
    './views/**/*.html', // Monitor HTML files in the views folder
    './public/**/*.js',  // Monitor JS files in the public folder
  ],
  theme: {
    extend: {}, // Extend the default Tailwind theme here
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: ["dark"], 
  },
}