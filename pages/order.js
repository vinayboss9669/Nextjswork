import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Order from "../models/Order";

export default function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Simulated order data - replace with actual API call
  useEffect(() => {
    const demoOrders = [
      {
        orderId: "OID123456",
        date: "2024-01-15",
        amount: 1299,
        status: "Delivered",
        items: [
          {
            name: "Developer Tee",
            qty: 1,
            size: "L",
            image: "/tshirts.webp"
          }
        ]
      },
      {
        orderId: "OID123457",
        date: "2024-01-10",
        amount: 899,
        status: "Processing",
        items: [
          {
            name: "Code Mug",
            qty: 2,
            size: "Standard",
            image: "/mug1.jpg"
          }
        ]
      },
      {
        orderId: "OID123458",
        date: "2024-01-05",
        amount: 1999,
        status: "Shipped",
        items: [
          {
            name: "Open Source Hoodie",
            qty: 1,
            size: "M",
            image: "/huddy1.jpg"
          }
        ]
      },
      {
        orderId: "OID123459",
        date: "2023-12-22",
        amount: 499,
        status: "Cancelled",
        items: [
          {
            name: "Cup",
            qty: 1,
            size: "One Size",
            image: "/mug1.jpg"
          },
          {
            name: "Sticker Pack",
            qty: 3,
            size: "N/A",
            image: "/sticker1.webp"
          }
        ]
      },
      // {
      //   orderId: "OID123460",
      //   date: "2023-11-30",
      //   amount: 2598,
      //   status: "Delivered",
      //   items: [
      //     {
      //       name: "Full Stack Bundle",
      //       qty: 1,
      //       size: "L",
      //       image: "/bundle.jpg"
      //     },
      //     {
      //       name: "Travel Mug",
      //       qty: 1,
      //       size: "Standard",
      //       image: "/mug2.jpg"
      //     }
      //   ]
      // }
    ];

    setTimeout(() => {
      setOrders(demoOrders);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Orders</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
        </div>

        {loading ? (
          // Loading Animation
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
          </div>
        ) : orders.length === 0 ? (
          // Empty State
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-purple-100">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
              <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here!</p>
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          // Orders List
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden transform transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Order Header */}
                <div className="px-6 py-4 border-b border-purple-100 bg-purple-50/50">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-medium text-gray-900">{order.orderId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Order Date</p>
                      <p className="font-medium text-gray-900">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium text-gray-900">₹{order.amount}</p>
                    </div>
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-purple-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          Qty: {item.qty} | Size: {item.size}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="px-6 py-4 bg-gray-50 flex justify-end gap-4">
                  <button className="text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors">
                    Track Order
                  </button>
                  <button className="text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </main>
  );
}


export async function getServerSideProps(context) {
  const { req } = context;
  const { cookies } = req;
  const userEmail = cookies.user ? JSON.parse(cookies.user).email : null;
  let orders = [];

  if (userEmail) {
    await connectDb();
    orders = await Order.find({ email: userEmail }).sort({ createdAt: -1 }).lean();

    orders = orders.map(order => ({
      ...order,
      _id: order._id.toString(),
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString()
    }));
  }
  return {
    props: { orders }
  };
}
import connectDb from "../middleware/db";

