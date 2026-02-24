"use client";

import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { LOGO_URL, type SiteSettings } from "../lib/site-data";

const defaultSettings: SiteSettings = {
  contact_email: "info@giriputar.com",
  contact_phone: "+91 98765 43210",
  contact_address: "Himalayan Foothills, Uttarakhand, India",
  instagram_url: "#",
  facebook_url: "#",
  twitter_url: "#",
};

export default function Footer({ settings }: { settings?: SiteSettings | null }) {
  const resolvedSettings = settings ?? defaultSettings;

  return (
    <footer className="bg-[#2F3E2E] px-4 py-16 text-[#FDFBF7]" data-testid="footer">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-12 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img src={LOGO_URL} alt="GIRIPUTAR Logo" className="h-12 w-12 object-contain" />
              <div>
                <h3 className="text-2xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
                  GIRIPUTAR
                </h3>
                <p className="text-sm text-[#E6AF2E]" style={{ fontFamily: "Cinzel, serif" }}>
                  Son of Mountains
                </p>
              </div>
            </div>
            <p className="leading-relaxed text-[#FDFBF7]/80">
              Pure Himalayan Haldi, bringing the essence of mountain wellness to your home.
            </p>
          </div>

          <div>
            <h4
              className="mb-4 text-xl font-bold text-[#E6AF2E]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3" data-testid="contact-email">
                <Mail className="h-5 w-5 text-[#E6AF2E]" />
                <span>{resolvedSettings.contact_email}</span>
              </div>
              <div className="flex items-center gap-3" data-testid="contact-phone">
                <Phone className="h-5 w-5 text-[#E6AF2E]" />
                <span>{resolvedSettings.contact_phone}</span>
              </div>
              <div className="flex items-center gap-3" data-testid="contact-address">
                <MapPin className="h-5 w-5 text-[#E6AF2E]" />
                <span>{resolvedSettings.contact_address}</span>
              </div>
            </div>
          </div>

          <div>
            <h4
              className="mb-4 text-xl font-bold text-[#E6AF2E]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a
                href={resolvedSettings.instagram_url || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6AF2E] transition-transform hover:scale-110"
                data-testid="social-instagram"
              >
                <Instagram className="h-5 w-5 text-[#2F3E2E]" />
              </a>
              <a
                href={resolvedSettings.facebook_url || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6AF2E] transition-transform hover:scale-110"
                data-testid="social-facebook"
              >
                <Facebook className="h-5 w-5 text-[#2F3E2E]" />
              </a>
              <a
                href={resolvedSettings.twitter_url || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6AF2E] transition-transform hover:scale-110"
                data-testid="social-twitter"
              >
                <Twitter className="h-5 w-5 text-[#2F3E2E]" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#FDFBF7]/20 pt-8 text-center">
          <p className="text-[#FDFBF7]/60">
            &copy; 2026 GIRIPUTAR. All rights reserved. Made with love from the mountains.
          </p>
        </div>
      </div>
    </footer>
  );
}
