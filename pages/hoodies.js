import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "../components/CartContext";
import Link from "next/link";

export default function Hoodies() {
  const { addToCart } = useCart(); // Changed from addItem to addToCart
  const [feedback, setFeedback] = useState(null);

  const hoodies = [
    {
      id: "h1",
      slug: "dev-hoodie-cotton",  // unique slug
      name: "Developer Hoodie",
      price: 999,
      desc: "Cozy cotton blend with code pattern design.",
      image: "/huddy1.jpg",
      sizes: ["S", "M", "L", "XL"],
      badge: "New"
    },
    {
      id: "h2",
      slug: "tech-comfort-fleece", // unique slug
      name: "Tech Comfort",
      price: 1299,
      desc: "Premium brushed fleece interior.",
      image: "/huddy2.jpg",
      sizes: ["M", "L", "XL"],
      badge: "Hot"
    },
    {
      id: "h3",
      slug: "code-life-daily",    // unique slug
      name: "Code Life",
      price: 899,
      desc: "Lightweight everyday hoodie.",
      image: "/huddy3.jpg",
      sizes: ["S", "M", "L"],
      badge: "Best Seller"
    },
    {
      id: "h4",
      slug: "binary-blend-tech",  // unique slug
      name: "Binary Blend",
      price: 1199,
      desc: "Modern fit with tech-inspired graphics.",
      image: "/huddy4.jpeg",
      sizes: ["S", "M", "L", "XL"],
      badge: "Limited"
    }
  ];

  const handleAddToCart = (hoodie, size) => {
    addToCart({
      id: hoodie.id,
      name: hoodie.name,
      price: hoodie.price,
      size: size,
      qty: 1,
      image: hoodie.image
    });
    setFeedback(`Added ${hoodie.name}`);
    setTimeout(() => setFeedback(null), 2000);
  };

  return (
    <main className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Animation */}
        <div className="text-center mb-12 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-sm font-medium animate-bounce mb-4">
            🔥 Premium Hoodies Collection
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Developer Hoodies
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay cozy while coding with our premium collection of tech-inspired hoodies.
            Crafted for comfort and style.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hoodies.map((hoodie) => (
            <Link 
              key={hoodie.id} 
              href={`/product/hoodie/${hoodie.slug}`} 
              className="block"
            >
              <article 
                className="group bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Image Container */}
                <div className="relative h-64 bg-gradient-to-br from-purple-50 to-white overflow-hidden">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-white text-purple-600 shadow-sm animate-pulse">
                      {hoodie.badge}
                    </span>
                  </div>
                  <Image
                    src={hoodie.image}
                    alt={hoodie.name}
                    fill
                    className="object-cover transform transition duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{hoodie.name}</h3>
                    <span className="text-lg font-bold text-purple-600">₹{hoodie.price}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{hoodie.desc}</p>

                  {/* Sizes */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hoodie.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={(e) => {
                          e.preventDefault(); // Prevent navigation
                          handleAddToCart(hoodie, size);
                        }}
                        className="px-3 py-1 text-sm border border-purple-200 rounded-md hover:bg-purple-50 hover:text-purple-600 transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation
                      handleAddToCart(hoodie, hoodie.sizes[0]);
                    }}
                    className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium transform transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5"
                  >
                    Add to Cart
                  </button>
                </div>

                {/* Bottom Gradient Line */}
                <div className="h-1 w-full bg-gradient-to-r from-purple-200 via-pink-200 to-purple-100" />
              </article>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-white shadow-lg border border-purple-100 transform transition hover:-translate-y-1">
            <div className="text-3xl mb-3">🌟</div>
            <h3 className="font-semibold text-gray-900">Premium Quality</h3>
            <p className="text-sm text-gray-500 mt-2">Crafted with premium materials for lasting comfort</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white shadow-lg border border-purple-100 transform transition hover:-translate-y-1">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-semibold text-gray-900">Unique Designs</h3>
            <p className="text-sm text-gray-500 mt-2">Tech-inspired patterns and modern aesthetics</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white shadow-lg border border-purple-100 transform transition hover:-translate-y-1">
            <div className="text-3xl mb-3">♻️</div>
            <h3 className="font-semibold text-gray-900">Sustainable</h3>
            <p className="text-sm text-gray-500 mt-2">Eco-friendly materials and ethical production</p>
          </div>
        </div>

        {/* Feedback Toast */}
        {feedback && (
          <div className="fixed bottom-6 right-6 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg animate-[slideIn_0.3s_ease-out]">
            ✓ {feedback}
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </main>
  );
}