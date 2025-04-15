import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,


//   <AuthContextProvider>
//   <CartContextProvider>
//     <App />
//   </CartContextProvider>
// </AuthContextProvider>

<StrictMode>
    <AuthProvider>
      {/* <CartProvider> */}
        <App />
      {/* </CartProvider> */}
    </AuthProvider>
  </StrictMode>
)
