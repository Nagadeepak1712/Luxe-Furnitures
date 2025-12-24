import { useState, useContext, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Check, Palette, Ruler, MessageSquare, Sparkles, LucideIcon } from 'lucide-react';
import { AppContext } from '../App';
import { customOptions } from '../data/products';
import type { AppContextType, CustomFormData } from '../types';

interface ProcessStep {
    icon: LucideIcon;
    title: string;
    desc: string;
}

const Custom: React.FC = () => {
    const { darkMode } = useContext(AppContext) as AppContextType;
    const [formData, setFormData] = useState<CustomFormData>({
        name: '',
        email: '',
        phone: '',
        furnitureType: '',
        woodType: '',
        fabric: '',
        size: '',
        budget: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // In production, this would send to the backend
        console.log('Custom furniture request:', formData);

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const nextStep = (): void => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = (): void => setStep(prev => Math.max(prev - 1, 1));

    const pageVariants: Variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    const stepVariants: Variants = {
        enter: { x: 50, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -50, opacity: 0 }
    };

    const inputClasses = `w-full px-4 py-3 font-body border ${darkMode
        ? 'bg-matte-700 border-matte-600 text-beige-100 placeholder-beige-500'
        : 'bg-white border-beige-400 text-matte-800 placeholder-matte-400'
        } focus:outline-none focus:border-gold transition-colors`;

    const labelClasses = `block font-body text-sm uppercase tracking-wider mb-2 ${darkMode ? 'text-beige-200' : 'text-matte-700'
        }`;

    const processSteps: ProcessStep[] = [
        { icon: MessageSquare, title: 'Consultation', desc: 'Share your ideas and requirements with our design team' },
        { icon: Palette, title: 'Design', desc: 'We create detailed sketches and 3D renderings for approval' },
        { icon: Ruler, title: 'Crafting', desc: 'Master artisans bring your piece to life using premium materials' },
        { icon: Sparkles, title: 'Delivery', desc: 'White-glove delivery and installation in your home' }
    ];

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
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
                        alt="Custom furniture workshop"
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
                        Bespoke Creations
                    </motion.span>
                    <motion.h1
                        className="font-display text-4xl md:text-5xl lg:text-6xl text-white"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Custom Furniture
                    </motion.h1>
                    <motion.p
                        className="font-body text-beige-300 mt-4 max-w-xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Bring your vision to life with our master craftsmen
                    </motion.p>
                    <motion.div
                        className="divider-gold mt-6"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    />
                </div>
            </section>

            {/* Process Section */}
            <section className={`py-16 ${darkMode ? 'bg-matte-800' : 'bg-white'}`}>
                <div className="section-padding">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-gold font-body text-sm uppercase tracking-[0.3em]">
                            Our Process
                        </span>
                        <h2 className={`font-display text-3xl md:text-4xl mt-4 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                            }`}>
                            From Vision to Reality
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {processSteps.map((processStep, index) => (
                            <motion.div
                                key={processStep.title}
                                className="text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="relative inline-block mb-6">
                                    <div className={`w-16 h-16 mx-auto flex items-center justify-center border-2 ${darkMode ? 'border-matte-600' : 'border-beige-400'
                                        }`}>
                                        <processStep.icon className="text-gold" size={28} />
                                    </div>
                                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-gold text-matte-900 font-body text-sm font-bold rounded-full flex items-center justify-center">
                                        {index + 1}
                                    </span>
                                </div>
                                <h3 className={`font-display text-xl mb-2 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                    }`}>
                                    {processStep.title}
                                </h3>
                                <p className={`font-body text-sm ${darkMode ? 'text-beige-400' : 'text-matte-500'
                                    }`}>
                                    {processStep.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="section-padding py-16">
                <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        {isSubmitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`text-center p-12 ${darkMode ? 'bg-matte-800' : 'bg-white'
                                    } shadow-lg`}
                            >
                                <motion.div
                                    className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                >
                                    <Check className="text-white" size={40} />
                                </motion.div>
                                <h2 className={`font-display text-3xl mb-4 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                    }`}>
                                    Request Submitted!
                                </h2>
                                <p className={`font-body mb-8 ${darkMode ? 'text-beige-300' : 'text-matte-600'
                                    }`}>
                                    Thank you for your interest in our custom furniture. Our design team
                                    will review your request and contact you within 24-48 hours.
                                </p>
                                <motion.button
                                    className="btn-primary"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setIsSubmitted(false);
                                        setFormData({
                                            name: '',
                                            email: '',
                                            phone: '',
                                            furnitureType: '',
                                            woodType: '',
                                            fabric: '',
                                            size: '',
                                            budget: '',
                                            description: ''
                                        });
                                        setStep(1);
                                    }}
                                >
                                    Submit Another Request
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                className={`p-8 md:p-12 ${darkMode ? 'bg-matte-800' : 'bg-white'
                                    } shadow-lg`}
                            >
                                {/* Progress Steps */}
                                <div className="flex items-center justify-center mb-12">
                                    {[1, 2, 3].map((s) => (
                                        <div key={s} className="flex items-center">
                                            <motion.div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-body font-bold transition-colors ${step >= s
                                                    ? 'bg-gold text-matte-900'
                                                    : darkMode
                                                        ? 'bg-matte-700 text-beige-400'
                                                        : 'bg-beige-300 text-matte-500'
                                                    }`}
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                {step > s ? <Check size={18} /> : s}
                                            </motion.div>
                                            {s < 3 && (
                                                <div className={`w-16 md:w-24 h-0.5 mx-2 transition-colors ${step > s ? 'bg-gold' : darkMode ? 'bg-matte-700' : 'bg-beige-300'
                                                    }`} />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <AnimatePresence mode="wait">
                                        {step === 1 && (
                                            <motion.div
                                                key="step1"
                                                variants={stepVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{ duration: 0.3 }}
                                            >
                                                <h3 className={`font-display text-2xl mb-8 text-center ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                                    }`}>
                                                    Contact Information
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className={labelClasses}>Full Name *</label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="Your full name"
                                                            className={inputClasses}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={labelClasses}>Email Address *</label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="your@email.com"
                                                            className={inputClasses}
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className={labelClasses}>Phone Number *</label>
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="+91 98765 43210"
                                                            className={inputClasses}
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 2 && (
                                            <motion.div
                                                key="step2"
                                                variants={stepVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{ duration: 0.3 }}
                                            >
                                                <h3 className={`font-display text-2xl mb-8 text-center ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                                    }`}>
                                                    Furniture Specifications
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className={labelClasses}>Type of Furniture *</label>
                                                        <select
                                                            name="furnitureType"
                                                            value={formData.furnitureType}
                                                            onChange={handleChange}
                                                            required
                                                            className={inputClasses}
                                                        >
                                                            <option value="">Select type</option>
                                                            <option value="sofa">Sofa / Sectional</option>
                                                            <option value="bed">Bed Frame</option>
                                                            <option value="dining">Dining Table</option>
                                                            <option value="desk">Desk / Office</option>
                                                            <option value="storage">Storage / Cabinet</option>
                                                            <option value="chair">Chair / Seating</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className={labelClasses}>Wood Type *</label>
                                                        <select
                                                            name="woodType"
                                                            value={formData.woodType}
                                                            onChange={handleChange}
                                                            required
                                                            className={inputClasses}
                                                        >
                                                            <option value="">Select wood</option>
                                                            {customOptions.woodTypes.map(wood => (
                                                                <option key={wood.id} value={wood.id}>
                                                                    {wood.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className={labelClasses}>Fabric / Upholstery</label>
                                                        <select
                                                            name="fabric"
                                                            value={formData.fabric}
                                                            onChange={handleChange}
                                                            className={inputClasses}
                                                        >
                                                            <option value="">Select fabric (if applicable)</option>
                                                            {customOptions.fabrics.map(fabric => (
                                                                <option key={fabric.id} value={fabric.id}>
                                                                    {fabric.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className={labelClasses}>Size *</label>
                                                        <select
                                                            name="size"
                                                            value={formData.size}
                                                            onChange={handleChange}
                                                            required
                                                            className={inputClasses}
                                                        >
                                                            <option value="">Select size</option>
                                                            {customOptions.sizes.map(size => (
                                                                <option key={size.id} value={size.id}>
                                                                    {size.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 3 && (
                                            <motion.div
                                                key="step3"
                                                variants={stepVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{ duration: 0.3 }}
                                            >
                                                <h3 className={`font-display text-2xl mb-8 text-center ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                                    }`}>
                                                    Budget & Details
                                                </h3>
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className={labelClasses}>Budget Range *</label>
                                                        <select
                                                            name="budget"
                                                            value={formData.budget}
                                                            onChange={handleChange}
                                                            required
                                                            className={inputClasses}
                                                        >
                                                            <option value="">Select budget</option>
                                                            {customOptions.budgetRanges.map(range => (
                                                                <option key={range.id} value={range.id}>
                                                                    {range.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className={labelClasses}>Project Description *</label>
                                                        <textarea
                                                            name="description"
                                                            value={formData.description}
                                                            onChange={handleChange}
                                                            required
                                                            rows={5}
                                                            placeholder="Describe your vision, preferred dimensions, any reference images or inspiration, and any other details..."
                                                            className={inputClasses}
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Navigation Buttons */}
                                    <div className="flex justify-between mt-10">
                                        {step > 1 ? (
                                            <motion.button
                                                type="button"
                                                className={`px-8 py-3 border font-body uppercase tracking-wider ${darkMode
                                                    ? 'border-matte-600 text-beige-200 hover:border-gold hover:text-gold'
                                                    : 'border-beige-400 text-matte-600 hover:border-gold hover:text-gold'
                                                    } transition-colors`}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={prevStep}
                                            >
                                                Previous
                                            </motion.button>
                                        ) : (
                                            <div />
                                        )}

                                        {step < 3 ? (
                                            <motion.button
                                                type="button"
                                                className="btn-primary"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={nextStep}
                                            >
                                                Continue
                                            </motion.button>
                                        ) : (
                                            <motion.button
                                                type="submit"
                                                className="btn-primary min-w-[180px] flex items-center justify-center"
                                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <motion.div
                                                        className="w-5 h-5 border-2 border-matte-900 border-t-transparent rounded-full"
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                    />
                                                ) : (
                                                    'Submit Request'
                                                )}
                                            </motion.button>
                                        )}
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Why Custom Section */}
            <section className={`py-16 ${darkMode ? 'bg-matte-800' : 'bg-beige-200'}`}>
                <div className="section-padding">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-gold font-body text-sm uppercase tracking-[0.3em]">
                            The Luxe Living Difference
                        </span>
                        <h2 className={`font-display text-3xl md:text-4xl mt-4 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                            }`}>
                            Why Choose Custom?
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Perfect Fit',
                                desc: 'Custom dimensions ensure your furniture fits perfectly in your space, down to the centimeter.'
                            },
                            {
                                title: 'Your Style',
                                desc: 'Choose from premium woods, fabrics, and finishes to match your exact aesthetic preferences.'
                            },
                            {
                                title: 'Heirloom Quality',
                                desc: 'Handcrafted by master artisans using time-honored techniques for generations of use.'
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={item.title}
                                className={`p-8 text-center ${darkMode ? 'bg-matte-700' : 'bg-white'
                                    }`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h3 className={`font-display text-xl mb-4 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                    }`}>
                                    {item.title}
                                </h3>
                                <p className={`font-body ${darkMode ? 'text-beige-400' : 'text-matte-500'
                                    }`}>
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Custom;
