import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiHeart,
  FiPhone,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      try {
        const res = await fetch("http://localhost:5000/api/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setWishlistCount(data.products?.length || 0);
      } catch (err) {
        console.error("Failed to fetch wishlist", err);
      }
    };
    fetchWishlist();
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-pink-400 text-white text-sm flex justify-between px-6 py-2 items-center">
        <div className="flex items-center space-x-2">
          <FiPhone />
          <span>+252 61 4431661</span>
        </div>
        <div className="hidden md:block">
          <span>
            Discover style for every generation |{" "}
            <Link to="" className="underline">
              She & Shine
            </Link>
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-pink-600">
          <h1 className="text-4xl">She & Shine</h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/category/women" className="text-gray-700 hover:text-pink-900">Women</Link>
          <Link to="/category/kids" className="text-gray-700 hover:text-pink-900">Kids</Link>
          <Link to="/new-arrivals" className="text-gray-700 hover:text-pink-900">New Arrivals</Link>
          <Link to="/category/sales" className="text-gray-700 hover:text-pink-900">Sale</Link>
        </nav>

        {/* Icons + Login */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/wishlist" className="relative text-gray-700 hover:text-pink-600 flex items-center space-x-1">
            <FiHeart size={22} />
            <span className="text-sm">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs px-1.5 rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="text-gray-700 hover:text-pink-900">
            <FiShoppingCart size={22} />
          </Link>

          <Link
            to="/login"
            className="ml-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
          <FiMenu size={24} className="text-gray-700" />
        </button>
      </div>

    {/* Mobile Menu */}
{menuOpen && (
  <div className="fixed inset-0 bg-white p-6 flex flex-col items-start space-y-4 z-50 md:hidden">
    <button className="absolute top-4 right-6" onClick={toggleMenu}>
      <FiX size={24} className="text-gray-700" />
    </button>

    <Link to="/category/women" onClick={toggleMenu}>Women</Link>
    <Link to="/category/kids" onClick={toggleMenu}>Kids</Link>
    <Link to="/new-arrivals" onClick={toggleMenu}>New Arrivals</Link>
    <Link to="/category/kids" onClick={toggleMenu}>Sale</Link>
    <Link to="/wishlist" onClick={toggleMenu}>Wishlist</Link>
    <Link to="/cart" onClick={toggleMenu}>Cart</Link>
    <Link to="/login" onClick={toggleMenu}>Login</Link>
  </div>
)}

    </header>
  );
}

export default Header;
