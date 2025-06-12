import Hero from "./hero";
import CardSection from "./card-section";
import { ClientsSlider } from "./clientslider";
// import BestSeller from "../best-sellers";
// import {
//   getStoreProducts,
//   UiProduct as Product,
// } from "../../../../lib/data/products";
import SpecialOccasions from "./special-occasions";
import WhyKevasiya from "./why-kevasiya";

const icons = [
  { src: "/recruiters/accenture.webp", alt: "Accenture" },
  { src: "/recruiters/amazon.webp", alt: "Amazon" },
  { src: "/recruiters/Axis_Bank.webp", alt: "Axis Bank" },
  { src: "/recruiters/bankOfAmerica.webp", alt: "Bank of America" },
  { src: "/recruiters/berger.webp", alt: "Berger" },
  { src: "/recruiters/capgemini.webp", alt: "Capgemini" },
  { src: "/recruiters/cognizant.webp", alt: "Cognizant" },
  { src: "/recruiters/dell.webp", alt: "Dell" },
  { src: "/recruiters/Deloitte.webp", alt: "Deloitte" },
  { src: "/recruiters/ey.webp", alt: "EY" },
  { src: "/recruiters/facebook.webp", alt: "Facebook" },
  { src: "/recruiters/Google.webp", alt: "Google" },
  { src: "/recruiters/HCL.webp", alt: "HCL" },
  { src: "/recruiters/hdfc.webp", alt: "HDFC" },
  { src: "/recruiters/hp.webp", alt: "HP" },
  { src: "/recruiters/IBM.webp", alt: "IBM" },
  { src: "/recruiters/Infosys.webp", alt: "Infosys" },
  { src: "/recruiters/Intel.webp", alt: "Intel" },
  { src: "/recruiters/microsoft.png", alt: "Microsoft" },
  { src: "/recruiters/nse.webp", alt: "NSE" },
  { src: "/recruiters/nvidia.webp", alt: "Nvidia" },
  { src: "/recruiters/samsung.webp", alt: "Samsung" },
  { src: "/recruiters/TCS.webp", alt: "TCS" },
  { src: "/recruiters/vmware.webp", alt: "VMware" },
];

export default async function Home() {
  //   const bestSellingProducts: Product[] = await getStoreProducts(4);

  return (
    <div>
      <Hero />
      <CardSection />
      <ClientsSlider icons={icons} />
      {/* <BestSeller products={bestSellingProducts} title="Our Best Sellers" /> */}
      <SpecialOccasions />
      <WhyKevasiya />
    </div>
  );
}
