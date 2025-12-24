import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { Product, CartItem, AppContextType } from './types';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CartPanel from './components/CartPanel';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Gallery from './pages/Gallery';
import Custom from './pages/Custom';
import Contact from './pages/Contact';

// Context for global state
export const AppContext = createContext<AppContextType | null>(null);

// Animated routes wrapper
function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:category" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/custom" element={<Custom />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

    // Toggle dark mode
    const toggleDarkMode = (): void => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    // Cart functions
    const addToCart = (product: Product): void => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: number): void => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number): void => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Apply dark mode class on mount
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        }
    }, [darkMode]);

    const contextValue: AppContextType = {
        darkMode,
        toggleDarkMode,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen
    };

    return (
        <AppContext.Provider value={contextValue}>
            <Router>
                <div className={`min-h-screen ${darkMode ? 'dark bg-matte-900' : 'bg-beige-100'}`}>
                    <ScrollProgress />
                    <Header />
                    <main>
                        <AnimatedRoutes />
                    </main>
                    <Footer />
                    <CartPanel />
                </div>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
