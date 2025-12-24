import type { Product, Category, Testimonial, GalleryImage, CustomOptions, Statistic, NavLink, FooterData } from '../types';

// Premium Luxury Furniture Product Data
export const products: Product[] = [
    {
        id: 1,
        name: "Royal Velvet Sofa",
        category: "Living Room",
        price: 45000,
        priceFormatted: "₹45,000",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
        imageAlt: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
        description: "Premium handcrafted luxury sofa with deep velvet upholstery and solid walnut frame. Each piece is meticulously crafted by master artisans.",
        shortDescription: "Deep velvet upholstery with walnut frame",
        dimensions: "220cm W × 85cm D × 75cm H",
        material: "Velvet upholstery, Walnut frame",
        rating: 4.8,
        reviews: 124,
        inStock: true,
        featured: true,
        new: false,
        colors: ["Emerald Green", "Royal Blue", "Burgundy"],
        care: "Professional cleaning recommended. Avoid direct sunlight."
    },
    {
        id: 2,
        name: "Marble Dining Table",
        category: "Dining",
        price: 85000,
        priceFormatted: "₹85,000",
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
        imageAlt: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
        description: "Elegant marble-top dining table with brass-accented legs, seats 6-8 guests. The Italian Carrara marble top features natural veining unique to each piece.",
        shortDescription: "Italian marble with brass accents",
        dimensions: "180cm W × 90cm D × 75cm H",
        material: "Italian Carrara marble, Brass-plated steel base",
        rating: 4.9,
        reviews: 89,
        inStock: true,
        featured: true,
        new: true,
        colors: ["White Marble", "Black Marble"],
        care: "Wipe with damp cloth. Use coasters to prevent staining."
    },
    {
        id: 3,
        name: "Walnut Executive Desk",
        category: "Office",
        price: 68000,
        priceFormatted: "₹68,000",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80",
        imageAlt: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&q=80",
        description: "Commanding executive desk crafted from solid American walnut with integrated cable management and soft-close drawers. A statement piece for the discerning professional.",
        shortDescription: "Solid American walnut with cable management",
        dimensions: "180cm W × 80cm D × 76cm H",
        material: "American Walnut, Brass hardware",
        rating: 4.7,
        reviews: 56,
        inStock: true,
        featured: false,
        new: false,
        colors: ["Natural Walnut", "Dark Walnut"],
        care: "Dust regularly. Apply wood polish quarterly."
    },
    {
        id: 4,
        name: "Emperor King Bed Frame",
        category: "Bedroom",
        price: 125000,
        priceFormatted: "₹1,25,000",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
        imageAlt: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
        description: "Majestic king-size bed with tufted leather headboard and solid oak frame. Hand-stitched details and premium memory foam support system included.",
        shortDescription: "Tufted leather headboard with oak frame",
        dimensions: "200cm W × 220cm L × 140cm H",
        material: "Full-grain leather, Solid Oak, Memory foam",
        rating: 4.9,
        reviews: 203,
        inStock: true,
        featured: true,
        new: false,
        colors: ["Cognac Brown", "Charcoal Grey", "Ivory White"],
        care: "Condition leather biannually. Rotate mattress regularly."
    },
    {
        id: 5,
        name: "Artisan Coffee Table",
        category: "Living Room",
        price: 32000,
        priceFormatted: "₹32,000",
        image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80",
        imageAlt: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=800&q=80",
        description: "Sculptural coffee table featuring live-edge acacia wood slab with resin river inlay and hairpin brass legs. Each piece is one-of-a-kind.",
        shortDescription: "Live-edge acacia with resin river",
        dimensions: "120cm W × 60cm D × 45cm H",
        material: "Acacia wood, Epoxy resin, Brass legs",
        rating: 4.6,
        reviews: 78,
        inStock: true,
        featured: false,
        new: true,
        colors: ["Natural with Blue Resin", "Natural with Emerald Resin"],
        care: "Avoid placing hot items directly. Clean with damp cloth."
    },
    {
        id: 6,
        name: "Bergère Accent Chair",
        category: "Living Room",
        price: 38000,
        priceFormatted: "₹38,000",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80",
        imageAlt: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80",
        description: "French-inspired bergère chair with hand-carved mahogany frame and Belgian linen upholstery. Perfect for creating an elegant reading nook.",
        shortDescription: "Hand-carved mahogany with linen",
        dimensions: "75cm W × 80cm D × 95cm H",
        material: "Mahogany frame, Belgian linen",
        rating: 4.8,
        reviews: 92,
        inStock: true,
        featured: true,
        new: false,
        colors: ["Natural Linen", "Sage Green", "Dusty Rose"],
        care: "Vacuum regularly. Professional cleaning recommended."
    },
    {
        id: 7,
        name: "Crystal Bar Cabinet",
        category: "Luxury Collection",
        price: 145000,
        priceFormatted: "₹1,45,000",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
        imageAlt: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80",
        description: "Art Deco-inspired bar cabinet with mirrored interior, gold leaf detailing, and integrated LED lighting. Features custom glassware storage and wine rack.",
        shortDescription: "Art Deco with gold leaf and LED lighting",
        dimensions: "120cm W × 45cm D × 160cm H",
        material: "Ebony veneer, Mirror glass, Gold leaf",
        rating: 5.0,
        reviews: 34,
        inStock: true,
        featured: true,
        new: true,
        colors: ["Ebony with Gold"],
        care: "Dust with soft cloth. Handle gold leaf areas gently."
    },
    {
        id: 8,
        name: "Teak Outdoor Lounger",
        category: "Living Room",
        price: 52000,
        priceFormatted: "₹52,000",
        image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
        imageAlt: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
        description: "Premium grade-A teak lounger with adjustable recline and removable Sunbrella cushions. Weather-resistant for indoor or outdoor use.",
        shortDescription: "Grade-A teak with Sunbrella cushions",
        dimensions: "200cm W × 70cm D × 35cm H",
        material: "Grade-A Teak, Sunbrella fabric",
        rating: 4.7,
        reviews: 67,
        inStock: true,
        featured: false,
        new: false,
        colors: ["Natural Teak with Cream", "Natural Teak with Navy"],
        care: "Apply teak oil seasonally for indoor look. Silvering is natural outdoors."
    },
    {
        id: 9,
        name: "Victorian Vanity Set",
        category: "Bedroom",
        price: 78000,
        priceFormatted: "₹78,000",
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
        imageAlt: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
        description: "Exquisite Victorian-style vanity complete with tri-fold mirror and velvet-lined jewelry drawers. Features hand-painted floral motifs and mother-of-pearl inlays.",
        shortDescription: "Victorian style with mother-of-pearl inlays",
        dimensions: "130cm W × 50cm D × 180cm H",
        material: "Cherry wood, Mother-of-pearl, Beveled mirrors",
        rating: 4.9,
        reviews: 42,
        inStock: true,
        featured: false,
        new: false,
        colors: ["Antique White", "Cherry"],
        care: "Dust regularly. Avoid harsh chemicals on painted surfaces."
    },
    {
        id: 10,
        name: "Modular Bookshelf System",
        category: "Office",
        price: 95000,
        priceFormatted: "₹95,000",
        image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80",
        imageAlt: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        description: "Customizable floor-to-ceiling bookshelf system in solid ash with integrated reading lights and rolling library ladder. Expandable modular design.",
        shortDescription: "Modular ash with library ladder",
        dimensions: "300cm W × 35cm D × 280cm H",
        material: "Solid Ash wood, Brass hardware, LED lights",
        rating: 4.8,
        reviews: 31,
        inStock: true,
        featured: true,
        new: false,
        colors: ["Natural Ash", "Ebonized Ash"],
        care: "Dust shelves regularly. Oil brass fittings annually."
    },
    {
        id: 11,
        name: "Chesterfield Leather Sofa",
        category: "Luxury Collection",
        price: 135000,
        priceFormatted: "₹1,35,000",
        image: "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=800&q=80",
        imageAlt: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
        description: "Iconic Chesterfield three-seater with hand-tufted full-grain leather and individually nailed brass studs. A timeless investment piece.",
        shortDescription: "Hand-tufted full-grain leather",
        dimensions: "230cm W × 90cm D × 80cm H",
        material: "Full-grain Italian leather, Brass studs",
        rating: 5.0,
        reviews: 156,
        inStock: true,
        featured: true,
        new: false,
        colors: ["Cognac", "British Racing Green", "Oxblood"],
        care: "Condition leather every 6 months. Keep away from direct heat."
    },
    {
        id: 12,
        name: "Zen Garden Side Table",
        category: "Living Room",
        price: 28000,
        priceFormatted: "₹28,000",
        image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&q=80",
        imageAlt: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=800&q=80",
        description: "Japanese-inspired side table with black lacquer finish and hand-painted gold leaf cherry blossoms. Features hidden storage compartment.",
        shortDescription: "Black lacquer with gold leaf motifs",
        dimensions: "50cm W × 50cm D × 55cm H",
        material: "Lacquered wood, Gold leaf",
        rating: 4.6,
        reviews: 48,
        inStock: true,
        featured: false,
        new: true,
        colors: ["Black with Gold"],
        care: "Dust with soft cloth only. Avoid water contact."
    },
    {
        id: 13,
        name: "Canopy Four-Poster Bed",
        category: "Luxury Collection",
        price: 185000,
        priceFormatted: "₹1,85,000",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
        imageAlt: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
        description: "Romantic four-poster canopy bed with carved rosewood posts and pure silk drapery. The ultimate statement in bedroom luxury.",
        shortDescription: "Carved rosewood with silk drapery",
        dimensions: "220cm W × 240cm L × 220cm H",
        material: "Indian Rosewood, Silk fabric, Hand-forged iron",
        rating: 5.0,
        reviews: 28,
        inStock: true,
        featured: true,
        new: false,
        colors: ["Deep Mahogany with Ivory Silk", "Ebony with Champagne Silk"],
        care: "Dry clean silk drapery. Polish wood with beeswax."
    },
    {
        id: 14,
        name: "Sculptural Dining Chairs (Set of 4)",
        category: "Dining",
        price: 72000,
        priceFormatted: "₹72,000",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80",
        imageAlt: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80",
        description: "Set of four contemporary dining chairs with sculptural bent-wood backs and mohair velvet seats. Stackable for easy storage.",
        shortDescription: "Bent-wood with mohair velvet seats",
        dimensions: "50cm W × 55cm D × 85cm H (each)",
        material: "Bent oak, Mohair velvet, Brass feet",
        rating: 4.7,
        reviews: 63,
        inStock: true,
        featured: false,
        new: false,
        colors: ["Natural Oak/Terracotta", "Walnut/Forest Green"],
        care: "Vacuum velvet seats regularly. Wipe wood with damp cloth."
    },
    {
        id: 15,
        name: "Antique Console Table",
        category: "Living Room",
        price: 58000,
        priceFormatted: "₹58,000",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
        imageAlt: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80",
        description: "Elegant console table inspired by 18th-century French design with cabriole legs and gold gilt detailing. Perfect for grand entryways.",
        shortDescription: "French design with gold gilt details",
        dimensions: "150cm W × 40cm D × 85cm H",
        material: "Solid beech, Gold gilt, Marble top",
        rating: 4.8,
        reviews: 37,
        inStock: true,
        featured: false,
        new: false,
        colors: ["Antique White with Gold"],
        care: "Dust regularly. Touch up gilt with specialty paint as needed."
    },
    {
        id: 16,
        name: "Floating Nightstand Pair",
        category: "Bedroom",
        price: 42000,
        priceFormatted: "₹42,000",
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
        imageAlt: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
        description: "Pair of wall-mounted floating nightstands with soft-close drawers and wireless charging surface. Minimalist Scandinavian-Japanese fusion design.",
        shortDescription: "Floating design with wireless charging",
        dimensions: "55cm W × 35cm D × 20cm H (each)",
        material: "White oak, Wireless charging technology",
        rating: 4.5,
        reviews: 84,
        inStock: true,
        featured: false,
        new: true,
        colors: ["Natural Oak", "Smoked Oak"],
        care: "Wipe with dry cloth. Ensure wireless charger stays dust-free."
    }
];

// Categories for filtering and navigation
export const categories: Category[] = [
    {
        id: "living-room",
        name: "Living Room",
        description: "Sofas, chairs, and tables for elegant living spaces",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
        productCount: 6
    },
    {
        id: "bedroom",
        name: "Bedroom",
        description: "Beds, nightstands, and vanities for restful retreats",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
        productCount: 4
    },
    {
        id: "dining",
        name: "Dining",
        description: "Tables and chairs for memorable gatherings",
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
        productCount: 2
    },
    {
        id: "office",
        name: "Office",
        description: "Desks and storage for productive workspaces",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80",
        productCount: 2
    },
    {
        id: "luxury-collection",
        name: "Luxury Collection",
        description: "Our most exclusive and prestigious pieces",
        image: "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=800&q=80",
        productCount: 3
    }
];

// Customer testimonials
export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Priya Sharma",
        location: "Mumbai, Maharashtra",
        rating: 5,
        title: "Exceptional Craftsmanship",
        text: "The Chesterfield sofa exceeded all my expectations. The leather quality and attention to detail are unmatched. Luxe Living has earned a customer for life.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
        product: "Chesterfield Leather Sofa",
        date: "October 2024"
    },
    {
        id: 2,
        name: "Rajesh Malhotra",
        location: "New Delhi",
        rating: 5,
        title: "Worth Every Rupee",
        text: "Our marble dining table is the centerpiece of our home. Guests always compliment it. The delivery and white-glove installation service was impeccable.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
        product: "Marble Dining Table",
        date: "September 2024"
    },
    {
        id: 3,
        name: "Ananya Krishnan",
        location: "Bangalore, Karnataka",
        rating: 5,
        title: "Transformed My Bedroom",
        text: "The Emperor King Bed is absolutely magnificent. Sleeping has never felt so luxurious. The team was helpful in coordinating the custom fabric options.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
        product: "Emperor King Bed Frame",
        date: "November 2024"
    },
    {
        id: 4,
        name: "Vikram Reddy",
        location: "Hyderabad, Telangana",
        rating: 4,
        title: "Professional Excellence",
        text: "My home office is now the envy of all my colleagues. The Walnut Executive Desk is stunning and functional. Delivery took slightly longer than expected, but worth the wait.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
        product: "Walnut Executive Desk",
        date: "August 2024"
    },
    {
        id: 5,
        name: "Meera Kapoor",
        location: "Pune, Maharashtra",
        rating: 5,
        title: "Art Meets Function",
        text: "The Artisan Coffee Table is truly a work of art. Each time I look at the resin river detail, I discover something new. A conversation starter in every sense.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
        product: "Artisan Coffee Table",
        date: "October 2024"
    },
    {
        id: 6,
        name: "Arjun Mehta",
        location: "Chennai, Tamil Nadu",
        rating: 5,
        title: "Luxury Redefined",
        text: "The Crystal Bar Cabinet is the crown jewel of our entertainment room. The LED lighting and gold leaf details make it absolutely spectacular.",
        image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&q=80",
        product: "Crystal Bar Cabinet",
        date: "December 2024"
    }
];

// Gallery/Lookbook images
export const galleryImages: GalleryImage[] = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
        alt: "Luxurious living room setup",
        category: "Living Room",
        size: "large"
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
        alt: "Elegant bedroom retreat",
        category: "Bedroom",
        size: "medium"
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
        alt: "Sophisticated dining area",
        category: "Dining",
        size: "medium"
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
        alt: "Modern luxury interior",
        category: "Interior",
        size: "large"
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        alt: "Grand entrance hall",
        category: "Entrance",
        size: "small"
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
        alt: "Cozy reading corner",
        category: "Living Room",
        size: "small"
    },
    {
        id: 7,
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        alt: "Executive home office",
        category: "Office",
        size: "medium"
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
        alt: "Luxury penthouse living",
        category: "Living Room",
        size: "large"
    }
];

// Custom furniture options
export const customOptions: CustomOptions = {
    woodTypes: [
        { id: "walnut", name: "American Walnut", priceMultiplier: 1.0 },
        { id: "oak", name: "European Oak", priceMultiplier: 0.9 },
        { id: "teak", name: "Burma Teak", priceMultiplier: 1.3 },
        { id: "mahogany", name: "African Mahogany", priceMultiplier: 1.2 },
        { id: "rosewood", name: "Indian Rosewood", priceMultiplier: 1.5 },
        { id: "maple", name: "Canadian Maple", priceMultiplier: 0.85 }
    ],
    fabrics: [
        { id: "velvet", name: "Premium Velvet", priceMultiplier: 1.0 },
        { id: "linen", name: "Belgian Linen", priceMultiplier: 0.9 },
        { id: "leather", name: "Full-Grain Leather", priceMultiplier: 1.5 },
        { id: "silk", name: "Mulberry Silk", priceMultiplier: 2.0 },
        { id: "cotton", name: "Egyptian Cotton", priceMultiplier: 0.8 },
        { id: "mohair", name: "Mohair Blend", priceMultiplier: 1.3 }
    ],
    sizes: [
        { id: "standard", name: "Standard", priceMultiplier: 1.0 },
        { id: "large", name: "Large (+20%)", priceMultiplier: 1.2 },
        { id: "xl", name: "Extra Large (+40%)", priceMultiplier: 1.4 },
        { id: "custom", name: "Custom Dimensions", priceMultiplier: 1.5 }
    ],
    budgetRanges: [
        { id: "50k-100k", name: "₹50,000 - ₹1,00,000" },
        { id: "100k-200k", name: "₹1,00,000 - ₹2,00,000" },
        { id: "200k-500k", name: "₹2,00,000 - ₹5,00,000" },
        { id: "500k+", name: "₹5,00,000+" }
    ]
};

// Statistics for hero/about sections
export const statistics: Statistic[] = [
    { label: "Years of Excellence", value: 25 },
    { label: "Happy Customers", value: 15000 },
    { label: "Artisan Craftsmen", value: 150 },
    { label: "Design Awards", value: 42 }
];

// Navigation links
export const navLinks: NavLink[] = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/products" },
    { name: "Gallery", path: "/gallery" },
    { name: "Custom", path: "/custom" },
    { name: "Contact", path: "/contact" }
];

// Footer data
export const footerData: FooterData = {
    about: "Luxe Living has been crafting exceptional furniture since 1999. Each piece tells a story of artisanal excellence and timeless design.",
    quickLinks: [
        { name: "About Us", path: "/about" },
        { name: "Collections", path: "/products" },
        { name: "Custom Furniture", path: "/custom" },
        { name: "Care Guide", path: "/care" },
        { name: "Shipping & Returns", path: "/shipping" }
    ],
    contact: {
        address: "42 Luxury Lane, Koramangala, Bangalore 560034",
        phone: "+91 80 4567 8900",
        email: "hello@luxeliving.in",
        hours: "Mon - Sat: 10:00 AM - 8:00 PM"
    },
    social: [
        { name: "Instagram", url: "https://instagram.com" },
        { name: "Facebook", url: "https://facebook.com" },
        { name: "Pinterest", url: "https://pinterest.com" },
        { name: "LinkedIn", url: "https://linkedin.com" }
    ]
};
