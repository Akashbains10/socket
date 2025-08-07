import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            // theme: {
            //   primary: 'green',
            //   secondary: 'black',
            // },
          },
        }}
      />
    <App />
  </StrictMode>,
)
