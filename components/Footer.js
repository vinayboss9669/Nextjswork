// ...existing code...
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useState } from 'react';
// import 'react-toastify/dist/ReactToastify.css';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
     
    e.preventDefault();

    const value = email?.trim() || '';
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
    <footer className="bg-white/95 border-t border-pink-50 text-gray-700">
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center gap-3">
              {/* <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-lg transform transition hover:scale-105"> */}
                <Image
                  src="/logo1.webp"
                  alt="Codeswear logo"
                  width={250}
                  height={56}
                  className="object-cover"
                  priority
                />
              {/* </div> */}
              
            </Link>

            <p className="text-sm text-gray-500">
              Handpicked styles with care — light-pink themed store for everyday
              comfort.
            </p>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-semibold shadow animate-pulse">
                🚚 Free Shipping
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-white border border-pink-100 text-pink-500 text-xs shadow">
                🔒 Secure Checkout
              </span>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <Link href="#" aria-label="Twitter" className="text-pink-400 hover:text-pink-600 transition transform hover:-translate-y-0.5">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016 3a4.5 4.5 0 00-4.4 5.5A12.94 12.94 0 013 4s-4 9 5 13a13 13 0 01-7 2c9 5 20 0 20-11.5 0-.2 0-.4-.02-.6A7.72 7.72 0 0023 3z" />
                </svg>
              </Link>
              <Link href="#" aria-label="Instagram" className="text-pink-400 hover:text-pink-600 transition transform hover:-translate-y-0.5">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="#" aria-label="Facebook" className="text-pink-400 hover:text-pink-600 transition transform hover:-translate-y-0.5">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12H21l-1 3h-2v7A10 10 0 0022 12z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Shop</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/tshirts" className="text-gray-600 hover:text-pink-600 transition">T-Shirts</Link>
              <Link href="/hoodies" className="text-gray-600 hover:text-pink-600 transition">Hoodies</Link>
              <Link href="/mugs" className="text-gray-600 hover:text-pink-600 transition">Mugs</Link>
              <Link href="/stickers" className="text-gray-600 hover:text-pink-600 transition">Stickers</Link>
            </nav>
          </div>

          {/* Help & Company */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Help & Company</h4>
            <ul className="text-sm space-y-2 text-gray-600">
              <li><Link href="/contact" className="hover:text-pink-600 transition">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-pink-600 transition">About Us</Link></li>
              <li><Link href="/checkout" className="hover:text-pink-600 transition">Shipping & Returns</Link></li>
              <li><Link href="/order" className="hover:text-pink-600 transition">Order Tracking</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Join our newsletter</h4>
            <p className="text-sm text-gray-500 mb-4">Get 10% off your first order — updates on new drops and sales.</p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@domain.com"
                className="w-full px-3 py-2 rounded-md border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-200 transition"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-md font-medium shadow hover:brightness-105 transition transform hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </form>

            <p className="text-xs text-gray-400 mt-3">We respect your privacy. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="mt-10 border-t border-pink-50 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Codeswear. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:text-pink-600 transition">Terms</Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-pink-600 transition">Privacy</Link>
          </div>
        </div>
      </div>

      {/* subtle floating pink gradient accent */}
      <div className="pointer-events-none fixed right-6 bottom-6 w-36 h-36 rounded-full bg-gradient-to-tr from-pink-50 to-pink-100 opacity-60 blur-3xl animate-pulse" aria-hidden="true" />
    </footer>
  );
}
// ...existing code...