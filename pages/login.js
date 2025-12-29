import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Add this to prevent form submission

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const response = await res.json();

      if (!res.ok) {
        toast.error(response.error || "Login failed", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.user));

      // Clear form
      setFormData({ email: "", password: "" });
      
      // Show success message
      toast.success("Login successful! Redirecting...", {
        position: "top-center",
        autoClose: 2000,
      });

      // Redirect after toast
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);

    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {/* Single styled-jsx block at root level */}
      <style jsx>{`
        /* Combine all animations here */
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }

        @keyframes pulseScale {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        .animate-logo {
          animation: float 4s ease-in-out infinite, pulseScale 6s ease-in-out infinite;
        }

        .animate-heading {
          opacity: 0;
          animation: fadeUp 480ms cubic-bezier(0.22, 1, 0.36, 1) 80ms forwards;
        }

        .animate-sub {
          opacity: 0;
          animation: fadeUp 480ms cubic-bezier(0.22, 1, 0.36, 1) 220ms forwards;
          color: #6b7280;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>

      <main className="min-h-screen pt-20 bg-gradient-to-br from-rose-50 to-white">
         <ToastContainer
                  position="top-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  // transition={Bounce}
                />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            {/* Card Container */}
            <div className="bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden relative">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-40 h-40 bg-pink-200/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-blob" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-rose-200/20 rounded-full translate-x-1/2 translate-y-1/2 animate-blob animation-delay-2000" />
              </div>

              {/* Login Content */}
              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-2xl font-bold mb-4 animate-logo">
                    <Image src="/image2.png" alt="Logo" width={64} height={64} className="rounded-full" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 animate-heading">Welcome Back!</h2>
                  <p className="text-gray-600 mt-1 animate-sub">Login to your account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-shadow"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <div className="w-0 group-focus-within:w-full h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300" />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-shadow"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <div className="w-0 group-focus-within:w-full h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-gray-600">
                      <input type="checkbox" className="rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
                      Remember me
                    </label>
                    <Link href="/forgot-password" className="text-pink-600 hover:text-pink-700 transition">
                      Forgot Password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Sign In
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  {/* <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                  </div> */}
                </div>

                {/* Social Login */}
                {/* <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 px-4 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Image src="/google.webp" alt="Google" width={60} height={60} />
                    
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Image src="/github.png" alt="GitHub" width={80} height={80} />

                  </button>
                </div> */}

                {/* Sign Up Link */}
                <p className="mt-8 text-center text-gray-600 py-4 border-t border-gray-200">
                  Don't have an account?{' '}
                  <Link href="/signup" className="text-pink-600 hover:text-pink-700 font-medium transition">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}