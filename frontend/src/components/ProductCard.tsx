import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { ShoppingBag, Heart, Eye, Star } from 'lucide-react';
import { AppContext } from '../App';
import type { Product, AppContextType } from '../types';

interface ProductCardProps {
    product: Product;
    index?: number;
    onAddToCart: (product: Product) => void;
    large?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0, onAddToCart, large = false }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const { darkMode } = useContext(AppContext) as AppContextType;

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut'
            }
        }
    };

    const imageVariants: Variants = {
        rest: { scale: 1 },
        hover: { scale: 1.08 }
    };

    const overlayVariants: Variants = {
        rest: { opacity: 0 },
        hover: { opacity: 1 }
    };

    const buttonVariants: Variants = {
        rest: { y: 20, opacity: 0 },
        hover: { y: 0, opacity: 1 }
    };

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        onAddToCart(product);
    };

    return (
        <motion.div
            className={`group ${large ? 'col-span-1' : ''}`}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
        >
            <Link to={`/product/${product.id}`}>
                <motion.div
                    className={`relative overflow-hidden ${darkMode ? 'bg-matte-800' : 'bg-white'
                        } ${large ? 'aspect-[3/4]' : 'aspect-square'}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    initial="rest"
                    whileHover="hover"
                    animate={isHovered ? 'hover' : 'rest'}
                >
                    {/* Image Loading Skeleton */}
                    {!isImageLoaded && (
                        <div className="absolute inset-0 skeleton" />
                    )}

                    {/* Product Image */}
                    <motion.img
                        src={isHovered && product.imageAlt ? product.imageAlt : product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        variants={imageVariants}
                        transition={{ duration: 0.5 }}
                        loading="lazy"
                        onLoad={() => setIsImageLoaded(true)}
                    />

                    {/* Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-matte-900/80 via-matte-900/20 to-transparent"
                        variants={overlayVariants}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                        {product.new && (
                            <span className="px-3 py-1 bg-gold text-matte-900 font-body text-xs uppercase tracking-wider">
                                New
                            </span>
                        )}
                        {product.featured && !product.new && (
                            <span className="px-3 py-1 bg-wood-700 text-beige-100 font-body text-xs uppercase tracking-wider">
                                Featured
                            </span>
                        )}
                    </div>

                    {/* Favorite Button */}
                    <motion.button
                        className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-matte-800/90 rounded-full z-10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsFavorite(!isFavorite);
                        }}
                    >
                        <Heart
                            size={18}
                            className={`transition-colors ${isFavorite
                                ? 'text-red-500 fill-red-500'
                                : 'text-matte-600 dark:text-beige-300'
                                }`}
                        />
                    </motion.button>

                    {/* Action Buttons */}
                    <motion.div
                        className="absolute bottom-4 left-4 right-4 flex gap-2 z-10"
                        variants={buttonVariants}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <motion.button
                            className="flex-1 py-3 bg-gold text-matte-900 font-body text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gold-light transition-colors"
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAddToCart}
                        >
                            <ShoppingBag size={16} />
                            Add to Cart
                        </motion.button>
                        <motion.div
                            className="p-3 bg-white text-matte-800 hover:bg-beige-100 transition-colors"
                            whileTap={{ scale: 0.95 }}
                        >
                            <Eye size={18} />
                        </motion.div>
                    </motion.div>

                    {/* Gold glow on hover */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        variants={overlayVariants}
                    >
                        <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(212,175,55,0.2)]" />
                    </motion.div>
                </motion.div>

                {/* Product Info */}
                <div className="pt-5">
                    <div className="flex items-center justify-between mb-2">
                        <span className={`font-body text-xs uppercase tracking-wider ${darkMode ? 'text-gold' : 'text-wood-600'
                            }`}>
                            {product.category}
                        </span>
                        <div className="flex items-center gap-1">
                            <Star size={14} className="text-gold fill-gold" />
                            <span className={`font-body text-sm ${darkMode ? 'text-beige-300' : 'text-matte-600'
                                }`}>
                                {product.rating}
                            </span>
                        </div>
                    </div>

                    <h3 className={`font-display text-lg mb-2 group-hover:text-gold transition-colors ${darkMode ? 'text-beige-100' : 'text-matte-800'
                        }`}>
                        {product.name}
                    </h3>

                    <p className={`font-body text-sm mb-3 line-clamp-2 ${darkMode ? 'text-beige-400' : 'text-matte-500'
                        }`}>
                        {product.shortDescription}
                    </p>

                    <p className="font-display text-xl text-gold">
                        {formatPrice(product.price)}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
