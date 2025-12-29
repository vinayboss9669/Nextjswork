import React, { useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    topic: "general",
    agree: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      topic: "general",
      agree: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = (form.email || "").trim();
    const trimmedName = (form.name || "").trim();
    const trimmedMessage = (form.message || "").trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      toast.error("Please fill name, email and message.", { position: "top-center" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.", { position: "top-center" });
      return;
    }
    if (!form.agree) {
      toast.error("Please accept privacy notice to proceed.", { position: "top-center" });
      return;
    }

    setLoading(true);
    try {
      // optional: send to your backend if available
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, email: trimmedEmail, name: trimmedName, message: trimmedMessage }),
      });

      if (res.ok) {
        toast.success("Your form has been submitted. We'll get back to you soon!", { position: "top-center" });
      } else {
        // show server message if present
        let message = "Submission failed. Please try again later.";
        try {
          const json = await res.json();
          if (json?.message) message = json.message;
        } catch (err) {}
        toast.error(message, { position: "top-center" });
      }
    } catch (err) {
      console.error("Contact submit error:", err);
      toast.error("Network error. Please try again.", { position: "top-center" });
    } finally {
      setLoading(false);
      resetForm(); // clear all inputs after submit as requested
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us • Codeswear</title>
        <meta name="description" content="Contact Codeswear — questions, support and collaborations" />
      </Head>

      <main className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-rose-50 via-indigo-50 to-white">
        <ToastContainer position="top-center" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable />
        <div className="max-w-4xl mx-auto px-6">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 animate-fadeIn">Get in touch</h1>
            <p className="text-gray-600">Questions, feedback or custom orders — we'd love to hear from you.</p>
          </header>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Info / CTA */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-50 relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-gradient-to-tr from-rose-100 to-indigo-100 opacity-60 blur-2xl animate-pulse" />
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact info</h2>
              <p className="text-sm text-gray-600 mb-4">
                Prefer email? Send us a message using the form. For urgent support mention "urgent" in subject.
              </p>

              <dl className="space-y-3 text-sm text-gray-700">
                <div>
                  <dt className="font-medium">Support</dt>
                  <dd>support@codeswear.example</dd>
                </div>
                <div>
                  <dt className="font-medium">Sales</dt>
                  <dd>sales@codeswear.example</dd>
                </div>
                <div>
                  <dt className="font-medium">Phone</dt>
                  <dd>+91 98765 43210</dd>
                </div>
              </dl>

              <div className="mt-6">
                <Link href="/order" className="inline-block px-4 py-2 bg-rose-500 text-white rounded-lg shadow hover:brightness-105 transition transform hover:-translate-y-0.5">
                  Track an order
                </Link>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-indigo-50">
              <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm text-gray-700">Name</span>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Your name"
                      className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-200 transition"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-700">Email</span>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="you@domain.com"
                      className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                      required
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm text-gray-700">Subject</span>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    type="text"
                    placeholder="Brief subject"
                    className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-200 transition"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-gray-700">Topic</span>
                  <select
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                  >
                    <option value="general">General</option>
                    <option value="support">Support</option>
                    <option value="sales">Sales</option>
                    <option value="collab">Collaboration</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm text-gray-700">Message</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write your message..."
                    className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                    required
                  />
                </label>

                <div className="flex items-center gap-3">
                  <input name="agree" checked={form.agree} onChange={handleChange} id="agree" type="checkbox" className="h-4 w-4 text-rose-500 rounded border-gray-300" />
                  <label htmlFor="agree" className="text-sm text-gray-600">I agree to the privacy policy</label>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-rose-500 text-white rounded-lg shadow-lg hover:scale-[1.01] transition-transform disabled:opacity-60"
                  >
                    {loading ? "Submitting..." : "Send Message"}
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 450ms ease-out both;
        }
      `}</style>
    </>
  );
}
