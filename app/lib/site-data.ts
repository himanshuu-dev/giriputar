export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  image_url: string;
  benefits: string[];
  in_stock: boolean;
};

export type CartItem = Product & {
  quantity: number;
};

export type OrderRecord = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  state: string;
  pincode: string;
  items: {
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }[];
  total_amount: number;
};

export const PRODUCT: Product = {
  id: "haldi-200g",
  name: "GIRIPUTAR Pahadi Desi Haldi",
  description:
    "100% Pure & Natural mountain-grown turmeric from the Himalayas. Handpicked from high-altitude farms, our Haldi is rich in curcumin and free from any additives or preservatives. Experience the golden goodness of nature in every pinch.",
  price: 299,
  weight: "200g",
  image_url:
    "https://customer-assets.emergentagent.com/job_dd09a6af-4865-4761-8b06-e6353edaca87/artifacts/9wect2by_IMG_8717.png",
  benefits: [
    "Rich in natural curcumin",
    "Boosts immunity naturally",
    "Anti-inflammatory properties",
    "100% chemical-free",
    "Sourced from Himalayan farms",
  ],
  in_stock: true,
};

export const HERO_BG =
  "https://images.unsplash.com/photo-1769123358749-5a819e0afbf8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YXMlMjBtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHN1bnJpc2UlMjBnb2xkZW58ZW58MHx8fHwxNzcxMzU2MDY2fDA&ixlib=rb-4.1.0&q=85";

export const STORY_BG =
  "https://images.unsplash.com/photo-1762884110133-926e4195d3b9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBvcmdhbmljJTIwZmFybWluZyUyMGZpZWxkfGVufDB8fHx8MTc3MTM1NjA2N3ww&ixlib=rb-4.1.0&q=85";

export const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_dd09a6af-4865-4761-8b06-e6353edaca87/artifacts/uq68pfoe_08B5AFA9-71F0-49E8-A10E-85C8062F17F6.jpeg";

export const BENEFIT_CARDS = [
  {
    title: "Boosts Immunity",
    description:
      "Natural curcumin strengthens your immune system and fights inflammation.",
    icon: "heart",
  },
  {
    title: "100% Pure",
    description:
      "No additives, no preservatives, no chemicals. Just pure mountain goodness.",
    icon: "shield",
  },
  {
    title: "Traditional Wellness",
    description:
      "Harvested using age-old methods from pristine Himalayan farms.",
    icon: "leaf",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The quality is exceptional! You can taste the purity in every pinch. My family loves it in our daily cooking.",
  },
  {
    name: "Rajesh Kumar",
    location: "Delhi",
    rating: 5,
    text: "Finally found authentic Pahadi Haldi! The aroma and color are far superior to supermarket brands. Highly recommended!",
  },
  {
    name: "Anita Desai",
    location: "Bangalore",
    rating: 5,
    text: "I have been using GIRIPUTAR for months now. The health benefits are real, and I feel more energetic. Worth every rupee!",
  },
] as const;
