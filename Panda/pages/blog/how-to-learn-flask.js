import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function FlaskTutorial() {
  return (
    <>
      <Head>
        <title>How to Learn Flask - Hunting Coder</title>
        <meta name="description" content="Learn Flask from scratch - A comprehensive guide to building web applications with Python Flask framework." />
      </Head>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
          <Image
            src="/coder6.avif"
            alt="Learn Flask Development"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
              Python Framework
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How to Learn Flask
            </h1>
            <div className="flex items-center text-white/90 space-x-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium mr-2">
                  JD
                </div>
                <span>John Doe</span>
              </div>
              <span>•</span>
              <span>10 min read</span>
            </div>
          </div>
        </div>

        {/* Content */}
          <div className="prose prose-lg max-w-none flask-content">
            <p className="lead">
              Flask has emerged as one of the most popular Python web frameworks, known for its simplicity and flexibility. 
              This comprehensive guide will help you master Flask development from basics to advanced concepts.
            </p>

            <h2 className="heading">Getting Started with Flask</h2>
            <p>
              Before diving into Flask, ensure you have Python installed on your system. Flask is a micro web framework that doesn't 
              require particular tools or libraries, making it easy to get started with.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8 panel">
              <h3 className="text-lg font-semibold mb-4 panel-title">Installation</h3>
              <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto code-block">
                <code>pip install flask</code>
              </pre>
            </div>

            <h2 className="heading">Creating Your First Flask Application</h2>
            <p>
              Let's create a simple Flask application to understand the basics:
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8 panel">
              <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto code-block">
                <code>{`from flask import Flask
        app = Flask(__name__)

        @app.route('/')
        def hello_world():
            return 'Hello, Flask!'

        if __name__ == '__main__':
            app.run(debug=True)`}</code>
              </pre>
            </div>

            <h2 className="heading">Essential Flask Concepts</h2>
            <ul className="concept-list">
              <li>Routing and URL Building</li>
              <li>Template Rendering with Jinja2</li>
              <li>Working with Forms</li>
              <li>Database Integration</li>
              <li>User Authentication</li>
            </ul>

            <h2 className="heading">Working with Templates</h2>
            <p>
              Flask uses Jinja2 templating engine to render HTML templates. Here's a basic example:
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8 panel">
              <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto code-block">
                <code>{`@app.route('/hello/<name>')
        def hello(name):
            return render_template('hello.html', name=name)

        # hello.html
        <!DOCTYPE html>
        <html>
        <head>
            <title>Hello</title>
        </head>
        <body>
            <h1>Hello {{ name }}!</h1>
        </body>
        </html>`}</code>
              </pre>
            </div>

            <h2 className="heading">Database Integration with Flask-SQLAlchemy</h2>
            <p>
              Flask-SQLAlchemy makes it easy to work with databases in Flask applications:
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8 panel">
              <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto code-block">
                <code>{`from flask_sqlalchemy import SQLAlchemy

        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
        db = SQLAlchemy(app)

        class User(db.Model):
            id = db.Column(db.Integer, primary_key=True)
            username = db.Column(db.String(80), unique=True, nullable=False)
            email = db.Column(db.String(120), unique=True, nullable=False)`}</code>
              </pre>
            </div>

            <h2 className="heading">Building RESTful APIs</h2>
            <p>
              Flask is excellent for building RESTful APIs. Here's a simple example:
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8 panel">
              <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto code-block">
                <code>{`@app.route('/api/users', methods=['GET'])
        def get_users():
            users = User.query.all()
            return jsonify([{
          'id': user.id,
          'username': user.username
            } for user in users])`}</code>
              </pre>
            </div>

            <h2 className="heading">Next Steps</h2>
            <p>
              After mastering these basics, explore advanced topics like:
            </p>
            <ul className="concept-list">
              <li>Flask Blueprints for large applications</li>
              <li>Testing Flask applications</li>
              <li>Deployment strategies</li>
              <li>Performance optimization</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8 tip-panel">
              <h3 className="text-blue-800 font-semibold mb-2">Pro Tip</h3>
              <p className="text-blue-700 mb-0">
                Always use virtual environments for your Flask projects to manage dependencies effectively.
              </p>
            </div>
          </div>

          <style jsx>{`
            /* Scoped styles for this content only */
            .flask-content {
              --accent-start: #7c3aed; /* indigo-600 */
              --accent-end: #06b6d4;   /* cyan-500 */
            }

            .flask-content .heading {
              background: linear-gradient(90deg, var(--accent-start), var(--accent-end));
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              font-weight: 700;
              position: relative;
              display: inline-block;
              animation: fadeUp 600ms ease both;
            }

            .flask-content .lead {
              color: #334155; /* slate-700 */
              font-size: 1.05rem;
              animation: fadeUp 700ms ease both;
              transform-origin: center;
            }

            .flask-content .panel {
              box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
              border-image: linear-gradient(90deg, rgba(124,58,237,0.12), rgba(6,182,212,0.12)) 1;
              transition: transform 250ms ease, box-shadow 250ms ease;
              animation: float 3000ms ease-in-out infinite;
            }

            .flask-content .panel:hover {
              transform: translateY(-6px) scale(1.01);
              box-shadow: 0 12px 30px rgba(15,23,42,0.12);
              animation-play-state: paused;
            }

            .flask-content .panel-title {
              display: inline-flex;
              align-items: center;
              gap: .5rem;
            }

            .flask-content .panel-title::before {
              content: "";
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: linear-gradient(45deg, var(--accent-start), var(--accent-end));
              box-shadow: 0 4px 12px rgba(6,182,212,0.12);
            }

            .flask-content .code-block {
              background: linear-gradient(180deg, #0f172a, #020617);
              border-radius: .5rem;
              position: relative;
              overflow: hidden;
              animation: codeIn 500ms cubic-bezier(.2,.9,.2,1) both;
            }

            .flask-content .code-block::after {
              content: "";
              position: absolute;
              top: 0;
              left: -60%;
              width: 60%;
              height: 100%;
              background: linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.08), rgba(255,255,255,0.03));
              transform: skewX(-18deg);
              animation: shimmer 2.2s linear infinite;
              pointer-events: none;
            }

            .flask-content .concept-list {
              list-style: none;
              padding-left: 0;
              margin: 0;
              display: grid;
              gap: .5rem;
            }

            .flask-content .concept-list li {
              position: relative;
              padding-left: 1.75rem;
              color: #0f172a;
            }

            .flask-content .concept-list li::before {
              content: "";
              position: absolute;
              left: 0;
              top: .45rem;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: linear-gradient(45deg, var(--accent-start), var(--accent-end));
              box-shadow: 0 6px 18px rgba(124,58,237,0.08);
              transform-origin: center;
              animation: pulse 2200ms infinite;
            }

            .flask-content .tip-panel {
              background: linear-gradient(180deg, rgba(224,242,254,0.6), rgba(255,255,255,0.4));
              border-image: linear-gradient(90deg, rgba(37,99,235,0.18), rgba(14,165,233,0.08)) 1;
              animation: fadeUp 500ms ease both;
            }

            /* Animations */
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(8px); }
              to { opacity: 1; transform: translateY(0); }
            }

            @keyframes float {
              0% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
              100% { transform: translateY(0); }
            }

            @keyframes shimmer {
              0% { left: -60%; }
              100% { left: 120%; }
            }

            @keyframes codeIn {
              from { opacity: 0; transform: translateY(6px) scale(.995); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }

            @keyframes pulse {
              0% { transform: scale(1); opacity: .95; }
              50% { transform: scale(1.18); opacity: 1; }
              100% { transform: scale(1); opacity: .95; }
            }

            /* Respect prefers-reduced-motion */
            @media (prefers-reduced-motion: reduce) {
              .flask-content .panel,
              .flask-content .code-block,
              .flask-content .heading,
              .flask-content .lead,
              .flask-content .tip-panel {
                animation: none !important;
                transition: none !important;
              }
              .flask-content .code-block::after,
              .flask-content .concept-list li::before {
                animation: none !important;
              }
            }
          `}</style>

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