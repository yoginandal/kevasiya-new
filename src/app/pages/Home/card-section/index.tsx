"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const cardVariants = {
  hidden: (custom: number) => {
    switch (custom) {
      case 0:
        return { opacity: 0, x: -150, y: -150 };
      case 1:
        return { opacity: 0, x: 150, y: -150 };
      case 2:
        return { opacity: 0, scale: 0.9 };
      case 3:
        return { opacity: 0, x: -150, y: 150 };
      case 4:
        return { opacity: 0, x: 150, y: 150 };
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
      damping: 20,
      stiffness: 80,
      mass: 1.5,
      duration: 1,
      delay: 0.1,
    },
  },
};

function AnimatedCard({
  custom,
  image,
  title,
  description,
  ...props
}: {
  custom: number;
  image: string;
  title: string;
  description: string;
} & Omit<React.ComponentProps<typeof Card>, "title">) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px", // Triggers when 50px above viewport bottom
  });

  return (
    <motion.div
      ref={ref}
      custom={custom}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      className="h-full" // Ensures motion div takes full height
    >
      <Card {...props}>
        <CardHeader>
          <Image
            src={image}
            alt={title}
            width={400}
            height={300}
            className="rounded-lg object-cover w-full aspect-[4/3]"
          />
        </CardHeader>
        <CardContent className="text-center">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function CardSection() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto overflow-hidden">
      <h2 className="text-center font-semibold text-4xl md:text-5xl font-serif text-[#3a5a40] mb-8 md:mb-16">
        Specially Curated
      </h2>

      <div className="mt-16 grid gap-12">
        {/* Top 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedCard
            custom={0}
            image="/cardImages/cardOne.webp"
            title="Baby Announcement"
            description="A beautiful way to announce the arrival of your baby"
          />
          <AnimatedCard
            custom={1}
            image="/cardImages/cardTwo.webp"
            title="Festive Gifting"
            description="A beautiful way to gift your loved ones"
          />
        </div>

        {/* Center Card */}
        <div className="mx-auto w-full">
          <AnimatedCard
            custom={2}
            image="/cardImages/cardOne.webp"
            title="Corporate Gifting"
            description="A beautiful way to gift your loved ones"
          />
        </div>

        {/* Bottom 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedCard
            custom={3}
            image="/cardImages/cardOne.webp"
            title="Wedding Gifts"
            description="A beautiful way to invite your loved ones"
          />
          <AnimatedCard
            custom={4}
            image="/cardImages/cardTwo.webp"
            title="Special Occasion"
            description="A beautiful way to gift your loved ones"
          />
        </div>
      </div>
    </section>
  );
}
