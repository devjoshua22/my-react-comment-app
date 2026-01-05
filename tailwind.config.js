/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'cBox':'375px',
        'rBox':'329px',
        'fullBox':'629px',
        'cBoxDesktop':'965px',
        'rBoxDesktop':'580px',
        'inBoxDesktop':'550px',
        'maxim':'1050px'


        
      },
       height: {
        'deskHeight':'170px',
      },
      colors: {
        DarkPurple:{
          600:'hsl(238, 40%, 52%)',
          200: 'hsl(239, 57%, 85%)'
        },
        LazyPink:{
          400: 'hsl(358, 79%, 66%)' ,
          200: 'hsl(357, 100%, 86%)'
        }
      },
       screens: {
        'Xlg':'1200px',
        'lg': '760px', // Add extra small breakpoint
      }
    },
  },
  plugins: [],
}

