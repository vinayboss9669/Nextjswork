import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Add this import
import { useCart } from "../components/CartContext";

const products = [
	{
		id: "mg1",
		slug: "blush-mug",
		name: "Blush Mug 350ml",
		price: 399,
		desc: "Matte ceramic with soft-pink glaze — keeps drinks warm.",
		image: "/mug1.jpg",
		volumes: ["350ml", "450ml"],
		badge: "New",
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
	},
];

export default function Mugs() {
	const { addToCart } = useCart(); // Changed from addItem to addToCart
	const [feedback, setFeedback] = useState(null);

	function handleAddToCart(p, volume) {
		// Renamed from handleAdd to handleAddToCart
		addToCart({
			id: p.id,
			name: p.name,
			price: p.price,
			qty: 1,
			size: volume || p.volumes?.[0] || "",
			image: p.image,
		});
		setFeedback(`${p.name} added`);
		setTimeout(() => setFeedback(null), 1600);
	}

	return (
		<main className="pt-24 px-4 sm:px-6 lg:px-12 bg-white min-h-screen text-gray-800">
			<section className="max-w-7xl mx-auto">
				<header className="mb-6 flex items-center justify-between">
					<div>
						<h1 className="text-2xl md:text-3xl font-extrabold text-pink-600">
							Mugs
						</h1>
						<p className="text-sm text-gray-500 mt-1">
							Handcrafted ceramic mugs in soft pastels — multiple capacities,
							durable glaze, animated preview on hover.
						</p>
					</div>
				</header>

				<div className="grid gap-6 grid-cols-1 sm:grid-cols-4 lg:grid-cols-4">
					{products.map((p) => (
						<article
							key={p.id}
							className="bg-white border border-pink-50 rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
						>
							{/* Wrap image section with Link */}
							<Link href={`/product/mugs/${p.slug}`} className="block">
								<div className="relative h-56 bg-gradient-to-br from-pink-50 to-white flex items-center justify-center">
									<div className="absolute top-3 left-3">
										<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-700 shadow-sm animate-pulse">
											{p.badge}
										</span>
									</div>

									<div className="relative w-40 h-40 md:w-44 md:h-44 transform transition duration-500 hover:scale-105">
										<Image
											src={p.image}
											alt={p.name}
											fill
											sizes="(max-width: 768px) 200px, 300px"
											className="object-contain p-4"
											priority={false}
										/>
									</div>
								</div>
							</Link>

							<div className="p-4 sm:p-5">
								<div className="flex items-start justify-between">
									<div>
										<h3 className="text-lg font-semibold text-gray-900">
											{p.name}
										</h3>
										<p className="text-sm text-gray-500 mt-1">
											{p.desc}
										</p>
									</div>
									<div className="text-right">
										<div className="text-xl font-bold text-pink-600">
											₹{p.price}
										</div>
										{/* <div className="text-xs text-gray-400">incl. taxes</div> */}
									</div>
								</div>

								{/* simplified controls: choose mug capacity and add to cart */}
								<div className="mt-4 flex flex-col gap-3">
									<div className="flex items-center gap-3 flex-wrap">
										{p.volumes.map((v) => (
											<button
												key={v}
												onClick={() => handleAddToCart(p, v)} // Updated function name
												className="text-xs px-3 py-1 rounded-md border bg-white text-pink-600 border-pink-100 transition hover:bg-pink-50"
											>
												{v}
											</button>
										))}
									</div>

									<div className="mt-2 flex items-center justify-between gap-3">
										<button
											onClick={() => handleAddToCart(p, p.volumes?.[0])} // Updated function name
											className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-md font-medium shadow hover:brightness-105 transition transform hover:-translate-y-0.5"
										>
											Add to cart
										</button>
										{/* Replace button with Link */}
										<Link href={`/product/mugs/${p.slug}`}>
											<button className="px-3 py-2 border border-pink-100 text-sm rounded-md hover:bg-pink-50 transition">
												View Details
											</button>
										</Link>
									</div>
								</div>
							</div>

							<div className="w-full h-1 bg-gradient-to-r from-pink-200 via-pink-300 to-pink-100" />
						</article>
					))}
				</div>

				<footer className="mt-8 text-center text-sm text-gray-500">
					Showing {products.length} mug designs
				</footer>

				{feedback && (
					<div className="fixed right-6 bottom-6 z-50 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-pink-50 border border-pink-100 text-pink-600 shadow-md animate-[pulse_1.2s_infinite]">
						✓ {feedback}
					</div>
				)}
			</section>
		</main>
	);
}