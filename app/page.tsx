"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BENEFIT_CARDS,
  CartItem,
  HERO_BG,
  LOGO_URL,
  OrderRecord,
  PRODUCT,
  STORY_BG,
  TESTIMONIALS,
} from "./lib/site-data";

type CheckoutForm = {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  state: string;
  pincode: string;
};

const defaultForm: CheckoutForm = {
  customer_name: "",
  customer_email: "",
  customer_phone: "",
  shipping_address: "",
  city: "",
  state: "",
  pincode: "",
};

function Button({
  className,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={`btn-base ${className ?? ""}`} {...props} />;
}

export default function Home() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [formData, setFormData] = useState(defaultForm);

  const cartItemCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );
  const totalAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const addToCart = () => {
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

  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cart.length) return;

    const id = `${Date.now()}`;
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
    setIsCheckout(false);
    setCart([]);
    setFormData(defaultForm);
    router.push(`/order-confirmation/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A]">
      <nav className="sticky top-0 z-50 border-b border-[#D4C5A9] bg-[#FDFBF7]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="GIRIPUTAR Logo" className="h-12 w-12 object-contain" />
            <div>
              <h1 className="text-2xl font-bold text-[#2F3E2E] font-display">GIRIPUTAR</h1>
              <p className="font-cinzel text-xs tracking-wide text-[#7A7A7A]">Son of Mountains</p>
            </div>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <button onClick={() => scrollToSection("product")} className="nav-link">Product</button>
            <button onClick={() => scrollToSection("benefits")} className="nav-link">Benefits</button>
            <button onClick={() => scrollToSection("story")} className="nav-link">Our Story</button>
            <button onClick={() => scrollToSection("testimonials")} className="nav-link">Reviews</button>
          </div>

          <Button onClick={() => setIsCartOpen(true)} className="relative rounded-full bg-[#E6AF2E] px-6 py-3 font-bold text-[#2F3E2E] shadow-lg transition-all hover:scale-105 hover:bg-[#D4A017]">
            <span className="mr-2">🛒</span>
            Cart
            {cartItemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2F3E2E] text-xs font-bold text-white">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>
      </nav>

      <section
        className="grain-texture relative flex h-screen items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(47,62,46,0.4)] to-[rgba(47,62,46,0.8)]" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <h2 className="font-display mb-6 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Pure as the Himalayas
          </h2>
          <p className="mb-4 text-xl leading-relaxed text-[#F9D479] md:text-2xl">
            100% Natural Mountain-Grown Turmeric
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            Experience the golden goodness of Pahadi Desi Haldi, handpicked from the pristine farms of the Himalayas. Rich in curcumin, pure in tradition.
          </p>
          <Button
            onClick={() => scrollToSection("product")}
            className="rounded-full bg-[#E6AF2E] px-10 py-6 text-lg font-bold text-[#2F3E2E] shadow-2xl transition-all hover:scale-105 hover:bg-[#F9D479]"
          >
            Shop Now
          </Button>
        </div>
      </section>

      <section id="product" className="bg-[#F5F1E8] px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display mb-16 text-center text-4xl font-bold text-[#2F3E2E] md:text-5xl">The Golden Spice</h2>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="rounded-xl bg-white p-8 shadow-xl">
              <img src={PRODUCT.image_url} alt={PRODUCT.name} className="h-auto w-full rounded-lg object-contain" />
            </div>
            <div>
              <h3 className="mb-4 text-3xl font-bold text-[#2F3E2E] md:text-4xl">{PRODUCT.name}</h3>
              <p className="mb-6 text-lg leading-relaxed text-[#7A7A7A]">{PRODUCT.description}</p>
              <div className="mb-6">
                <h4 className="mb-3 text-lg font-bold text-[#2F3E2E]">Key Benefits:</h4>
                <ul className="space-y-2">
                  {PRODUCT.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-[#2F3E2E]">
                      <span className="text-[#15803D]">✔</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 flex items-baseline gap-4">
                <span className="text-4xl font-bold text-[#E6AF2E]">₹{PRODUCT.price.toFixed(2)}</span>
                <span className="text-lg text-[#7A7A7A]">{PRODUCT.weight}</span>
              </div>

              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center overflow-hidden rounded-full border-2 border-[#D4C5A9]">
                  <button
                    onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                    className="px-4 py-3 transition-colors hover:bg-[#F5F1E8]"
                  >
                    −
                  </button>
                  <span className="min-w-[60px] px-6 py-3 text-center font-bold text-[#2F3E2E]">{quantity}</span>
                  <button onClick={() => setQuantity((prev) => prev + 1)} className="px-4 py-3 transition-colors hover:bg-[#F5F1E8]">
                    +
                  </button>
                </div>
                <Button
                  onClick={addToCart}
                  className="flex-1 rounded-full bg-[#E6AF2E] px-8 py-6 text-lg font-bold text-[#2F3E2E] shadow-lg transition-all hover:scale-105 hover:bg-[#D4A017]"
                >
                  <span className="mr-2">🛒</span>
                  Add to Cart
                </Button>
              </div>

              <div className="flex items-center gap-2 text-[#15803D]">
                <div className="h-2 w-2 rounded-full bg-[#15803D]" />
                <span className="font-semibold">In Stock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="bg-[#FDFBF7] px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="font-display mb-4 text-4xl font-bold text-[#2F3E2E] md:text-5xl">Why Choose GIRIPUTAR?</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#7A7A7A]">
              Our Haldi is more than just a spice, it&apos;s a tradition of health and purity
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {BENEFIT_CARDS.map((benefit) => (
              <article key={benefit.title} className="rounded-xl border border-[#D4C5A9] bg-white/50 p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E6AF2E] text-3xl shadow-lg">
                  {benefit.icon === "heart" ? "❤" : benefit.icon === "shield" ? "🛡" : "🌿"}
                </div>
                <h3 className="mb-3 text-2xl font-bold text-[#2F3E2E]">{benefit.title}</h3>
                <p className="leading-relaxed text-[#7A7A7A]">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="story"
        className="relative overflow-hidden px-4 py-32"
        style={{
          backgroundImage: `url(${STORY_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-[rgba(47,62,46,0.85)]" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="font-display mb-8 text-4xl font-bold text-white md:text-5xl">Son of Mountains</h2>
          <div className="space-y-6 text-lg leading-relaxed text-white/90 md:text-xl">
            <p>
              High in the Himalayan valleys, where the air is pure and the soil is rich, our farmers cultivate turmeric the way their ancestors did, with care, patience, and respect for the land.
            </p>
            <p>
              GIRIPUTAR, meaning &quot;Son of Mountains,&quot; embodies this sacred bond between nature and tradition. Every root is handpicked, sun-dried, and ground to perfection, ensuring you receive the purest form of this golden treasure.
            </p>
            <p>
              We don&apos;t just sell turmeric. We share a legacy of wellness, a promise of purity, and a connection to the mountains that nurture us all.
            </p>
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-[#F5F1E8] px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="font-display mb-4 text-4xl font-bold text-[#2F3E2E] md:text-5xl">What Our Customers Say</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#7A7A7A]">
              Join thousands of satisfied customers who trust GIRIPUTAR for their wellness
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <article key={testimonial.name} className="rounded-xl border border-[#D4C5A9] bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="mb-4">{"★".repeat(testimonial.rating)}</div>
                <p className="mb-6 leading-relaxed italic text-[#2F3E2E]">&quot;{testimonial.text}&quot;</p>
                <p className="font-bold text-[#2F3E2E]">{testimonial.name}</p>
                <p className="text-sm text-[#7A7A7A]">{testimonial.location}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#2F3E2E] px-4 py-16 text-[#FDFBF7]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-12 md:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <img src={LOGO_URL} alt="GIRIPUTAR Logo" className="h-12 w-12 object-contain" />
                <div>
                  <h3 className="font-display text-2xl font-bold">GIRIPUTAR</h3>
                  <p className="font-cinzel text-sm text-[#E6AF2E]">Son of Mountains</p>
                </div>
              </div>
              <p className="leading-relaxed text-[#FDFBF7]/80">
                Pure Himalayan Haldi, bringing the essence of mountain wellness to your home.
              </p>
            </div>
            <div>
              <h4 className="font-display mb-4 text-xl font-bold text-[#E6AF2E]">Contact Us</h4>
              <div className="space-y-3">
                <p>✉ info@giriputar.com</p>
                <p>☎ +91 98765 43210</p>
                <p>📍 Himalayan Foothills, Uttarakhand, India</p>
              </div>
            </div>
            <div>
              <h4 className="font-display mb-4 text-xl font-bold text-[#E6AF2E]">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6AF2E] text-[#2F3E2E] transition-transform hover:scale-110">I</a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6AF2E] text-[#2F3E2E] transition-transform hover:scale-110">f</a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6AF2E] text-[#2F3E2E] transition-transform hover:scale-110">X</a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#FDFBF7]/20 pt-8 text-center">
            <p className="text-[#FDFBF7]/60">&copy; 2026 GIRIPUTAR. All rights reserved. Made with love from the mountains.</p>
          </div>
        </div>
      </footer>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button aria-label="Close modal backdrop" className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#FDFBF7] shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl bg-[#2F3E2E] p-6 text-white">
              <h2 className="font-display text-2xl font-bold">{isCheckout ? "Checkout" : "Your Cart"}</h2>
              <button onClick={() => setIsCartOpen(false)} className="rounded-full p-2 transition-colors hover:bg-white/20">✕</button>
            </div>
            <div className="p-6">
              {!cart.length ? (
                <div className="py-12 text-center">
                  <p className="mb-4 text-6xl">🛍️</p>
                  <p className="text-xl text-[#7A7A7A]">Your cart is empty</p>
                </div>
              ) : isCheckout ? (
                <form onSubmit={submitOrder} className="space-y-4">
                  <FormInput label="Full Name *" name="customer_name" value={formData.customer_name} onChange={setFormData} />
                  <FormInput label="Email *" name="customer_email" value={formData.customer_email} onChange={setFormData} type="email" />
                  <FormInput label="Phone Number *" name="customer_phone" value={formData.customer_phone} onChange={setFormData} />
                  <FormInput label="Address *" name="shipping_address" value={formData.shipping_address} onChange={setFormData} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput label="City *" name="city" value={formData.city} onChange={setFormData} />
                    <FormInput label="State *" name="state" value={formData.state} onChange={setFormData} />
                  </div>
                  <FormInput label="Pincode *" name="pincode" value={formData.pincode} onChange={setFormData} />
                  <div className="mt-6 border-t border-[#D4C5A9] pt-4">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="text-xl font-bold text-[#2F3E2E]">Total Amount:</span>
                      <span className="text-2xl font-bold text-[#E6AF2E]">₹{totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-4">
                      <Button className="flex-1 rounded-full border-2 border-[#2F3E2E] py-6 text-[#2F3E2E] transition-colors hover:bg-[#2F3E2E] hover:text-white" onClick={() => setIsCheckout(false)}>
                        Back to Cart
                      </Button>
                      <Button type="submit" className="flex-1 rounded-full bg-[#E6AF2E] py-6 font-bold text-[#2F3E2E] hover:bg-[#D4A017]">
                        Place Order
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <div className="mb-6 space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 rounded-xl border border-[#D4C5A9] bg-white p-4">
                        <img src={item.image_url} alt={item.name} className="h-20 w-20 rounded object-contain" />
                        <div className="flex-1">
                          <h3 className="mb-1 font-bold text-[#2F3E2E]">{item.name}</h3>
                          <p className="mb-2 text-sm text-[#7A7A7A]">{item.weight}</p>
                          <p className="font-bold text-[#E6AF2E]">₹{item.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button onClick={() => setCart((prev) => prev.filter((p) => p.id !== item.id))} className="rounded-full p-2 text-[#B91C1C] transition-colors hover:bg-red-50">
                            🗑
                          </button>
                          <div className="flex items-center overflow-hidden rounded-full border border-[#D4C5A9]">
                            <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="px-3 py-1 transition-colors hover:bg-[#F5F1E8]">−</button>
                            <span className="px-4 font-semibold text-[#2F3E2E]">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="px-3 py-1 transition-colors hover:bg-[#F5F1E8]">+</button>
                          </div>
                          <p className="font-bold text-[#2F3E2E]">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-[#D4C5A9] pt-4">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="text-xl font-bold text-[#2F3E2E]">Total:</span>
                      <span className="text-2xl font-bold text-[#E6AF2E]">₹{totalAmount.toFixed(2)}</span>
                    </div>
                    <Button onClick={() => setIsCheckout(true)} className="w-full rounded-full bg-[#E6AF2E] py-6 text-lg font-bold text-[#2F3E2E] hover:bg-[#D4A017]">
                      Proceed to Checkout
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: keyof CheckoutForm;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<CheckoutForm>>;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[#2F3E2E]">{label}</span>
      <input
        type={type}
        required
        className="mt-1 flex h-9 w-full rounded-md border border-[#D4C5A9] bg-white px-3 py-1 text-base shadow-sm outline-none transition-colors focus:border-[#E6AF2E]"
        value={value}
        onChange={(event) =>
          onChange((previous) => ({ ...previous, [name]: event.target.value }))
        }
      />
    </label>
  );
}
