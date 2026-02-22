"use client";

import { motion } from "framer-motion";
import { STORY_BG } from "../lib/site-data";

export default function BrandStory() {
  return (
    <section
      id="story"
      className="relative overflow-hidden px-4 py-32"
      style={{
        backgroundImage: `url(${STORY_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      data-testid="brand-story-section"
    >
      <div className="absolute inset-0 bg-[rgba(47,62,46,0.85)]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="mb-8 text-4xl font-bold text-[#d12323] md:text-5xl"
            style={{ fontFamily: "Playfair Display, serif" }}
            data-testid="story-heading"
          >
            Son of Mountains
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-white/90 md:text-xl">
            <p data-testid="story-paragraph-1">
              High in the Himalayan valleys, where the air is pure and the soil is rich, our
              farmers cultivate turmeric the way their ancestors did, with care, patience, and
              respect for the land.
            </p>
            <p data-testid="story-paragraph-2">
              GIRIPUTAR, meaning &quot;Son of Mountains,&quot; embodies this sacred bond between nature
              and tradition. Every root is handpicked, sun-dried, and ground to perfection,
              ensuring you receive the purest form of this golden treasure.
            </p>
            <p data-testid="story-paragraph-3">
              We don&apos;t just sell turmeric. We share a legacy of wellness, a promise of purity,
              and a connection to the mountains that nurture us all.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
