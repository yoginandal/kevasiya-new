import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

export default async function Nav() {
  return (
    <div className="absolute top-0 inset-x-0 z-50 ">
      {/* Premium Top Bar */}
      <div className="bg-gray-600 text-white text-center py-2 text-xs font-light tracking-wider">
        <p>Free Shipping in Delhi NCR • Limited Time Offer</p>
      </div>

      {/* Elegant Navbar */}
      <header className="relative h-16 mx-auto">
        <nav className="max-w-screen-xl mx-auto px-4 flex items-center justify-between w-full h-full text-gray-200">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            <div className="lg:hidden">
              <button
                aria-label="Open menu"
                className="text-gray-200 hover:text-[#AE8F65] transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>

            {/* Logo Link */}
            <Link
              href="/"
              className="flex items-center"
              data-testid="nav-store-link"
            >
              <Image
                src="/logo_white.png"
                alt="Kevasiya"
                width={200}
                height={200}
              />
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-x-10">
              {["Baby", "Wedding", "Corporates", "Occasions"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="relative font-medium text-gray-200 font-serif hover:text-[#AE8F65] transition-colors duration-300 group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-700 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
