/** @type {import('tailwindcss').Config} */
export default {
  content: ['*',"./index.html","./src/**/*.{js,ts,jsx,tsx}","*"],
  theme: {
    extend: {colors: {
        'paynes_gray':'#4F6D7A',
        'platinum':'#EAEAEA',
        'dutch_white':'#E8DAB2',
        'burnt_seinna':'#DD6E42',
        'persian_orange':'#D59172',
        'columbia_blue':'#C0D6DF',
        'alice_blue':'#D5E0E5',
        'light_alice_blue':'#E0E5E8',
        'ash_gray':'#9CA496'
      }},
  },
  plugins: [],
}

