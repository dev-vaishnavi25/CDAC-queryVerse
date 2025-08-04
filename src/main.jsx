import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './ApiServices/UserContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
      <UserProvider>
      <ToastContainer position='top-center' autoClose={3000}/>
       <App />
       </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
