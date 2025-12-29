import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../components/CartContext";

export default function Stickers() {
  const { addToCart } = useCart(); // Changed from addItem to addToCart
  const [feedback, setFeedback] = useState(null);

  const stickers = [
    {
      id: "s1",
      slug: "dev-stack-pack", // Added slug
      name: "Dev Stack Pack",
      price: 199,
      desc: "Popular programming languages & frameworks",
      image: "/sticker1.webp",
      category: "Tech",
      badge: "Best Seller"
    },
    {
      id: "s2",
      slug: "code-icons-set", // Added slug
      name: "Code Icons Set",
      price: 149,
      desc: "VS Code inspired development icons",
      image: "/sticker2.jpeg",
      category: "Development",
      badge: "New"
    },
    {
      id: "s3",
      slug: "git-commands", // Added slug
      name: "Git Commands",
      price: 179,
      desc: "Essential git commands cheat sheet",
      image: "/sticker3.jpeg",
      category: "Version Control",
      badge: "Hot"
    },
    {
      id: "s4",
      slug: "react-components", // Added slug
      name: "React Components",
      price: 169,
      desc: "React ecosystem sticker collection",
      image: "/sticker4.webp",
      category: "Frontend",
      badge: "Trending"
    }
  ];

  const handleAddToCart = (sticker) => {
    addToCart({
      id: sticker.id,
      name: sticker.name,
      price: sticker.price,
      qty: 1,
      image: sticker.image
    });
    setFeedback(`Added ${sticker.name}`);
    setTimeout(() => setFeedback(null), 2000);
  };

  return (
    <main className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-cyan-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-600 text-sm font-medium animate-bounce mb-4">
            🎨 Express Your Code Style
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Developer Stickers
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Deck out your laptop with our premium developer stickers.
            High-quality vinyl with lasting adhesive.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-6 rounded-full" />

          {/* Floating Elements */}
          <div className="absolute -top-10 left-1/4 w-20 h-20 bg-cyan-300/20 rounded-full blur-2xl animate-blob" />
          <div className="absolute -bottom-10 right-1/4 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl animate-blob animation-delay-2000" />
        </div>

        {/* Stickers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stickers.map((sticker) => (
            <Link 
              href={`/product/stickers/${sticker.slug}`}
              key={sticker.id}
              className="block group"
            >
              <article className="bg-white rounded-2xl shadow-lg border border-cyan-100 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                {/* Image Container */}
                <div className="relative h-64 bg-gradient-to-br from-cyan-50 to-white p-6 flex items-center justify-center">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-white text-cyan-600 shadow-sm animate-pulse">
                      {sticker.badge}
                    </span>
                  </div>
                  <div className="relative w-48 h-48 transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                    <Image
                      src={sticker.image}
                      alt={sticker.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{sticker.name}</h3>
                      <span className="text-xs text-cyan-600 font-medium">
                        {sticker.category}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-cyan-600">₹{sticker.price}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{sticker.desc}</p>

                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation
                      handleAddToCart(sticker);
                    }}
                    className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium transform transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <span>Add to Cart</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                {/* Bottom Gradient Line */}
                <div className="h-1 w-full bg-gradient-to-r from-cyan-200 via-blue-200 to-cyan-100" />
              </article>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-white shadow-lg border border-cyan-100 transform transition hover:-translate-y-1">
            <div className="text-3xl mb-3">💫</div>
            <h3 className="font-semibold text-gray-900">Premium Vinyl</h3>
            <p className="text-sm text-gray-500 mt-2">Durable material that withstands daily use</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white shadow-lg border border-cyan-100 transform transition hover:-translate-y-1">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="font-semibold text-gray-900">Die-Cut Quality</h3>
            <p className="text-sm text-gray-500 mt-2">Precisely cut edges for perfect application</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white shadow-lg border border-cyan-100 transform transition hover:-translate-y-1">
            <div className="text-3xl mb-3">🌈</div>
            <h3 className="font-semibold text-gray-900">Vibrant Colors</h3>
            <p className="text-sm text-gray-500 mt-2">UV-resistant inks for lasting brightness</p>
          </div>
        </div>

        {/* Feedback Toast */}
        {feedback && (
          <div className="fixed bottom-6 right-6 px-4 py-2 bg-cyan-600 text-white rounded-lg shadow-lg animate-[slideIn_0.3s_ease-out]">
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

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </main>
  );
}