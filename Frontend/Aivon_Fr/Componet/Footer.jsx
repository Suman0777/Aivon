import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100/30 border-t border-gray-200 mt-20">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* 1️ Logo + Description */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/lodoss.png"
              alt="Aivon Logo"
              className="w-10 h-10 object-contain"
            />
            <h2 className="text-xl font-semibold text-gray-900">
              Aivon.ai
            </h2>
          </div>

          <p className="mt-6 text-gray-600 text-sm leading-relaxed max-w-sm">
            Experience the power of AI with Aivon. Transform your content
            creation with our suite of premium AI tools. Write articles,
            generate images, and enhance your workflow.
          </p>
        </div>

        {/* 2️ Company Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Company
          </h3>

          <div className="flex flex-col gap-4 text-gray-600 text-sm">
            <a href="#" className="hover:text-black transition">
              Home
            </a>
            <a href="#" className="hover:text-black transition">
              About Us
            </a>
            <a href="#" className="hover:text-black transition">
              Contact Us
            </a>
            <a href="#" className="hover:text-black transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-black transition">
              Blog
            </a>
          </div>
        </div>

        {/* 3️ Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Subscribe to our newsletter
          </h3>

          <p className="text-gray-600 text-sm mb-6">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>

          <div className="flex items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button className="px-5 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          
          <p>© 2025 Aivon. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-black transition">
              Terms
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;