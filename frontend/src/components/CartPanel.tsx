import { useContext } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { AppContext } from '../App';
import type { AppContextType, CartItem } from '../types';

const CartPanel: React.FC = () => {
    const {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        removeFromCart,
        updateQuantity,
        cartTotal,
        darkMode
    } = useContext(AppContext) as AppContextType;

    const panelVariants: Variants = {
        closed: {
            x: '100%',
            transition: { duration: 0.3, ease: 'easeInOut' }
        },
        open: {
            x: 0,
            transition: { duration: 0.3, ease: 'easeInOut' }
        }
    };

    const overlayVariants: Variants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: 20 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.1 }
        }),
        exit: { opacity: 0, x: -20 }
    };

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        variants={overlayVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        onClick={() => setIsCartOpen(false)}
                    />

                    {/* Cart Panel */}
                    <motion.div
                        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] ${darkMode ? 'bg-matte-800' : 'bg-white'
                            } shadow-2xl z-50 flex flex-col`}
                        variants={panelVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        {/* Header */}
                        <div className={`flex items-center justify-between p-6 border-b ${darkMode ? 'border-matte-700' : 'border-beige-300'
                            }`}>
                            <div className="flex items-center space-x-3">
                                <ShoppingBag className="text-gold" size={24} />
                                <h2 className={`font-display text-xl ${darkMode ? 'text-beige-100' : 'text-matte-800'}`}>
                                    Shopping Cart
                                </h2>
                            </div>
                            <motion.button
                                className={`p-2 rounded-full ${darkMode ? 'hover:bg-matte-700' : 'hover:bg-beige-200'
                                    } transition-colors`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsCartOpen(false)}
                            >
                                <X className={darkMode ? 'text-beige-200' : 'text-matte-700'} size={24} />
                            </motion.button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {cartItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingBag className={`${darkMode ? 'text-matte-600' : 'text-beige-400'} mb-4`} size={64} />
                                    <p className={`font-display text-xl mb-2 ${darkMode ? 'text-beige-200' : 'text-matte-700'}`}>
                                        Your cart is empty
                                    </p>
                                    <p className={`font-body ${darkMode ? 'text-beige-400' : 'text-matte-500'}`}>
                                        Explore our collection to find your perfect piece
                                    </p>
                                </div>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {cartItems.map((item: CartItem, index: number) => (
                                        <motion.div
                                            key={item.id}
                                            custom={index}
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            layout
                                            className={`flex space-x-4 p-4 mb-4 ${darkMode ? 'bg-matte-700' : 'bg-beige-100'
                                                } rounded-sm`}
                                        >
                                            {/* Product Image */}
                                            <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className={`font-display text-sm font-semibold mb-1 truncate ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                                    }`}>
                                                    {item.name}
                                                </h3>
                                                <p className="text-gold font-body text-sm mb-3">
                                                    {formatPrice(item.price)}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center justify-between">
                                                    <div className={`flex items-center border ${darkMode ? 'border-matte-600' : 'border-beige-400'
                                                        }`}>
                                                        <motion.button
                                                            className="p-1.5 hover:bg-gold/10 transition-colors"
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        >
                                                            <Minus size={14} className={darkMode ? 'text-beige-200' : 'text-matte-700'} />
                                                        </motion.button>
                                                        <span className={`px-3 font-body text-sm ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                                            }`}>
                                                            {item.quantity}
                                                        </span>
                                                        <motion.button
                                                            className="p-1.5 hover:bg-gold/10 transition-colors"
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            <Plus size={14} className={darkMode ? 'text-beige-200' : 'text-matte-700'} />
                                                        </motion.button>
                                                    </div>

                                                    <motion.button
                                                        className="text-red-500 hover:text-red-400 transition-colors"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => removeFromCart(item.id)}
                                                    >
                                                        <X size={18} />
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className={`p-6 border-t ${darkMode ? 'border-matte-700' : 'border-beige-300'}`}>
                                <div className="flex justify-between items-center mb-6">
                                    <span className={`font-body ${darkMode ? 'text-beige-300' : 'text-matte-600'}`}>
                                        Subtotal
                                    </span>
                                    <span className={`font-display text-xl ${darkMode ? 'text-beige-100' : 'text-matte-800'}`}>
                                        {formatPrice(cartTotal)}
                                    </span>
                                </div>
                                <motion.button
                                    className="btn-primary w-full flex items-center justify-center space-x-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span>Proceed to Checkout</span>
                                    <ArrowRight size={18} />
                                </motion.button>
                                <p className={`text-center text-xs mt-4 ${darkMode ? 'text-beige-500' : 'text-matte-500'}`}>
                                    Shipping & taxes calculated at checkout
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartPanel;
