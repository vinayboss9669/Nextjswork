import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const features = [
    { icon: "🚚", title: "Free Shipping", desc: "On orders above ₹999" },
    { icon: "⚡", title: "Instant Delivery", desc: "Within 24-48 hours" },
    { icon: "🔄", title: "Easy Returns", desc: "10-day return policy" },
    { icon: "💳", title: "Secure Payment", desc: "100% secure checkout" },
  ];

  const categories = [
    { name: "T-Shirts", image: "/tshirts.webp", link: "/tshirts", color: "from-blue-500" },
    { name: "Hoodies", image: "/huddy3.jpg", link: "/hoodies", color: "from-purple-500" },
    { name: "Mugs", image: "/mug1.jpg", link: "/mugs", color: "from-pink-500" },
    { name: "Stickers", image: "/sticker1.webp", link: "/stickers", color: "from-orange-500" },
  ];

  const trending = [
    {
      name: "Dev Life Tee",
      price: "₹599",
      image: "/tshirts.webp",
      tag: "New"
    },
    {
      name: "Code Hoodie",
      price: "₹999",
      image: "/huddy1.jpg",
      tag: "Hot"
    },
    {
      name: "Coffee Mug",
      price: "₹349",
      image: "/mug1.jpg",
      tag: "Best Seller"
    },
    {
      name: "Tech Pack",
      price: "₹199",
      image: "/sticker1.webp",
      tag: "Limited"
    }
  ];

  // ensure email is always a string
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();

    // coerce to string to avoid "trim is not a function"
    const value = String(email ?? '').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value || !emailRegex.test(value)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // optional: send to backend
    // fetch('/api/subscribe', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email: value }) });

    toast.success("Thank you for subscribing!");
    setEmail(''); // clear input (controlled)
  };

  return (
    <main className="bg-white overflow-hidden">
      {/* Hero Section with Floating Elements */}
      <section className="relative min-h-[92vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/hero-banner.webp"
            alt="Fashion Banner"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Floating Design Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-pink-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-700" />
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-white space-y-6 animate-[slideIn_1s_ease-out]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-sm font-medium animate-bounce">
              🎉 New Summer Collection
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Discover Your Style
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Wear the Code
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
              Premium clothing for developers and tech enthusiasts.
              Crafted with comfort and style in mind.
            </p>
            <div className="flex gap-4">
              <Link href="/tshirts">
                <button className="group px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-md font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30 hover:-translate-y-0.5">
                  Shop Now
                  <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                </button>
              </Link>
              <Link href="/about">
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-md font-semibold backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-white/20">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid with Enhanced Animation */}
      <section className="py-20 bg-gradient-to-b from-pink-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-xl bg-white shadow-lg border border-pink-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-200/40 group"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="text-4xl mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Link key={i} href={cat.link}>
                <div className="group relative h-96 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent opacity-60 transition-opacity group-hover:opacity-70`} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
                    <p className="text-white/90 text-sm mb-4">Explore Collection</p>
                    <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
                      Shop Now
                      <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500" />
        <div className="absolute inset-0 bg-pattern opacity-10" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Get 10% Off Your First Order</h2>
            <p className="text-xl mb-8 text-pink-100">
              Join our community and receive exclusive offers, new product alerts and styling tips.
            </p>

            <form className="max-w-md mx-auto flex gap-3" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(String(e.target.value || ''))}
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-shadow"
                required
              />
              <button className="px-8 py-4 bg-black hover:bg-gray-900 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-black/30 transform hover:-translate-y-0.5">
                Subscribe
              </button>
            </form>

            <p className="mt-4 text-sm text-pink-200">
              By subscribing you agree to receive marketing updates. Don't worry, we respect your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Trending Products */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mt-2 rounded-full" />
            </div>
            <Link href="/tshirts">
              <button className="group flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium">
                View All
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.map((product, i) => (
              <div key={i} className="group bg-white rounded-2xl p-4 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-64 mb-4 rounded-xl overflow-hidden bg-pink-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <span className="absolute top-2 left-2 px-2 py-1 bg-white/90 rounded-full text-xs font-semibold text-pink-600">
                    {product.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-pink-600">{product.price}</span>
                  <button className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM38.284 0l7.9 7.9-1.415 1.413-9.9-9.9h3.415zM21.657 0l-7.9 7.9 1.415 1.413 9.9-9.9h-3.415zM3.415 0L13.314 9.9 11.9 11.314l-9.9-9.9h1.414zM56.585 0L46.686 9.9l1.415 1.414 9.9-9.9h-1.414zM4.828 5.373L0 10.2V7.373l4.828-4.83v2.83zm50.344 0l4.828 4.83v2.827l-4.828-4.83V5.374zm-5.374 5.373l4.83 4.828h-2.83l-4.828-4.828h2.828zm-39.516 0l-4.83 4.828h2.83l4.828-4.828h-2.828zm22.627 0l4.828 4.828h-2.827L30.83 10.746h2.827zm-5.657 0L22.424 15.574h2.827L30.08 10.746h-2.827zM24.424 15.574L29.253 20.4v2.828l-7.07-7.07h2.24zm15.374 0l-4.828 4.828v-2.827l4.828-4.828v2.827zm-6.657 6.657l-4.828 4.83v-2.83l4.828-4.828v2.828z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
      `}</style>

      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable />
    </main>
  );
}