"use client";
import Image from "next/image";

import { motion } from "framer-motion";
import { Heart, Leaf, Shield } from "lucide-react";
import { BENEFIT_CARDS } from "../lib/site-data";

export default function Benefits() {
  return (
    <section id="benefits" className="bg-[#FDFBF7]" data-testid="benefits-section">
      <div className="relative h-60 w-full overflow-hidden md:h-90">
        <div
          className="h-full w-full bg-cover bg-position-[50%_25%] bg-no-repeat"
          style={{
            backgroundImage:
              "url('assets/bg-benifits.jpeg')",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-30 bg-linear-to-b from-transparent to-[#FDFBF7]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2
            className="mb-3 text-4xl font-bold text-[#2F3E2E] md:text-5xl"
            style={{ fontFamily: "Playfair Display, serif" }}
            data-testid="benefits-heading"
          >
            Why Giriputar is Different?
          </h2>
          <p className="mb-3 mx-auto max-w-2xl text-base text-[#2F3E2E] font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
            Not all haldi is grown at this altitude. Not all haldi carries purity.          </p>
          <p className="mx-auto max-w-2xl text-sm text-[#2F3E2E]">
            Giriputar is mountain-grown, slow matured turmeric cultivated in the clean air
            mineral-rich soil of the Himalayas – delivering{" "}
            <span className="font-bold">
              deeper colour, strong aroma
            </span>
            , and naturally high curcumin.
          </p> </motion.div>

        <div className="grid gap-8 md:grid-cols-3 mb-6">
          {BENEFIT_CARDS.map((benefit, index) => {
            const Icon =
              benefit.icon === "heart" ? Heart : benefit.icon === "shield" ? Shield : Leaf;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="rounded-xl border border-[#D4C5A9] bg-white/50 p-4 shadow-sm transition-all duration-300 hover:shadow-md"
                data-testid={`benefit-card-${index}`}
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E6AF2E] shadow-lg">
                  <Icon className="h-8 w-8 text-[#2F3E2E]" />
                </div>
                <h3 className="mb-1 text-xl font-bold text-[#2F3E2E]" style={{ fontFamily: "Playfair Display, serif" }}>{benefit.title}</h3>
                <p className="leading-relaxed text-[#2F3E2E]">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="relative h-60 w-full overflow-hidden md:h-90 mb-4">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-position-[50%_100%] bg-no-repeat"
          style={{
            backgroundImage:
              "url('assets/bg-benifits2.jpg')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Centered Content */}
        <div className="relative z-10 flex h-full w-full items-center justify-center px-4 text-center">
          <div>
            <h2
              className="mb-1 text-2xl font-bold text-[#e0e0e0] md:text-4xl"
              style={{ fontFamily: "Playfair Display, serif" }}
              data-testid="benefits-heading"
            >
              Taste the Difference in 7 Days
            </h2>

            <p className="mx-auto text-base text-white mb-6">
              Once you choose Giriputar, ordinary haldi will feel dull.
            </p>
            <div className="mx-auto w-fit rounded-xl bg-linear-to-b from-[#E8C36A] via-[#D9A441] to-[#B8860B] px-6 py-2 shadow-lg">
              <h2
                className="text-center text-l font-bold tracking-wide text-[#0d290a] md:text-xl"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                BRING HOME THE GOLD OF <br />
                <span className="text-[#431c07]">
                  THE MOUNTAINS TODAY
                </span>

              </h2>
            </div>
          </div>
        </div>

      </div>


    </section>
  );
}
