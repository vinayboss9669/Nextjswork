import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartSidebar({ open, onClose }) {
  const {
    items,
    addToCart,
    removeFromCart: removeItem,
    updateQty,
    clearCart: clear,
    total: subtotal,
  } = useCart();

  // Debug logs
  useEffect(() => {
    console.log("CartSidebar mounted - items:", items);
  }, [items]);

  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  if (!open) return null;

  // Handle quantity updates
  const handleUpdateQty = (id, size, change) => {
    const item = items.find((i) => i.id === id && i.size === size);
    if (!item) return;

    const newQty = item.qty + change;
    if (newQty < 1) {
      removeItem(id, size);
      return;
    }
    updateQty(id, size, newQty);
  };

  return (
    <>
      {/* overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
        aria-hidden="true"
      />

      {/* sidebar */}
      <aside
        role="dialog"
        aria-label="Cart"
        className="fixed right-0 top-0 h-full w-full sm:w-96 z-50 bg-white border-l border-pink-50 shadow-2xl transform transition-transform duration-300"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-pink-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-pink-50 flex items-center justify-center text-pink-600 font-bold">
              🛒
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Your cart</h3>
              <p className="text-xs text-gray-500 -mt-0.5">{items.length} items</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="text-gray-500 hover:text-gray-700 p-2 rounded-md transition"
          >
            ✕
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-220px)]">
          {!items || items.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              Your cart is empty — add some items!
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.size ?? "default"}`}
                className="flex gap-3 items-center mb-4"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-pink-50 flex-shrink-0">
                  <div className="relative w-full h-full">
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-contain p-2"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {item.name}
                  </h4>
                  {item.size && (
                    <p className="text-xs text-gray-500">
                      Size:{" "}
                      <span className="text-pink-600 font-medium">{item.size}</span>
                    </p>
                  )}
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQty(item.id, item.size, -1)}
                        className="w-8 h-8 rounded-md border border-pink-100 text-pink-600 text-sm"
                      >
                        -
                      </button>
                      <div className="min-w-[28px] text-center">{item.qty}</div>
                      <button
                        onClick={() => handleUpdateQty(item.id, item.size, 1)}
                        className="w-8 h-8 rounded-md bg-pink-600 text-white text-sm"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        ₹{item.price * item.qty}
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-xs text-gray-400 hover:text-pink-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-pink-50">
          <div className="flex justify-between text-sm text-gray-600">
            <div>Subtotal</div>
            <div>₹{subtotal}</div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <div>Shipping</div>
            <div>{shipping === 0 ? "Free" : `₹${shipping}`}</div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-xl font-bold text-pink-600">₹{total}</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link href="/checkout" className="w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-pink-600 text-white rounded-md font-medium shadow hover:brightness-105 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline mr-2 mb-1 w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 2L3 6v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z" />
                    <path d="M3 6h18" />
                    <path d="M9 11l2 2 4-4" />
                  </svg>
                  Checkout
                </button>
              </Link>
              <button
                onClick={clear}
                className="px-4 py-2 border border-pink-100 rounded-md text-sm text-pink-600 hover:bg-pink-50 transition"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}