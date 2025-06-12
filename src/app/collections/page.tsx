import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Baby",
    href: "/collections/baby",
    imageSrc: "/placeholder/500/700?text=Baby+Collection",
    description: "Charming gifts for the little ones.",
  },
  {
    name: "Wedding",
    href: "/collections/wedding",
    imageSrc: "/placeholder/500/700?text=Wedding+Collection",
    description: "Elegant hampers for the special day.",
  },
  {
    name: "Corporates",
    href: "/collections/corporates",
    imageSrc: "/placeholder/500/700?text=Corporate+Gifts",
    description: "Sophisticated gifts for clients and colleagues.",
  },
  {
    name: "Occasions",
    href: "/collections/occasions",
    imageSrc: "/placeholder/500/700?text=Special+Occasions",
    description: "Thoughtful hampers for every celebration.",
  },
];

export default function CollectionsPage() {
  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-gray-900 sm:text-5xl">
            Our Collections
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Discover our curated selection of luxury hampers, thoughtfully
            designed for every occasion.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {categories.map((category) => (
            <div key={category.name}>
              <Link href={category.href} className="group block relative">
                <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={category.imageSrc}
                    alt={category.name}
                    width={500}
                    height={700}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-serif text-white">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-200">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
