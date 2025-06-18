"use client";

import { Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#2b3f2f] text-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">
            Celebrating a New Beginning
          </h3>
          <p className="text-[#c7d0c8] leading-relaxed">
            Thank you for sharing in our joy. Your love and support mean the
            world to us as we start our new life together.
          </p>
        </div>
        <div className="flex justify-center space-x-8 mb-8">
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            <span>hello@weddingcelebration.com</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 mr-2" />
            <span>(555) 123-4567</span>
          </div>
        </div>
        <div className="border-t border-[#334d38] pt-8">
          <p className="text-[#a3b2a5]">
            © 2024 The Happy Couple. Wishing you a lifetime of love and
            happiness. ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
