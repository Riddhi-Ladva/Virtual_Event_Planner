// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })
// export default {
//   server: {
//     proxy: {
//       '/api': 'http://localhost:5000', // replace 5000 with your backend port
//     },
//   },
// };

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'src',
  server: {
    proxy: {
      '/api': 'http://localhost:5000' // adjust backend port if needed
    }
  },
  plugins: [react()]
});
