import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, Phone, Mail, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/testimonials';

function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [squareMeters, setSquareMeters] = useState(0);
    const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
    const [selectedSurfaceType, setSelectedSurfaceType] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState('home');
    const [showAllServices, setShowAllServices] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const scrollToSection = (sectionId: string) => {
        setIsMenuOpen(false);
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                const elementRect = element.getBoundingClientRect();
                const absoluteElementTop = elementRect.top + window.pageYOffset;
                const elementHeight = elementRect.height;
                const viewportHeight = window.innerHeight;
                const centerPosition = absoluteElementTop - (viewportHeight / 2) + (elementHeight / 2);
                window.scrollTo({
                    top: centerPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    };

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const incrementMeters = () => {
        setSquareMeters(prev => prev + 1);
        setCalculatedPrice(null);
    };

    const decrementMeters = () => {
        setSquareMeters(prev => Math.max(0, prev - 1));
        setCalculatedPrice(null);
    };

    const calculatePrice = () => {
        const price = squareMeters * 20;
        setCalculatedPrice(price);
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const endOfWeek = new Date();
            endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
            endOfWeek.setHours(23, 59, 59, 999);
            const difference = endOfWeek.getTime() - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'services', 'about', 'testimonials', 'service-areas', 'estimate', 'contact'];
            const viewportHeight = window.innerHeight;
            const scrollPosition = window.scrollY;
            const centerPosition = scrollPosition + (viewportHeight / 2);

            let newActiveSection = activeSection;
            let closestDistance = Infinity;

            sections.forEach(sectionId => {
                const element = document.getElementById(sectionId);
                if (element) {
                    const elementTop = element.offsetTop;
                    const elementBottom = elementTop + element.offsetHeight;
                    const elementCenter = elementTop + (element.offsetHeight / 2);
                    
                    if (centerPosition >= elementTop && centerPosition <= elementBottom) {
                        const distance = Math.abs(centerPosition - elementCenter);
                        if (distance < closestDistance) {
                            closestDistance = distance;
                            newActiveSection = sectionId;
                        }
                    }
                }
            });

            if (newActiveSection !== activeSection) {
                setActiveSection(newActiveSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);
    return (
        <>
            <div className="w-full flex justify-between items-center fixed top-0 left-0 right-0 z-[10000] bg-white py-4 px-4">
                <div className="w-full max-w-[1280px] mx-auto flex justify-between items-center">
                    <div onClick={() => window.location.reload()} className="text-center text-black text-xl md:text-xl lg:text-2xl font-medium leading-tight tracking-tight cursor-pointer hover:text-black/70 transition-colors">
                        MAM Pressure Washing
                    </div>
                    
                    <div className="hidden lg:flex items-center gap-6">
                        <div onClick={() => scrollToSection('home')} className={`px-3 py-1 text-black text-base font-medium leading-tight tracking-tight cursor-pointer rounded-full transition-all duration-200 focus:outline-none focus:ring-0 ${activeSection === 'home' ? 'bg-[#F9F8F4]' : 'hover:bg-[#F9F8F4]'}`}>Home</div>
                        <div onClick={() => scrollToSection('services')} className={`px-3 py-1 text-black text-base font-medium leading-tight tracking-tight cursor-pointer rounded-full transition-all duration-200 focus:outline-none focus:ring-0 ${activeSection === 'services' ? 'bg-[#F9F8F4]' : 'hover:bg-[#F9F8F4]'}`}>Our Services</div>
                        <div onClick={() => scrollToSection('about')} className={`px-3 py-1 text-black text-base font-medium leading-tight tracking-tight cursor-pointer rounded-full transition-all duration-200 focus:outline-none focus:ring-0 ${activeSection === 'about' ? 'bg-[#F9F8F4]' : 'hover:bg-[#F9F8F4]'}`}>About Us</div>
                        <div onClick={() => scrollToSection('testimonials')} className={`px-3 py-1 text-black text-base font-medium leading-tight tracking-tight cursor-pointer rounded-full transition-all duration-200 focus:outline-none focus:ring-0 ${activeSection === 'testimonials' ? 'bg-[#F9F8F4]' : 'hover:bg-[#F9F8F4]'}`}>Testimonials</div>
                        <div onClick={() => scrollToSection('service-areas')} className={`px-3 py-1 text-black text-base font-medium leading-tight tracking-tight cursor-pointer rounded-full transition-all duration-200 focus:outline-none focus:ring-0 ${activeSection === 'service-areas' ? 'bg-[#F9F8F4]' : 'hover:bg-[#F9F8F4]'}`}>Service Areas</div>
                        <div onClick={() => scrollToSection('estimate')} className={`px-3 py-1 text-black text-base font-medium leading-tight tracking-tight cursor-pointer rounded-full transition-all duration-200 focus:outline-none focus:ring-0 ${activeSection === 'estimate' ? 'bg-[#F9F8F4]' : 'hover:bg-[#F9F8F4]'}`}>Get Free Estimate</div>
                        <div onClick={() => scrollToSection('contact')} className={`px-3 py-1 text-black text-base font-medium leading-tight tracking-tight cursor-pointer rounded-full transition-all duration-200 focus:outline-none focus:ring-0 ${activeSection === 'contact' ? 'bg-[#F9F8F4]' : 'hover:bg-[#F9F8F4]'}`}>Contact Us</div>
                    </div>
                    
                    <div 
                        className="lg:hidden w-8 h-8 flex justify-center items-center cursor-pointer transition-all duration-300 focus:outline-none focus:ring-0"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <div className="relative w-5 h-5">
                            <Menu className={`w-5 h-5 text-black transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                            <X className={`w-5 h-5 text-black absolute top-0 left-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full min-h-screen bg-white overflow-x-hidden flex flex-col justify-start items-center">
                <div className="w-full max-w-[1280px] mx-auto p-4 pt-16 flex flex-col justify-start items-center gap-6">
                <div id="home" className="w-full min-h-[calc(100vh-80px)] px-4 py-8 bg-[#F9F8F4] overflow-hidden rounded-2xl flex flex-col justify-center items-center gap-6">
                    <div className="w-full text-center text-black text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight">
                        Cape Town's Pressure Washing Experts
                    </div>
                    <div className="w-full text-center text-black text-xl md:text-2xl lg:text-3xl font-medium leading-tight tracking-tight tracking-tight">
                        Restore Your Home's Exterior
                    </div>
                    <div className="flex flex-col justify-center items-center gap-3">
                        <div onClick={() => scrollToSection('estimate')} className="px-6 py-3 bg-white overflow-hidden rounded-full flex flex-col justify-center items-center cursor-pointer focus:outline-none focus:ring-0 hover:bg-gray-100 transition-colors">
                            <div className="text-center text-black text-lg md:text-xl font-medium leading-tight tracking-tight">
                                Get Free Estimate
                            </div>
                        </div>
                        <div onClick={() => scrollToSection('contact')} className="px-6 py-3 bg-white overflow-hidden rounded-full flex flex-col justify-center items-center cursor-pointer focus:outline-none focus:ring-0 hover:bg-gray-100 transition-colors">
                            <div className="text-center text-black text-lg md:text-xl font-medium leading-tight tracking-tight">
                                Contact Us
                            </div>
                        </div>
                    </div>
                </div>

                <div id="services" className="w-full pt-6 pb-6 flex flex-col justify-center items-center gap-6">
                    <div className="w-full text-center text-black text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight">
                        Our Pressure Washing Services
                    </div>
                    
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-8 bg-[#F9F8F4] overflow-hidden rounded-2xl flex flex-col justify-center items-center gap-2">
                            <div className="text-black text-xl md:text-2xl font-medium leading-tight tracking-tight">Driveways</div>
                            <div className="w-full text-center text-black/50 text-base md:text-lg leading-tight tracking-tight tracking-tight">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                            </div>
                        </div>
                        
                        <div className="p-8 bg-[#F9F8F4] overflow-hidden rounded-2xl flex flex-col justify-center items-center gap-2">
                            <div className="text-black text-xl md:text-2xl font-medium leading-tight tracking-tight">Patios</div>
                            <div className="w-full text-center text-black/50 text-base md:text-lg leading-tight tracking-tight tracking-tight">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                            </div>
                        </div>
                        
                        <div className="p-8 bg-[#F9F8F4] overflow-hidden rounded-2xl flex flex-col justify-center items-center gap-2">
                            <div className="text-black text-xl md:text-2xl font-medium leading-tight tracking-tight">Exterior Walls</div>
                            <div className="w-full text-center text-black/50 text-base md:text-lg leading-tight tracking-tight tracking-tight">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                            </div>
                        </div>
                        
                        <div className="p-8 bg-[#F9F8F4] overflow-hidden rounded-2xl flex flex-col justify-center items-center gap-2">
                            <div className="text-black text-xl md:text-2xl font-medium leading-tight tracking-tight">Pool Areas (Decking)</div>
                            <div className="w-full text-center text-black/50 text-base md:text-lg leading-tight tracking-tight tracking-tight">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                            </div>
                        </div>
                        
                        <div className="p-8 bg-[#F9F8F4] overflow-hidden rounded-2xl flex flex-col justify-center items-center gap-2">
                            <div className="text-black text-xl md:text-2xl font-medium leading-tight tracking-tight">Solar Panels</div>
                            <div className="w-full text-center text-black/50 text-base md:text-lg leading-tight tracking-tight tracking-tight">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                            </div>
                        </div>
                        
                        <div className="p-8 bg-[#F9F8F4] overflow-hidden rounded-2xl flex flex-col justify-center items-center gap-2">
                            <div className="text-black text-xl md:text-2xl font-medium leading-tight tracking-tight">Fence Cleaning</div>
                            <div className="w-full text-center text-black/50 text-base md:text-lg leading-tight tracking-tight tracking-tight">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                            </div>
                        </div>
                    </div>
                    
                    {showAllServices && (
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 -mt-2">
                            <div className="p-8 bg-[#F9F8F4] overflow-hidden rounded-2xl flex flex-col justify-center items-center gap-2">
                                <div className="text-black text-xl md:text-2xl font-medium leading-tight tracking-tight">Garage Floors</div>
                                <div className="w-full text-center text-black/50 text-base md:text-lg leading-tight tracking-tight tracking-tight">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                                </div>
                            </div>
                            
                            <div className="p-8 bg-[#F9F8F4] overflow-hidden rounded-2xl flex flex-col justify-center items-center gap-2">
                                <div className="text-black text-xl md:text-2xl font-medium leading-tight tracking-tight">Outdoor Furniture</div>
                                <div className="w-full text-center text-black/50 text-base md:text-lg leading-tight tracking-tight tracking-tight">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                                </div>
                            </div>
                            
                            <div className="p-8 bg-[#F9F8F4] overflow-hidden rounded-2xl flex flex-col justify-center items-center gap-2">
                                <div className="text-black text-xl md:text-2xl font-medium leading-tight tracking-tight">Garden Statues & Features</div>
                                <div className="w-full text-center text-black/50 text-base md:text-lg leading-tight tracking-tight tracking-tight">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div onClick={() => setShowAllServices(!showAllServices)} className="px-6 py-3 bg-[#F9F8F4] overflow-hidden rounded-3xl flex flex-col justify-center items-center cursor-pointer hover:bg-[#F9F8F4]/80 transition-colors focus:outline-none focus:ring-0">
                        <div className="text-center text-black text-base md:text-lg font-medium leading-tight tracking-tight">
                            {showAllServices ? 'Hide Additional Services' : 'View All Services'}
                        </div>
                    </div>
                </div>

                <div id="about" className="w-full p-8 bg-[#F9F8F4] overflow-hidden rounded-2xl flex flex-col justify-center items-center gap-6">
                    <div className="w-full flex flex-col justify-center items-center gap-2">
                        <div className="w-full text-center text-black text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight">
                            Why Choose Us?
                        </div>
                        <div className="w-full text-center text-black/50 text-base md:text-lg leading-tight tracking-tight tracking-tight">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                        </div>
                    </div>
                    
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex flex-col justify-center items-center gap-1 p-4">
                            <div className="w-full text-center text-black text-lg md:text-xl font-medium leading-tight tracking-tight">
                                Header Name
                            </div>
                            <div className="w-full text-center text-black/50 text-base md:text-lg leading-tight tracking-tight tracking-tight">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                            </div>
                        </div>
                        
                        <div className="flex flex-col justify-center items-center gap-1 p-4">
                            <div className="w-full text-center text-black text-lg md:text-xl font-medium leading-tight tracking-tight">
                                Header Name
                            </div>
                            <div className="w-full text-center text-black/50 text-base md:text-lg leading-tight tracking-tight tracking-tight">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                            </div>
                        </div>
                        
                        <div className="flex flex-col justify-center items-center gap-1 p-4">
                            <div className="w-full text-center text-black text-lg md:text-xl font-medium leading-tight tracking-tight">
                                Header Name
                            </div>
                            <div className="w-full text-center text-black/50 text-base md:text-lg leading-tight tracking-tight tracking-tight">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                            </div>
                        </div>
                        
                        <div className="flex flex-col justify-center items-center gap-1 p-4">
                            <div className="w-full text-center text-black text-lg md:text-xl font-medium leading-tight tracking-tight">
                                Header Name
                            </div>
                            <div className="w-full text-center text-black/50 text-base md:text-lg leading-tight tracking-tight tracking-tight">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                            </div>
                        </div>
                        
                        <div className="flex flex-col justify-center items-center gap-1 p-4">
                            <div className="w-full text-center text-black text-lg md:text-xl font-medium leading-tight tracking-tight">
                                Header Name
                            </div>
                            <div className="w-full text-center text-black/50 text-base md:text-lg leading-tight tracking-tight tracking-tight">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                            </div>
                        </div>
                    </div>
                    
                    <div className="px-6 py-3 bg-white overflow-hidden rounded-3xl flex flex-col justify-center items-center focus:outline-none focus:ring-0">
                        <div className="text-center text-black text-base md:text-lg font-medium leading-tight tracking-tight">
                            Contact Us
                        </div>
                    </div>
                </div>

                <div className="w-full pt-6 pb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="w-full h-64 relative bg-[#F9F8F4] rounded-2xl"></div>
                    <div className="w-full h-64 relative bg-[#F9F8F4] rounded-2xl"></div>
                    <div className="w-full h-64 relative bg-[#F9F8F4] rounded-2xl"></div>
                </div>

                <div id="testimonials" className="w-full pb-6 flex flex-col justify-center items-center">
                    <div className="w-full px-8 py-6 flex flex-col justify-center items-center gap-6">
                        <div className="w-full flex flex-col justify-center items-center gap-2">
                            <div className="w-full text-center text-black text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
                                What Our Clients Say
                            </div>
                            <div className="w-full text-center text-black/50 text-base md:text-lg leading-tight tracking-tight">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full lg:max-w-[75%] lg:mx-auto px-4 flex flex-col justify-center items-center gap-6">
                        <div className="w-full flex flex-col justify-center items-center gap-3">
                            <div className="flex justify-center items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star 
                                        key={star} 
                                        className={`w-6 h-6 ${star <= testimonials[currentTestimonial].rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                    />
                                ))}
                            </div>
                            <div className="w-full flex justify-center items-center gap-4">
                                <button 
                                    onClick={prevTestimonial}
                                    className="w-10 h-10 flex justify-center items-center bg-[#F9F8F4] rounded-full hover:bg-[#F9F8F4]/70 transition-colors flex-shrink-0"
                                >
                                    <ChevronLeft className="w-6 h-6 text-black" />
                                </button>
                                
                                <div className="flex-1 text-center text-black text-lg md:text-xl font-medium leading-tight tracking-tight">
                                    "{testimonials[currentTestimonial].comment}"
                                </div>
                                
                                <button 
                                    onClick={nextTestimonial}
                                    className="w-10 h-10 flex justify-center items-center bg-[#F9F8F4] rounded-full hover:bg-[#F9F8F4]/70 transition-colors flex-shrink-0"
                                >
                                    <ChevronRight className="w-6 h-6 text-black" />
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex flex-col justify-center items-center gap-3">
                            <div className="flex flex-col justify-center items-center gap-1">
                                <div className="text-center text-black text-base md:text-lg font-medium leading-tight tracking-tight">
                                    {testimonials[currentTestimonial].name}
                                </div>
                                <div className="px-2 py-1 bg-[#F9F8F4] overflow-hidden rounded-3xl flex flex-col justify-center items-center">
                                    <div className="text-center text-black text-sm md:text-base font-medium leading-tight tracking-tight">
                                        {testimonials[currentTestimonial].suburb}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="overflow-hidden justify-center items-center gap-3 flex">
                            {testimonials.map((_, index) => (
                                <div 
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-2 h-2 relative rounded-full cursor-pointer ${index === currentTestimonial ? 'bg-black' : 'bg-[#F9F8F4]'}`}
                                ></div>
                            ))}
                        </div>
                        
                        <div className="px-6 py-3 bg-[#F9F8F4] overflow-hidden rounded-3xl flex flex-col justify-center items-center focus:outline-none focus:ring-0">
                            <div className="text-center text-black text-base md:text-lg font-medium leading-tight tracking-tight">
                                Share Your Experience
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full pb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="w-full h-48 relative bg-[#F9F8F4] rounded-2xl"></div>
                    <div className="w-full h-48 relative bg-[#F9F8F4] rounded-2xl"></div>
                </div>

                <div id="service-areas" className="w-full pb-6 flex flex-col justify-center items-center gap-6">
                    <div className="w-full px-8 flex flex-col justify-center items-center gap-2">
                        <div className="w-full text-center text-black text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
                            Areas We Serve
                        </div>
                        <div className="w-full text-center text-black/50 text-base md:text-lg leading-tight tracking-tight">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                        </div>
                    </div>
                    
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="px-4 py-6 bg-[#F9F8F4] overflow-hidden rounded-2xl flex flex-col justify-center items-center gap-3">
                        <div className="text-black text-2xl font-medium leading-tight tracking-tight">Southern Suburbs</div>
                            <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                                {['Claremont', 'Rondebosch', 'Newlands', 'Kenilworth', 'Wynberg', 'Constantia'].map((area, index) => (
                                <div key={area} className="px-2 py-1 bg-white overflow-hidden rounded-3xl flex flex-col justify-center items-center focus:outline-none focus:ring-0">
                                    <div className="text-center text-black text-sm md:text-base font-medium leading-tight tracking-tight">
                                        {area}
                                    </div>
                                </div>
                            ))}
                        </div>
                            <div className="w-full text-center text-black/50 text-base font-medium leading-tight tracking-tight">
                                + Surrounding Areas
                            </div>
                        </div>
                        
                        <div className="px-4 py-6 bg-[#F9F8F4] overflow-hidden rounded-2xl flex flex-col justify-center items-center gap-3">
                            <div className="text-black text-2xl font-medium leading-tight tracking-tight">Atlantic Seaboard</div>
                            <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                                {['Camps Bay', 'Clifton', 'Sea Point', 'Green Point', 'Mouille Point', 'Bantry Bay'].map((area) => (
                                    <div key={area} className="px-2 py-1 bg-white overflow-hidden rounded-3xl flex flex-col justify-center items-center focus:outline-none focus:ring-0">
                                        <div className="text-center text-black text-sm md:text-base font-medium leading-tight tracking-tight">
                                            {area}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full text-center text-black/50 text-base font-medium leading-tight tracking-tight">
                                + Surrounding Areas
                            </div>
                        </div>
                        
                        <div className="px-4 py-6 bg-[#F9F8F4] overflow-hidden rounded-2xl flex flex-col justify-center items-center gap-3">
                            <div className="text-black text-2xl font-medium leading-tight tracking-tight">Northern Suburbs</div>
                            <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                                {['Bellville', 'Parow', 'Goodwood', 'Durbanville', 'Brackenfell', 'Kraaifontein'].map((area) => (
                                    <div key={area} className="px-2 py-1 bg-white overflow-hidden rounded-3xl flex flex-col justify-center items-center focus:outline-none focus:ring-0">
                                        <div className="text-center text-black text-sm md:text-base font-medium leading-tight tracking-tight">
                                            {area}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full text-center text-black/50 text-base font-medium leading-tight tracking-tight">
                                + Surrounding Areas
                            </div>
                        </div>
                        
                        <div className="px-4 py-6 bg-[#F9F8F4] overflow-hidden rounded-2xl flex flex-col justify-center items-center gap-3 lg:col-start-1 lg:col-end-2">
                            <div className="text-black text-2xl font-medium leading-tight tracking-tight">Southern Peninsula</div>
                            <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                                {['Muizenberg', 'Kalk Bay', 'Fish Hoek', 'Simon\'s Town', 'Kommetjie', 'Noordhoek'].map((area) => (
                                    <div key={area} className="px-2 py-1 bg-white overflow-hidden rounded-3xl flex flex-col justify-center items-center focus:outline-none focus:ring-0">
                                        <div className="text-center text-black text-sm md:text-base font-medium leading-tight tracking-tight">
                                            {area}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full text-center text-black/50 text-base font-medium leading-tight tracking-tight">
                                + Surrounding Areas
                            </div>
                        </div>
                        
                        <div className="px-4 py-6 bg-[#F9F8F4] overflow-hidden rounded-2xl flex flex-col justify-center items-center gap-3 lg:col-start-2 lg:col-end-3">
                            <div className="text-black text-2xl font-medium leading-tight tracking-tight">Central Cape Town</div>
                            <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                                {['Cape Town CBD', 'Gardens', 'V&A Waterfront', 'Green Point', 'Sea Point', 'Woodstock'].map((area) => (
                                    <div key={area} className="px-2 py-1 bg-white overflow-hidden rounded-3xl flex flex-col justify-center items-center focus:outline-none focus:ring-0">
                                        <div className="text-center text-black text-sm md:text-base font-medium leading-tight tracking-tight">
                                            {area}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full text-center text-black/50 text-base font-medium leading-tight tracking-tight">
                                + Surrounding Areas
                            </div>
                        </div>
                        
                        <div className="px-4 py-6 bg-[#F9F8F4] overflow-hidden rounded-2xl flex flex-col justify-center items-center gap-3 lg:col-start-3 lg:col-end-4">
                            <div className="text-black text-2xl font-medium leading-tight tracking-tight">West Coast</div>
                            <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                                {['Milnerton', 'Table View', 'Bloubergstrand', 'Melkbosstrand', 'Atlantis', 'Langebaan'].map((area) => (
                                    <div key={area} className="px-2 py-1 bg-white overflow-hidden rounded-3xl flex flex-col justify-center items-center focus:outline-none focus:ring-0">
                                        <div className="text-center text-black text-sm md:text-base font-medium leading-tight tracking-tight">
                                            {area}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full text-center text-black/50 text-base font-medium leading-tight tracking-tight">
                                + Surrounding Areas
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full text-center text-black text-base font-medium leading-tight tracking-tight">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                    </div>
                </div>

                <div className="w-full pb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="w-full h-48 relative bg-[#F9F8F4] rounded-2xl"></div>
                    <div className="w-full h-48 relative bg-[#F9F8F4] rounded-2xl"></div>
                    <div className="w-full h-48 relative bg-[#F9F8F4] rounded-2xl"></div>
                    <div className="w-full h-48 relative bg-[#F9F8F4] rounded-2xl"></div>
                    <div className="w-full h-48 relative bg-[#F9F8F4] rounded-2xl"></div>
                </div>

                <div id="estimate" className="w-full lg:max-w-[75%] mx-auto p-6 bg-[#F9F8F4] overflow-hidden rounded-2xl flex flex-col justify-center items-center gap-4">
                    <div className="w-full flex flex-col justify-center items-center gap-2">
                        <div className="w-full text-center text-black text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight">
                            Get Free Estimate
                        </div>
                        <div className="w-full text-center text-black/50 text-base md:text-lg font-medium leading-tight tracking-tight">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </div>
                    </div>
                    
                    <div className="w-full flex flex-col justify-center items-center gap-3">
                        <div className="text-center text-black text-base md:text-lg font-medium leading-tight tracking-tight">
                            Number Squared Meters
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                                type="number"
                                value={squareMeters}
                                onChange={(e) => {
                                    setSquareMeters(parseInt(e.target.value) || 0);
                                    setCalculatedPrice(null);
                                }}
                                className="w-auto min-w-12 h-12 bg-white rounded-full text-center text-black text-lg font-medium border-0 focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-2"
                                min="0"
                            />
                            <div className="flex flex-col gap-1">
                                <button 
                                    onClick={incrementMeters}
                                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black hover:bg-white focus:outline-none focus:ring-0 transition-colors aspect-square"
                                >
                                    +
                                </button>
                                <button 
                                    onClick={decrementMeters}
                                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black hover:bg-white focus:outline-none focus:ring-0 transition-colors aspect-square"
                                >
                                    -
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full flex flex-col justify-center items-center gap-3">
                        <div className="text-center text-black text-base md:text-lg font-medium leading-tight tracking-tight">
                            Surface Type
                        </div>
                        <div className="w-full justify-center items-center gap-3 flex">
                            <button 
                                onClick={() => {
                                    setSelectedSurfaceType('Driveway');
                                    setCalculatedPrice(null);
                                }}
                                className={`flex-1 h-12 rounded-3xl flex items-center justify-center text-base font-medium transition-colors focus:outline-none focus:ring-0 ${
                                    selectedSurfaceType === 'Driveway' 
                                        ? 'bg-[#F9F8F4] text-black hover:bg-[#F9F8F4]' 
                                        : 'bg-white text-black hover:bg-white'
                                }`}
                            >
                                Driveway
                            </button>
                            <button 
                                onClick={() => {
                                    setSelectedSurfaceType('Patio');
                                    setCalculatedPrice(null);
                                }}
                                className={`flex-1 h-12 rounded-3xl flex items-center justify-center text-base font-medium transition-colors focus:outline-none focus:ring-0 ${
                                    selectedSurfaceType === 'Patio' 
                                        ? 'bg-[#F9F8F4] text-black hover:bg-[#F9F8F4]' 
                                        : 'bg-white text-black hover:bg-white'
                                }`}
                            >
                                Patio
                            </button>
                            <button 
                                onClick={() => {
                                    setSelectedSurfaceType('Walls');
                                    setCalculatedPrice(null);
                                }}
                                className={`flex-1 h-12 rounded-3xl flex items-center justify-center text-base font-medium transition-colors focus:outline-none focus:ring-0 ${
                                    selectedSurfaceType === 'Walls' 
                                        ? 'bg-[#F9F8F4] text-black hover:bg-[#F9F8F4]' 
                                        : 'bg-white text-black hover:bg-white'
                                }`}
                            >
                                Walls
                            </button>
                            <button 
                                onClick={() => {
                                    setSelectedSurfaceType('Pool');
                                    setCalculatedPrice(null);
                                }}
                                className={`flex-1 h-12 rounded-3xl flex items-center justify-center text-base font-medium transition-colors focus:outline-none focus:ring-0 ${
                                    selectedSurfaceType === 'Pool' 
                                        ? 'bg-[#F9F8F4] text-black hover:bg-[#F9F8F4]' 
                                        : 'bg-white text-black hover:bg-white'
                                }`}
                            >
                                Pool
                            </button>
                        </div>
                    </div>
                    
                    <div className="w-full flex flex-col justify-center items-center gap-3">
                        <button 
                            onClick={calculatePrice}
                            disabled={squareMeters === 0 || selectedSurfaceType === null}
                            className={`px-6 py-3 overflow-hidden rounded-3xl flex flex-col justify-center items-center transition-colors focus:outline-none focus:ring-0 ${
                                squareMeters === 0 || selectedSurfaceType === null
                                    ? 'bg-[#F9F8F4] text-black/50 cursor-not-allowed hover:bg-[#F9F8F4]'
                                    : 'bg-white text-black hover:bg-white'
                            }`}
                        >
                            <div className="text-center text-lg font-medium leading-tight tracking-tight">
                                Calculate
                            </div>
                        </button>
                        
                        {calculatedPrice !== null && (
                            <div className="w-full text-center text-black text-2xl md:text-3xl font-medium leading-tight">
                                Estimated Price: R{calculatedPrice.toLocaleString()}
                            </div>
                        )}
                        
                        <div className="w-full text-center text-black/50 text-base font-medium leading-tight tracking-tight">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                        </div>
                    </div>
                </div>

                <div id="contact" className="w-full pt-6 pb-6 flex flex-col justify-center items-center gap-6">
                    <div className="w-full px-8 flex flex-col justify-center items-center gap-2">
                        <div className="w-full text-center text-black text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight">
                            Contact Us
                        </div>
                        <div className="w-full text-center text-black/50 text-lg leading-tight tracking-tight">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                        </div>
                    </div>
                    
                    <div className="w-full px-4 justify-center items-center gap-3 flex">
                        <div className="flex-1 px-6 py-3 bg-[#F9F8F4] overflow-hidden rounded-3xl flex flex-col justify-center items-center focus:outline-none focus:ring-0">
                            <div className="text-center text-black text-lg font-medium leading-tight tracking-tight">
                                WhatsApp
                            </div>
                        </div>
                        <div className="flex-1 px-6 py-3 bg-[#F9F8F4] overflow-hidden rounded-3xl flex flex-col justify-center items-center focus:outline-none focus:ring-0">
                            <div className="text-center text-black text-lg font-medium leading-tight tracking-tight">
                                Phone
                            </div>
                        </div>
                        <div className="flex-1 px-6 py-3 bg-[#F9F8F4] overflow-hidden rounded-3xl flex flex-col justify-center items-center focus:outline-none focus:ring-0">
                            <div className="text-center text-black text-lg font-medium leading-tight tracking-tight">
                                Email
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full flex flex-col justify-center items-center gap-2">
                        <div className="w-full text-center text-black/50 text-base font-medium leading-tight tracking-tight">
                            +27 12 345 6789
                        </div>
                        <div className="w-full text-center text-black/50 text-base font-medium leading-tight tracking-tight">
                            address@example.com
                        </div>
                    </div>
                    
                    <div className="w-full text-center text-black text-base font-medium leading-tight tracking-tight">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                    </div>
                </div>

                <div className="w-full pb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="w-full h-48 relative bg-[#F9F8F4] rounded-2xl"></div>
                    <div className="w-full h-48 relative bg-[#F9F8F4] rounded-2xl"></div>
                </div>
            </div>

            <div className="w-full max-w-[1280px] mx-auto px-4 py-8 bg-[#F9F8F4]/50 overflow-hidden">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <div className="text-black text-xl font-medium leading-tight tracking-tight">
                            MAM Pressure Washing
                        </div>
                        <div className="text-black/70 text-base leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut libero nunc.
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <div className="text-black text-lg font-medium leading-tight tracking-tight">
                            Quick Links
                        </div>
                        <div className="flex flex-col gap-2">
                            <div onClick={() => scrollToSection('services')} className="text-black/70 text-base cursor-pointer hover:text-black transition-colors focus:outline-none focus:ring-0">Our Services</div>
                            <div onClick={() => scrollToSection('about')} className="text-black/70 text-base cursor-pointer hover:text-black transition-colors focus:outline-none focus:ring-0">About Us</div>
                            <div onClick={() => scrollToSection('service-areas')} className="text-black/70 text-base cursor-pointer hover:text-black transition-colors focus:outline-none focus:ring-0">Service Areas</div>
                            <div onClick={() => scrollToSection('estimate')} className="text-black/70 text-base cursor-pointer hover:text-black transition-colors focus:outline-none focus:ring-0">Get Free Estimate</div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <div className="text-black text-lg font-medium leading-tight tracking-tight">
                            Contact Us
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-black/70 text-base">+27 12 345 6789</div>
                            <div className="text-black/70 text-base">info@mampressure.co.za</div>
                            <div className="text-black/70 text-base">Cape Town, South Africa</div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <div className="text-black text-lg font-medium leading-tight tracking-tight">
                            Follow Us
                        </div>
                        <div className="flex gap-2 justify-center md:justify-start">
                            <div className="w-7 h-7 relative bg-[#F9F8F4] rounded-2xl cursor-pointer hover:bg-[#F9F8F4]/70 transition-colors focus:outline-none focus:ring-0"></div>
                            <div className="w-7 h-7 relative bg-[#F9F8F4] rounded-2xl cursor-pointer hover:bg-[#F9F8F4]/70 transition-colors focus:outline-none focus:ring-0"></div>
                            <div className="w-7 h-7 relative bg-[#F9F8F4] rounded-2xl cursor-pointer hover:bg-[#F9F8F4]/70 transition-colors focus:outline-none focus:ring-0"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="w-full max-w-[1280px] mx-auto px-8 py-6 overflow-hidden flex flex-col justify-center items-center gap-3">
                <div className="text-center text-black/50 text-base font-medium leading-tight tracking-tight">
                    www.prowse.co.za
                </div>
                <div className="flex justify-center items-center gap-2">
                    <div className="w-7 h-7 relative bg-[#F9F8F4] rounded-2xl focus:outline-none focus:ring-0"></div>
                    <div className="w-7 h-7 relative bg-[#F9F8F4] rounded-2xl focus:outline-none focus:ring-0"></div>
                    <div className="w-7 h-7 relative bg-[#F9F8F4] rounded-2xl focus:outline-none focus:ring-0"></div>
                </div>
            </div>

            {isMenuOpen && (
                <div 
                    className="fixed inset-0 z-[9999] w-full h-full bg-white flex flex-col"
                >
                    <div className="w-full max-w-[1280px] mx-auto p-4">
                        <div className="w-full flex justify-between items-center py-4">
                            <div className="text-center text-black text-xl md:text-xl lg:text-2xl font-medium leading-tight tracking-tight">
                                MAM Pressure Washing
                            </div>
                            <div 
                                className="w-8 h-8 flex justify-center items-center cursor-pointer transition-all duration-300 focus:outline-none focus:ring-0"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <X className="w-5 h-5 text-black" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center items-center gap-6 px-4">
                        <div onClick={() => scrollToSection('home')} className={`text-3xl font-medium leading-tight tracking-tight cursor-pointer focus:outline-none focus:ring-0 transition-colors ${activeSection === 'home' ? 'text-black' : 'text-black/70 hover:text-black'}`}>Home</div>
                        <div onClick={() => scrollToSection('services')} className={`text-3xl font-medium leading-tight tracking-tight cursor-pointer focus:outline-none focus:ring-0 transition-colors ${activeSection === 'services' ? 'text-black' : 'text-black/70 hover:text-black'}`}>Our Services</div>
                        <div onClick={() => scrollToSection('about')} className={`text-3xl font-medium leading-tight tracking-tight cursor-pointer focus:outline-none focus:ring-0 transition-colors ${activeSection === 'about' ? 'text-black' : 'text-black/70 hover:text-black'}`}>About Us</div>
                        <div onClick={() => scrollToSection('testimonials')} className={`text-3xl font-medium leading-tight tracking-tight cursor-pointer focus:outline-none focus:ring-0 transition-colors ${activeSection === 'testimonials' ? 'text-black' : 'text-black/70 hover:text-black'}`}>Testimonials</div>
                        <div onClick={() => scrollToSection('service-areas')} className={`text-3xl font-medium leading-tight tracking-tight cursor-pointer focus:outline-none focus:ring-0 transition-colors ${activeSection === 'service-areas' ? 'text-black' : 'text-black/70 hover:text-black'}`}>Service Areas</div>
                        <div onClick={() => scrollToSection('estimate')} className={`text-3xl font-medium leading-tight tracking-tight cursor-pointer focus:outline-none focus:ring-0 transition-colors ${activeSection === 'estimate' ? 'text-black' : 'text-black/70 hover:text-black'}`}>Get Free Estimate</div>
                        <div onClick={() => scrollToSection('contact')} className={`text-3xl font-medium leading-tight tracking-tight cursor-pointer focus:outline-none focus:ring-0 transition-colors ${activeSection === 'contact' ? 'text-black' : 'text-black/70 hover:text-black'}`}>Contact Us</div>
                    </div>
                    
                </div>
            )}

            </div>
        </>
    );
}

export default Home;