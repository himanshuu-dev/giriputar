"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { OrderRecord } from "@/app/lib/site-data";

export default function OrderConfirmationPage() {
  const params = useParams<{ orderId: string }>();
  const orderId = params.orderId;
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(`order:${orderId}`);
    if (stored) {
      setOrder(JSON.parse(stored) as OrderRecord);
    }
    setLoading(false);
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7]">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-b-4 border-[#E6AF2E]" />
          <p className="mt-4 text-[#2F3E2E]">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7]">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-[#2F3E2E]">Order not found</h1>
          <Link href="/" className="inline-flex rounded-full bg-[#E6AF2E] px-6 py-3 font-bold text-[#2F3E2E] transition-colors hover:bg-[#D4A017]">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-4 text-7xl text-[#15803D]">✓</p>
          <h1 className="font-display mb-2 text-4xl font-bold text-[#2F3E2E] md:text-5xl">Order Confirmed!</h1>
          <p className="text-lg text-[#7A7A7A]">
            Order ID: <span className="font-semibold text-[#2F3E2E]">{order.id}</span>
          </p>
        </div>

        <section className="mb-6 rounded-xl border border-[#D4C5A9] bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-[#2F3E2E]">Order Details</h2>
          <div className="mb-6 space-y-4">
            {order.items.map((item, index) => (
              <div key={`${item.product_id}-${index}`} className="flex items-center justify-between border-b border-[#E8E2D2] pb-4">
                <div>
                  <p className="font-semibold text-[#2F3E2E]">{item.product_name}</p>
                  <p className="text-sm text-[#7A7A7A]">Quantity: {item.quantity}</p>
                </div>
                <p className="font-bold text-[#2F3E2E]">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t-2 border-[#2F3E2E] pt-4">
            <p className="text-xl font-bold text-[#2F3E2E]">Total Amount</p>
            <p className="text-2xl font-bold text-[#E6AF2E]">₹{order.total_amount.toFixed(2)}</p>
          </div>
        </section>

        <section className="mb-6 rounded-xl border border-[#D4C5A9] bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-[#2F3E2E]">Shipping Details</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-[#7A7A7A]">Name</p>
              <p className="font-semibold text-[#2F3E2E]">{order.customer_name}</p>
            </div>
            <div>
              <p className="text-sm text-[#7A7A7A]">Email</p>
              <p className="font-semibold text-[#2F3E2E]">{order.customer_email}</p>
            </div>
            <div>
              <p className="text-sm text-[#7A7A7A]">Phone</p>
              <p className="font-semibold text-[#2F3E2E]">{order.customer_phone}</p>
            </div>
            <div>
              <p className="text-sm text-[#7A7A7A]">Address</p>
              <p className="font-semibold text-[#2F3E2E]">
                {order.shipping_address}, {order.city}, {order.state} - {order.pincode}
              </p>
            </div>
          </div>
        </section>

        <div className="text-center">
          <Link href="/" className="inline-flex rounded-full bg-[#2F3E2E] px-8 py-4 text-lg text-[#FDFBF7] transition-colors hover:bg-[#1F2B1E]">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
