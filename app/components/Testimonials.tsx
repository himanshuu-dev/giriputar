"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "../lib/site-data";

export default function Testimonials({ testimonials }: { testimonials?: Testimonial[] }) {
  const reviews = testimonials?.length ? testimonials : TESTIMONIALS;

  return (
    <section
      id="testimonials"
      className="bg-[#F5F1E8] px-4 py-24"
      data-testid="testimonials-section"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2
            className="mb-4 text-4xl font-bold text-[#2F3E2E] md:text-5xl"
            style={{ fontFamily: "Playfair Display, serif" }}
            data-testid="testimonials-heading"
          >
            What Our Customers Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#7A7A7A]">
            Join thousands of satisfied customers who trust GIRIPUTAR for their wellness
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((testimonial, index) => (
            <motion.article
              key={testimonial.id ?? `${testimonial.name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="rounded-xl border border-[#D4C5A9] bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl"
              data-testid={`testimonial-card-${index}`}
            >
              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#E6AF2E] text-[#E6AF2E]" />
                ))}
              </div>
              <p className="mb-6 leading-relaxed italic text-[#2F3E2E]">&quot;{testimonial.text}&quot;</p>
              <div>
                <p className="font-bold text-[#2F3E2E]">{testimonial.name}</p>
                <p className="text-sm text-[#7A7A7A]">{testimonial.location}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
