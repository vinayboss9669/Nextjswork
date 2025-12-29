// ...existing code...
import React from 'react';

export default function Footer() {
  return (
    <footer aria-label="Hunting Coder footer" className="bg-gradient-to-r from-sky-800 via-indigo-900 to-purple-800 text-sky-50">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
        {/* Brand */}
        <div className="flex items-center gap-4 md:gap-5 flex-1">
          <div className="flex-none">
            <svg
              className="w-16 h-16 drop-shadow-lg transform motion-safe:transition-transform motion-safe:duration-700 hover:scale-105"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="hcLogoTitle"
            >
              <title id="hcLogoTitle">Hunting Coder</title>
              <defs>
                <linearGradient id="hc-grad" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ff6b6b" />
                  <stop offset="50%" stopColor="#ffd93d" />
                  <stop offset="100%" stopColor="#6bffd9" />
                </linearGradient>
                <radialGradient id="hc-glow" cx="50%" cy="25%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
              </defs>

              <g className="motion-safe:animate-bounce">
                <circle cx="50" cy="50" r="36" fill="url(#hc-grad)" />
              </g>

              <g transform="translate(20,22)" className="opacity-90">
                <path d="M8 60 L8 12 L26 12 L26 22 L18 22 L18 60 Z M36 60 L36 12 L54 12 L54 22 L46 22 L46 60 Z" fill="#041025" />
              </g>

              <circle cx="78" cy="22" r="6" fill="url(#hc-glow)" className="motion-safe:animate-pulse" />
            </svg>
          </div>

          <div>
            <div className="text-lg font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-teal-200">
              Hunting Coder
            </div>
            <div className="text-sm text-sky-100/80">vlog · tutorials · code hunts</div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-8">
          <nav className="flex gap-4 md:gap-6 flex-wrap">
            <a href="/" className="text-sm md:text-base px-3 py-2 rounded-lg hover:bg-white/6 transition">Home</a>
            <a href="/about" className="text-sm md:text-base px-3 py-2 rounded-lg hover:bg-white/6 transition">About</a>
            <a href="/blog" className="text-sm md:text-base px-3 py-2 rounded-lg hover:bg-white/6 transition">Blog</a>
            <a href="/contact" className="text-sm md:text-base px-3 py-2 rounded-lg hover:bg-white/6 transition">Contact</a>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-2">
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="w-9 h-9 grid place-items-center rounded-lg bg-white/6 hover:bg-white/10 transition"
              target="_blank"
              rel="noreferrer"
            >
              <svg className="w-4 h-4 text-sky-50" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 5.9c-.6.3-1.2.5-1.9.6.7-.4 1.2-1.1 1.4-1.9-.7.4-1.5.7-2.3.9C18.2 4.8 17.2 4 16 4c-1.9 0-3.4 1.6-3.4 3.5 0 .3 0 .7.1 1C9.6 8.4 6.5 6.7 4.5 4c-.3.5-.4 1-.4 1.7 0 1.2.6 2.3 1.6 2.9-.5 0-1-.2-1.4-.4v.1C4.7 11.4 6.5 13 8.8 13c-.4.1-.8.1-1.2.1-.3 0-.6 0-.9-.1.6 1.8 2.3 3.1 4.3 3.1-1.6 1.2-3.6 1.9-5.7 1.9H4c2.1 1.4 4.6 2.2 7.2 2.2 8.6 0 13.3-7.1 13.3-13.2v-.6c.9-.7 1.6-1.6 2.2-2.6-.8.4-1.6.7-2.4.8z"/></svg>
            </a>

            <a
              href="https://github.com"
              aria-label="GitHub"
              className="w-9 h-9 grid place-items-center rounded-lg bg-white/6 hover:bg-white/10 transition"
              target="_blank"
              rel="noreferrer"
            >
              <svg className="w-4 h-4 text-sky-50" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.6-.3-5.3-1.4-5.3-6.2 0-1.4.5-2.5 1.2-3.4-.1-.3-.5-1.6.1-3.4 0 0 1-.3 3.4 1.2a11.6 11.6 0 016.2 0C18 4.1 19 4.4 19 4.4c.6 1.8.2 3.1.1 3.4.7.8 1.2 2 1.2 3.4 0 4.8-2.7 5.9-5.3 6.2.4.4.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0012 .5z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-sky-100/70">© {new Date().getFullYear()} Hunting Coder • All rights reserved</p>
          <div className="text-xs text-sky-100/70">Built with passion for coding and exploring.</div>
        </div>
      </div>
    </footer>
  );
}
// ...existing code...