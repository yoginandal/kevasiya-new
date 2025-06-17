import Link from "next/link";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
}

interface Subcategory {
  id: number;
  name: string;
  slug: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

// Fetches all products for a given subcategory ID
async function getProductsBySubcategoryId(
  subcategoryId: number
): Promise<Product[]> {
  try {
    const res = await fetch(
      `${API_URL}/products?subCategoryId=${subcategoryId}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Fetches all subcategories for a given category slug
async function getSubcategoriesByCategorySlug(
  categorySlug: string
): Promise<Subcategory[]> {
  try {
    // This is a bit inefficient as we fetch all categories first, then find the one we need.
    // A dedicated API endpoint `/api/categories?slug=<slug>` would be better.
    const catRes = await fetch(`${API_URL}/categories`, {
      next: { revalidate: 3600 },
    });
    if (!catRes.ok) throw new Error("Failed to fetch categories");
    const categories: Category[] = await catRes.json();
    const category = categories.find((c) => c.slug === categorySlug);
    if (!category) return [];

    const subCatRes = await fetch(
      `${API_URL}/subcategories?categoryId=${category.id}`,
      { next: { revalidate: 3600 } }
    );
    if (!subCatRes.ok) throw new Error("Failed to fetch subcategories");
    return subCatRes.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const categorySlug = params.category;
  const subcategories = await getSubcategoriesByCategorySlug(categorySlug);

  // Fetch products for all subcategories in parallel
  const productPromises = subcategories.map((sub) =>
    getProductsBySubcategoryId(sub.id)
  );
  const productsByCategory = (await Promise.all(productPromises)).flat();

  const categoryName =
    categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

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

        {productsByCategory.length === 0 ? (
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
            {productsByCategory.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group block"
              >
                <div className="relative h-[450px] w-full overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    loading="lazy"
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
