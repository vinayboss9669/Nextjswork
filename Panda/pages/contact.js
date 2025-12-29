import React, { useState } from 'react';
import Head from 'next/head';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    desc: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Add this line

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Modified toast call to use simpler configuration
        toast("Message sent successfully!", {
          type: "success",
          position: "top-right",
          autoClose: 3000
        });
        setFormData({ name: '', email: '', phone: '', desc: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      // Modified error toast call
      toast("Failed to send message", {
        type: "error",
        position: "top-right",
        autoClose: 3000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Head>
        <title>Contact Us - Hunting Coder</title>
        <meta name="description" content="Contact Hunting Coder - Get in touch with us" />
      </Head>

      {/* Modified ToastContainer configuration */}
      <ToastContainer 
        limit={3}
        theme="light"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {showAlert && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="animate-popup-modal bg-white rounded-xl shadow-2xl max-w-md mx-4 transform">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-t-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium text-lg">Success!</span>
                </div>
                <button 
                  onClick={() => setShowAlert(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-700">Thank you <span className="font-semibold">{formData.name}</span>!</p>
                <p className="text-gray-600 mt-1">Your message has been sent successfully.</p>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600">Get in touch with us. We'd love to hear from you.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.02]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="desc"
                  id="desc"
                  rows={4}
                  required
                  value={formData.desc}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                />
              </div>

              <div className="flex justify-center">
                <button
                  // onClick={handelsubmit}
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    px-8 py-3 rounded-lg text-white text-lg font-semibold
                    bg-gradient-to-r from-indigo-600 to-purple-600
                    hover:from-indigo-500 hover:to-purple-500
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    transform transition-all hover:scale-105
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${isSubmitting ? 'animate-pulse' : ''}
                  `}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes popupModal {
          0% { 
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          100% { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-popup-modal {
          animation: popupModal 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}