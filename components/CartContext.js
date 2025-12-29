import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // load persisted cart
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      console.error("Cart load error", e);
    }
  }, []);

  // persist cart
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (e) {
      console.error("Cart save error", e);
    }
  }, [items]);

  // add or merge item
  const addToCart = (product) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (it) => it.id === product.id && (it.size || "") === (product.size || "")
      );
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: (copy[idx].qty || 0) + (product.qty || 1) };
        return copy;
      }
      return [...prev, { ...product, qty: product.qty || 1 }];
    });
  };

  // remove item
  const removeFromCart = (id, size) => {
    setItems((prev) => prev.filter((it) => !(it.id === id && (it.size || "") === (size || ""))));
  };

  // updateQty (id, size, newQty)
  const updateQty = (id, size, newQty) => {
    setItems((prev) =>
      prev
        .map((it) =>
          it.id === id && (it.size || "") === (size || "")
            ? { ...it, qty: Math.max(1, Number(newQty) || 1) }
            : it
        )
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setItems([]);
    try {
      localStorage.removeItem("cart");
    } catch (e) {
      console.error("clear cart error", e);
    }
  };

  const total = items.reduce((s, it) => s + (Number(it.price || 0) * Number(it.qty || 0)), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}