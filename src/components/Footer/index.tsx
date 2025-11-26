import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold text-white">SchoolApp</span>
            </div>

            <p className="text-gray-400 mb-12">
              A modern platform for sharing knowledge, stories, and connecting with others. 
              Join our community today.
            </p>

            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/srilatha.potnuru?locale=sv_SE" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-red-500 transition-colors"
              >
                <Facebook size={20} />
              </a>

              <a 
                href="https://www.instagram.com/srilathanaidupotnuru/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-red-500 transition-colors"
              >
                <Instagram size={20} />
              </a>

              <a 
                href="mailto:someone@example.com"
                aria-label="Email"
                className="hover:text-red-500 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links — moved right */}
          <div className="pl-16 md:pl-0">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/create" className="hover:text-red-500 transition-colors">
                  Create Post
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} SchoolApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
