import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/home.module.css';
import { useInView } from 'react-intersection-observer';

//step1: Collect all the files from blogdata directory
//step2: Iterate through them and display them

const Blog = () => {
    const [animatedPosts, setAnimatedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [allPosts, setAllPosts] = useState([]);
    
    const postsPerPage = 4;
    
    // Blog posts data - now representing a larger dataset
    const blogPostsData = [
        {
            id: 1,
            title: "Modern JavaScript Features Every Coder Should Know",
            excerpt: "Discover the essential JavaScript features that can dramatically improve your coding efficiency and code quality.",
            image: "/coder.avif",
            category: "JavaScript",
            date: "May 15, 2023"
        },
        {
            id: 2,
            title: "The Rise of TypeScript in Web Development",
            excerpt: "Why TypeScript has become the go-to language for large scale applications and how it's changing the development landscape.",
            image: "/coder2.avif",
            category: "TypeScript",
            date: "June 3, 2023"
        },
        {
            id: 3,
            title: "Optimizing React Performance: Best Practices",
            excerpt: "Learn techniques to optimize your React applications for better speed, responsiveness, and user experience.",
            image: "/coder3.avif",
            category: "React",
            date: "July 22, 2023"
        },
        {
            id: 4,
            title: "The Future of Web Development with Next.js",
            excerpt: "How Next.js is redefining the way we build web applications with its powerful features and optimizations.",
            image: "/coder4.avif",
            category: "Next.js",
            date: "August 10, 2023"
        },
        {
            id: 5,
            title: "Mastering CSS Grid Layout",
            excerpt: "A comprehensive guide to using CSS Grid for creating complex, responsive layouts with ease.",
            image: "/coder5.avif",
            category: "CSS",
            date: "September 5, 2023"
        },
        {
            id: 6,
            title: "Introduction to GraphQL",
            excerpt: "Learn how GraphQL can revolutionize your API development and improve frontend-backend communication.",
            image: "/coder6.avif",
            category: "Backend",
            date: "September 18, 2023"
        },
        {
            id: 7,
            title: "Demystifying Closures in JavaScript",
            excerpt: "Understanding closures is essential for writing clean, efficient JavaScript. This article breaks it down simply.",
            image: "/coder7.avif",
            category: "JavaScript",
            date: "October 2, 2023"
        },
        {
            id: 8,
            title: "Building a REST API with Node.js and Express",
            excerpt: "Step by step guide to creating a robust RESTful API using Node.js and Express framework.",
            image: "/coder8.avif",
            category: "Backend",
            date: "October 15, 2023"
        },
        {
            id: 9,
            title: "State Management in React: Context vs Redux",
            excerpt: "Compare different state management approaches in React and learn when to use each one.",
            image: "/coder3.avif",
            category: "React",
            date: "November 3, 2023"
        },
        {
            id: 10,
            title: "Web Accessibility: Building Inclusive Applications",
            excerpt: "Learn how to make your web applications accessible to everyone, including users with disabilities.",
            image: "/coder2.avif",
            category: "Accessibility",
            date: "November 20, 2023"
        },
        {
            id: 11,
            title: "Getting Started with Docker for Web Developers",
            excerpt: "Simplify your development environment setup and deployment process with Docker containers.",
            image: "/coder5.avif",
            category: "DevOps",
            date: "December 7, 2023"
        },
        {
            id: 12,
            title: "Functional Programming in JavaScript",
            excerpt: "Explore functional programming concepts and how to apply them in your JavaScript projects.",
            image: "/coder8.avif",
            category: "JavaScript",
            date: "December 22, 2023"
        }
    ];

    // Setup intersection observer for infinite scrolling
    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: false
    });

    // Function to load more posts
    const loadMorePosts = useCallback(() => {
        if (isLoading || !hasMore) return;
        
        setIsLoading(true);
        
        // Simulate API call with setTimeout
        setTimeout(() => {
            const startIndex = (page - 1) * postsPerPage;
            const endIndex = page * postsPerPage;
            const newPosts = blogPostsData.slice(startIndex, endIndex);
            
            if (newPosts.length === 0) {
                setHasMore(false);
            } else {
                setAllPosts(prevPosts => [...prevPosts, ...newPosts]);
                setPage(prevPage => prevPage + 1);
                
                // Add animation for newly loaded posts
                setTimeout(() => {
                    setAnimatedPosts(prev => [...prev, ...newPosts.map(post => post.id)]);
                }, 100);
            }
            
            setIsLoading(false);
        }, 800); // Simulate network delay
    }, [page, isLoading, hasMore]);

    // Initial load of posts
    useEffect(() => {
        setAllPosts(blogPostsData.slice(0, postsPerPage));
        setPage(2);
        
        // Animate initial posts
        const timer = setTimeout(() => {
            setAnimatedPosts(blogPostsData.slice(0, postsPerPage).map(post => post.id));
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);

    // Load more posts when scrolling to the bottom
    useEffect(() => {
        if (inView) {
            loadMorePosts();
        }
    }, [inView, loadMorePosts]);

    return (
        <>
            <Head>
                <title>Blog | Hunting Coder</title>
                <meta name="description" content="Blog articles for developers and coding enthusiasts" />
            </Head>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="relative rounded-xl overflow-hidden mb-16 h-80">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-80"></div>
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 animate-fadeIn">
                            The Hunting Coder Blog
                        </h1>
                        <p className="text-xl text-white max-w-3xl animate-slideUp">
                            Insights, tutorials, and stories for modern developers looking to level up their coding skills
                        </p>
                    </div>
                </div>

                {/* Featured Categories */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {['All', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'Backend', 'CSS', 'DevOps'].map((category) => (
                        <span 
                            key={category}
                            className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all 
                                       hover:scale-105 ${category === 'JavaScript' ? 'bg-yellow-200 text-yellow-800' : 
                                       category === 'React' ? 'bg-blue-200 text-blue-800' : 
                                       category === 'Next.js' ? 'bg-black text-white' : 
                                       category === 'TypeScript' ? 'bg-blue-700 text-white' : 
                                       category === 'CSS' ? 'bg-pink-200 text-pink-800' :
                                       category === 'DevOps' ? 'bg-gray-200 text-gray-800' :
                                       category === 'All' ? 'bg-purple-200 text-purple-800' :
                                       'bg-green-200 text-green-800'}`}
                        >
                            {category}
                        </span>
                    ))}
                </div>

                {/* Blog Posts Grid with Infinite Scroll */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {allPosts.map((post) => (
                        <div 
                            key={post.id} 
                            className={`bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-xl 
                                      ${animatedPosts.includes(post.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{transitionDelay: `${(post.id % postsPerPage) * 150}ms`}}
                        >
                            <div className="relative h-60 w-full">
                                <img 
                                    src={post.image} 
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                                    <Link href={`/blogpost/${post.id}`}>
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                                <Link 
                                    href={`/blogpost/${post.id}`}
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Read more
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Loading indicator and sentinel for intersection observer */}
                <div ref={ref} className="py-8 flex justify-center">
                    {isLoading && (
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                            <p className="text-gray-500">Loading more posts...</p>
                        </div>
                    )}
                    {!isLoading && !hasMore && allPosts.length > 0 && (
                        <div className="py-4 text-gray-500 text-center">
                            You've reached the end of the posts!
                        </div>
                    )}
                </div>

                {/* Newsletter Section */}
                <div className="mt-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white text-center">
                    <h2 className="text-2xl font-bold mb-4">Join Our Coding Community</h2>
                    <p className="mb-6 max-w-2xl mx-auto">Get weekly coding tips, tutorials and resources directly to your inbox.</p>
                    <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="flex-1 px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <button className="bg-white text-blue-600 font-medium px-6 py-2 rounded-md hover:bg-gray-100 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Add some global styles */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 1s ease-out forwards;
                }
                
                .animate-slideUp {
                    animation: slideUp 0.8s ease-out forwards;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
            `}</style>
        </>
    );
};

export default Blog;