import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields first
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      let res = await fetch(`http://localhost:3000/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Changed from data to formData
      });

      let response = await res.json();

      if (!res.ok) {
        const errMsg =
          response?.error ||
          response?.message ||
          "Signup failed. Please try again.";
        alert(errMsg);
        return;
      }

      // Success path
      // alert('Account created successfully. Redirecting to login...');
      setFormData({ name: "", email: "", password: "" });
      toast.success("Account created successfully.Redirecting to login...", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
      window.location.href = "/login";
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: rotate(-12deg);
          }
          50% {
            transform: rotate(12deg);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes slideIn {
          0% {
            transform: translateX(-20px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-wave {
          animation: wave 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        .slide-in {
          animation: slideIn 0.6s ease-out forwards;
        }

        .pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <main className="min-h-screen pt-20 bg-gradient-to-br from-violet-50 to-white">
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
            <div className="bg-white rounded-2xl shadow-xl border border-violet-100 overflow-hidden relative">
              {/* Animated Background */}
              <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-40 h-40 bg-violet-200/20 rounded-full translate-x-1/2 -translate-y-1/2 pulse-slow" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-200/20 rounded-full -translate-x-1/2 translate-y-1/2 pulse-slow" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-block animate-wave mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 animate-gradient flex items-center justify-center">
                      <Image
                        src="/image2.png"
                        alt="Logo"
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 slide-in">
                    Sign Up
                  </h2>
                  <p
                    className="text-gray-600 mt-1 slide-in"
                    style={{ animationDelay: "100ms" }}
                  >
                    Create your account today
                  </p>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-200 transition-shadow"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <div className="w-0 group-focus-within:w-full h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300" />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-200 transition-shadow"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <div className="w-0 group-focus-within:w-full h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300" />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-200 transition-shadow"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <div className="w-0 group-focus-within:w-full h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300" />
                  </div>
                  {/* 
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-200 transition-shadow"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                    <div className="w-0 group-focus-within:w-full h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300" />
                  </div> */}

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-violet-500/30 transition-all duration-300 transform hover:-translate-y-0.5 animate-gradient"
                  >
                    Create Account
                  </button>
                </form>

                {/* Social Signup */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  {/* <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">
                      Or sign up with
                    </span>
                  </div> */}
                </div>

                {/* <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 px-4 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Image
                      src="/google.webp"
                      alt="Google"
                      width={60}
                      height={60}
                    />
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Image
                      src="/github.png"
                      alt="GitHub"
                      width={80}
                      height={80}
                    />
                  </button>
                </div> */}

                {/* Login Link */}
                <p className="mt-8 text-center text-gray-600 py-4 border-t border-gray-200">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-violet-600 hover:text-violet-700 font-medium transition"
                  >
                    Sign in
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
