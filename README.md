# Luxe Living - Luxury Furniture E-Commerce Website

A premium, production-ready luxury furniture e-commerce website built with React + Vite (frontend) and Node.js + Express (backend).

## 🌟 Features

### Frontend
- **Home Page** - Full-screen hero with GSAP animations, animated statistics, category showcase, featured products, testimonials carousel
- **Products Page** - Category filtering, sorting, grid/list toggle, responsive design
- **Product Detail** - Image gallery with zoom, color selection, quantity controls, related products
- **Gallery/Lookbook** - Masonry grid with lightbox modal and category filtering
- **Custom Furniture** - Multi-step form with animated progress and success state
- **Contact Page** - Animated contact form, Google Maps embed, FAQ section

### Design
- **Color Palette**: Dark wood brown, beige, matte black with gold accents
- **Typography**: Playfair Display (headings) + Inter (body)
- **Animations**: Framer Motion page transitions + GSAP scroll animations
- **Responsive**: Mobile-first design with touch-friendly interactions
- **Dark Mode**: Full dark/light mode toggle

### Backend
- RESTful API serving static product data
- Contact form handling (console logging)
- Custom furniture request handling
- Newsletter subscription endpoint

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

1. **Install Backend Dependencies**
```bash
cd backend
npm install
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

### Running Locally

1. **Start the Backend Server** (Terminal 1)
```bash
cd backend
npm run dev
```
The API will be available at `http://localhost:3001`

2. **Start the Frontend Dev Server** (Terminal 2)
```bash
cd frontend
npm run dev
```
The website will be available at `http://localhost:5173`

## 📁 Project Structure

```
furniture/
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx          # Glassmorphic sticky header
│   │   │   ├── Footer.jsx          # Footer with newsletter
│   │   │   ├── CartPanel.jsx       # Slide-in cart panel
│   │   │   ├── ProductCard.jsx     # Product card with hover effects
│   │   │   ├── TestimonialCarousel.jsx # Auto-sliding testimonials
│   │   │   └── ScrollProgress.jsx  # Scroll progress indicator
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page with GSAP
│   │   │   ├── Products.jsx        # Product listing with filters
│   │   │   ├── ProductDetail.jsx   # Product detail page
│   │   │   ├── Gallery.jsx         # Masonry gallery
│   │   │   ├── Custom.jsx          # Custom furniture form
│   │   │   └── Contact.jsx         # Contact page
│   │   ├── data/
│   │   │   └── products.js         # Static product data
│   │   ├── App.jsx                 # Main app with routing
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── server.js                   # Express server
│   ├── mockData.js                 # All product data
│   └── package.json
│
└── README.md
```

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Dark Wood | `#3E2723`, `#5D4037` | Primary backgrounds, rich elements |
| Beige | `#F5F5DC`, `#D7CCC8` | Light backgrounds, text on dark |
| Matte Black | `#1A1A1A`, `#262626` | Headers, dark mode backgrounds |
| Gold | `#D4AF37` | Accents, CTAs, highlights |

## ✨ Animations

### GSAP (Scroll-based)
- Hero headline reveal animation
- Statistics counter animation
- Category cards fade-in
- Staggered content reveals

### Framer Motion
- Page transitions (fade + slide)
- Product card hover effects
- Cart panel slide-in
- Modal animations
- Button micro-interactions

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (with filters) |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/categories` | Get all categories |
| GET | `/api/testimonials` | Get testimonials |
| GET | `/api/gallery` | Get gallery images |
| GET | `/api/custom-options` | Get custom furniture options |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/custom-request` | Submit custom request |
| POST | `/api/newsletter` | Newsletter signup |

## 🏗️ Building for Production

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Start the production server:
```bash
cd backend
NODE_ENV=production npm start
```

## 📝 Notes

- All product data is static/mock data for demonstration
- Form submissions are logged to console (no database)
- Images use Unsplash placeholder URLs
- Prices are in Indian Rupees (₹)

## 🎯 Performance Optimizations

- Lazy loading images
- GPU-accelerated animations (transforms only)
- Respects `prefers-reduced-motion`
- Skeleton loaders for async content
- Optimized bundle with Vite

---

**Built with ❤️ for luxury homes**
