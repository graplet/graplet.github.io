import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../../main.css'
import { ThemeProvider } from '../../theme.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
