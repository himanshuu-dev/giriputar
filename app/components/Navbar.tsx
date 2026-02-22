"use client";

import { ShoppingCart } from "lucide-react";
import { LOGO_URL } from "../lib/site-data";

export default function Navbar({
  cartItemCount,
  onCartClick,
}: {
  cartItemCount: number;
  onCartClick: () => void;
}) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[#D4C5A9] bg-[#FDFBF7]/90 backdrop-blur-md"
      data-testid="navbar"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <img
            src={LOGO_URL}
            alt="GIRIPUTAR Logo"
            className="h-12 w-12 object-contain"
            data-testid="logo-image"
          />
          <div>
            <h1
              className="text-2xl font-bold text-[#2F3E2E]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              GIRIPUTAR
            </h1>
            <p className="text-xs tracking-wide text-[#7A7A7A]" style={{ fontFamily: "Cinzel, serif" }}>
              Son of Mountains
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <button
            onClick={() => scrollToSection("product")}
            className="font-medium text-[#2F3E2E] transition-colors hover:text-[#E6AF2E]"
            data-testid="nav-product-link"
          >
            Product
          </button>
          <button
            onClick={() => scrollToSection("benefits")}
            className="font-medium text-[#2F3E2E] transition-colors hover:text-[#E6AF2E]"
            data-testid="nav-benefits-link"
          >
            Benefits
          </button>
          <button
            onClick={() => scrollToSection("story")}
            className="font-medium text-[#2F3E2E] transition-colors hover:text-[#E6AF2E]"
            data-testid="nav-story-link"
          >
            Our Story
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="font-medium text-[#2F3E2E] transition-colors hover:text-[#E6AF2E]"
            data-testid="nav-testimonials-link"
          >
            Reviews
          </button>
        </div>

        <button
          onClick={onCartClick}
          className="relative h-10 rounded-full bg-[#E6AF2E] px-6 py-3 font-bold text-[#2F3E2E] shadow-lg transition-all hover:scale-105 hover:bg-[#D4A017]"
          data-testid="cart-button"
        >
          <span className="inline-flex items-center h-0">
            <ShoppingCart className="mr-2 h-5 w-10" />
            Cart
          </span>
          {cartItemCount > 0 && (
            <span
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2F3E2E] text-xs font-bold text-white"
              data-testid="cart-count"
            >
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
