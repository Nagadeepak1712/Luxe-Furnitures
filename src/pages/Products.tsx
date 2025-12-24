import { useState, useEffect, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Filter, Grid, List, X, SlidersHorizontal } from 'lucide-react';
import { AppContext } from '../App';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import type { AppContextType, Product } from '../types';

const Products: React.FC = () => {
    const { category } = useParams<{ category?: string }>();
    const { darkMode, addToCart } = useContext(AppContext) as AppContextType;
    const [selectedCategory, setSelectedCategory] = useState<string>(category || 'all');
    const [sortBy, setSortBy] = useState<string>('featured');
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
    const [gridView, setGridView] = useState<boolean>(true);

    // Update selected category when URL changes
    useEffect(() => {
        if (category) {
            const categoryMap: Record<string, string> = {
                'living-room': 'Living Room',
                'bedroom': 'Bedroom',
                'dining': 'Dining',
                'office': 'Office',
                'luxury-collection': 'Luxury Collection'
            };
            setSelectedCategory(categoryMap[category] || 'all');
        } else {
            setSelectedCategory('all');
        }
    }, [category]);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Filter by price range
        filtered = filtered.filter(
            p => p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        // Sort
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
                break;
            default:
                filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        }

        return filtered;
    }, [selectedCategory, sortBy, priceRange]);

    const pageVariants: Variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    const filterVariants: Variants = {
        closed: { x: '-100%', opacity: 0 },
        open: { x: 0, opacity: 1 }
    };

    const getCategoryTitle = (): string => {
        if (selectedCategory === 'all') return 'All Collections';
        return selectedCategory;
    };

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`min-h-screen pt-24 ${darkMode ? 'bg-matte-900' : 'bg-beige-100'}`}
        >
            {/* Hero Banner */}
            <section className="relative h-64 md:h-80 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
                        alt="Products collection"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-matte-900/70" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center section-padding">
                    <motion.span
                        className="text-gold font-body text-sm uppercase tracking-[0.3em] mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Explore Our
                    </motion.span>
                    <motion.h1
                        className="font-display text-4xl md:text-5xl lg:text-6xl text-white"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {getCategoryTitle()}
                    </motion.h1>
                    <motion.div
                        className="divider-gold mt-6"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    />
                </div>
            </section>

            {/* Filter Bar */}
            <section className={`sticky top-20 lg:top-24 z-30 ${darkMode ? 'bg-matte-800/95' : 'bg-white/95'
                } backdrop-blur-lg border-b ${darkMode ? 'border-matte-700' : 'border-beige-300'
                }`}>
                <div className="section-padding py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Mobile Filter Toggle */}
                            <motion.button
                                className={`lg:hidden flex items-center gap-2 px-4 py-2 border ${darkMode
                                    ? 'border-matte-600 text-beige-100'
                                    : 'border-beige-400 text-matte-700'
                                    } hover:border-gold hover:text-gold transition-colors`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsFilterOpen(true)}
                            >
                                <SlidersHorizontal size={18} />
                                <span className="font-body text-sm">Filters</span>
                            </motion.button>

                            {/* Desktop Category Tabs */}
                            <div className="hidden lg:flex items-center gap-2">
                                <button
                                    className={`px-4 py-2 font-body text-sm uppercase tracking-wider transition-colors ${selectedCategory === 'all'
                                        ? 'bg-gold text-matte-900'
                                        : darkMode
                                            ? 'text-beige-200 hover:text-gold'
                                            : 'text-matte-600 hover:text-gold'
                                        }`}
                                    onClick={() => setSelectedCategory('all')}
                                >
                                    All
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        className={`px-4 py-2 font-body text-sm uppercase tracking-wider transition-colors ${selectedCategory === cat.name
                                            ? 'bg-gold text-matte-900'
                                            : darkMode
                                                ? 'text-beige-200 hover:text-gold'
                                                : 'text-matte-600 hover:text-gold'
                                            }`}
                                        onClick={() => setSelectedCategory(cat.name)}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Results Count */}
                            <span className={`hidden md:block font-body text-sm ${darkMode ? 'text-beige-400' : 'text-matte-500'
                                }`}>
                                {filteredProducts.length} products
                            </span>

                            {/* Sort Dropdown */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className={`px-4 py-2 font-body text-sm border ${darkMode
                                    ? 'bg-matte-700 border-matte-600 text-beige-100'
                                    : 'bg-white border-beige-400 text-matte-700'
                                    } focus:outline-none focus:border-gold`}
                            >
                                <option value="featured">Featured</option>
                                <option value="newest">Newest</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                            </select>

                            {/* Grid/List Toggle */}
                            <div className={`hidden md:flex border ${darkMode ? 'border-matte-600' : 'border-beige-400'
                                }`}>
                                <button
                                    className={`p-2 ${gridView
                                        ? 'bg-gold text-matte-900'
                                        : darkMode
                                            ? 'text-beige-200'
                                            : 'text-matte-600'
                                        }`}
                                    onClick={() => setGridView(true)}
                                >
                                    <Grid size={18} />
                                </button>
                                <button
                                    className={`p-2 ${!gridView
                                        ? 'bg-gold text-matte-900'
                                        : darkMode
                                            ? 'text-beige-200'
                                            : 'text-matte-600'
                                        }`}
                                    onClick={() => setGridView(false)}
                                >
                                    <List size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Filter Panel */}
            <AnimatePresence>
                {isFilterOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsFilterOpen(false)}
                        />
                        <motion.div
                            className={`fixed top-0 left-0 h-full w-80 ${darkMode ? 'bg-matte-800' : 'bg-white'
                                } z-50 lg:hidden overflow-y-auto`}
                            variants={filterVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            transition={{ duration: 0.3 }}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className={`font-display text-xl ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                        }`}>
                                        Filters
                                    </h3>
                                    <button onClick={() => setIsFilterOpen(false)}>
                                        <X className={darkMode ? 'text-beige-200' : 'text-matte-700'} />
                                    </button>
                                </div>

                                {/* Categories */}
                                <div className="mb-8">
                                    <h4 className={`font-body text-sm uppercase tracking-wider mb-4 ${darkMode ? 'text-gold' : 'text-wood-600'
                                        }`}>
                                        Categories
                                    </h4>
                                    <div className="space-y-2">
                                        <button
                                            className={`block w-full text-left py-2 font-body ${selectedCategory === 'all'
                                                ? 'text-gold'
                                                : darkMode
                                                    ? 'text-beige-200'
                                                    : 'text-matte-600'
                                                }`}
                                            onClick={() => {
                                                setSelectedCategory('all');
                                                setIsFilterOpen(false);
                                            }}
                                        >
                                            All Collections
                                        </button>
                                        {categories.map(cat => (
                                            <button
                                                key={cat.id}
                                                className={`block w-full text-left py-2 font-body ${selectedCategory === cat.name
                                                    ? 'text-gold'
                                                    : darkMode
                                                        ? 'text-beige-200'
                                                        : 'text-matte-600'
                                                    }`}
                                                onClick={() => {
                                                    setSelectedCategory(cat.name);
                                                    setIsFilterOpen(false);
                                                }}
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div className="mb-8">
                                    <h4 className={`font-body text-sm uppercase tracking-wider mb-4 ${darkMode ? 'text-gold' : 'text-wood-600'
                                        }`}>
                                        Price Range
                                    </h4>
                                    <div className="space-y-4">
                                        <input
                                            type="range"
                                            min="0"
                                            max="200000"
                                            step="5000"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                            className="w-full accent-gold"
                                        />
                                        <div className={`flex justify-between font-body text-sm ${darkMode ? 'text-beige-300' : 'text-matte-600'
                                            }`}>
                                            <span>₹0</span>
                                            <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Apply Button */}
                                <button
                                    className="btn-primary w-full"
                                    onClick={() => setIsFilterOpen(false)}
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Products Grid */}
            <section className="section-padding py-12">
                <AnimatePresence mode="wait">
                    {filteredProducts.length > 0 ? (
                        <motion.div
                            key={selectedCategory + sortBy}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={
                                gridView
                                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
                                    : 'space-y-6'
                            }
                        >
                            {filteredProducts.map((product, index) => (
                                gridView ? (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        index={index}
                                        onAddToCart={addToCart}
                                    />
                                ) : (
                                    <ProductListItem
                                        key={product.id}
                                        product={product}
                                        onAddToCart={addToCart}
                                    />
                                )
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <Filter className={`mx-auto mb-4 ${darkMode ? 'text-matte-600' : 'text-beige-400'
                                }`} size={48} />
                            <h3 className={`font-display text-2xl mb-2 ${darkMode ? 'text-beige-200' : 'text-matte-700'
                                }`}>
                                No products found
                            </h3>
                            <p className={`font-body ${darkMode ? 'text-beige-400' : 'text-matte-500'
                                }`}>
                                Try adjusting your filters to find what you're looking for
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </motion.div>
    );
};

// List View Item Component
interface ProductListItemProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product, onAddToCart }) => {
    const { darkMode } = useContext(AppContext) as AppContextType;

    return (
        <motion.div
            className={`flex gap-6 p-6 ${darkMode ? 'bg-matte-800' : 'bg-white'
                }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div className="w-48 h-48 flex-shrink-0 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="flex-1">
                <span className={`font-body text-xs uppercase tracking-wider ${darkMode ? 'text-gold' : 'text-wood-600'
                    }`}>
                    {product.category}
                </span>
                <h3 className={`font-display text-xl mt-1 mb-2 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                    }`}>
                    {product.name}
                </h3>
                <p className={`font-body text-sm mb-4 ${darkMode ? 'text-beige-400' : 'text-matte-500'
                    }`}>
                    {product.description}
                </p>
                <div className="flex items-center justify-between">
                    <span className="font-display text-2xl text-gold">
                        {product.priceFormatted}
                    </span>
                    <motion.button
                        className="btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.preventDefault();
                            onAddToCart(product);
                        }}
                    >
                        Add to Cart
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default Products;
