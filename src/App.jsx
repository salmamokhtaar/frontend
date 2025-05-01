import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";
import WishlistPage from "./pages/WishlistPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NewArrivalsGrid from "./components/NewArrivalsGrid";
import CategoriesPage from "./pages/CategoriesPage";

function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/new-arrivals" element={<NewArrivalsGrid />} />
        <Route path="/category" element={<CategoriesPage />} />
        <Route path="/category/:categoryName" element={<CategoriesPage />} />


      </Routes>

      {/* Add Toastify container */}
      <ToastContainer position="bottom-left" autoClose={3000} />
      <Footer/>
    </>
  );
}

export default App;
