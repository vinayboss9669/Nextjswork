import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "../../../components/CartContext";
import { ToastContainer, toast } from "react-toastify";

// Shared sticker data
const STICKERS = [
  {
    id: "s1",
    slug: "dev-stack-pack",
    name: "Dev Stack Pack",
    price: 199,
    desc: "Popular programming languages & frameworks",
    image: "/sticker1.webp",
    category: "Tech",
    badge: "Best Seller",
    features: ["High Quality Vinyl", "Waterproof", "Easy to Apply"]
  },
  {
    id: "s2",
    slug: "code-icons-set",
    name: "Code Icons Set",
    price: 149,
    desc: "VS Code inspired development icons",
    image: "/sticker2.jpeg",
    category: "Development",
    badge: "New",
    features: ["Die Cut Design", "Durable Material", "Scratch Resistant"]
  },
  {
    id: "s3", 
    slug: "git-commands",
    name: "Git Commands",
    price: 179,
    desc: "Essential git commands cheat sheet",
    image: "/sticker3.jpeg",
    category: "Version Control",
    badge: "Hot",
    features: ["Clear Print", "Long Lasting", "Removable"]
  },
  {
    id: "s4",
    slug: "react-components",
    name: "React Components",
    price: 169,
    desc: "React ecosystem sticker collection",
    image: "/sticker4.webp",
    category: "Frontend",
    badge: "Trending",
    features: ["Premium Quality", "UV Protected", "Weather Resistant"]
  }
];

export async function getStaticPaths() {
  const paths = STICKERS.map((p) => ({
    params: { slug: p.slug }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = STICKERS.find((p) => p.slug === params.slug);
  const related = STICKERS.filter((p) => p.slug !== params.slug).slice(0, 3);
  return { props: { product, related } };
}

export default function StickerProductPage({ product, related }) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart(); // Change from addItem to addToCart
  const [pin, setPin] = useState("");
  const [service, setService] = useState(null);

  if (router.isFallback) return <div className="p-6">Loading...</div>;

  const handleAddToCart = () => {
    console.log('Adding item to cart:', {
      id: product.id,
      name: product.name,
      price: product.price,
      qty,
      size: 'Standard',
      image: product.image
    });

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      qty,
      size: 'Standard',
      image: product.image,
    });

    setAdded(true);
    toast.success("Added to cart!", {
          position: "bottom-center",
          autoClose: 2000,
        });
    setTimeout(() => setAdded(false), 1800);
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
    <main className="pt-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-cyan-50 to-white min-h-screen">
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
          <div className="relative rounded-2xl overflow-hidden border border-cyan-100 shadow-lg bg-white group">
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-white/90 text-cyan-600 shadow animate-pulse">
                {product.badge}
              </span>
            </div>

            <div className="aspect-square relative p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 80vw, 40vw"
                className="object-contain transform transition duration-500 group-hover:scale-110 group-hover:rotate-3"
                priority
              />
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-4 flex gap-3">
            {related.map((r) => (
              <Link 
                key={r.slug} 
                href={`/product/stickers/${r.slug}`} 
                className="group w-20 h-20 rounded-lg overflow-hidden border border-cyan-100 bg-white flex-shrink-0 shadow-sm transform transition hover:-translate-y-1"
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
            <span className="text-xs font-medium text-cyan-600 bg-cyan-50 px-2 py-1 rounded-full">
              {product.category}
            </span>
            
            <h1 className="mt-2 text-2xl md:text-3xl font-extrabold text-gray-900">
              {product.name}
            </h1>
            
            <p className="mt-4 text-gray-600">{product.desc}</p>

            {/* Price */}
            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-cyan-600">₹{product.price}</div>
                <div className="text-sm text-gray-500">Including GST</div>
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
                  className="px-4 py-2 text-cyan-600 hover:bg-cyan-50 transition"
                >
                  −
                </button>
                <span className="px-6 py-2 text-gray-900 font-medium">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-2 text-cyan-600 hover:bg-cyan-50 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={handleAddToCart}  // Change from addToCart to handleAddToCart
                className="flex-1 py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Add to Cart
              </button>
              <Link href="/checkout">
                <button className="py-3 px-6 border-2 border-cyan-200 text-cyan-600 rounded-lg font-medium hover:bg-cyan-50 transition-colors">
                  Buy Now
                </button>
              </Link>
            </div>

            {/* Added Feedback */}
            {added && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-50 text-cyan-600 animate-[fadeIn_0.3s_ease-out]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Added to cart
              </div>
            )}

            {/* Features */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Delivery Check */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Check Delivery</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-cyan-300 transition-colors"
                />
                <button
                  onClick={checkPincode}
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                >
                  Check
                </button>
              </div>
              {service !== null && (
                <p className={`mt-2 text-sm ${service ? "text-green-600" : "text-red-600"}`}>
                  {service ? "✓ Delivery available" : "✕ Sorry, no delivery available"}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}