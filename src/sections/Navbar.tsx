import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Serviços', href: '#services' },
  { name: 'Engenharia', href: '#engineering' },
  { name: 'Eventos', href: '#events' },
  { name: 'Contato', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(logoRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'expo.out' }
      );
      
      if (linksRef.current) {
        const links = linksRef.current.querySelectorAll('a');
        gsap.fromTo(links,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'expo.out', delay: 0.1 }
        );
      }
      
      gsap.fromTo(ctaRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.4 }
      );
    });
    
    return () => ctx.revert();
  }, []);
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };
  
  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#101D2F]/90 backdrop-blur-xl shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="MK Projetos" 
              className="h-12 w-auto object-contain"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div ref={linksRef} className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="relative text-sm font-medium text-white/80 hover:text-[#55BBE0] transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#55BBE0] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          
          {/* CTA Button */}
          <button
            ref={ctaRef}
            onClick={() => scrollToSection('#contact')}
            className="hidden lg:block px-6 py-2.5 bg-[#55BBE0] text-[#101D2F] font-semibold text-sm rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-glow"
          >
            Solicitar Orçamento
          </button>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-[#101D2F]/95 backdrop-blur-xl rounded-xl p-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="block py-2 px-4 text-white/80 hover:text-[#55BBE0] hover:bg-white/5 rounded-lg transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="w-full py-3 bg-[#55BBE0] text-[#101D2F] font-semibold rounded-lg mt-2"
            >
              Solicitar Orçamento
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
