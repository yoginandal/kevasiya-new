"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const cardVariants = {
  hidden: (custom: number) => {
    switch (custom) {
      case 0:
        return { opacity: 0, x: -100, y: -100 };
      case 1:
        return { opacity: 0, x: 100, y: -100 };
      case 2:
        return { opacity: 0, scale: 0.95 };
      case 3:
        return { opacity: 0, x: -100, y: 100 };
      case 4:
        return { opacity: 0, x: 100, y: 100 };
      default:
        return { opacity: 0 };
    }
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 50,
      mass: 1,
      duration: 0.8,
      delay: 0.1,
    },
  },
};

function AnimatedCard({
  custom,
  image,
  title,
  description,
  className,
}: {
  custom: number;
  image: string;
  title: string;
  description: string;
  className?: string;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      custom={custom}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      className={`relative group overflow-hidden rounded-xl shadow-lg ${className}`}
    >
      <Image
        src={image}
        alt={title}
        width={500}
        height={500}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-2xl font-semibold font-serif">{title}</h3>
        <p className="text-gray-200 mt-1">{description}</p>
      </div>
    </motion.div>
  );
}

const cardData = [
  {
    custom: 0,
    image: "/cardImages/cardOne.webp",
    title: "Baby Announcement",
    description: "A beautiful way to announce the arrival of your baby",
    className: "md:col-span-1",
  },
  {
    custom: 1,
    image: "/cardImages/cardTwo.webp",
    title: "Festive Gifting",
    description: "A beautiful way to gift your loved ones",
    className: "md:col-span-1",
  },
  {
    custom: 2,
    image: "/cardImages/cardOne.webp",
    title: "Corporate Gifting",
    description: "A beautiful way to gift your loved ones",
    className: "md:col-span-2",
  },
  {
    custom: 3,
    image: "/cardImages/cardOne.webp",
    title: "Wedding Gifts",
    description: "A beautiful way to invite your loved ones",
    className: "md:col-span-1",
  },
  {
    custom: 4,
    image: "/cardImages/cardTwo.webp",
    title: "Special Occasion",
    description: "A beautiful way to gift your loved ones",
    className: "md:col-span-1",
  },
];

export default function CardSection() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-center font-semibold text-4xl md:text-5xl font-serif text-[#3a5a40] mb-12">
        Specially Curated
      </h2>

      {/* Desktop Grid - Fixed height and smaller gap */}
      <div className="hidden md:grid grid-cols-2 gap-4">
        {cardData.map((card) => (
          <AnimatedCard
            key={card.custom}
            {...card}
            className={`h-[350px] ${card.className}`}
          />
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="md:hidden">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {cardData.map((card, index) => (
              <CarouselItem key={index} className="basis-11/12">
                <div className="p-1 h-[450px]">
                  <AnimatedCard {...card} className="h-full" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
