import { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
    ShoppingBag, Heart, Share2, ChevronLeft, ChevronRight,
    Star, Truck, Shield, RotateCcw, Ruler, Package, Minus, Plus,
    Check, X, ZoomIn
} from 'lucide-react';
import { AppContext } from '../App';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import type { AppContextType, Product } from '../types';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { darkMode, addToCart } = useContext(AppContext) as AppContextType;
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<number>(0);
    const [isZoomed, setIsZoomed] = useState<boolean>(false);
    const [addedToCart, setAddedToCart] = useState<boolean>(false);

    const product = products.find(p => p.id === parseInt(id || '0'));
    const relatedProducts = products
        .filter(p => p.category === product?.category && p.id !== product?.id)
        .slice(0, 4);

    // Reset state when product changes
    useEffect(() => {
        setSelectedImage(0);
        setQuantity(1);
        setSelectedColor(0);
        setAddedToCart(false);
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <div className={`min-h-screen pt-32 text-center ${darkMode ? 'bg-matte-900' : 'bg-beige-100'
                }`}>
                <h1 className={`font-display text-3xl ${darkMode ? 'text-beige-100' : 'text-matte-800'
                    }`}>
                    Product not found
                </h1>
                <Link to="/products" className="btn-primary inline-block mt-8">
                    Back to Products
                </Link>
            </div>
        );
    }

    const images = [product.image, product.imageAlt].filter(Boolean);

    const handleAddToCart = (): void => {
        addToCart({ ...product, quantity } as Product);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const pageVariants: Variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`min-h-screen pt-24 ${darkMode ? 'bg-matte-900' : 'bg-beige-100'}`}
        >
            {/* Breadcrumb */}
            <div className="section-padding py-4">
                <nav className={`font-body text-sm ${darkMode ? 'text-beige-400' : 'text-matte-500'
                    }`}>
                    <Link to="/" className="hover:text-gold transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/products" className="hover:text-gold transition-colors">Products</Link>
                    <span className="mx-2">/</span>
                    <Link
                        to={`/products/${product.category.toLowerCase().replace(' ', '-')}`}
                        className="hover:text-gold transition-colors"
                    >
                        {product.category}
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gold">{product.name}</span>
                </nav>
            </div>

            {/* Product Section */}
            <section className="section-padding py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Main Image */}
                        <div
                            className="relative aspect-square overflow-hidden cursor-zoom-in group"
                            onClick={() => setIsZoomed(true)}
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={selectedImage}
                                    src={images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>

                            {/* Zoom Icon */}
                            <div className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-matte-800/90 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ZoomIn className={darkMode ? 'text-beige-200' : 'text-matte-700'} size={20} />
                            </div>

                            {/* Image Navigation */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-matte-800/90 hover:bg-gold hover:text-matte-900 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
                                        }}
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-matte-800/90 hover:bg-gold hover:text-matte-900 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImage((prev) => (prev + 1) % images.length);
                                        }}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </>
                            )}

                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {product.new && (
                                    <span className="px-3 py-1 bg-gold text-matte-900 font-body text-xs uppercase tracking-wider">
                                        New Arrival
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-4">
                                {images.map((img, index) => (
                                    <motion.button
                                        key={index}
                                        className={`w-24 h-24 overflow-hidden border-2 transition-colors ${selectedImage === index
                                            ? 'border-gold'
                                            : darkMode
                                                ? 'border-matte-700'
                                                : 'border-beige-300'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} view ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        className="lg:sticky lg:top-32 lg:self-start"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {/* Category & Rating */}
                        <div className="flex items-center justify-between mb-4">
                            <span className={`font-body text-sm uppercase tracking-wider ${darkMode ? 'text-gold' : 'text-wood-600'
                                }`}>
                                {product.category}
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={`${i < Math.floor(product.rating)
                                                ? 'text-gold fill-gold'
                                                : 'text-beige-400'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className={`font-body text-sm ${darkMode ? 'text-beige-300' : 'text-matte-600'
                                    }`}>
                                    {product.rating} ({product.reviews} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className={`font-display text-3xl md:text-4xl lg:text-5xl mb-4 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                            }`}>
                            {product.name}
                        </h1>

                        {/* Price */}
                        <p className="font-display text-3xl text-gold mb-6">
                            {formatPrice(product.price)}
                        </p>

                        {/* Description */}
                        <p className={`font-body leading-relaxed mb-8 ${darkMode ? 'text-beige-300' : 'text-matte-600'
                            }`}>
                            {product.description}
                        </p>

                        {/* Color Selection */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="mb-8">
                                <h4 className={`font-body text-sm uppercase tracking-wider mb-4 ${darkMode ? 'text-beige-200' : 'text-matte-700'
                                    }`}>
                                    Color: <span className="text-gold">{product.colors[selectedColor]}</span>
                                </h4>
                                <div className="flex gap-3">
                                    {product.colors.map((color, index) => (
                                        <motion.button
                                            key={color}
                                            className={`px-4 py-2 border font-body text-sm transition-colors ${selectedColor === index
                                                ? 'border-gold bg-gold/10 text-gold'
                                                : darkMode
                                                    ? 'border-matte-600 text-beige-300 hover:border-gold'
                                                    : 'border-beige-400 text-matte-600 hover:border-gold'
                                                }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelectedColor(index)}
                                        >
                                            {color}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="mb-8">
                            <h4 className={`font-body text-sm uppercase tracking-wider mb-4 ${darkMode ? 'text-beige-200' : 'text-matte-700'
                                }`}>
                                Quantity
                            </h4>
                            <div className={`inline-flex items-center border ${darkMode ? 'border-matte-600' : 'border-beige-400'
                                }`}>
                                <motion.button
                                    className="p-3 hover:bg-gold/10 transition-colors"
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    <Minus size={18} className={darkMode ? 'text-beige-200' : 'text-matte-700'} />
                                </motion.button>
                                <span className={`px-6 font-body ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                    }`}>
                                    {quantity}
                                </span>
                                <motion.button
                                    className="p-3 hover:bg-gold/10 transition-colors"
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <Plus size={18} className={darkMode ? 'text-beige-200' : 'text-matte-700'} />
                                </motion.button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 mb-8">
                            <motion.button
                                className={`flex-1 py-4 flex items-center justify-center gap-3 font-body uppercase tracking-wider transition-all ${addedToCart
                                    ? 'bg-green-600 text-white'
                                    : 'btn-primary'
                                    }`}
                                whileHover={{ scale: addedToCart ? 1 : 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAddToCart}
                                disabled={addedToCart}
                            >
                                {addedToCart ? (
                                    <>
                                        <Check size={20} />
                                        Added to Cart
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag size={20} />
                                        Add to Cart
                                    </>
                                )}
                            </motion.button>
                            <motion.button
                                className={`p-4 border ${isFavorite
                                    ? 'border-red-500 bg-red-500/10'
                                    : darkMode
                                        ? 'border-matte-600 hover:border-gold'
                                        : 'border-beige-400 hover:border-gold'
                                    } transition-colors`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsFavorite(!isFavorite)}
                            >
                                <Heart
                                    size={20}
                                    className={isFavorite ? 'text-red-500 fill-red-500' : darkMode ? 'text-beige-200' : 'text-matte-700'}
                                />
                            </motion.button>
                            <motion.button
                                className={`p-4 border ${darkMode
                                    ? 'border-matte-600 hover:border-gold'
                                    : 'border-beige-400 hover:border-gold'
                                    } transition-colors`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Share2 size={20} className={darkMode ? 'text-beige-200' : 'text-matte-700'} />
                            </motion.button>
                        </div>

                        {/* Product Details */}
                        <div className={`border-t ${darkMode ? 'border-matte-700' : 'border-beige-300'
                            } pt-8 space-y-4`}>
                            <div className="flex items-start gap-4">
                                <Ruler className="text-gold flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h5 className={`font-body font-semibold mb-1 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                        }`}>
                                        Dimensions
                                    </h5>
                                    <p className={`font-body text-sm ${darkMode ? 'text-beige-400' : 'text-matte-500'
                                        }`}>
                                        {product.dimensions}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Package className="text-gold flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h5 className={`font-body font-semibold mb-1 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                        }`}>
                                        Materials
                                    </h5>
                                    <p className={`font-body text-sm ${darkMode ? 'text-beige-400' : 'text-matte-500'
                                        }`}>
                                        {product.material}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className={`grid grid-cols-3 gap-4 mt-8 pt-8 border-t ${darkMode ? 'border-matte-700' : 'border-beige-300'
                            }`}>
                            <div className="text-center">
                                <Truck className="text-gold mx-auto mb-2" size={24} />
                                <p className={`font-body text-xs ${darkMode ? 'text-beige-300' : 'text-matte-600'
                                    }`}>
                                    Free Delivery
                                </p>
                            </div>
                            <div className="text-center">
                                <Shield className="text-gold mx-auto mb-2" size={24} />
                                <p className={`font-body text-xs ${darkMode ? 'text-beige-300' : 'text-matte-600'
                                    }`}>
                                    5 Year Warranty
                                </p>
                            </div>
                            <div className="text-center">
                                <RotateCcw className="text-gold mx-auto mb-2" size={24} />
                                <p className={`font-body text-xs ${darkMode ? 'text-beige-300' : 'text-matte-600'
                                    }`}>
                                    30-Day Returns
                                </p>
                            </div>
                        </div>

                        {/* Care Instructions */}
                        {product.care && (
                            <div className={`mt-8 p-4 ${darkMode ? 'bg-matte-800 border border-matte-700' : 'bg-beige-200'
                                }`}>
                                <h5 className={`font-body font-semibold mb-2 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                    }`}>
                                    Care Instructions
                                </h5>
                                <p className={`font-body text-sm ${darkMode ? 'text-beige-400' : 'text-matte-500'
                                    }`}>
                                    {product.care}
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className={`py-16 ${darkMode ? 'bg-matte-800' : 'bg-beige-200'}`}>
                    <div className="section-padding">
                        <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-gold font-body text-sm uppercase tracking-[0.3em]">
                                You May Also Like
                            </span>
                            <h2 className={`font-display text-3xl md:text-4xl mt-4 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                }`}>
                                Related Products
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    index={index}
                                    onAddToCart={addToCart}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Image Zoom Modal */}
            <AnimatePresence>
                {isZoomed && (
                    <motion.div
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center cursor-zoom-out"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsZoomed(false)}
                    >
                        <motion.button
                            className="absolute top-6 right-6 p-3 text-white hover:text-gold transition-colors"
                            whileHover={{ scale: 1.1 }}
                        >
                            <X size={32} />
                        </motion.button>
                        <motion.img
                            src={images[selectedImage]}
                            alt={product.name}
                            className="max-w-[90vw] max-h-[90vh] object-contain"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProductDetail;
