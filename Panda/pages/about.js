import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState('mission');
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    
    useEffect(() => {
        setIsLoaded(true);
        
        // Auto-rotate testimonials
        const testimonialInterval = setInterval(() => {
            setActiveTestimonial(prev => (prev + 1) % testimonials.length);
        }, 5000);
        
        return () => clearInterval(testimonialInterval);
    }, []);
    
    const teamMembers = [
        {
            name: "Sarah Johnson",
            role: "Founder & Lead Developer",
            bio: "Sarah has over 10 years of experience in web development and is passionate about teaching coding to the next generation.",
            image: "/coder.avif",
            socials: { twitter: "#", github: "#", linkedin: "#" }
        },
        {
            name: "David Park",
            role: "Senior JavaScript Engineer",
            bio: "David specializes in front-end frameworks and has contributed to several open-source projects.",
            image: "/coder2.avif",
            socials: { twitter: "#", github: "#", linkedin: "#" }
        },
        {
            name: "Maya Rodriguez",
            role: "Content Creator & Backend Dev",
            bio: "Maya combines her technical skills with excellent writing to create comprehensive tutorials.",
            image: "/coder3.avif",
            socials: { twitter: "#", github: "#", linkedin: "#" }
        },
        {
            name: "James Wilson",
            role: "UX/UI Designer",
            bio: "James brings beautiful designs to life with a focus on accessibility and user experience.",
            image: "/coder4.avif",
            socials: { twitter: "#", github: "#", linkedin: "#" }
        }
    ];
    
    const stats = [
        { value: "5+", label: "Years of Experience", icon: "📆" },
        { value: "200+", label: "Tutorial Articles", icon: "📝" },
        { value: "50K+", label: "Monthly Readers", icon: "👥" },
        { value: "15+", label: "Online Courses", icon: "🎓" }
    ];
    
    const testimonials = [
        {
            quote: "Hunting Coder tutorials helped me transition from a complete beginner to a confident developer in just a few months.",
            author: "Michael T.",
            role: "Junior Developer",
            image: "/coder5.avif"
        },
        {
            quote: "The in-depth content and clear explanations are exactly what I needed to level up my coding skills.",
            author: "Priya S.",
            role: "Full Stack Developer",
            image: "/coder6.avif"
        },
        {
            quote: "I appreciate how Hunting Coder makes complex topics accessible without oversimplifying them.",
            author: "Alex M.",
            role: "Computer Science Student",
            image: "/coder7.avif"
        }
    ];
    
    return (
        <div className={`bg-gradient-to-b from-slate-50 to-white min-h-screen`}>
            <Head>
                <title>About Us | Hunting Coder</title>
                <meta name="description" content="Learn about the Hunting Coder team, our mission, and our journey." />
            </Head>
            
            {/* Hero Section - New Design */}
            <section className="relative bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 py-24 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <div className="absolute inset-0">
                        {/* Animated Background Elements */}
                        <div className="absolute h-40 w-40 rounded-full bg-white/20 top-20 left-10 animate-float-slow"></div>
                        <div className="absolute h-24 w-24 rounded-full bg-white/20 top-40 right-20 animate-float"></div>
                        <div className="absolute h-56 w-56 rounded-full bg-white/10 bottom-10 left-1/4 animate-float-slow"></div>
                        <div className="absolute h-32 w-32 rounded-full bg-white/15 bottom-40 right-1/3 animate-float"></div>
                        <div className="absolute h-64 w-64 rounded-full border border-white/20 top-1/4 right-1/4 animate-pulse-slow"></div>
                    </div>
                </div>
                
                <div className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                We're <span className="text-yellow-300">Hunting Coder</span>
                            </h1>
                            <p className="text-xl text-blue-100 max-w-xl">
                                A passionate team of developers and educators on a mission to make coding knowledge accessible to everyone.
                            </p>
                            <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
                                <Link href="/blog">
                                    <span className="inline-block bg-white text-indigo-700 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transform hover:scale-105 transition-all duration-300">
                                        Our Blog
                                    </span>
                                </Link>
                                <Link href="/contact">
                                    <span className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
                                        Get in Touch
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            <div className="relative w-64 h-64 md:w-80 md:h-80">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 to-blue-600/80 rounded-full animate-pulse-slow"></div>
                                <div className="absolute top-4 left-4 right-4 bottom-4 rounded-full overflow-hidden border-4 border-white/30">
                                    <img 
                                        src="/coder8.avif" 
                                        alt="Hunting Coder Team" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Curved divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-white h-16 w-full">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,146.86,106.93,208.35,86.19A771.25,771.25,0,0,0,321.39,56.44Z"></path>
                    </svg>
                </div>
            </section>
            
            {/* Our Story Section - Enhanced */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className={`mb-16 text-center transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <span className="text-purple-600 font-medium mb-2 inline-block">OUR JOURNEY</span>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
                            <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
                        </div>
                        
                        <div className="grid md:grid-cols-12 gap-10 items-center">
                            <div className={`md:col-span-5 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                                <div className="relative">
                                    <div className="absolute -top-4 -left-4 w-32 h-32 border-t-4 border-l-4 border-purple-600 opacity-50"></div>
                                    <div className="relative rounded-lg overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                                        <img 
                                            src="/coder.avif" 
                                            alt="Our Journey" 
                                            className="w-full h-auto"
                                        />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-4 border-r-4 border-blue-600 opacity-50"></div>
                                </div>
                            </div>
                            
                            <div className={`md:col-span-7 prose prose-lg max-w-none transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                                <h3 className="text-3xl font-bold text-gray-900 mb-6">From Passion to Platform</h3>
                                <p className="text-gray-700 mb-6">
                                    Hunting Coder began in a small apartment in 2018, when our founder Sarah Johnson decided to share her coding knowledge online. After facing numerous challenges in her own learning journey, she wanted to create resources that would make coding more approachable.
                                </p>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mt-1 mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-700 m-0">
                                            <span className="font-semibold">2018:</span> Launched as a personal blog with weekly tutorials
                                        </p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mt-1 mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-700 m-0">
                                            <span className="font-semibold">2020:</span> Grew to a team of 4 passionate developers and educators
                                        </p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mt-1 mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-700 m-0">
                                            <span className="font-semibold">Today:</span> Over 200 tutorials and a thriving community of learners
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-700">
                                    We believe in making technical skills accessible to everyone, regardless of their background. Our tutorials focus on practical knowledge that you can apply immediately in your projects.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Mission & Values Tabs - Redesigned */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className={`mb-16 text-center transition-all duration-1000 delay-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <span className="text-purple-600 font-medium mb-2 inline-block">WHY WE DO IT</span>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
                            <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
                        </div>
                        
                        <div className={`mb-12 flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            {[
                                { id: 'mission', label: 'Our Mission' },
                                { id: 'values', label: 'Core Values' },
                                { id: 'approach', label: 'Our Approach' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300
                                        ${activeTab === tab.id 
                                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' 
                                            : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        
                        <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                            {activeTab === 'mission' && (
                                <div className="animate-fadeIn">
                                    <div className="bg-white p-10 rounded-2xl shadow-xl border-t-4 border-purple-600">
                                        <div className="flex flex-col md:flex-row gap-8 items-start">
                                            <div className="md:w-1/3 flex justify-center">
                                                <div className="w-full aspect-square max-w-xs relative">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full animate-pulse-slow"></div>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <img 
                                                            src="/coder2.avif" 
                                                            alt="Our Mission" 
                                                            className="w-3/4 h-3/4 object-cover rounded-full border-4 border-white shadow-lg"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:w-2/3">
                                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Empowering Through Education</h3>
                                                <p className="text-gray-700 mb-6 text-lg">
                                                    Our mission at Hunting Coder is to democratize programming knowledge and make technical education accessible to everyone, regardless of their background or prior experience.
                                                </p>
                                                <p className="text-gray-700 mb-8 text-lg">
                                                    We strive to create content that bridges the gap between theory and practice, equipping our readers with both fundamental knowledge and real-world applications that can transform their careers and lives.
                                                </p>
                                                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border-l-4 border-purple-600">
                                                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Our Promise</h4>
                                                    <p className="text-gray-700">
                                                        To provide high-quality, up-to-date content that's both comprehensive and approachable, helping you achieve your coding goals step by step.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {activeTab === 'values' && (
                                <div className="animate-fadeIn">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {[
                                            {
                                                title: "Accessibility",
                                                description: "We create content that's accessible to people of all backgrounds and experience levels.",
                                                color: "from-purple-500 to-indigo-500",
                                                image: "/coder3.avif"
                                            },
                                            {
                                                title: "Quality",
                                                description: "We prioritize depth and accuracy in our content, ensuring our readers receive reliable information.",
                                                color: "from-blue-500 to-cyan-500",
                                                image: "/coder4.avif"
                                            },
                                            {
                                                title: "Innovation",
                                                description: "We embrace new technologies and teaching methods to keep our content fresh and relevant.",
                                                color: "from-cyan-500 to-teal-500",
                                                image: "/coder5.avif"
                                            },
                                            {
                                                title: "Community",
                                                description: "We foster a supportive community where developers can learn from each other and grow together.",
                                                color: "from-teal-500 to-green-500",
                                                image: "/coder6.avif"
                                            }
                                        ].map((value, index) => (
                                            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                                <div className="h-40 overflow-hidden">
                                                    <div className="relative h-full w-full">
                                                        <div className={`absolute inset-0 bg-gradient-to-r ${value.color} opacity-80`}></div>
                                                        <img 
                                                            src={value.image} 
                                                            alt={value.title} 
                                                            className="w-full h-full object-cover mix-blend-overlay"
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <h3 className="text-2xl font-bold text-white">{value.title}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-6">
                                                    <p className="text-gray-700">{value.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {activeTab === 'approach' && (
                                <div className="animate-fadeIn">
                                    <div className="bg-white p-10 rounded-2xl shadow-xl">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Educational Approach</h3>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            {[
                                                {
                                                    title: "Learn by Doing",
                                                    description: "We emphasize practical exercises and real-world projects that reinforce concepts through hands-on experience.",
                                                    image: "/coder7.avif",
                                                    color: "bg-purple-100 text-purple-600"
                                                },
                                                {
                                                    title: "Progressive Learning",
                                                    description: "Our content is structured to guide you from foundational concepts to advanced topics in a logical progression.",
                                                    image: "/coder8.avif",
                                                    color: "bg-blue-100 text-blue-600"
                                                },
                                                {
                                                    title: "Multiple Formats",
                                                    description: "We offer various content types—articles, tutorials, videos, and interactive examples—for different learning styles.",
                                                    image: "/coder.avif",
                                                    color: "bg-teal-100 text-teal-600"
                                                }
                                            ].map((item, index) => (
                                                <div key={index} className="flex flex-col items-center text-center">
                                                    <div className="mb-6 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.title} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <h4 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h4>
                                                    <p className="text-gray-700">{item.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div className="mt-12 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0 mt-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-yellow-800">
                                                        We continuously refine our approach based on feedback and advancements in education research, ensuring our teaching methods remain effective.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Stats Section - Redesigned */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className={`max-w-5xl mx-auto transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div 
                                    key={index} 
                                    className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:-translate-y-2 transition-all duration-300"
                                    style={{ transitionDelay: `${1000 + index * 100}ms` }}
                                >
                                    <div className="text-5xl mb-4">{stat.icon}</div>
                                    <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Team Section - Redesigned */}
            <section className="py-20 bg-gradient-to-br from-slate-100 to-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className={`mb-16 text-center transition-all duration-1000 delay-1200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <span className="text-purple-600 font-medium mb-2 inline-block">OUR EXPERTS</span>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                            <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6"></div>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                We're a diverse group of educators, developers, and designers with a shared passion for making coding more accessible.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamMembers.map((member, index) => (
                                <div 
                                    key={index} 
                                    className={`bg-white rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-500
                                    ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                    style={{ transitionDelay: `${1300 + index * 150}ms` }}
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img 
                                            src={member.image} 
                                            alt={member.name} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                                            <div className="p-4 w-full">
                                                <div className="flex justify-center space-x-4">
                                                    {Object.keys(member.socials).map(platform => (
                                                        <a 
                                                            key={platform} 
                                                            href={member.socials[platform]} 
                                                            className="text-white hover:text-blue-300 transition-colors"
                                                            aria-label={`${member.name}'s ${platform}`}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                            </svg>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                        <div className="text-purple-600 text-sm font-medium mb-3">{member.role}</div>
                                        <p className="text-gray-600 text-sm">{member.bio}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Testimonials Section - Redesigned as Carousel */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className={`mb-16 text-center transition-all duration-1000 delay-1800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <span className="text-purple-600 font-medium mb-2 inline-block">TESTIMONIALS</span>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
                            <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
                        </div>
                        
                        <div className={`relative bg-white rounded-2xl shadow-xl p-8 md:p-12 transition-all duration-1000 delay-1900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            {testimonials.map((testimonial, index) => (
                                <div 
                                    key={index}
                                    className={`transition-opacity duration-500 absolute inset-0 flex flex-col md:flex-row items-center p-8 md:p-12 ${activeTestimonial === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                >
                                    <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
                                        <div className="relative w-32 h-32 md:w-48 md:h-48">
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full animate-pulse-slow"></div>
                                            <div className="absolute top-2 left-2 right-2 bottom-2 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                                <img 
                                                    src={testimonial.image} 
                                                    alt={testimonial.author} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:w-2/3 md:pl-12">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-200 mb-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                        </svg>
                                        <p className="text-gray-700 italic text-lg md:text-xl mb-6">{testimonial.quote}</p>
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-900">{testimonial.author}</h4>
                                            <div className="text-purple-600">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Static version for layout purposes */}
                            <div className="opacity-0 flex flex-col md:flex-row items-center p-8 md:p-12 pointer-events-none">
                                <div className="md:w-1/3 mb-8 md:mb-0">
                                    <div className="w-32 h-32 md:w-48 md:h-48"></div>
                                </div>
                                <div className="md:w-2/3 md:pl-12">
                                    <div className="h-12 mb-6"></div>
                                    <div className="h-32 mb-6"></div>
                                    <div>
                                        <div className="h-6"></div>
                                        <div className="h-4 mt-1"></div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Carousel controls */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                                {testimonials.map((_, index) => (
                                    <button 
                                        key={index}
                                        className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === index ? 'bg-purple-600 w-6' : 'bg-gray-300'}`}
                                        onClick={() => setActiveTestimonial(index)}
                                        aria-label={`View testimonial ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Contact CTA - Redesigned */}
            <section className="py-20 bg-gradient-to-br from-slate-100 to-white">
                <div className="container mx-auto px-4">
                    <div className={`max-w-5xl mx-auto transition-all duration-1000 delay-2100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-12 -mr-12"></div>
                                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full -mb-20 -ml-20"></div>
                                
                                <div className="relative p-12 md:p-16 text-center">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Coding Journey?</h2>
                                    <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-lg">
                                        Whether you have questions, feedback, or just want to connect with our team, we'd love to hear from you!
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-4">
                                        <Link href="/contact">
                                            <span className="inline-block bg-white text-indigo-700 hover:bg-blue-50 px-8 py-4 rounded-lg font-medium transition-all hover:shadow-lg transform hover:scale-105">
                                                Contact Us
                                            </span>
                                        </Link>
                                        <Link href="/blog">
                                            <span className="inline-block bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-medium transition-all transform hover:scale-105">
                                                Read Our Blog
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Global animations */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-in-out;
                }
                
                @keyframes float {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0); }
                }
                
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                
                .animate-float-slow {
                    animation: float 6s ease-in-out infinite;
                }
                
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.8; }
                    50% { opacity: 0.4; }
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default About;