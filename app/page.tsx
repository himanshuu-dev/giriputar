"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { CartItem, OrderRecord } from "./lib/site-data";
import { PRODUCT } from "./lib/site-data";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductShowcase from "./components/ProductShowcase";
import Benefits from "./components/Benefits";
import BrandStory from "./components/BrandStory";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import CartModal, { type CheckoutForm } from "./components/CartModal";

export default function Home() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const addToCart = (quantity: number) => {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === PRODUCT.id);
      if (existing) {
        return previous.map((item) =>
          item.id === PRODUCT.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...previous, { ...PRODUCT, quantity }];
    });
    setIsCartOpen(true);
    toast.success(`${quantity} item(s) added to cart!`);
  };

  const updateCartQuantity = (productId: string, nextQuantity: number) => {
    if (nextQuantity <= 0) {
      setCart((previous) => previous.filter((item) => item.id !== productId));
      return;
    }
    setCart((previous) =>
      previous.map((item) =>
        item.id === productId ? { ...item, quantity: nextQuantity } : item,
      ),
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((previous) => previous.filter((item) => item.id !== productId));
  };

  const submitOrder = (formData: CheckoutForm) => {
    if (!cart.length) return;
    const id = `${Date.now()}`;
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order: OrderRecord = {
      id,
      ...formData,
      items: cart.map((item) => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total_amount: totalAmount,
    };

    localStorage.setItem(`order:${id}`, JSON.stringify(order));
    setIsCartOpen(false);
    setCart([]);
    toast.success("Order placed successfully!");
    router.push(`/order-confirmation/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A]">
      <Navbar cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
      <Hero />
      <ProductShowcase product={PRODUCT} onAddToCart={addToCart} />
      <Benefits />
      <BrandStory />
      <Testimonials />
      <Footer />
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateCartQuantity}
        removeItem={removeFromCart}
        onSubmitOrder={submitOrder}
      />
    </div>
  );
}
