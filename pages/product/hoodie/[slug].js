import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "../../../components/CartContext";
import { ToastContainer, toast } from "react-toastify";

// Shared with hoodies.js
const HOODIES = [
  {
    id: "h1",
    slug: "dev-hoodie-cotton",
    name: "Developer Hoodie",
    price: 999,
    desc: "Cozy cotton blend with code pattern design.",
    image: "/huddy1.jpg",
    sizes: ["S", "M", "L", "XL"],
    badge: "New"
  },
  {
    id: "h2",
    slug: "tech-comfort-fleece",
    name: "Tech Comfort",
    price: 1299,
    desc: "Premium brushed fleece interior.",
    image: "/huddy2.jpg",
    sizes: ["M", "L", "XL"],
    badge: "Hot"
  },
  {
    id: "h3",
    slug: "code-life-daily",
    name: "Code Life",
    price: 899,
    desc: "Lightweight everyday hoodie.",
    image: "/huddy3.jpg",
    sizes: ["S", "M", "L"],
    badge: "Best Seller"
  },
  {
    id: "h4",
    slug: "binary-blend-tech",
    name: "Binary Blend",
    price: 1199,
    desc: "Modern fit with tech-inspired graphics.",
    image: "/huddy4.jpeg",
    sizes: ["S", "M", "L", "XL"],
    badge: "Limited"
  }
];

export async function getStaticPaths() {
  const paths = HOODIES.map((p) => ({
    params: { slug: p.slug }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = HOODIES.find((p) => p.slug === params.slug);
  const related = HOODIES.filter((p) => p.slug !== params.slug).slice(0, 3);
  return { props: { product, related } };
}

export default function HoodieProductPage({ product, related }) {
  const router = useRouter();
  const [size, setSize] = useState(product.sizes[0] || "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart, clearCart } = useCart(); // Changed from addItem to addToCart
  const [pin, setPin] = useState('');
  const [service, setService] = useState(null);

  if (router.isFallback) return <div className="p-6">Loading...</div>;

  const handleAddToCart = () => {
    if (!size) {
      toast.error("Please select a size", {
        position: "bottom-center",
        autoClose: 2000,
      });
      return;
    }

    console.log('Adding to cart:', {
      id: product.id,
      name: product.name,
      price: product.price,
      qty,
      size,
      image: product.image
    });

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      qty,
      size,
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
    if (!size) {
      toast.error("Please select a size", {
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
      size,
      image: product.image,
    });
    router.push('/checkout');
  };

  const checkPincode = async () => {
    const p = (pin || '').trim();
    if (!p || p.length !== 6) {
      toast.error('Please enter a valid 6-digit pincode', { position: 'bottom-center', autoClose: 2000 });
      setService(null);
      return;
    }
    try {
      const res = await fetch('/api/pincode');
      if (!res.ok) throw new Error('Failed to fetch pincodes');
      const data = await res.json();
      // support both shapes: array or { pincode: [...] }
      const pincodes = Array.isArray(data) ? data : data.pincode || [];
      const available = pincodes.map(String).includes(p);
      setService(available);
      if (available) {
        toast.success('Delivery available for this pincode', { position: 'bottom-center', autoClose: 2000 });
      } else {
        toast.error('Sorry, delivery not available for this pincode', { position: 'bottom-center', autoClose: 2500 });
      }
    } catch (err) {
      console.error('Pincode check error:', err);
      toast.error('Error checking pincode', { position: 'bottom-center', autoClose: 2000 });
      setService(false);
    }
  };

  return (
    <main className="pt-24 px-4 sm:px-6 lg:px-12 bg-white min-h-screen text-gray-800">
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
      {/* Use the same UI structure as [slug].js but with purple theme */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column - Image */}
        <div className="md:col-span-6">
          <div className="relative rounded-2xl overflow-hidden border border-purple-50 shadow-lg bg-purple-50/30">
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-white/90 text-purple-600 shadow">
                {product.badge}
              </span>
            </div>

            <div className="aspect-[4/3] md:aspect-[3/4] relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 80vw, 40vw"
                className="object-contain p-6 transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-4 flex gap-3">
            {related.map((r) => (
              <Link 
                key={r.slug} 
                href={`/product/hoodie/${r.slug}`} 
                className="group w-20 h-20 rounded-lg overflow-hidden border border-purple-50 bg-white flex-shrink-0 shadow-sm transform transition hover:-translate-y-1"
              >
                <div className="relative w-full h-full">
                  <Image src={r.image} alt={r.name} fill className="object-contain p-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="md:col-span-6">
          {/* Product Info */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-gray-500">{product.desc}</p>

          {/* Price */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">₹{product.price}</div>
              <div className="text-xs text-gray-400">incl. taxes</div>
            </div>
            <div className="text-sm text-gray-600">
              SKU: <span className="font-medium">{product.id}</span>
            </div>
          </div>

          {/* Size & Quantity */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-2">Size</label>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-1.5 rounded-md text-sm border ${
                      size === s
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white text-purple-600 border-purple-100"
                    } transition`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">Quantity</label>
              <div className="inline-flex items-center rounded-md border border-purple-100 overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2 text-purple-600 bg-white"
                >
                  −
                </button>
                <div className="px-4 py-2 bg-white text-sm">{qty}</div>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2 text-white bg-purple-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart & Buy Buttons */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              className="px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg hover:brightness-105 transform transition"
            >
              Add to cart
            </button>

            <button 
              onClick={handleBuyNow}
              className="px-4 py-3 border border-purple-100 text-purple-600 rounded-lg hover:bg-purple-50 transition"
            >
              Buy now
            </button>
          </div>

          {/* Pincode check */}
          <div className="mt-4 flex items-center gap-2">
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0,6))}
              type="text"
              inputMode="numeric"
              placeholder="Enter 6-digit pincode"
              className="w-48 px-3 py-2 rounded-md border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 transition"
            />
            <button
              onClick={checkPincode}
              className="px-3 py-2 bg-purple-600 text-white rounded-md hover:brightness-110 transition"
            >
              Check
            </button>
            <div className="ml-4">
              {service === true && <span className="text-sm inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800">Delivery available</span>}
              {service === false && <span className="text-sm inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-800">Not serviceable</span>}
              {service === null && <span className="text-sm text-gray-400">Enter pincode to check</span>}
            </div>
          </div>

          {/* Added to Cart Feedback */}
          {added && (
            <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-600 animate-[pulse_1.2s_infinite]">
              ✓ Added to cart
            </div>
          )}

          {/* Product Details */}
          <div className="mt-8 border-t border-purple-50 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Product details
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Material: Premium cotton blend</li>
              <li>Care: Machine wash cold, tumble dry low</li>
              <li>Fit: Regular fit — size up for an oversized look</li>
            </ul>
          </div>

          {/* Related Products */}
          <div className="mt-6 border-t border-purple-50 pt-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Related products
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/product/hoodie/${r.slug}`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-purple-50 bg-white shadow-sm hover:shadow-md transition"
                >
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-purple-50">
                    <Image
                      src={r.image}
                      alt={r.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {r.name}
                    </div>
                    <div className="text-xs text-gray-500">₹{r.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}