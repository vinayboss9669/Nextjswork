// ...existing code...
import React from "react";
import Image from "next/image";
import Link from "next/link";
// import Product from "../models/Product";
// import mongoose from "mongoose";

export default function Tshirts({}) {
  // console.log(product);
  const products = [
    {
      id: "ts1",
      slug: "aurora-tee",
      name: "Aurora Tee",
      price: 799,
      sizes: ["S", "M", "L"],
      desc: "Soft cotton with a subtle gradient.",
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
      sizes: ["S", "L", "XL"],
      desc: "Bright accents for a bold look.",
      image: "/tshirts4.jpg",
      badge: "Limited",
    },
  ];

  return (
    <main className="pt-20 px-4 sm:px-6 lg:px-12 bg-white min-h-screen">
      <section className="max-w-7xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-pink-600">
              T-Shirts
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Soft whites with light-pink accents — animated previews on hover.
            </p>
          </div>
        </header>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 cursor-pointer">
          {products.map((p) => (
            <Link key={p.id} href={`/product/${p.slug}`} className="block">
              <article
                className="bg-white border border-pink-50 rounded-2xl shadow-lg overflow-hidden transform transition hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-56 bg-gradient-to-br from-pink-50 to-white flex items-center justify-center">
                  <div className="absolute top-3 left-2 ">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-700 shadow-sm animate-pulse ">
                      {p.badge}
                    </span>
                  </div>

                  <div className="relative w-40 h-40 md:w-44 md:h-44 transform transition duration-500 hover:scale-105 hover:rotate-3 ml-3">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 200px, 300px"
                      className="object-contain"
                      priority={false}
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {p.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{p.desc}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-pink-600">
                        ₹{p.price}
                      </div>
                      {/* <div className="text-xs text-gray-400">incl. taxes</div> */}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {p.sizes.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2 py-1 border border-pink-100 rounded-md text-pink-600 bg-pink-50"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-pink-600 text-white rounded-md text-sm shadow hover:bg-pink-500 transition cursor-pointer">
                        Buy
                      </button>
                      <button className="px-3 py-1.5 border border-pink-100 text-sm rounded-md hover:bg-pink-50 transition cursor-pointer">
                        View
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full h-1 bg-gradient-to-r from-pink-200 via-pink-300 to-pink-100" />
              </article>
            </Link>
          ))}
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          Showing {products.length} products
        </footer>
      </section>
    </main>
  );
}


// export async function getServerSideProps(context) {
//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(process.env.MONGO_URI);
//   }
//   let product = await Product.find({ category: "tshirt" });
//   let tshirts = {};
//     for(let item of products){
//         if(item.title in tshirts){
//             if(!tshirts[item.title].color.includes(item.color) && item.availableQty>0){
//                 tshirts[item.title].color.push(item.color);
//             }
//             if(!tshirts[item.title].size.includes(item.size) && item.availableQty>0){
//                 tshirts[item.title].size.push(item.size);
//             }
//         }else{
//             tshirts[item.title] = JSON.parse(JSON.stringify(item));
//             if(item.availableQty>0){
//                 tshirts[item.title].color = [item.color];
//                 tshirts[item.title].size = [item.size];
//             }else{

//                 tshirts[item.title].color = [];
//                 tshirts[item.title].size = [];  
//             }
//         }
//     }
//   return {
//     props: { product: JSON.parse(JSON.stringify(tshirts)) },
//   };
// }
// ...existing code...