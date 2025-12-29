import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "../../../components/CartContext";
import { ToastContainer, toast } from "react-toastify";
const MUGS = [
  {
    id: "mg1",
    slug: "blush-mug",
    name: "Blush Mug 350ml",
    price: 399,
    desc: "Matte ceramic with soft-pink glaze — keeps drinks warm.",
    image: "/mug1.jpg",
    volumes: ["350ml", "450ml"],
    badge: "New",
    features: [
      "Matte Ceramic Finish",
      "Double-wall Insulation",
      "Dishwasher Safe",
    ],
  },
  {
    id: "mg2",
    slug: "pastel-sip",
    name: "Pastel Sip 450ml",
    price: 449,
    desc: "Rounded handle, dishwasher safe, pastel ombre finish.",
    image: "/mug2.jpeg",
    volumes: ["350ml", "450ml"],
    badge: "Popular",
    features: ["Ergonomic Handle", "Ombre Finish", "Microwave Safe"],
  },
  {
    id: "mg3",
    slug: "rose-tote",
    name: "Rose Tote Mug 300ml",
    price: 349,
    desc: "Compact everyday mug — great for coffee on the go.",
    image: "/mug3.jpg",
    volumes: ["300ml", "350ml"],
    badge: "Best",
    features: ["Travel Friendly", "Spill-Proof Lid", "Heat Retention"],
  },
  {
    id: "mg4",
    slug: "petal-mug",
    name: "Petal Mug 400ml",
    price: 429,
    desc: "Soft floral print with matte finish.",
    image: "/mug4.jpg",
    volumes: ["350ml", "400ml"],
    badge: "Limited",
    features: ["Floral Design", "Matte Finish", "Premium Quality"],
  },
];

export async function getStaticPaths() {
  const paths = MUGS.map((p) => ({
    params: { slug: p.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = MUGS.find((p) => p.slug === params.slug);
  const related = MUGS.filter((p) => p.slug !== params.slug).slice(0, 3);
  return { props: { product, related } };
}

export default function MugProductPage({ product, related }) {
  const { addToCart, clearCart } = useCart(); // Change from additem to addToCart
  const router = useRouter();
  const [volume, setVolume] = useState(product.volumes[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [pin, setPin] = useState("");
  const [service, setService] = useState(null);

  const handleAddToCart = () => {
    if (!volume) {
      toast.error("Please select a volume", {
        position: "bottom-center",
        autoClose: 2000,
      });
      return;
    }

    console.log("Adding to cart:", {
      id: product.id,
      name: product.name,
      price: product.price,
      qty,
      size: volume,
      image: product.image,
    });

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      qty,
      size: volume,
      image: product.image,
    });

    setAdded(true);
    toast.success("Added to cart!", {
      position: "bottom-center",
      autoClose: 2000,
    });
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    if (!volume) {
      toast.error("Please select a volume", {
        position: "bottom-center",
        autoClose: 2000,
      });
      return;
    }

    clearCart();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      qty,
      size: volume,
      image: product.image,
    });
    router.push("/checkout");
  };

  
  const checkPincode = async () => {
    const p = (pin || '').trim();
    if (!p || p.length !== 6) {
      toast.error('Please enter a valid 6-digit pincode');
      setService(null);
      return;
    }
    try {
      const res = await fetch('/api/pincode');
      if (!res.ok) throw new Error('Failed to fetch pincodes');
      const data = await res.json();
      const pincodes = Array.isArray(data) ? data : data.pincode || [];
      const available = pincodes.map(String).includes(p);
      setService(available);
      if (available) {
        toast.success('Delivery available for this pincode');
      } else {
        toast.error('Sorry, delivery not available for this pincode');
      }
    } catch (err) {
      console.error('Pincode check error:', err);
      toast.error('Error checking pincode');
      setService(false);
    }
  };

  

  


  return (
    <main className="pt-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-pink-50 to-white min-h-screen">
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce}
      />
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column - Image */}
        <div className="md:col-span-7">
          <div className="relative rounded-2xl overflow-hidden border border-pink-100 shadow-lg bg-white group">
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-white/90 text-pink-600 shadow animate-pulse">
                {product.badge}
              </span>
            </div>

            <div className="aspect-square relative p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 80vw, 40vw"
                className="object-contain transform transition duration-500 group-hover:scale-110 group-hover:rotate-6"
                priority
              />
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-4 flex gap-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/product/mugs/${r.slug}`}
                className="group w-20 h-20 rounded-lg overflow-hidden border border-pink-100 bg-white flex-shrink-0 shadow-sm transform transition hover:-translate-y-1"
              >
                <div className="relative w-full h-full p-2">
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    className="object-contain transform transition-transform group-hover:scale-110"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="md:col-span-5">
          <div className="sticky top-24">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600">{product.desc}</p>

            {/* Price */}
            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-pink-600">
                  ₹{product.price}
                </div>
                <div className="text-sm text-gray-500">
                  Free shipping on orders above ₹999
                </div>
              </div>
            </div>

            {/* Volume Selection */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Volume
              </label>
              <div className="flex gap-3 flex-wrap">
                {product.volumes.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVolume(v)}
                    className={`px-4 py-2 rounded-lg text-sm border-2 transition-all ${
                      volume === v
                        ? "border-pink-500 bg-pink-50 text-pink-700"
                        : "border-gray-200 hover:border-pink-200"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="inline-flex items-center rounded-lg border-2 border-gray-200">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2 text-pink-600 hover:bg-pink-50 transition"
                >
                  −
                </button>
                <span className="px-6 py-2 text-gray-900 font-medium">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-2 text-pink-600 hover:bg-pink-50 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-medium shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Add to Cart
              </button>
              <Link href="/checkout">
                <button
                  onClick={handleBuyNow}
                  className="py-3 px-6 border-2 border-pink-200 text-pink-600 rounded-lg font-medium hover:bg-pink-50 transition-colors"
                >
                  Buy Now
                </button>
              </Link>
            </div>

            {/* Added Feedback */}
            {added && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-50 text-pink-600 animate-[fadeIn_0.3s_ease-out]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Added to cart
              </div>
            )}

            {/* Pincode Check */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Check Delivery
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-pink-300 transition-colors"
                />
                <button
                  onClick={checkPincode}
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                >
                  Check
                </button>
              </div>
              {service !== null && (
                <p
                  className={`mt-2 text-sm ${
                    service ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {service
                    ? "✓ Delivery available"
                    : "✕ Sorry, no delivery available"}
                </p>
              )}
            </div>

            {/* Features */}
            <div className="mt-8 border-t border-pink-100 pt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <span className="w-4 h-4 rounded-full bg-pink-100 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-600" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
