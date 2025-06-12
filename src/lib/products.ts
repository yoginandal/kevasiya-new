export interface Product {
  id: string;
  name: string;
  category: "Baby" | "Wedding" | "Corporates" | "Occasions";
  subcategory: string;
  images: string[];
  includedProducts: string[];
  packagingDetails?: string;
  boxDimensions?: string;
}

export const products: Product[] = [
  {
    id: "sips-and-savouries",
    name: "Sips and Savouries",
    category: "Corporates",
    subcategory: "Gift Hampers",
    images: [
      "/placeholder/800/800",
      "/placeholder/800/800?text=Side+View",
      "/placeholder/800/800?text=Top+View",
      "/placeholder/800/800?text=Packaging",
      "/placeholder/800/800?text=Close-up",
    ],
    includedProducts: [
      "Marshall Willen, Portable Bluetooth Speaker (Cream)",
      "Weekly Planner (9.5 x 20.5 cms)",
      "Brass Bookmark (with golden tassel)",
      "Silved foiled Candle (Firangipani)",
      "Parker Classic stainless steel pen",
      "Assam Masala Chai Tea (100g)",
      "Seasalt and California Almond vegan chocolate (2 minis) - 15g",
      "Blue Tea Cup and Saucer set",
      "Tea Infuser",
      "Metal jars (150g Rose flavoured Almonds)",
      "Metal jars (150g Peri-peri Cashews)",
    ],
    packagingDetails: "PACKAGING (all incl.)",
  },
  {
    id: "welcome-to-the-tribe",
    name: "Welcome to The Tribe!",
    category: "Corporates",
    subcategory: "Onboarding Kits",
    images: [
      "/placeholder/800/800",
      "/placeholder/800/800?text=Side+View",
      "/placeholder/800/800?text=Top+View",
      "/placeholder/800/800?text=Packaging",
    ],
    includedProducts: [
      "Leather Coasters (square, set of 4)",
      "Leather Pen Stand (green)",
      "Leather Mouse Pad (green)",
      "Pure copper bottle (hammered, 900ml)",
      "Pure Copper glass (hammered)",
      "Unisex Blue Formal laptop bag",
      "Boat wireless airdopes 311 PRO",
      "Parker Classic Stainless Steel GT Ball Pen",
      "Silver Hoop and Loop engraved keychain",
      "Endless possibilities' Notebook - 7mm",
      "Himalyan Salt Caramel Popcorn (125g)",
      "Indian spiced raisin (100g)",
      "Pistachios (100g)",
      "Assorted Almond Brittles (43.5g)",
      "Medium Roast Signature Coffee",
    ],
    boxDimensions: "Box Dimensions - 16 x 12 x 5 (customisable)",
  },
  {
    id: "bridal-bliss-box",
    name: "Bridal Bliss Box",
    category: "Wedding",
    subcategory: "Bridal Hampers",
    images: [
      "/placeholder/800/800",
      "/placeholder/800/800?text=Robe",
      "/placeholder/800/800?text=Chocolates",
      "/placeholder/800/800?text=Packaging",
    ],
    includedProducts: [
      "Personalized Silk Robe",
      "Scented Candle (Jasmine)",
      "Artisanal Chocolates",
      "Mini Champagne Bottle",
      "Vow Book Set",
      "Compact Mirror",
    ],
    packagingDetails:
      "Presented in a keepsake magnetic-closure box with ribbon.",
  },
];
