import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // Add your custom colors here
        txtColor:{
          100:'#1d4ed8', //blue 700
          200: '#172554',// blue 950
          300:"#1e40af",
          400: '#fff' // white
        },

        
      }
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui:{
    themes:["lofi", "winter", "night", "black","autumn"],
  }
}
