import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X, ShoppingBag, Sun, Moon, Search } from 'lucide-react';
import { AppContext } from '../App';
import { navLinks } from '../data/products';
import type { AppContextType } from '../types';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const location = useLocation();
    const { darkMode, toggleDarkMode, cartCount, setIsCartOpen } = useContext(AppContext) as AppContextType;

    useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const headerVariants: Variants = {
        top: {
            backgroundColor: 'rgba(255, 255, 255, 0)',
            backdropFilter: 'blur(0px)',
        },
        scrolled: {
            backgroundColor: darkMode ? 'rgba(26, 26, 26, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
        }
    };

    const mobileMenuVariants: Variants = {
        closed: {
            opacity: 0,
            x: '100%',
            transition: { duration: 0.3, ease: 'easeInOut' }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3, ease: 'easeInOut' }
        }
    };

    const linkVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.3 }
        })
    };

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'shadow-lg border-b border-gold/10'
                : ''
                }`}
            initial="top"
            animate={isScrolled ? 'scrolled' : 'top'}
            variants={headerVariants}
        >
            <div className="section-padding">
                <nav className="flex items-center justify-between h-20 lg:h-24">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <motion.div
                            className="relative"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className={`font-display text-2xl lg:text-3xl font-bold ${darkMode || !isScrolled ? 'text-gold' : 'text-wood-900'
                                }`}>
                                Luxe
                            </span>
                            <span className={`font-display text-2xl lg:text-3xl font-light ${darkMode ? 'text-beige-200' : isScrolled ? 'text-matte-800' : 'text-white'
                                }`}>
                                Living
                            </span>
                            <motion.div
                                className="absolute -bottom-1 left-0 h-0.5 bg-gold"
                                initial={{ width: 0 }}
                                whileHover={{ width: '100%' }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative font-body text-sm uppercase tracking-wider transition-colors duration-300 gold-underline ${location.pathname === link.path
                                    ? 'text-gold'
                                    : darkMode || !isScrolled
                                        ? 'text-beige-200 hover:text-gold'
                                        : 'text-matte-700 hover:text-gold'
                                    }`}
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <motion.div
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                                        layoutId="activeLink"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Search Button */}
                        <motion.button
                            className={`p-2 rounded-full transition-colors ${darkMode || !isScrolled
                                ? 'text-beige-200 hover:text-gold hover:bg-white/10'
                                : 'text-matte-700 hover:text-gold hover:bg-matte-100'
                                }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            aria-label="Search"
                        >
                            <Search size={20} />
                        </motion.button>

                        {/* Dark Mode Toggle */}
                        <motion.button
                            className={`p-2 rounded-full transition-colors ${darkMode || !isScrolled
                                ? 'text-beige-200 hover:text-gold hover:bg-white/10'
                                : 'text-matte-700 hover:text-gold hover:bg-matte-100'
                                }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleDarkMode}
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </motion.button>

                        {/* Cart Button */}
                        <motion.button
                            className={`relative p-2 rounded-full transition-colors ${darkMode || !isScrolled
                                ? 'text-beige-200 hover:text-gold hover:bg-white/10'
                                : 'text-matte-700 hover:text-gold hover:bg-matte-100'
                                }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsCartOpen(true)}
                            aria-label="Open cart"
                        >
                            <ShoppingBag size={20} />
                            {cartCount > 0 && (
                                <motion.span
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-matte-900 text-xs font-bold rounded-full flex items-center justify-center"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    key={cartCount}
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </motion.button>

                        {/* Mobile Menu Toggle */}
                        <motion.button
                            className={`lg:hidden p-2 rounded-full transition-colors ${darkMode || !isScrolled
                                ? 'text-beige-200 hover:text-gold'
                                : 'text-matte-700 hover:text-gold'
                                }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </nav>
            </div>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        className="absolute top-full left-0 right-0 bg-white dark:bg-matte-800 shadow-lg p-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div className="section-padding">
                            <input
                                type="text"
                                placeholder="Search for luxury furniture..."
                                className="w-full px-6 py-4 bg-beige-100 dark:bg-matte-700 border border-beige-400 dark:border-matte-600 rounded-none focus:outline-none focus:border-gold font-body"
                                autoFocus
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 top-20 bg-matte-900/95 backdrop-blur-lg lg:hidden z-40"
                        variants={mobileMenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <div className="flex flex-col items-center justify-center h-full space-y-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    custom={i}
                                    variants={linkVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <Link
                                        to={link.path}
                                        className={`font-display text-3xl ${location.pathname === link.path
                                            ? 'text-gold'
                                            : 'text-beige-200 hover:text-gold'
                                            } transition-colors duration-300`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
