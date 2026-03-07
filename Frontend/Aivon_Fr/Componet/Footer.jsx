import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-950/45 border-t border-cyan-300/20 mt-20">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* 1️ Logo + Description */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/lodosss.png"
              alt="Aivon Logo"
              className="w-10 h-10 object-contain"
            />
            <h2 className="text-xl font-semibold text-slate-100">
              Aivon.ai
            </h2>
          </div>

          <p className="mt-6 text-slate-300 text-sm leading-relaxed max-w-sm">
            Experience the power of AI with Aivon. Transform your content
            creation with our suite of premium AI tools. Write articles,
            generate images, and enhance your workflow.
          </p>
        </div>

        {/* 2️ Company Links */}
        <div>
          <h3 className="text-lg font-semibold text-slate-100 mb-6">
            Company
          </h3>

          <div className="flex flex-col gap-4 text-slate-300 text-sm">
            <a href="#" className="hover:text-cyan-300 transition">
              Home
            </a>
            <a href="#" className="hover:text-cyan-300 transition">
              About Us
            </a>
            <a href="#" className="hover:text-cyan-300 transition">
              Contact Us
            </a>
            <a href="#" className="hover:text-cyan-300 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cyan-300 transition">
              Blog
            </a>
          </div>
        </div>

        {/* 3️ Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-slate-100 mb-4">
            Subscribe to our newsletter
          </h3>

          <p className="text-slate-300 text-sm mb-6">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>

          <div className="flex items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-cyan-300/30 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button className="rounded-lg border border-cyan-300/40 bg-cyan-400/15 px-5 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-400/25">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cyan-300/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 gap-4">
          
          <p>© 2026 Aivon. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-cyan-300 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cyan-300 transition">
              Terms
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;