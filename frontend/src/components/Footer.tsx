import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ArrowRight, LucideIcon } from 'lucide-react';
import { AppContext } from '../App';
import { footerData } from '../data/products';
import type { AppContextType, SocialLink } from '../types';

type SocialIconComponent = LucideIcon | React.FC<{ className?: string }>;

const Footer: React.FC = () => {
    const { darkMode } = useContext(AppContext) as AppContextType;

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const socialIcons: Record<string, SocialIconComponent> = {
        Instagram: Instagram,
        Facebook: Facebook,
        Pinterest: ({ className }: { className?: string }) => (
            <svg className={className || "w-5 h-5"} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
            </svg>
        ),
        LinkedIn: ({ className }: { className?: string }) => (
            <svg className={className || "w-5 h-5"} fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        )
    };

    return (
        <footer className={`${darkMode ? 'bg-matte-900 border-t border-matte-700' : 'bg-wood-900'} text-beige-200`}>
            {/* Newsletter Section */}
            <div className={`${darkMode ? 'bg-matte-800' : 'bg-wood-800'} py-16`}>
                <div className="section-padding">
                    <motion.div
                        className="max-w-4xl mx-auto text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="font-display text-3xl md:text-4xl mb-4">Join the Luxe Living Circle</h3>
                        <p className="font-body text-beige-400 mb-8">
                            Subscribe to receive exclusive previews, design inspiration, and members-only offers.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 bg-transparent border border-beige-400/30 text-beige-100 placeholder-beige-500 focus:outline-none focus:border-gold transition-colors font-body"
                            />
                            <motion.button
                                type="submit"
                                className="btn-primary whitespace-nowrap"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Subscribe
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="section-padding py-16">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* About Column */}
                    <motion.div variants={itemVariants}>
                        <Link to="/" className="inline-block mb-6">
                            <span className="font-display text-2xl font-bold text-gold">Luxe</span>
                            <span className="font-display text-2xl font-light text-beige-200">Living</span>
                        </Link>
                        <p className="font-body text-beige-400 leading-relaxed mb-6">
                            {footerData.about}
                        </p>
                        <div className="flex space-x-4">
                            {footerData.social.map((social: SocialLink) => {
                                const Icon = socialIcons[social.name];
                                return (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 border border-beige-400/30 flex items-center justify-center text-beige-400 hover:text-gold hover:border-gold transition-colors"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        aria-label={social.name}
                                    >
                                        <Icon className="w-[18px] h-[18px]" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="font-display text-lg font-semibold text-beige-100 mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {footerData.quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="font-body text-beige-400 hover:text-gold transition-colors flex items-center group"
                                    >
                                        <ArrowRight
                                            size={14}
                                            className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                                        />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Categories */}
                    <motion.div variants={itemVariants}>
                        <h4 className="font-display text-lg font-semibold text-beige-100 mb-6">Collections</h4>
                        <ul className="space-y-3">
                            {['Living Room', 'Bedroom', 'Dining', 'Office', 'Luxury'].map((category) => (
                                <li key={category}>
                                    <Link
                                        to={`/products/${category.toLowerCase().replace(' ', '-')}`}
                                        className="font-body text-beige-400 hover:text-gold transition-colors flex items-center group"
                                    >
                                        <ArrowRight
                                            size={14}
                                            className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                                        />
                                        {category}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants}>
                        <h4 className="font-display text-lg font-semibold text-beige-100 mb-6">Visit Our Showroom</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin size={18} className="text-gold mt-1 flex-shrink-0" />
                                <span className="font-body text-beige-400">{footerData.contact.address}</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={18} className="text-gold flex-shrink-0" />
                                <a href={`tel:${footerData.contact.phone}`} className="font-body text-beige-400 hover:text-gold transition-colors">
                                    {footerData.contact.phone}
                                </a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={18} className="text-gold flex-shrink-0" />
                                <a href={`mailto:${footerData.contact.email}`} className="font-body text-beige-400 hover:text-gold transition-colors">
                                    {footerData.contact.email}
                                </a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Clock size={18} className="text-gold flex-shrink-0" />
                                <span className="font-body text-beige-400">{footerData.contact.hours}</span>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Bar */}
            <div className={`${darkMode ? 'border-t border-matte-700' : 'border-t border-wood-700'} py-6`}>
                <div className="section-padding flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="font-body text-sm text-beige-500">
                        © {new Date().getFullYear()} Luxe Living. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link to="/privacy" className="font-body text-sm text-beige-500 hover:text-gold transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="font-body text-sm text-beige-500 hover:text-gold transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
