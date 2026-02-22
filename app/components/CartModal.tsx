"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import type { CartItem } from "../lib/site-data";

export type CheckoutForm = {
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

export default function CartModal({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeItem,
  onSubmitOrder,
}: {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  onSubmitOrder: (formData: CheckoutForm) => void;
}) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [formData, setFormData] = useState(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" data-testid="cart-modal">
      <button aria-label="Close cart modal" className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#FDFBF7] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl bg-[#2F3E2E] p-6 text-white">
          <h2
            className="flex items-center gap-2 text-2xl font-bold"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            <ShoppingBag className="h-6 w-6" />
            {isCheckout ? "Checkout" : "Your Cart"}
          </h2>
          <button onClick={onClose} className="rounded-full p-2 transition-colors hover:bg-white/20" data-testid="close-cart-btn">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {!cart.length ? (
            <div className="py-12 text-center" data-testid="empty-cart-message">
              <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-[#D4C5A9]" />
              <p className="text-xl text-[#7A7A7A]">Your cart is empty</p>
            </div>
          ) : isCheckout ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setIsSubmitting(true);
                onSubmitOrder(formData);
                setFormData(defaultForm);
                setIsCheckout(false);
                setIsSubmitting(false);
              }}
              className="space-y-4"
            >
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
                  <span className="text-2xl font-bold text-[#E6AF2E]" data-testid="checkout-total-amount">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsCheckout(false)}
                    className="flex-1 rounded-full border-2 border-[#2F3E2E] py-6 text-[#2F3E2E] transition-colors hover:bg-[#2F3E2E] hover:text-white"
                    data-testid="back-to-cart-btn"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-full bg-[#E6AF2E] py-6 font-bold text-[#2F3E2E] transition-colors hover:bg-[#D4A017] disabled:opacity-50"
                    data-testid="place-order-btn"
                  >
                    {isSubmitting ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <>
              <div className="mb-6 space-y-4">
                {cart.map((item, index) => (
                  <div key={item.id} className="flex gap-4 rounded-xl border border-[#D4C5A9] bg-white p-4" data-testid={`cart-item-${index}`}>
                    <img src={item.image_url} alt={item.name} className="h-20 w-20 rounded object-contain" />
                    <div className="flex-1">
                      <h3 className="mb-1 font-bold text-[#2F3E2E]">{item.name}</h3>
                      <p className="mb-2 text-sm text-[#7A7A7A]">{item.weight}</p>
                      <p className="font-bold text-[#E6AF2E]">₹{item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="rounded-full p-2 text-[#B91C1C] transition-colors hover:bg-red-50"
                        data-testid={`remove-item-btn-${index}`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <div className="flex items-center overflow-hidden rounded-full border border-[#D4C5A9]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 transition-colors hover:bg-[#F5F1E8]"
                          data-testid={`decrease-cart-quantity-${index}`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 font-semibold text-[#2F3E2E]" data-testid={`cart-item-quantity-${index}`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 transition-colors hover:bg-[#F5F1E8]"
                          data-testid={`increase-cart-quantity-${index}`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-bold text-[#2F3E2E]">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#D4C5A9] pt-4">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-xl font-bold text-[#2F3E2E]">Total:</span>
                  <span className="text-2xl font-bold text-[#E6AF2E]" data-testid="cart-total-amount">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => setIsCheckout(true)}
                  className="w-full rounded-full bg-[#E6AF2E] py-6 text-lg font-bold text-[#2F3E2E] transition-colors hover:bg-[#D4A017]"
                  data-testid="proceed-to-checkout-btn"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
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
        onChange={(event) => onChange((previous) => ({ ...previous, [name]: event.target.value }))}
      />
    </label>
  );
}
