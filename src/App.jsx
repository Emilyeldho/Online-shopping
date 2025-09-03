import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./Pages/ProductList";
import ProductDetail from "./Pages/ProductDetail";
import CartPage from "./Pages/CartPage";
import { CartProvider } from "./Context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
