"use client";
import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useState, use } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Zoom } from "yet-another-react-lightbox/plugins";

export default function ProductPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = use(paramsPromise);
  const product = products.find((p) => p.id === params.id);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!product) {
    notFound();
  }

  const slides = product.images.map((src) => ({ src }));

  return (
    <div className="bg-gray-50 text-gray-800 py-24 sm:py-32">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-sm mb-8">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/collections" className="hover:underline">
            Collections
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/collections/${product.category.toLowerCase()}`}
            className="hover:underline"
          >
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-500">{product.name}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="w-full">
            <div className="relative group">
              <Image
                src={product.images[activeIndex]}
                alt={product.name}
                width={800}
                height={800}
                className="object-cover w-full h-auto rounded-lg shadow-lg cursor-pointer transition-transform duration-300 ease-in-out group-hover:scale-105"
                onClick={() => setOpen(true)}
              />
              <div
                className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white opacity-0 group-hover:opacity-75 transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 mt-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    activeIndex === index
                      ? "border-gray-900"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-serif text-gray-900 mb-6">
              {product.name}
            </h1>

            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 tracking-wide border-b pb-2">
                Products Included
              </h3>
              <ul className="space-y-3 text-gray-600 mt-4">
                {product.includedProducts.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              {product.packagingDetails && (
                <p className="text-md text-gray-700 font-semibold mt-4">
                  {product.packagingDetails}
                </p>
              )}

              {product.boxDimensions && (
                <p className="text-md text-gray-600 mt-2">
                  {product.boxDimensions}
                </p>
              )}
            </div>

            <div className="mt-auto pt-8">
              <p className="text-2xl font-serif text-right text-gray-800 mb-6">
                Price on request
              </p>

              <div className="grid grid-cols-1 gap-4">
                <button className="w-full bg-black text-white py-4 rounded-md font-semibold hover:bg-gray-800 transition-colors text-lg">
                  Get a Quote
                </button>
                <button className="w-full border border-gray-300 text-gray-800 py-4 rounded-md font-semibold hover:bg-gray-200 transition-colors text-lg">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={activeIndex}
        on={{ view: ({ index }) => setActiveIndex(index) }}
        plugins={[Zoom]}
      />
    </div>
  );
}
