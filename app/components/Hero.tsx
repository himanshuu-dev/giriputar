"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { HERO_BG } from "../lib/site-data";

export default function Hero() {
  const scrollToProduct = () => {
    const element = document.getElementById("product");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="grain-texture relative flex h-screen items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      data-testid="hero-section"
    >
      <div className="absolute inset-0 bg-linear-to-b from-[rgba(47,62,46,0.4)] to-[rgba(47,62,46,0.8)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "Playfair Display, serif" }}
            data-testid="hero-heading"
          >
            Pure as the Himalayas
          </h1>
          <p className="mb-4 text-xl leading-relaxed text-[#F9D479] md:text-2xl" data-testid="hero-subheading">
            100% Natural Mountain-Grown Turmeric
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            Experience the golden goodness of Pahadi Desi Haldi, handpicked from the pristine farms
            of the Himalayas. Rich in curcumin, pure in tradition.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mb-4 flex justify-center"
          >
            <ArrowDown className="h-8 w-8 animate-bounce text-white" />
          </motion.div>
          <button
            onClick={scrollToProduct}
            className="rounded-full bg-[#E6AF2E] px-12 py-3 text-base font-bold text-[#2F3E2E] shadow-2xl transition-all hover:scale-105 hover:bg-[#F9D479]"
            data-testid="hero-cta-button"
          >
            Shop Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
