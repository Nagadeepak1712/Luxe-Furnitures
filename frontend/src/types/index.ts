// Product Types
export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    priceFormatted: string;
    image: string;
    imageAlt: string;
    description: string;
    shortDescription: string;
    dimensions: string;
    material: string;
    rating: number;
    reviews: number;
    inStock: boolean;
    featured: boolean;
    new: boolean;
    colors: string[];
    care: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    image: string;
    productCount: number;
}

export interface Testimonial {
    id: number;
    name: string;
    location: string;
    rating: number;
    title: string;
    text: string;
    image: string;
    product: string;
    date: string;
}

export interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    category: string;
    size: 'small' | 'medium' | 'large';
}

export interface WoodType {
    id: string;
    name: string;
    priceMultiplier: number;
}

export interface Fabric {
    id: string;
    name: string;
    priceMultiplier: number;
}

export interface Size {
    id: string;
    name: string;
    priceMultiplier: number;
}

export interface BudgetRange {
    id: string;
    name: string;
}

export interface CustomOptions {
    woodTypes: WoodType[];
    fabrics: Fabric[];
    sizes: Size[];
    budgetRanges: BudgetRange[];
}

export interface Statistic {
    label: string;
    value: number;
}

export interface NavLink {
    name: string;
    path: string;
}

export interface FooterLink {
    name: string;
    path: string;
}

export interface SocialLink {
    name: string;
    url: string;
}

export interface FooterContact {
    address: string;
    phone: string;
    email: string;
    hours: string;
}

export interface FooterData {
    about: string;
    quickLinks: FooterLink[];
    contact: FooterContact;
    social: SocialLink[];
}

// Cart Types
export interface CartItem extends Product {
    quantity: number;
}

// App Context Types
export interface AppContextType {
    darkMode: boolean;
    toggleDarkMode: () => void;
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    cartTotal: number;
    cartCount: number;
    isCartOpen: boolean;
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Form Types
export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export interface CustomFormData {
    name: string;
    email: string;
    phone: string;
    furnitureType: string;
    woodType: string;
    fabric: string;
    size: string;
    budget: string;
    description: string;
}
