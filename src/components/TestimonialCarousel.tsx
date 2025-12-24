import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import type { Testimonial } from '../types';

interface TestimonialCarouselProps {
    testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [direction, setDirection] = useState<number>(1);
    const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

    const nextSlide = useCallback((): void => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const prevSlide = useCallback((): void => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, [testimonials.length]);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    const slideVariants: Variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0
        })
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <div
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {/* Quote Icon */}
            <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-gold/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Quote size={80} />
            </motion.div>

            {/* Testimonial Content */}
            <div className="relative overflow-hidden min-h-[400px] flex items-center">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
                    >
                        {/* Stars */}
                        <motion.div
                            className="flex gap-1 mb-6"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={20}
                                    className={`${i < currentTestimonial.rating
                                        ? 'text-gold fill-gold'
                                        : 'text-beige-500'
                                        }`}
                                />
                            ))}
                        </motion.div>

                        {/* Title */}
                        <motion.h4
                            className="font-display text-2xl text-beige-100 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            "{currentTestimonial.title}"
                        </motion.h4>

                        {/* Text */}
                        <motion.p
                            className="font-body text-lg text-beige-300 leading-relaxed max-w-2xl mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {currentTestimonial.text}
                        </motion.p>

                        {/* Author */}
                        <motion.div
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <img
                                src={currentTestimonial.image}
                                alt={currentTestimonial.name}
                                className="w-14 h-14 rounded-full object-cover border-2 border-gold"
                            />
                            <div className="text-left">
                                <p className="font-display text-beige-100">
                                    {currentTestimonial.name}
                                </p>
                                <p className="font-body text-sm text-beige-500">
                                    {currentTestimonial.location}
                                </p>
                            </div>
                        </motion.div>

                        {/* Product Purchased */}
                        <motion.p
                            className="font-body text-sm text-gold mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            Purchased: {currentTestimonial.product}
                        </motion.p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-0 md:-mx-16">
                <motion.button
                    className="p-3 border border-beige-400/30 text-beige-300 hover:bg-gold hover:text-matte-900 hover:border-gold transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevSlide}
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft size={24} />
                </motion.button>
                <motion.button
                    className="p-3 border border-beige-400/30 text-beige-300 hover:bg-gold hover:text-matte-900 hover:border-gold transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextSlide}
                    aria-label="Next testimonial"
                >
                    <ChevronRight size={24} />
                </motion.button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                    <motion.button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                            ? 'bg-gold w-8'
                            : 'bg-beige-500/50 hover:bg-beige-400'
                            }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                        }}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TestimonialCarousel;
