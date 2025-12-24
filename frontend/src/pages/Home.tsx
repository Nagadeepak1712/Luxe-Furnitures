import { useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { AppContext } from '../App';
import { products, categories, testimonials, statistics } from '../data/products';
import ProductCard from '../components/ProductCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import type { AppContextType } from '../types';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
    const { darkMode, addToCart } = useContext(AppContext) as AppContextType;
    const heroRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLElement>(null);
    const categoriesRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
    const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    const featuredProducts = products.filter(p => p.featured).slice(0, 4);
    const newProducts = products.filter(p => p.new).slice(0, 3);

    useEffect(() => {
        // Hero headline animation
        const headline = headlineRef.current;
        if (headline) {
            gsap.fromTo(
                headline.querySelectorAll('.animate-word'),
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: 'power4.out',
                    delay: 0.5
                }
            );
        }

        // Stats counter animation
        const stats = statsRef.current;
        if (stats) {
            const counters = stats.querySelectorAll('.counter');
            counters.forEach((counter) => {
                const target = parseInt((counter as HTMLElement).dataset.target || '0');
                gsap.fromTo(
                    counter,
                    { innerText: 0 },
                    {
                        innerText: target,
                        duration: 2,
                        ease: 'power2.out',
                        snap: { innerText: 1 },
                        scrollTrigger: {
                            trigger: counter,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });
        }

        // Categories reveal animation
        const categoriesSection = categoriesRef.current;
        if (categoriesSection) {
            gsap.fromTo(
                categoriesSection.querySelectorAll('.category-card'),
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: categoriesSection,
                        start: 'top 70%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const pageVariants: Variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {/* Hero Section */}
            <section ref={heroRef} className="relative h-screen overflow-hidden">
                <motion.div
                    className="absolute inset-0"
                    style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-matte-900/90 via-matte-900/70 to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80"
                        alt="Luxury living room"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <div className="relative z-20 h-full flex items-center section-padding">
                    <div className="max-w-3xl">
                        <motion.span
                            className="inline-block text-gold font-body text-sm uppercase tracking-[0.3em] mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Est. 1999 — Handcrafted Excellence
                        </motion.span>

                        <div ref={headlineRef} className="overflow-hidden mb-8">
                            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-tight">
                                <span className="animate-word inline-block">Timeless</span>{' '}
                                <span className="animate-word inline-block text-gold">Elegance</span>
                                <br />
                                <span className="animate-word inline-block">for Your</span>{' '}
                                <span className="animate-word inline-block">Home</span>
                            </h1>
                        </div>

                        <motion.p
                            className="font-body text-lg md:text-xl text-beige-300 max-w-xl mb-10 leading-relaxed"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                        >
                            Discover our curated collection of handcrafted luxury furniture,
                            where artisanal excellence meets contemporary sophistication.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.8 }}
                        >
                            <Link to="/products">
                                <motion.button
                                    className="btn-primary flex items-center justify-center space-x-3"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span>Shop Collection</span>
                                    <ArrowRight size={18} />
                                </motion.button>
                            </Link>
                            <Link to="/gallery">
                                <motion.button
                                    className="btn-secondary flex items-center justify-center space-x-3"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span>View Lookbook</span>
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <span className="text-beige-300 text-sm font-body uppercase tracking-widest mb-3">
                        Scroll to Explore
                    </span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <ChevronDown className="text-gold" size={24} />
                    </motion.div>
                </motion.div>
            </section>

            {/* Statistics Section */}
            <section ref={statsRef} className={`py-20 ${darkMode ? 'bg-matte-800' : 'bg-wood-900'}`}>
                <div className="section-padding">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {statistics.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <span
                                    className="counter font-display text-4xl md:text-5xl lg:text-6xl text-gold"
                                    data-target={stat.value}
                                >
                                    0
                                </span>
                                <span className="font-display text-4xl md:text-5xl lg:text-6xl text-gold">+</span>
                                <p className="font-body text-beige-300 mt-2 text-sm uppercase tracking-wider">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section ref={categoriesRef} className={`py-24 ${darkMode ? 'bg-matte-900' : 'bg-beige-100'}`}>
                <div className="section-padding">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-gold font-body text-sm uppercase tracking-[0.3em]">
                            Browse By Room
                        </span>
                        <h2 className={`font-display text-4xl md:text-5xl mt-4 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                            }`}>
                            Our Collections
                        </h2>
                        <div className="divider-gold mt-6" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                to={`/products/${category.id}`}
                                className="category-card block"
                            >
                                <motion.div
                                    className="relative group overflow-hidden aspect-[4/3]"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-matte-900/80 via-matte-900/20 to-transparent z-10" />
                                    <motion.img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                        <h3 className="font-display text-2xl text-white mb-2 group-hover:text-gold transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="font-body text-beige-300 text-sm">
                                            {category.description}
                                        </p>
                                        <motion.div
                                            className="flex items-center text-gold mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                            initial={{ x: -10 }}
                                            whileHover={{ x: 0 }}
                                        >
                                            <span className="font-body text-sm uppercase tracking-wider">Explore</span>
                                            <ArrowRight size={16} className="ml-2" />
                                        </motion.div>
                                    </div>

                                    {/* Gold glow effect on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(212,175,55,0.3)]" />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className={`py-24 ${darkMode ? 'bg-matte-800' : 'bg-beige-200'}`}>
                <div className="section-padding">
                    <motion.div
                        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div>
                            <span className="text-gold font-body text-sm uppercase tracking-[0.3em]">
                                Curated for You
                            </span>
                            <h2 className={`font-display text-4xl md:text-5xl mt-4 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                }`}>
                                Featured Pieces
                            </h2>
                        </div>
                        <Link
                            to="/products"
                            className="gold-underline font-body text-gold uppercase tracking-wider text-sm mt-4 md:mt-0 flex items-center"
                        >
                            View All Products
                            <ArrowRight size={16} className="ml-2" />
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product, index) => (
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

            {/* Craftsmanship Banner */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
                        alt="Craftsmanship"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-matte-900/80" />
                </div>

                <div className="relative z-10 section-padding">
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-gold font-body text-sm uppercase tracking-[0.3em]">
                            Our Heritage
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mt-6 mb-8">
                            Where Artistry Meets <span className="text-gold italic">Tradition</span>
                        </h2>
                        <p className="font-body text-beige-300 text-lg leading-relaxed mb-10">
                            For over two decades, our master craftsmen have been transforming the finest
                            materials into extraordinary furniture. Each piece is a testament to
                            time-honored techniques passed down through generations, combined with
                            contemporary design sensibilities.
                        </p>
                        <Link to="/custom">
                            <motion.button
                                className="btn-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Commission Custom Furniture
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* New Arrivals */}
            <section className={`py-24 ${darkMode ? 'bg-matte-900' : 'bg-beige-100'}`}>
                <div className="section-padding">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-gold font-body text-sm uppercase tracking-[0.3em]">
                            Just Arrived
                        </span>
                        <h2 className={`font-display text-4xl md:text-5xl mt-4 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                            }`}>
                            New Additions
                        </h2>
                        <div className="divider-gold mt-6" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {newProducts.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={index}
                                onAddToCart={addToCart}
                                large
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className={`py-24 ${darkMode ? 'bg-matte-800' : 'bg-wood-900'}`}>
                <div className="section-padding">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-gold font-body text-sm uppercase tracking-[0.3em]">
                            Client Stories
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl mt-4 text-beige-100">
                            What Our Clients Say
                        </h2>
                        <div className="divider-gold mt-6" />
                    </motion.div>

                    <TestimonialCarousel testimonials={testimonials} />
                </div>
            </section>

            {/* CTA Section */}
            <section className={`py-24 ${darkMode ? 'bg-matte-900' : 'bg-beige-100'}`}>
                <div className="section-padding">
                    <motion.div
                        className="max-w-4xl mx-auto text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl ${darkMode ? 'text-beige-100' : 'text-matte-800'
                            }`}>
                            Ready to Transform Your Space?
                        </h2>
                        <p className={`font-body text-lg mt-6 mb-10 ${darkMode ? 'text-beige-400' : 'text-matte-600'
                            }`}>
                            Visit our showroom or schedule a consultation with our design experts
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact">
                                <motion.button
                                    className="btn-primary"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Book a Consultation
                                </motion.button>
                            </Link>
                            <Link to="/products">
                                <motion.button
                                    className={darkMode ? 'btn-secondary' : 'btn-dark'}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Explore Collection
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
