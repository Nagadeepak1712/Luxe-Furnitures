import { useState, useContext, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Check, Loader2 } from 'lucide-react';
import { AppContext } from '../App';
import { footerData } from '../data/products';
import type { AppContextType, ContactFormData } from '../types';

interface FAQ {
    q: string;
    a: string;
}

const Contact: React.FC = () => {
    const { darkMode } = useContext(AppContext) as AppContextType;
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Send to backend API
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsSubmitted(true);
            }
        } catch (error) {
            // For demo purposes, still show success
            console.log('Contact form submitted:', formData);
            setIsSubmitted(true);
        }

        setIsSubmitting(false);
    };

    const pageVariants: Variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    const inputClasses = `w-full px-4 py-3 font-body border ${darkMode
        ? 'bg-matte-700 border-matte-600 text-beige-100 placeholder-beige-500'
        : 'bg-white border-beige-400 text-matte-800 placeholder-matte-400'
        } focus:outline-none focus:border-gold transition-colors`;

    const labelClasses = `block font-body text-sm uppercase tracking-wider mb-2 ${darkMode ? 'text-beige-200' : 'text-matte-700'
        }`;

    const faqs: FAQ[] = [
        {
            q: 'Do you offer delivery outside Bangalore?',
            a: 'Yes, we offer pan-India delivery. Shipping costs are calculated based on location and furniture dimensions. White-glove delivery and assembly are included for orders above ₹50,000.'
        },
        {
            q: 'Can I visit your showroom without an appointment?',
            a: 'Walk-ins are welcome during our regular hours. However, for a personalized consultation with our design experts, we recommend booking an appointment in advance.'
        },
        {
            q: 'What is your return policy?',
            a: 'We offer a 30-day return policy for standard pieces in original condition. Custom furniture orders are final sale, as they are made specifically for you.'
        },
        {
            q: 'How long does custom furniture take?',
            a: 'Custom pieces typically take 6-8 weeks from design approval to delivery. Complex projects may require additional time, which will be communicated during consultation.'
        }
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
                        src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80"
                        alt="Our showroom"
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
                        Get in Touch
                    </motion.span>
                    <motion.h1
                        className="font-display text-4xl md:text-5xl lg:text-6xl text-white"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Contact Us
                    </motion.h1>
                    <motion.p
                        className="font-body text-beige-300 mt-4 max-w-xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        We'd love to hear from you. Visit our showroom or send us a message.
                    </motion.p>
                    <motion.div
                        className="divider-gold mt-6"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    />
                </div>
            </section>

            {/* Contact Section */}
            <section className="section-padding py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className={`font-display text-3xl mb-8 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                            }`}>
                            Send a Message
                        </h2>

                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className={`p-12 text-center ${darkMode ? 'bg-matte-800' : 'bg-white'
                                        } shadow-lg`}
                                >
                                    <motion.div
                                        className="w-16 h-16 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: 'spring' }}
                                    >
                                        <Check className="text-white" size={32} />
                                    </motion.div>
                                    <h3 className={`font-display text-2xl mb-4 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                        }`}>
                                        Message Sent!
                                    </h3>
                                    <p className={`font-body mb-8 ${darkMode ? 'text-beige-300' : 'text-matte-600'
                                        }`}>
                                        Thank you for reaching out. Our team will get back to you within 24 hours.
                                    </p>
                                    <motion.button
                                        className="btn-secondary"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setFormData({
                                                name: '',
                                                email: '',
                                                phone: '',
                                                subject: '',
                                                message: ''
                                            });
                                        }}
                                    >
                                        Send Another Message
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    className={`p-8 ${darkMode ? 'bg-matte-800' : 'bg-white'
                                        } shadow-lg`}
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className={labelClasses}>Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+91 98765 43210"
                                                className={inputClasses}
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Subject *</label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className={inputClasses}
                                            >
                                                <option value="">Select a topic</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="product">Product Question</option>
                                                <option value="order">Order Status</option>
                                                <option value="custom">Custom Furniture</option>
                                                <option value="showroom">Showroom Visit</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className={labelClasses}>Message *</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            placeholder="How can we help you?"
                                            className={inputClasses}
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        className="btn-primary w-full flex items-center justify-center gap-2"
                                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin" size={20} />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                Send Message
                                            </>
                                        )}
                                    </motion.button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Contact Info & Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className={`font-display text-3xl mb-8 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                            }`}>
                            Visit Our Showroom
                        </h2>

                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <motion.div
                                className={`p-6 ${darkMode ? 'bg-matte-800' : 'bg-white'} shadow-lg`}
                                whileHover={{ y: -5 }}
                            >
                                <MapPin className="text-gold mb-4" size={28} />
                                <h4 className={`font-display text-lg mb-2 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                    }`}>
                                    Address
                                </h4>
                                <p className={`font-body text-sm ${darkMode ? 'text-beige-400' : 'text-matte-500'
                                    }`}>
                                    {footerData.contact.address}
                                </p>
                            </motion.div>

                            <motion.div
                                className={`p-6 ${darkMode ? 'bg-matte-800' : 'bg-white'} shadow-lg`}
                                whileHover={{ y: -5 }}
                            >
                                <Phone className="text-gold mb-4" size={28} />
                                <h4 className={`font-display text-lg mb-2 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                    }`}>
                                    Phone
                                </h4>
                                <a
                                    href={`tel:${footerData.contact.phone}`}
                                    className={`font-body text-sm ${darkMode ? 'text-beige-400' : 'text-matte-500'
                                        } hover:text-gold transition-colors`}
                                >
                                    {footerData.contact.phone}
                                </a>
                            </motion.div>

                            <motion.div
                                className={`p-6 ${darkMode ? 'bg-matte-800' : 'bg-white'} shadow-lg`}
                                whileHover={{ y: -5 }}
                            >
                                <Mail className="text-gold mb-4" size={28} />
                                <h4 className={`font-display text-lg mb-2 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                    }`}>
                                    Email
                                </h4>
                                <a
                                    href={`mailto:${footerData.contact.email}`}
                                    className={`font-body text-sm ${darkMode ? 'text-beige-400' : 'text-matte-500'
                                        } hover:text-gold transition-colors`}
                                >
                                    {footerData.contact.email}
                                </a>
                            </motion.div>

                            <motion.div
                                className={`p-6 ${darkMode ? 'bg-matte-800' : 'bg-white'} shadow-lg`}
                                whileHover={{ y: -5 }}
                            >
                                <Clock className="text-gold mb-4" size={28} />
                                <h4 className={`font-display text-lg mb-2 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                    }`}>
                                    Hours
                                </h4>
                                <p className={`font-body text-sm ${darkMode ? 'text-beige-400' : 'text-matte-500'
                                    }`}>
                                    {footerData.contact.hours}
                                </p>
                            </motion.div>
                        </div>

                        {/* Google Map Embed */}
                        <div className={`aspect-video overflow-hidden ${darkMode ? 'border border-matte-700' : 'shadow-lg'
                            }`}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5984694025707!2d77.61270717454506!3d12.934844487374075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1452f8f8c5ff%3A0x55f7c6f8e6f5b0f0!2sKoramangala%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Luxe Living Showroom Location"
                                className={darkMode ? 'grayscale invert' : ''}
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className={`py-16 ${darkMode ? 'bg-matte-800' : 'bg-beige-200'}`}>
                <div className="section-padding">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-gold font-body text-sm uppercase tracking-[0.3em]">
                            Need Help?
                        </span>
                        <h2 className={`font-display text-3xl md:text-4xl mt-4 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                            }`}>
                            Frequently Asked Questions
                        </h2>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                className={`p-6 ${darkMode ? 'bg-matte-700' : 'bg-white'}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h4 className={`font-display text-lg mb-2 ${darkMode ? 'text-beige-100' : 'text-matte-800'
                                    }`}>
                                    {faq.q}
                                </h4>
                                <p className={`font-body ${darkMode ? 'text-beige-400' : 'text-matte-500'
                                    }`}>
                                    {faq.a}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Contact;
