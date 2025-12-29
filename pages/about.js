import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function About() {
  const team = [
    { name: "Harsh Yadav", role: "Founder & Designer", img: "https://avatars.githubusercontent.com/u/161936085?v=4" },
    { name: "Mohd Asif", role: "Head of Ops", img: "https://media-del3-1.cdn.whatsapp.net/v/t61.24694-24/491869349_1218193462952023_7646035471267809036_n.jpg?ccb=11-4&oh=01_Q5Aa3AEWjR1YXnEfAdW8-9luZSu78dd9lNvBp6IBzP4AUg4VKw&oe=692AE208&_nc_sid=5e03e0&_nc_cat=110" },
    { name: "Vinay kumar", role: "Product & Marketing", img: "https://avatars.githubusercontent.com/u/196925653?v=4" },
  ];

  const stats = [
    { id: "drops", label: "Seasonal drops", value:2 },
    { id: "customers", label: "Happy customers", value: 10 },
    { id: "countries", label: "Countries shipped", value: 1 },
  ];

  const testimonials = [
    { name: "Sana", text: "Lovely products — quality fabric and fast delivery.", meta: "Bengaluru" },
    { name: "Amit", text: "Great customer service. The tee fits perfectly.", meta: "Mumbai" },
    { name: "Leena", text: "Beautiful packaging and sustainable materials.", meta: "Delhi" },
  ];

  // animated counters
  const [counts, setCounts] = useState(stats.reduce((acc, s) => ({ ...acc, [s.id]: 0 }), {}));
  useEffect(() => {
    const duration = 900;
    const start = performance.now();
    let raf;
    const animate = (time) => {
      const t = Math.min(1, (time - start) / duration);
      const next = {};
      stats.forEach((s) => {
        next[s.id] = Math.floor(s.value * t);
      });
      setCounts(next);
      if (t < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []); // run once

  // simple testimonial slider
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 4000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-rose-50 to-white pt-24 pb-20">
      <section className="max-w-6xl mx-auto px-6 space-y-10">
        {/* Hero */}
        <header className="rounded-2xl bg-white/90 backdrop-blur-sm p-8 shadow-xl border border-indigo-50 overflow-hidden relative">
          <div
            aria-hidden="true"
            className="absolute -right-28 -top-20 w-72 h-72 rounded-full bg-gradient-to-tr from-pink-200 via-indigo-200 to-cyan-200 opacity-40 blur-3xl animate-blob"
          />
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                About Codeswear 
              </h1>
              <p className="mt-4 text-gray-600 max-w-xl">
                We design playful, comfortable apparel and lifestyle goods — small-batch, sustainably-minded, and made to be loved.
                Quality materials, friendly support, and thoughtful packaging are at our core.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex px-5 py-3 bg-gradient-to-r from-indigo-600 to-rose-500 text-white rounded-lg shadow-md hover:scale-105 transform transition"
                >
                  Get in touch
                </Link>
                <Link
                  href="/mugs"
                  className="inline-flex px-5 py-3 border border-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
                >
                  Shop our drops
                </Link>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-lg transform hover:scale-102 transition">
                {/* Next/Image will lazy-load by default; ensure /hero-banner.webp exists in public/ */}
                <Image
                  src="/logo1.webp"
                  alt="Codeswear hero"
                  width={720}
                  height={420}
                  className="object-cover"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-50 flex flex-col items-start gap-2 animate-card"
            >
              <div className="text-sm text-indigo-600 font-semibold">{s.label}</div>
              <div className="text-3xl font-extrabold text-gray-900">
                {counts[s.id]?.toLocaleString?.() ?? counts[s.id]}
                <span className="text-base text-gray-400 ml-2">+</span>
              </div>
              <div className="text-sm text-gray-500">Trusted by our growing community</div>
            </div>
          ))}
        </div>

        {/* Mission & Values */}
        <section className="grid md:grid-cols-3 gap-6">
          <article className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-50 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-900">Our Mission</h3>
            <p className="mt-3 text-gray-600 text-sm">
              Make everyday essentials that are fun to wear — responsibly produced with lasting materials.
            </p>
          </article>

          <article className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-50 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-900">Sustainability</h3>
            <p className="mt-3 text-gray-600 text-sm">
              We use eco-conscious fabrics and limit production to reduce waste. Small batches = better quality control.
            </p>
          </article>

          <article className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-50 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-900">Community</h3>
            <p className="mt-3 text-gray-600 text-sm">
              We support creators and share proceeds for community initiatives — design-led collaborations welcome.
            </p>
          </article>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Meet the team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((m) => (
              <article
                key={m.name}
                className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-indigo-50 transform hover:-translate-y-1 transition"
                aria-label={`${m.name} — ${m.role}`}
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-indigo-200 to-pink-200 flex-shrink-0 flex items-center justify-center">
                  <Image
                    src={m.img}
                    alt={m.name}
                    width={80}
                    height={80}
                    className="object-cover"
                    // fallback: ensure images exist in public/; Next/Image will show broken if missing
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{m.name}</h3>
                  <p className="text-sm text-gray-500">{m.role}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What customers say</h2>
          <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-indigo-50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm">
                {testimonials[idx].name[0]}
              </div>
              <div>
                <p className="text-gray-800">“{testimonials[idx].text}”</p>
                <div className="mt-2 text-sm text-gray-500">
                  — {testimonials[idx].name}, <span className="text-gray-400">{testimonials[idx].meta}</span>
                </div>
              </div>
            </div>

            <div className="absolute right-4 top-4 flex items-center gap-2">
              <button
                aria-label="Previous testimonial"
                onClick={() => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
                className="p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 transition"
              >
                ‹
              </button>
              <button
                aria-label="Next testimonial"
                onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
                className="p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 transition"
              >
                ›
              </button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-8 rounded-2xl p-6 text-center bg-gradient-to-r from-indigo-600 to-rose-500 text-white shadow-xl">
          <h3 className="text-xl font-bold">Collaborate with us</h3>
          <p className="mt-2">We love working with creators, shops and events — let's make something special.</p>
          <div className="mt-4">
            <Link
              href="/contact"
              className="inline-block px-5 py-3 bg-white/10 rounded-md font-medium hover:bg-white/20 transition"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0,0) scale(1); }
          33% { transform: translate(-10px,8px) scale(1.05); }
          66% { transform: translate(8px,-6px) scale(0.95); }
          100% { transform: translate(0,0) scale(1); }
        }
        .animate-blob { animation: blob 6s infinite ease-in-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-card { animation: fadeIn 420ms ease-out both; }
        .hover\\:scale-102:hover { transform: scale(1.02); }
      `}</style>
    </main>
  );
}
