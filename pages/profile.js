// ...existing code...
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";

export default function ProfilePage() {
  const router = useRouter();
  const { cartItems } = useCart();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    // Load user from localStorage (keeps existing auth flow unchanged)
    try {
      const u = localStorage.getItem("user");
      if (u) {
        const parsed = JSON.parse(u);
        setUser(parsed);
        setForm({ name: parsed.name || "", email: parsed.email || "" });
      }
    } catch (e) {
      console.error("user parse error", e);
    }

    // Try fetch orders from API; fallback to demo data if API not present
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          throw new Error("no api");
        }
      } catch {
        // demo orders (keeps functionality working)
        setOrders([
          {
            orderId: "OID1001",
            date: "2024-02-10",
            amount: 1299,
            status: "Delivered",
            items: [{ name: "Developer Tee", qty: 1, size: "L", image: "/tshirts.webp" }]
          },
          {
            orderId: "OID1002",
            date: "2024-01-28",
            amount: 499,
            status: "Processing",
            items: [{ name: "Rose Tote Mug", qty: 1, size: "300ml", image: "/mug3.jpg" }]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSave = () => {
    // update localStorage only (no backend change) to avoid altering existing auth flow
    const updated = { ...(user || {}), name: form.name, email: form.email };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
    setEditing(false);
  };

  const initials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-indigo-50 via-rose-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-50 overflow-hidden relative">
                <div className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-gradient-to-r from-pink-300 via-indigo-300 to-cyan-300 opacity-20 animate-pulse blur-3xl" />
                <div className="flex flex-col items-center gap-4">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl transform transition-all hover:scale-105">
                    {user && user.avatar ? (
                      <Image src={user.avatar} alt="avatar" width={96} height={96} className="rounded-full" />
                    ) : (
                      <span>{initials(user?.name)}</span>
                    )}
                  </div>

                  {!editing ? (
                    <>
                      <h2 className="text-xl font-semibold text-gray-900">{user?.name || "Guest User"}</h2>
                      <p className="text-sm text-gray-500">{user?.email || "No email available"}</p>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => setEditing(true)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:brightness-105 transition"
                        >
                          Edit Profile
                        </button>
                        <Link href="/order" className="px-4 py-2 border border-indigo-100 rounded-lg text-indigo-600 hover:bg-indigo-50 transition">
                          My Orders
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="w-full">
                      <label className="block text-sm text-gray-600">Name</label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                      <label className="block text-sm text-gray-600 mt-3">Email</label>
                      <input
                        value={form.email}
                        onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                      <div className="flex gap-2 mt-4">
                        <button onClick={handleSave} className="px-4 py-2 bg-rose-500 text-white rounded-lg transition">Save</button>
                        <button onClick={() => setEditing(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 w-full text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>Cart Items</span>
                      <span className="font-medium">{cartItems?.length || 0}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span>Orders</span>
                      <span className="font-medium">{orders?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orders / Activity */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900">Your Account</h1>
                  <p className="text-sm text-gray-500">Overview of recent activity and orders</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => router.push("/mugs")} className="px-4 py-2 bg-cyan-500 text-white rounded-lg shadow hover:scale-105 transition">Shop Mugs</button>
                  <button onClick={() => router.push("/tshirts")} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:scale-105 transition">Shop T-Shirts</button>
                </div>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow p-6 border border-indigo-50 text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No recent orders</h3>
                    <p className="text-sm text-gray-500">Your orders will appear here. Start shopping to place your first order.</p>
                    <div className="mt-4">
                      <Link href="/" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg transition hover:brightness-105">Browse Products</Link>
                    </div>
                  </div>
                ) : (
                  orders.map((o) => (
                    <div key={o.orderId} className="bg-white rounded-2xl shadow-lg p-4 border border-indigo-50 transform transition hover:-translate-y-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Order</p>
                          <p className="font-medium text-gray-900">{o.orderId}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{o.date}</p>
                          <p className="font-semibold text-gray-900">₹{o.amount}</p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                        <div className="sm:col-span-2">
                          {o.items.map((it, i) => (
                            <div key={i} className="flex items-center gap-4 mb-3">
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 border">
                                <Image src={it.image} alt={it.name} width={64} height={64} className="object-contain" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{it.name}</div>
                                <div className="text-sm text-gray-500">Qty: {it.qty} • {it.size}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            o.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {o.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
     

      <style jsx>{`
        .blur-3xl { filter: blur(40px); }
      `}</style>
    </>
  );
}
// ...existing code...