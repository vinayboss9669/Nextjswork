// ...existing code...
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import CartSidebar from "./CartSidebar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navItems = [
    { href: "/tshirts", label: "T-Shirts" },
    { href: "/hoodies", label: "Hoodies" },
    { href: "/stickers", label: "Stickers" },
    { href: "/mugs", label: "Mugs" },
  ];

  // Check login status on component mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setShowUserMenu(false);
    window.location.href = '/';
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 relative">
            {/* LEFT: Logo + Brand */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                  <div className="relative w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden shadow-2xl transform transition-transform hover:scale-110 mt-2 flex-shrink-0">
                    <Image
                      src="/image2.png"
                      alt="Brand Logo"
                      width={250}
                      height={80}
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="leading-tight">
                    <span className="block font-extrabold text-lg md:text-xl tracking-tight">
                      Codeswear
                    </span>
                    <span className="hidden md:block text-xs opacity-90 -mt-1">
                      Boutique - Tees & More
                    </span>
                  </div>
              </Link>
              {/* floating promo badge */}
              <div className="ml-3">
                <span className="inline-flex items-center px-3 py-1 bg-yellow-300 text-yellow-900 rounded-full text-xs font-semibold shadow-lg animate-pulse">
                  🚚 Free shipping
                </span>
              </div>
            </div>

            {/* CENTER / DESKTOP NAV */}
            <div className="hidden md:flex md:items-center md:space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-md text-sm font-medium hover:bg-white/20 transition transform hover:-translate-y-0.5"
                >
                  {item.label}
                </Link>
              ))}
            </div>

           {/* RIGHT: Actions */}
                  <div className="flex items-center gap-3">
                    {isLoggedIn ? (
                      <div className="relative user-menu">
                        <button
                          onClick={() => setShowUserMenu(!showUserMenu)}
                          className="hidden md:inline-flex items-center px-3 py-2 bg-white/20 hover:bg-white/30 rounded-md text-sm transition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zM4 20c0-4 4-6 8-6s8 2 8 6v1H4v-1z" />
                          </svg>
                        </button>
                        
                        {/* User Dropdown Menu */}
                        {showUserMenu && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                              {JSON.parse(localStorage.getItem('user'))?.email}
                            </div>
                            <Link 
                              href="/order" 
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              My Orders
                            </Link>
                            <Link 
                              href="/profile" 
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Profile
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              Logout
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href="/login"
                        className="hidden md:inline-flex items-center px-3 py-2 bg-white/20 hover:bg-white/30 rounded-md text-sm transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zM4 20c0-4 4-6 8-6s8 2 8 6v1H4v-1z" />
                        </svg>
                        <span className="hidden lg:inline ml-2">Login</span>
                      </Link>
                    )}

                    <Link
                    href="/cart"
                    onClick={(e) => {
                  e.preventDefault();
                  setCartOpen(true);
                }}
                className="inline-flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-md transition"
              >
                🛒
                <span className="hidden md:inline text-sm font-medium">Cart</span>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-white/20 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {open ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-white/5 backdrop-blur-sm border-t border-white/10 fixed left-0 right-0 top-16 z-40">
            <div className="px-4 py-3 space-y-2 text-black">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/cart"
                onClick={(e) => {
                  e.preventDefault();
                  setCartOpen(true);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition"
              >
                🛒 Cart
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* cart sidebar (no layout changes to navbar) */}
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* spacer so page content doesn't hide under fixed navbar */}
      <div className="h-16 md:h-18"></div>
    </header>
  );
}
// ...existing code...