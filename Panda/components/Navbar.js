import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isModalOpen]);

  const openModal = () => {
    setEmail("");
    setStatus(null);
    setIsModalOpen(true);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      setStatus({ ok: false, msg: "Please enter a valid email address." });
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus({ ok: true, msg: "Subscribed! Check your inbox." });
      toast.success("Subscribed successfully!");
      setEmail("");
      setTimeout(() => setIsModalOpen(false), 1400);
    } catch {
      setStatus({ ok: false, msg: "Something went wrong. Please try again." });
      toast.error("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <nav
      className={`relative row-start-1 self-start w-full shadow-md py-3 px-6 ${styles.mainnav} rounded-xl bg-gradient-to-r from-slate-700 via-slate-800 to-indigo-900 text-slate-100`}
    >
      <ToastContainer position="top-right" autoClose={2000} />

      {/* NAVBAR WRAPPER */}
      <div className="max-w-7xl mx-auto flex items-center justify-between rounded-md">
        {/* LOGO SECTION (always visible) */}
        <div className="flex items-center gap-4">
          <div className="flex-none flex flex-col items-center">
            <div>
              <svg
                className="w-12 h-12 drop-shadow-md transform motion-safe:transition-transform motion-safe:duration-700 hover:scale-105"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="hcLogoTitle"
              >
                <title id="hcLogoTitle">Hunting Coder</title>
                <defs>
                  <linearGradient id="hc-nav-grad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#cbd5e1" />
                    <stop offset="50%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#86b6ff" />
                  </linearGradient>
                  <radialGradient id="hc-nav-glow" cx="50%" cy="20%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <g>
                  <circle cx="50" cy="50" r="34" fill="url(#hc-nav-grad)" />
                </g>
                <g transform="translate(22,24)" className="opacity-95">
                  <path
                    d="M8 60 L8 12 L26 12 L26 22 L18 22 L18 60 Z M36 60 L36 12 L54 12 L54 22 L46 22 L46 60 Z"
                    fill="#0b1220"
                  />
                </g>
                <circle
                  cx="78"
                  cy="22"
                  r="5"
                  fill="url(#hc-nav-glow)"
                  className="motion-safe:animate-pulse"
                />
              </svg>
            </div>
            <div className="mt-1 text-sm font-semibold tracking-tight text-slate-100">
              Hunting Coder
            </div>
          </div>
        </div>

        {/* DESKTOP NAVIGATION (unchanged, hidden on small) */}
        <ul className="hidden md:flex gap-3 items-center">
          <li>
            <a href="/" className="font-medium hover:underline px-2 py-1">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="font-medium hover:underline px-2 py-1">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="font-medium hover:underline px-2 py-1">
              Contact
            </a>
          </li>
          <li>
            <a href="/blog" className="font-medium hover:underline px-2 py-1">
              Blog
            </a>
          </li>
        </ul>

        {/* DESKTOP SUBSCRIBE BUTTON (unchanged, hidden on small) */}
        <div className="hidden md:block">
          <button
            onClick={openModal}
            className="bg-white/90 text-slate-900 px-4 py-2 rounded-md hover:scale-[1.03] transition-transform shadow"
          >
            Subscribe
          </button>
        </div>

        {/* MOBILE MENU ICON (visible only on small screens) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-slate-600/50 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU (optional) */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-slate-800 shadow-lg md:hidden z-50 mt-2 rounded-lg">
          <div className="py-2">
            <Link
              href="/"
              className="block px-4 py-2 hover:bg-slate-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 hover:bg-slate-700"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 hover:bg-slate-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="block px-4 py-2 hover:bg-slate-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                openModal();
              }}
              className="w-full text-left px-4 py-2 hover:bg-slate-700"
            >
              Subscribe
            </button>
          </div>
        </div>
      )}

      {/* MODAL (unchanged) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="subscribeTitle"
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-8 z-50"
          >
            <h2
              id="subscribeTitle"
              className="text-xl font-semibold text-slate-900 mb-3"
            >
              Subscribe to Hunting Coder
            </h2>
            <p className="text-sm text-slate-600 mb-5">
              Enter your email to get the latest vlog and tutorials.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <label className="block text-sm">
                <span className="text-slate-700">Email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 block w-full rounded-md border border-slate-200 px-4 py-3 shadow-inner focus:ring-2 focus:ring-indigo-300 focus:outline-none text-black"
                  placeholder="you@example.com"
                />
              </label>

              <div className="flex items-center justify-between gap-3 flex-wrap">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md text-lg hover:bg-indigo-700 disabled:opacity-60 shadow"
                >
                  {isSubmitting ? "Subscribing…" : "Subscribe"}
                </button>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-md border text-sm"
                >
                  Cancel
                </button>
              </div>

              {status && (
                <div
                  className={`text-sm mt-2 ${
                    status.ok ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {status.msg}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}
