import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const [phone, setPhone] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: fetch cart total
    const fetchTotal = async () => {
      const token = localStorage.getItem("authToken");
      const res = await fetch("https://serverecommerce-tgqs.onrender.com/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const total = data.products?.reduce((acc, item) => acc + item.productId.price * item.quantity, 0) || 0;
      setCartTotal(total);
    };
    fetchTotal();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!phone) return toast.error("Enter phone number");

    try {
      const res = await fetch("https://serverecommerce-tgqs.onrender.com/api/orders/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentMethod: "evc-plus",
          paymentPhone: phone,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Order placed successfully");
        navigate("/order-success");
    } else {
        toast.error(data.message || "Payment failed");
      }
    } catch (err) {
      toast.error("Checkout error");
    }
  };

  return (

    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Phone Number</label>
          <input
            type="tel"
            className="w-full border rounded px-4 py-2"
            placeholder="E.g. +252 61 1 000 000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-green-700"
        >
          Pay with EVC Plus
        </button>
      </form>
    </div>
    
  );
};

export default CheckoutPage;
