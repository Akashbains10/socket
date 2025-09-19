import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <>
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 5000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000
        },
      }}
    />
    <App />
  </>
  </StrictMode>,
)
