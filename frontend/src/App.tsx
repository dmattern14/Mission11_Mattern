import { useState } from 'react'
import './App.css'
import ProjectsPage from './pages/ProjectsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DonatePage from './pages/DonatePage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';


function App() {
  const [count, setCount] = useState(0);
  

  return (
    <>
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/donate/:title/:bookId/:price" element={<DonatePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
    </CartProvider>
    
    </>
  );
}

export default App;
