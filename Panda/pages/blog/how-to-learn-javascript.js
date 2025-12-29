import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function JavaScriptTutorial() {
  return (
    <>
      <Head>
        <title>How to Learn JavaScript - Hunting Coder</title>
        <meta name="description" content="Master JavaScript from basics to advanced concepts - A comprehensive guide for modern web development." />
      </Head>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
          <Image
            src="/coder5.avif"
            alt="Learn JavaScript Development"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
              JavaScript
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How to Learn JavaScript
            </h1>
            <div className="flex items-center text-white/90 space-x-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-medium mr-2">
                  JS
                </div>
                <span>Jane Smith</span>
              </div>
              <span>•</span>
              <span>15 min read</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none space-y-8">
          <p className="lead text-slate-700 dark:text-slate-200">
            JavaScript is the backbone of modern web development. From interactive websites to full-stack applications,
            JavaScript's versatility makes it an essential language to master.
          </p>

          <h2 className="text-sky-600 dark:text-sky-400 font-extrabold tracking-tight">
            JavaScript Fundamentals
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Let's start with the core concepts that every JavaScript developer should know:
          </p>

          <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/60 dark:from-slate-800 dark:to-slate-700 border border-slate-700 rounded-xl p-1 my-8 shadow-lg transform transition hover:scale-[1.01]">
            <div className="rounded-lg overflow-hidden">
              <div className="flex items-center justify-between bg-slate-800/80 px-4 py-2 border-b border-slate-700">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
                  <span className="text-sm text-slate-200 font-medium">example.js</span>
                </div>
                <div className="text-slate-400 text-sm flex items-center space-x-2">
                  <button className="opacity-80 hover:opacity-100 transition-transform hover:-translate-y-0.5" aria-hidden>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4-4-4-4m5 8l4-4-4-4" />
                    </svg>
                  </button>
                </div>
              </div>
              <pre className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 overflow-x-auto">
                <code className="language-js">{`// Variables and Data Types
        let name = 'John';           // String
        const age = 25;             // Number
        let isStudent = true;       // Boolean
        let skills = ['JS', 'React']; // Array
        let user = {                // Object
          name: 'John',
          age: 25
        };`}</code>
              </pre>
            </div>
          </div>

          <h2 className="text-emerald-600 dark:text-emerald-400 font-extrabold tracking-tight">
            ES6+ Features
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Modern JavaScript includes powerful features that make coding more efficient:
          </p>

          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-1 my-8 shadow-inner">
            <div className="rounded-lg overflow-hidden">
              <div className="flex items-center justify-between bg-emerald-100 px-4 py-2 border-b border-emerald-200">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
                  <span className="text-sm text-emerald-700 font-medium">modern.js</span>
                </div>
                <div className="text-emerald-600 text-sm">ES6+</div>
              </div>
              <pre className="bg-slate-900 text-white p-5 overflow-x-auto">
                <code className="language-js">{`// Arrow Functions
        const add = (a, b) => a + b;

        // Destructuring
        const { name, age } = user;

        // Spread Operator
        const newArray = [...skills, 'TypeScript'];

        // Template Literals
        const message = \`Hello \${name}!\`;

        // Async/Await
        async function fetchData() {
          try {
            const response = await fetch('api/data');
            const data = await response.json();
            return data;
          } catch (error) {
            console.error('Error:', error);
          }
        }`}</code>
              </pre>
            </div>
          </div>

          <h2 className="text-violet-600 dark:text-violet-400 font-extrabold tracking-tight">
            DOM Manipulation
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Understanding how to interact with the Document Object Model (DOM) is crucial:
          </p>

          <div className="bg-gradient-to-r from-violet-50 to-violet-100 border border-violet-200 rounded-xl p-1 my-8 shadow-md hover:shadow-lg transition">
            <div className="rounded-lg overflow-hidden">
              <div className="flex items-center justify-between bg-violet-100 px-4 py-2 border-b border-violet-200">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                  <span className="text-sm text-violet-700 font-medium">dom.js</span>
                </div>
                <div className="text-violet-600 text-sm">DOM</div>
              </div>
              <pre className="bg-slate-900 text-white p-5 overflow-x-auto">
                <code className="language-js">{`// Selecting Elements
        const element = document.querySelector('.my-class');
        const elements = document.querySelectorAll('.item');

        // Modifying Elements
        element.innerHTML = 'New content';
        element.classList.add('active');
        element.style.backgroundColor = 'blue';

        // Event Handling
        element.addEventListener('click', (e) => {
          console.log('Element clicked!');
        });`}</code>
              </pre>
            </div>
          </div>

          <h2 className="text-amber-600 dark:text-amber-400 font-extrabold tracking-tight">
            Asynchronous Programming
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Master asynchronous JavaScript to handle operations efficiently:
          </p>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-1 my-8 shadow-lg transform transition hover:scale-[1.01]">
            <div className="rounded-lg overflow-hidden">
              <div className="flex items-center justify-between bg-amber-100 px-4 py-2 border-b border-amber-200">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span className="text-sm text-amber-700 font-medium">async.js</span>
                </div>
                <div className="text-amber-600 text-sm">Async</div>
              </div>
              <pre className="bg-slate-900 text-white p-5 overflow-x-auto">
                <code className="language-js">{`// Promises
        fetch('https://api.example.com/data')
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));

        // Async/Await with Error Handling
        async function getData() {
          try {
            const response = await fetch('https://api.example.com/data');
            const data = await response.json();
            return data;
          } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
          }
        }`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-8 shadow-sm">
            <h3 className="text-yellow-800 font-semibold mb-2 flex items-center space-x-2">
              <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
              <span>Pro Tip</span>
            </h3>
            <p className="text-yellow-700 mb-0">
              Always use const for variables that won't be reassigned, and let for variables that will.
              Avoid using var as it can lead to scope-related issues.
            </p>
          </div>

          <h2 className="text-cyan-600 dark:text-cyan-400 font-extrabold tracking-tight">Modern JavaScript Development</h2>
          <ul className="list-disc pl-6 space-y-1 text-slate-600 dark:text-slate-300">
            <li className="hover:text-cyan-700 transition">Package management with npm/yarn</li>
            <li className="hover:text-cyan-700 transition">Module bundlers (Webpack, Vite)</li>
            <li className="hover:text-cyan-700 transition">Testing frameworks (Jest, Vitest)</li>
            <li className="hover:text-cyan-700 transition">Code quality tools (ESLint, Prettier)</li>
            <li className="hover:text-cyan-700 transition">Modern frameworks (React, Vue, Angular)</li>
          </ul>

          <h2 className="text-rose-600 dark:text-rose-400 font-extrabold tracking-tight">Best Practices</h2>
          <ul className="list-disc pl-6 space-y-1 text-slate-600 dark:text-slate-300">
            <li className="hover:text-rose-700 transition">Write clean, maintainable code</li>
            <li className="hover:text-rose-700 transition">Use meaningful variable names</li>
            <li className="hover:text-rose-700 transition">Handle errors properly</li>
            <li className="hover:text-rose-700 transition">Write documentation</li>
            <li className="hover:text-rose-700 transition">Follow consistent coding standards</li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex space-x-4 mb-4">
            <Link
              href="/blog/how-to-learn-javascript"
              className="text-blue-600 hover:text-blue-800"
            >
              How to Learn JavaScript
            </Link>
            <Link
              href="/blog/advanced-javascript-techniques"
              className="text-blue-600 hover:text-blue-800"
            >
              Advanced JavaScript Techniques
            </Link>
          </div>

          <Link 
            href="/blog"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center group"
          >
            <svg 
              className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </article>
    </>
  );
}