import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const categoryName =
    params.category.charAt(0).toUpperCase() + params.category.slice(1);
  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase() === params.category.toLowerCase()
  );

  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-gray-900 sm:text-5xl">
            {categoryName} Hampers
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Browse our exclusive selection of {categoryName.toLowerCase()} gift
            hampers.
          </p>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="text-center mt-16">
            <p className="text-lg text-gray-600">
              No products found in this category.
            </p>
            <Link
              href="/collections"
              className="mt-4 inline-block text-lg font-medium text-gray-900 hover:text-gray-700"
            >
              &larr; Back to all collections
            </Link>
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
            {categoryProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group block"
              >
                <div className="relative h-[450px] w-full overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black to-transparent opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-2xl font-serif text-white">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-gray-300">
                      Price on request
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
