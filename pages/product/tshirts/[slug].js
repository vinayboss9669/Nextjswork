import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "../../../components/CartContext";
import { ToastContainer, toast } from "react-toastify";

// import Product from "../../models/Product";
// import mongoose from "mongoose";

const PRODUCTS = [
  {
    id: "ts1",
    slug: "aurora-tee",
    name: "Aurora Tee",
    price: 799,
    sizes: ["S", "M", "L", "XL"],
    desc: "Soft cotton with a subtle gradient — comfy for everyday wear.",
    image: "/tshirts.webp",
    badge: "New",
  },
  {
    id: "ts2",
    slug: "blush-dream",
    name: "Blush Dream",
    price: 849,
    sizes: ["S", "M", "L"],
    desc: "Lightweight tee in pastel pink tones, breathable weave.",
    image: "/tshirts2.webp",
    badge: "Popular",
  },
  {
    id: "ts3",
    slug: "mono-classic",
    name: "Mono Classic",
    price: 699,
    sizes: ["M", "L", "XL"],
    desc: "Minimal silhouette, perfect for layering.",
    image: "/tshirts3.webp",
    badge: "Best",
  },
  {
    id: "ts4",
    slug: "neon-pop",
    name: "Neon Pop",
    price: 999,
    sizes: ["S", "M", "L", "XL"],
    desc: "Bright accents for a bold look.",
    image: "/tshirts4.jpg",
    badge: "Limited",
  },
];

export async function getStaticPaths() {
  const paths = PRODUCTS.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  const related = PRODUCTS.filter((p) => p.slug !== params.slug).slice(0, 3);
  return { props: { product, related } };
}

export default function ProductPage({ product, related }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [size, setSize] = useState(product?.sizes[0] || "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [pin, setPin] = useState("");
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

    try {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        size: size,
        qty: qty,
        image: product.image,
      });

      setAdded(true);
      toast.success("Added to cart!", {
        position: "bottom-center",
        autoClose: 2000,
      });

      setTimeout(() => setAdded(false), 1800);
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add item to cart", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const applyPromoCode = async () => {
    // toast.info("Fetching your pincodes...");

    let pins = await fetch("http://localhost:3000/api/pincode");
    let pinJson = await pins.json();
    if (pinJson.pincode.includes(parseInt(pin))) {
      setService(true);
      toast.success("Pincode is serviceable!");
    } else {
      setService(false);
      toast.error("Sorry, Pincode is not serviceable");
    }
  };

  const onchangepin = (e) => {
    setPin(e.target.value);
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
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-6">
          <div className="relative rounded-2xl overflow-hidden border border-pink-50 shadow-lg bg-pink-50/30">
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-white/90 text-pink-600 shadow">
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

          <div className="mt-4 flex gap-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/product/tshirts/${r.slug}`} // Add 'tshirts' to the path
                className="group w-20 h-20 rounded-lg overflow-hidden border border-pink-50 bg-white flex-shrink-0 shadow-sm transform transition hover:-translate-y-1"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="md:col-span-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-gray-500">{product.desc}</p>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-pink-600">
                ₹{product.price}
              </div>
              <div className="text-xs text-gray-400">incl. taxes</div>
            </div>

            <div className="text-sm text-gray-600">
              SKU: <span className="font-medium">{product.id}</span>
            </div>
          </div>

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
                        ? "bg-pink-600 text-white border-pink-600"
                        : "bg-white text-pink-600 border-pink-100"
                    } transition`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">
                Quantity
              </label>
              <div className="inline-flex items-center rounded-md border border-pink-100 overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2 text-pink-600 bg-white"
                >
                  −
                </button>
                <div className="px-4 py-2 bg-white text-sm">{qty}</div>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2 text-white bg-pink-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              className="px-5 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-lg shadow-lg hover:brightness-105 transform transition"
            >
              Add to cart
            </button>

            <button
              onClick={handleBuyNow}
              className="px-4 py-3 border border-pink-100 text-pink-600 rounded-lg hover:bg-pink-50 transition"
            >
              Buy now
            </button>

            <div className="ml-auto flex items-center gap-2 ">
              <input
                onChange={onchangepin}
                type="text"
                placeholder="Enter promo code"
                className="border border-pink-100 rounded-md px-3 py-2 text-sm"
              />
              <button
                onClick={applyPromoCode}
                className="px-3 py-1.5 bg-pink-600 text-white rounded-md text-sm shadow hover:bg-pink-500 transition cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Message shown below the input + Apply button */}
          <div className="w-full mt-2 ml-80">
            <div className="flex">
              {service && (
                <span className="text-sm text-green-600">
                  {" "}
                  Yay! This pincode is serviceable.
                </span>
              )}
            </div>
            <div>
              {service === false && (
                <span className="text-sm text-red-600">
                  Sorry! We do not deliver to this pincode.
                </span>
              )}
            </div>
          </div>

          {added && (
            <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-pink-50 border border-pink-100 text-pink-600 animate-[pulse_1.2s_infinite]">
              ✓ Added to cart
            </div>
          )}

          <div className="mt-8 border-t border-pink-50 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Product details
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Material: 100% combed cotton</li>
              <li>Care: Machine wash cold, tumble dry low</li>
              <li>Fit: Regular fit — size up for a relaxed look</li>
            </ul>
          </div>

          <div className="mt-6 border-t border-pink-50 pt-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Related products
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/product/tshirts/${r.slug}`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-pink-50 bg-white shadow-sm hover:shadow-md transition"
                >
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-pink-50">
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

// ...existing code...

// export async function getServerSideProps(context) {
//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(process.env.MONGO_URI);
//   }

//   // Get the product based on slug
//   let product = await Product.findOne({ slug: context.query.slug });

//   if (!product) {
//     return {
//       notFound: true // This will show 404 page
//     };
//   }

//   // Get related products (excluding current product)
//   let related = await Product.find({
//     slug: { $ne: context.query.slug },
//     category: product.category
//   }).limit(3);

//   // Get variants if they exist
//   let variants = await Product.find({
//     title: product.title,
//     _id: { $ne: product._id }
//   });

//   // Create colorSizeSlug object
//   let colorSizeSlug = {};
//   for (let item of variants) {
//     if (Object.keys(colorSizeSlug).includes(item.color)) {
//       colorSizeSlug[item.color][item.size] = { slug: item.slug };
//     } else {
//       colorSizeSlug[item.color] = {};
//       colorSizeSlug[item.color][item.size] = { slug: item.slug };
//     }
//   }

//   return {
//     props: {
//       product: JSON.parse(JSON.stringify(product)),
//       related: JSON.parse(JSON.stringify(related)),
//       variants: JSON.parse(JSON.stringify(colorSizeSlug))
//     }
//   };
// }
