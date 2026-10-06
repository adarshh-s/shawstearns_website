import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'lenis/dist/lenis.css'
import './styles/globals.css'
import App from './App.jsx'

// Lets CSS hide scroll-reveal targets only when JS will reveal them.
document.documentElement.classList.add('js')
// We restore scroll ourselves on route changes (behind the transition curtain).
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
