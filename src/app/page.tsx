"use client";

import { Hero } from "@/components/Hero";
import { FeaturedBooks } from "@/components/FeaturedBooks";
import { Categories } from "@/components/Categories";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero2 from "@/components/Hero2";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <Hero />
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5 }}
      >
        <FeaturedBooks />
        <Categories />
        <Hero2 />
        <Footer />
      </motion.div>
    </main>
  );
}
