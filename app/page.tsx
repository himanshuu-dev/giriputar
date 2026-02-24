"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type {
  CartItem,
  OrderRecord,
  Product,
  SiteSettings,
  Testimonial,
} from "./lib/site-data";
import { TESTIMONIALS } from "./lib/site-data";
import { supabase } from "./lib/supabase";
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
  const [product, setProduct] = useState<Product | null>(null);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [featuredTestimonials, setFeaturedTestimonials] = useState<Testimonial[]>(TESTIMONIALS);

  useEffect(() => {
    const fetchData = async () => {
      const [productResponse, settingsResponse, testimonialsResponse] = await Promise.all([
        supabase
          .from("products")
          .select("*")
          .eq("in_stock", true)
          .limit(1)
          .maybeSingle(),
        supabase.from("site_settings").select("*").eq("id", 1).single(),
        supabase
          .from("testimonials")
          .select("*")
          .eq("featured", true)
          .order("id", { ascending: true }),
      ]);

      if (productResponse.error) {
        toast.error("Failed to load product.");
      } else if (!productResponse.data) {
        toast.error("No product found in database.");
      } else {
        const productRecord = productResponse.data as Product & {
          price: number | string;
          benefits: unknown;
        };
        setProduct({
          ...productRecord,
          price: Number(productRecord.price),
          benefits: Array.isArray(productRecord.benefits)
            ? (productRecord.benefits as string[])
            : [],
        });
      }

      if (!settingsResponse.error && settingsResponse.data) {
        setSiteSettings(settingsResponse.data as SiteSettings);
      }

      if (!testimonialsResponse.error && testimonialsResponse.data?.length) {
        const testimonials = testimonialsResponse.data.map(
          (row) =>
            ({
              id: row.id,
              name: row.name,
              location: row.location,
              rating: Number(row.rating),
              text: row.text,
              featured: row.featured,
            }) as Testimonial,
        );
        setFeaturedTestimonials(testimonials);
      }

      setIsProductLoading(false);
    };

    void fetchData();
  }, []);

  const cartItemCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const addToCart = (quantity: number) => {
    if (!product) return;

    setCart((previous) => {
      const existing = previous.find((item) => item.id === product.id);
      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...previous, { ...product, quantity }];
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

  const submitOrder = async (formData: CheckoutForm) => {
    if (!cart.length) return;
    const id = `${Date.now()}`;
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order: OrderRecord = {
      id,
      ...formData,
      status: "new",
      items: cart.map((item) => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total_amount: totalAmount,
    };

    const { error } = await supabase.from("orders").insert(order);

    if (error) {
      toast.error("Failed to place order. Please try again.");
      return;
    }

    setIsCartOpen(false);
    setCart([]);
    toast.success("Order placed successfully!");
    router.push(`/order-confirmation/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A]">
      <Navbar cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
      <Hero />
      {isProductLoading ? (
        <section className="bg-[#F5F1E8] px-4 py-24 text-center text-[#2F3E2E]">
          Loading product...
        </section>
      ) : product ? (
        <ProductShowcase product={product} onAddToCart={addToCart} />
      ) : (
        <section className="bg-[#F5F1E8] px-4 py-24 text-center text-[#2F3E2E]">
          Product unavailable right now.
        </section>
      )}
      <Benefits />
      <BrandStory />
      <Testimonials testimonials={featuredTestimonials} />
      <Footer settings={siteSettings} />
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
