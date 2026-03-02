# Victory Bio Labs — Research Compound Storefront

A fully compliant peptide research compound e-commerce storefront for **VictoryBioLabs.com**.

> ⚠️ **All products are for research purposes only. Not for human consumption.**

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Database | Supabase (PostgreSQL) |
| Auth/Sessions | Supabase SSR |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account and project

### 1. Clone and Install

```bash
git clone https://github.com/your-username/victorybiolabs.git
cd victorybiolabs
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase project credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Set Up Database

In your Supabase project SQL editor, run these files in order:

1. `src/lib/supabase/schema.sql` — Creates all tables, indexes, and RLS policies
2. `src/lib/supabase/seed.sql` — Inserts product catalog data

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── shop/               # Shop listing + product pages
│   │   └── [slug]/         # Dynamic product pages
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout flow
│   ├── about/              # About Maxwell & Victory Bio Labs
│   ├── education/          # Research education / blog
│   ├── contact/            # Contact form
│   └── legal/              # Legal pages
│       ├── disclaimer/
│       ├── terms/
│       ├── privacy/
│       └── refund-policy/
├── components/
│   ├── layout/             # Header, Footer, ComplianceBar
│   ├── shop/               # ProductCard, ProductGrid, VariantSelector
│   ├── cart/               # CartProvider (React Context)
│   └── ui/                 # DisclaimerBox, AgeVerificationModal + shadcn/ui
├── lib/
│   └── supabase/           # Supabase client, server, middleware + SQL files
└── types/                  # TypeScript interfaces
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, benefits, featured products, community CTA |
| `/shop` | Product catalog with category filter sidebar |
| `/shop/[slug]` | Product detail page with variant selector, compliance disclaimer |
| `/cart` | Cart with research acknowledgment checkbox |
| `/checkout` | Full checkout form with age + research confirmations |
| `/about` | Maxwell Francks story, mission, Victory Life Circle |
| `/education` | Research education blog listing |
| `/contact` | Contact form + support info |
| `/legal/disclaimer` | Full research-use disclaimer |
| `/legal/terms` | Terms of Service |
| `/legal/privacy` | Privacy Policy |
| `/legal/refund-policy` | Refund Policy |

---

## Compliance Features

Every part of this storefront is built with compliance in mind:

- **Age Verification Modal** — shown on first visit, requires 18+ confirmation
- **Sticky Compliance Bar** — "Research purposes only | Not for human consumption" on every page
- **Product Disclaimers** — warning box on every product page
- **Cart Confirmation** — required research-use checkbox before checkout
- **Checkout Confirmations** — both age (18+) and research-use confirmations required
- **Footer Compliance Banner** — prominent disclaimer on every page
- **Research-Only Language** — all product descriptions use research-context framing

---

## Brand Colors

| Color | Hex |
|-------|-----|
| Victory Navy | `#0A1628` |
| Victory Gold | `#D4AF37` |
| Background Dark | `#060f1e` |

---

## Database Schema

See `src/lib/supabase/schema.sql` for the full schema including:

- `products` — Product catalog with compliance fields
- `product_variants` — Size/concentration variants with pricing
- `orders` — Order records with research/age confirmation flags
- `order_items` — Line items per order
- `customers` — Customer profiles
- `customer_addresses` — Saved addresses

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy

### Environment Variables (Production)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## Legal Notice

Victory Bio Labs operates as a research compound supplier. All products are sold exclusively for laboratory and scientific research purposes. Products are not intended for human consumption and have not been evaluated or approved by the FDA.

---

*Built with Next.js 14 + Supabase. Victory Bio Labs — Pure Science. Real Results.*
