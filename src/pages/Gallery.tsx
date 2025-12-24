import { useState, useContext } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { AppContext } from '../App';
import { galleryImages } from '../data/products';
import type { AppContextType, GalleryImage } from '../types';

const Gallery: React.FC = () => {
    const { darkMode } = useContext(AppContext) as AppContextType;
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [filter, setFilter] = useState<string>('all');

    const categories = ['all', ...new Set(galleryImages.map(img => img.category))];

    const filteredImages = filter === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === filter);

    const openLightbox = (image: GalleryImage): void => {
        setSelectedImage(image);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = (): void => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const navigateLightbox = (direction: 'next' | 'prev'): void => {
        if (!selectedImage) return;
        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
        let newIndex: number;
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % filteredImages.length;
        } else {
            newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        }
        setSelectedImage(filteredImages[newIndex]);
    };

    const pageVariants: Variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    const imageVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: 'easeOut'
            }
        })
    };

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`min-h-screen pt-24 ${darkMode ? 'bg-matte-900' : 'bg-beige-100'}`}
        >
            {/* Hero Section */}
            <section className="relative h-64 md:h-80 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-600607687939-ce8a6c25118c?w=1920&q=80"
                        alt="Gallery"
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
                        Inspiration Gallery
                    </motion.span>
                    <motion.h1
                        className="font-display text-4xl md:text-5xl lg:text-6xl text-white"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        The Lookbook
                    </motion.h1>
                    <motion.p
                        className="font-body text-beige-300 mt-4 max-w-xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Explore our curated collection of interior inspirations featuring Luxe Living furniture
                    </motion.p>
                    <motion.div
                        className="divider-gold mt-6"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    />
                </div>
            </section>

            {/* Filter Tabs */}
            <section className={`sticky top-20 lg:top-24 z-30 ${darkMode ? 'bg-matte-800/95' : 'bg-white/95'
                } backdrop-blur-lg border-b ${darkMode ? 'border-matte-700' : 'border-beige-300'
                }`}>
                <div className="section-padding py-4">
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                        {categories.map(cat => (
                            <motion.button
                                key={cat}
                                className={`px-4 py-2 font-body text-sm uppercase tracking-wider transition-colors ${filter === cat
                                    ? 'bg-gold text-matte-900'
                                    : darkMode
                                        ? 'text-beige-200 hover:text-gold'
                                        : 'text-matte-600 hover:text-gold'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setFilter(cat)}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Masonry Grid */}
            <section className="section-padding py-12">
                <motion.div
                    className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredImages.map((image, index) => (
                            <motion.div
                                key={image.id}
                                custom={index}
                                variants={imageVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                layout
                                className="break-inside-avoid group cursor-pointer"
                                onClick={() => openLightbox(image)}
                            >
                                <div className="relative overflow-hidden">
                                    <motion.img
                                        src={image.src}
                                        alt={image.alt}
                                        className={`w-full object-cover ${image.size === 'large'
                                            ? 'aspect-[4/5]'
                                            : image.size === 'medium'
                                                ? 'aspect-[4/3]'
                                                : 'aspect-square'
                                            }`}
                                        loading="lazy"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-matte-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <span className="text-gold font-body text-sm uppercase tracking-wider">
                                                {image.category}
                                            </span>
                                            <p className="text-white font-display text-lg mt-1">
                                                {image.alt}
                                            </p>
                                        </div>

                                        {/* Zoom Icon */}
                                        <div className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-sm">
                                            <ZoomIn className="text-white" size={20} />
                                        </div>
                                    </div>

                                    {/* Gold border on hover */}
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/50 transition-colors pointer-events-none" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <motion.button
                            className="absolute top-6 right-6 p-3 text-white hover:text-gold transition-colors z-10"
                            whileHover={{ scale: 1.1 }}
                            onClick={closeLightbox}
                        >
                            <X size={32} />
                        </motion.button>

                        {/* Navigation */}
                        <motion.button
                            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white hover:text-gold transition-colors z-10"
                            whileHover={{ scale: 1.1 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateLightbox('prev');
                            }}
                        >
                            <ChevronLeft size={40} />
                        </motion.button>
                        <motion.button
                            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white hover:text-gold transition-colors z-10"
                            whileHover={{ scale: 1.1 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateLightbox('next');
                            }}
                        >
                            <ChevronRight size={40} />
                        </motion.button>

                        {/* Image */}
                        <motion.div
                            className="relative max-w-[85vw] max-h-[85vh]"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="max-w-full max-h-[85vh] object-contain"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <span className="text-gold font-body text-sm uppercase tracking-wider">
                                    {selectedImage.category}
                                </span>
                                <p className="text-white font-display text-xl mt-1">
                                    {selectedImage.alt}
                                </p>
                            </div>
                        </motion.div>

                        {/* Thumbnail Navigation */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {filteredImages.map((img) => (
                                <motion.button
                                    key={img.id}
                                    className={`w-16 h-12 overflow-hidden border-2 transition-colors ${selectedImage.id === img.id
                                        ? 'border-gold'
                                        : 'border-white/30 hover:border-white/60'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedImage(img);
                                    }}
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Gallery;
