import React, { useState, useEffect } from "react";
import { useCart } from "../components/CartContext";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export default function Checkout() {
  // All hooks must be declared at the top level
  const { items } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");

  // Calculate totals outside of conditional logic
  const subtotal =
    items?.reduce((total, item) => total + item.price * item.qty, 0) || 0;
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;
  const codFee = paymentMethod === "cod" ? 40 : 0;
  const totalWithFee = total + codFee;

  // Load PayTM script
  useEffect(() => {
    const loadScript = async () => {
      if (window.Paytm && window.Paytm.CheckoutJS) {
        setScriptLoaded(true);
        return;
      }

      try {
        const script = document.createElement("script");
        script.src =
          "https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/" +
          process.env.NEXT_PUBLIC_PAYTM_MID +
          ".js";
        script.async = true;
        script.onload = () => setScriptLoaded(true);
        document.body.appendChild(script);
      } catch (error) {
        console.error("Error loading PayTM script:", error);
      }
    };

    loadScript();

    return () => {
      const script = document.querySelector(
        `script[src*="merchantpgpui/checkoutjs"]`
      );
      if (script) document.body.removeChild(script);
    };
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      if (paymentMethod === "online") {
        await initiatePayment();
      } else {
        // Handle COD logic
        console.log("Processing COD order");
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Separate payment initiation logic
  const initiatePayment = async () => {
    if (!scriptLoaded) {
      throw new Error("Payment system not ready");
    }

    const oid = "OID" + Math.floor(Math.random() * 1000000);
    const data = {
      cart: items,
      subtotal: total,
      oid,
      ...formData,
    };

    const response = await fetch("/api/pretransaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Payment initialization failed");
    }

    // Handle PayTM checkout
    const config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid,
        token: result.body.txnToken,
        tokenType: "TXN_TOKEN",
        amount: total.toString(),
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler called:", eventName, data);
        },
      },
    };

    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.error("Paytm error:", error);
        throw error;
      });
  };

  // Add these functions for payment method selection
  const selectPayment = (method) => {
    setPaymentMethod(method);
  };

  const onKeySelect = (e, method) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectPayment(method);
    }
  };

  // Add the pincode handler function
  const handlePincodeChange = async (e) => {
    const pin = e.target.value;
    setFormData((prev) => ({ ...prev, pincode: pin }));

    if (pin.length === 6) {
      try {
        const res = await fetch("/api/pincode");
        const pincodeData = await res.json();

        if (pincodeData.pincode.includes(pin)) {
          const index = pincodeData.pincode.indexOf(pin);
          setFormData((prev) => ({
            ...prev,
            city: pincodeData.location[index * 3], // First location in the group
            state: pincodeData.location[index * 3 + 1], // Second location in the group
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            city: "",
            state: "",
          }));
          alert("This pincode is not serviceable");
        }
      } catch (error) {
        console.error("Error checking pincode:", error);
      }
    }
  };

  // Render loading state or empty cart message before main content
  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>
            <p className="mt-2 text-gray-600">
              Add some items to proceed with checkout
            </p>
            <Link
              href="/"
              className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-lg"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-screen pt-20">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>

      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4">
        {/* Your existing form JSX */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-[fadeIn_1s_ease-out]">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="animate-[slideInLeft_0.5s_ease-out] lg:max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-pink-100">
              <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group">
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 rounded-lg border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-shadow"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <div className="w-0 group-focus-within:w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300" />
                  </div>

                  <div className="group">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 rounded-lg border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-shadow"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <div className="w-0 group-focus-within:w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300" />
                  </div>
                </div>

                <div className="group">
                  <textarea
                    placeholder="Address"
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-shadow resize-none"
                    required
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                  <div className="w-0 group-focus-within:w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-3 rounded-lg border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-shadow"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    readOnly // Add readonly since it will be populated automatically
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full px-4 py-3 rounded-lg border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-shadow"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    readOnly // Add readonly since it will be populated automatically
                  />
                  <input
                    type="text"
                    placeholder="PIN Code"
                    className="w-full px-4 py-3 rounded-lg border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-shadow"
                    required
                    pattern="[0-9]{6}"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handlePincodeChange}
                  />
                </div>

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-shadow"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />

                <div className="pt-4">
                  <button
                    type="submit"
                    onClick={initiatePayment} // Call payment initiation function
                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Place Order{" "}
                    {paymentMethod === "cod"
                      ? "(Cash on Delivery)"
                      : "(Pay Online)"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="animate-[slideInRight_0.5s_ease-out] lg:max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-pink-100 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4 items-center p-3 rounded-lg bg-pink-50/50"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        Size: {item.size} × {item.qty}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-pink-600">
                        ₹{item.price * item.qty}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm border-t border-pink-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18% GST)</span>
                  <span className="font-medium">₹0</span>
                </div>
                {codFee > 0 && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>COD Fee</span>
                    <span className="font-medium">₹{codFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-pink-100">
                  <span>Total</span>
                  <span className="text-pink-600">₹{totalWithFee}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 space-y-2">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => selectPayment("online")}
                  onKeyDown={(e) => onKeySelect(e, "online")}
                  aria-pressed={paymentMethod === "online"}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    paymentMethod === "online"
                      ? "border-pink-500 bg-pink-50"
                      : "border-pink-100 hover:bg-pink-50"
                  } cursor-pointer transition-colors`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "online"
                        ? "border-pink-500"
                        : "border-gray-300"
                    }`}
                  >
                    <div
                      className={`${
                        paymentMethod === "online"
                          ? "w-3 h-3 rounded-full bg-pink-500"
                          : "w-3 h-3 rounded-full bg-transparent"
                      }`}
                    />
                  </div>
                  <span className="flex-1">Pay Online</span>
                  <span className="text-sm text-gray-500">
                    Cards, UPI, Netbanking
                  </span>
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => selectPayment("cod")}
                  onKeyDown={(e) => onKeySelect(e, "cod")}
                  aria-pressed={paymentMethod === "cod"}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    paymentMethod === "cod"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:bg-gray-50"
                  } cursor-pointer transition-colors`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "cod"
                        ? "border-pink-500"
                        : "border-gray-300"
                    }`}
                  >
                    <div
                      className={`${
                        paymentMethod === "cod"
                          ? "w-3 h-3 rounded-full bg-pink-500"
                          : "w-3 h-3 rounded-full bg-transparent"
                      }`}
                    />
                  </div>
                  <span className="flex-1">Cash on Delivery</span>
                  <span className="text-sm text-gray-500">+ ₹40 COD Fee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}