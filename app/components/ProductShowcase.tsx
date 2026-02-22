"use client";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import type { Product } from "../lib/site-data";

export default function ProductShowcase({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(quantity);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <section id="product" className="bg-[#F5F1E8] px-4 py-24" data-testid="product-section">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className="mb-16 text-center text-4xl font-bold text-[#2F3E2E] md:text-5xl"
            style={{ fontFamily: "Playfair Display, serif" }}
            data-testid="product-heading"
          >
            The Golden Spice
          </h2>

          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="rounded-xl bg-white p-8 shadow-xl">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-auto w-full rounded-lg object-contain"
                  data-testid="product-image"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-4 text-3xl font-bold text-[#2F3E2E] md:text-4xl" data-testid="product-name" style={{ fontFamily: "Playfair Display, serif" }}>
                {product.name}
              </h3>
              <p className="mb-6 text-lg leading-relaxed text-[#7A7A7A]" data-testid="product-description">
                {product.description}
              </p>

              <div className="mb-6">
                <h4 className="mb-3 text-lg font-bold text-[#2F3E2E]">Key Benefits:</h4>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={benefit} className="flex items-center gap-2 text-[#2F3E2E]" data-testid={`benefit-item-${index}`}>
                      <Check className="h-5 w-5 text-[#15803D]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 flex items-baseline gap-4">
                <span className="text-4xl font-bold text-[#E6AF2E]" data-testid="product-price">
                  ₹{product.price.toFixed(2)}
                </span>
                <span className="text-lg text-[#7A7A7A]" data-testid="product-weight">
                  {product.weight}
                </span>
              </div>

              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center overflow-hidden rounded-full border-2 border-[#D4C5A9]">
                  <button
                    onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                    className="px-4 py-3 transition-colors hover:bg-[#F5F1E8]"
                    data-testid="decrease-quantity-btn"
                  >
                    <Minus className="h-5 w-5 text-[#2F3E2E]" />
                  </button>
                  <span className="min-w-15 px-6 py-3 text-center font-bold text-[#2F3E2E]" data-testid="quantity-display">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-3 transition-colors hover:bg-[#F5F1E8]"
                    data-testid="increase-quantity-btn"
                  >
                    <Plus className="h-5 w-5 text-[#2F3E2E]" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex flex-1 items-center justify-center rounded-full bg-[#E6AF2E] px-8 py-3 text-base font-bold text-[#2F3E2E] shadow-lg transition-all hover:scale-105 hover:bg-[#D4A017] disabled:opacity-50"
                  data-testid="add-to-cart-btn"
                >
                  {isAdding ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Added!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>

              {product.in_stock && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#15803D]" />

                  <span className="font-semibold" data-testid="stock-status">
                    <span className="text-[#15803D]">In Stock</span>
                    <span className="text-[#2F3E2E]"> • Limited Harvest Batch</span>
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
