import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function NextjsTutorial() {
  return (
    <>
      <Head>
        <title>How to Learn Next.js - Hunting Coder</title>
        <meta name="description" content="Master Next.js - A comprehensive guide to building modern React applications with server-side rendering and static site generation." />
      </Head>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
          <Image
            src="/coder4.avif"
            alt="Learn Next.js Development"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
              React Framework
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How to Learn Next.js
            </h1>
            <div className="flex items-center text-white/90 space-x-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium mr-2">
                  MJ
                </div>
                <span>Mike Johnson</span>
              </div>
              <span>•</span>
              <span>12 min read</span>
            </div>
          </div>
        </div>

        {/* Content */ }
            <div className="prose prose-lg max-w-none relative group">
              <p className="lead transform transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 opacity-95">
                Next.js has revolutionized React development by providing an intuitive framework for building production-ready applications. 
                This guide will walk you through everything you need to know about Next.js.
              </p>

              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Getting Started with Next.js
              </h2>
              <div className="h-1 w-28 rounded mb-4 bg-gradient-to-r from-indigo-400 to-pink-400 opacity-90 animate-pulse"></div>
              <p>
                Create a new Next.js project using the following command:
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8 shadow-sm relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80 animate-pulse"></div>
                <pre className="bg-black/95 text-white p-4 rounded-lg overflow-x-auto ring-1 ring-indigo-600/10">
                  <code>npx create-next-app@latest my-next-app</code>
                </pre>
              </div>

              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Key Features of Next.js
              </h2>
              <div className="h-1 w-24 rounded mb-4 bg-gradient-to-r from-indigo-400 to-pink-400 opacity-90 animate-pulse"></div>
              <ul>
                <li className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 mr-3 mt-2" />Server-Side Rendering (SSR)</li>
                <li className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 mr-3 mt-2" />Static Site Generation (SSG)</li>
                <li className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 mr-3 mt-2" />Incremental Static Regeneration (ISR)</li>
                <li className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 mr-3 mt-2" />API Routes</li>
                <li className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 mr-3 mt-2" />File-based Routing</li>
                <li className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 mr-3 mt-2" />Built-in Image Optimization</li>
              </ul>

              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Understanding File-based Routing
              </h2>
              <p>
                Next.js uses a file-based routing system. Files in the pages directory automatically become routes:
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8 shadow-sm">
                <pre className="bg-black/95 text-white p-4 rounded-lg overflow-x-auto ring-1 ring-indigo-600/10">
                  <code>{`pages/
          index.js         // -> /
          about.js        // -> /about
          blog/
            [slug].js     // -> /blog/:slug
            index.js      // -> /blog`}</code>
                </pre>
              </div>

              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Data Fetching Methods
              </h2>
              <p>
                Next.js provides several ways to fetch data:
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8 shadow-sm">
                <pre className="bg-black/95 text-white p-4 rounded-lg overflow-x-auto ring-1 ring-indigo-600/10">
                  <code>{`// getStaticProps (Static Generation)
        export async function getStaticProps() {
          const res = await fetch('https://api.example.com/data')
          const data = await res.json()
          return {
            props: { data }
          }
        }

        // getServerSideProps (Server-side Rendering)
        export async function getServerSideProps() {
          const res = await fetch('https://api.example.com/data')
          const data = await res.json()
          return {
            props: { data }
          }
        }`}</code>
                </pre>
              </div>

              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Image Optimization
              </h2>
              <p>
                Use the Next.js Image component for automatic optimization:
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8 shadow-sm">
                <pre className="bg-black/95 text-white p-4 rounded-lg overflow-x-auto ring-1 ring-indigo-600/10">
                  <code>{`import Image from 'next/image'

        function MyComponent() {
          return (
            <Image
              src="/profile.jpg"
              alt="Profile"
              width={500}
              height={300}
              priority
            />
          )
        }`}</code>
                </pre>
              </div>

              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                API Routes
              </h2>
              <p>
                Create API endpoints in your Next.js application:
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8 shadow-sm">
                <pre className="bg-black/95 text-white p-4 rounded-lg overflow-x-auto ring-1 ring-indigo-600/10">
                  <code>{`// pages/api/hello.js
        export default function handler(req, res) {
          if (req.method === 'POST') {
            // Process POST request
            res.status(200).json({ message: 'Hello from API!' })
          } else {
            // Handle other methods
            res.status(405).json({ message: 'Method not allowed' })
          }
        }`}</code>
                </pre>
              </div>

              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Deployment
              </h2>
              <p>
                Deploy your Next.js application using Vercel for the best experience:
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8 shadow-sm">
                <pre className="bg-black/95 text-white p-4 rounded-lg overflow-x-auto ring-1 ring-indigo-600/10">
                  <code>vercel</code>
                </pre>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-tr from-purple-300 to-pink-300 opacity-20 blur-3xl transform rotate-45 animate-pulse"></div>
                <h3 className="text-blue-800 font-semibold mb-2">Pro Tip</h3>
                <p className="text-blue-700 mb-0">
                  Use the App Router for new projects to take advantage of React Server Components and other modern features.
                </p>
              </div>

              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Next Steps
              </h2>
              <ul>
                <li className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 mr-3 mt-2" />Explore middleware functionality</li>
                <li className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 mr-3 mt-2" />Learn about internationalization</li>
                <li className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 mr-3 mt-2" />Implement authentication</li>
                <li className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 mr-3 mt-2" />Master dynamic routing</li>
                <li className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 mr-3 mt-2" />Optimize performance</li>
              </ul>
            </div>

            {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link 
            href="/blog"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center group"
          >
            <svg className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </article>
    </>
  );
}