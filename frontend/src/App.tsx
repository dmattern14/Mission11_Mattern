import { useState } from 'react'
import './App.css'
import ProjectsPage from './pages/ProjectsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DonatePage from './pages/DonatePage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import AdminPage from './pages/AdminPage';


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
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
    </CartProvider>
    
    </>
  );
}

export default App;
