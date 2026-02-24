This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Supabase Setup

1. Create a Supabase project at https://supabase.com.
2. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Run this SQL in Supabase SQL Editor to create `products`, `site_settings`, `testimonials`, and `orders` tables:

```sql
create table if not exists public.products (
  id text primary key,
  name text not null,
  description text not null,
  price numeric not null,
  weight text not null,
  image_url text not null,
  benefits jsonb not null,
  in_stock boolean not null default true
);

create table if not exists public.orders (
  id text primary key,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  shipping_address text not null,
  city text not null,
  state text not null,
  pincode text not null,
  items jsonb not null,
  total_amount numeric not null
);

create table if not exists public.testimonials (
  id bigint generated always as identity primary key,
  name text not null,
  location text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  text text not null,
  featured boolean not null default false
);

create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  contact_email text not null,
  contact_phone text not null,
  contact_address text not null,
  instagram_url text not null default '#',
  facebook_url text not null default '#',
  twitter_url text not null default '#'
);

insert into public.products (
  id,
  name,
  description,
  price,
  weight,
  image_url,
  benefits,
  in_stock
)
values (
  'haldi-200g',
  'GIRIPUTAR Pahadi Desi Haldi',
  '100% Pure & Natural mountain-grown turmeric from the Himalayas.',
  299,
  '200g',
  'assets/product.png',
  '["Rich in natural curcumin","Boosts immunity naturally","Anti-inflammatory properties","100% chemical-free","Sourced from Himalayan farms"]'::jsonb,
  true
)
on conflict (id) do nothing;

insert into public.testimonials (name, location, rating, text, featured)
values
  ('Priya Sharma', 'Mumbai', 5, 'The quality is exceptional! You can taste the purity in every pinch. My family loves it in our daily cooking.', true),
  ('Rajesh Kumar', 'Delhi', 5, 'Finally found authentic Pahadi Haldi! The aroma and color are far superior to supermarket brands. Highly recommended!', true),
  ('Anita Desai', 'Bangalore', 5, 'I have been using GIRIPUTAR for months now. The health benefits are real, and I feel more energetic. Worth every rupee!', false);

insert into public.site_settings (
  id,
  contact_email,
  contact_phone,
  contact_address,
  instagram_url,
  facebook_url,
  twitter_url
)
values (
  1,
  'info@giriputar.com',
  '+91 98765 43210',
  'Himalayan Foothills, Uttarakhand, India',
  'https://instagram.com',
  'https://facebook.com',
  'https://twitter.com'
)
on conflict (id) do update set
  contact_email = excluded.contact_email,
  contact_phone = excluded.contact_phone,
  contact_address = excluded.contact_address,
  instagram_url = excluded.instagram_url,
  facebook_url = excluded.facebook_url,
  twitter_url = excluded.twitter_url;

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.site_settings enable row level security;
alter table public.testimonials enable row level security;

create policy "Allow public selects for products"
on public.products
for select
to anon
using (true);

create policy "Allow public inserts for orders"
on public.orders
for insert
to anon
with check (true);

create policy "Allow public selects for orders"
on public.orders
for select
to anon
using (true);

create policy "Allow public selects for site settings"
on public.site_settings
for select
to anon
using (true);

create policy "Allow public selects for testimonials"
on public.testimonials
for select
to anon
using (true);
```

4. Install dependencies:

```bash
npm install
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
