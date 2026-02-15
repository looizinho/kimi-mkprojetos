import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  MessageCircle,
  ArrowUp
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Serviços', href: '#services' },
  { name: 'Engenharia', href: '#engineering' },
  { name: 'Eventos', href: '#events' },
  { name: 'Portfólio', href: '#portfolio' },
  { name: 'Contato', href: '#contact' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: MessageCircle, href: 'https://wa.me/5511999999999', label: 'WhatsApp' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      triggerRef.current = ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top 90%',
        onEnter: () => {
          // Border animation
          gsap.fromTo('.footer-border',
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: 'expo.out' }
          );
          
          // Content animation
          gsap.fromTo(contentRef.current?.querySelectorAll('.footer-item') || [],
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'expo.out', delay: 0.2 }
          );
          
          // Social icons
          gsap.fromTo('.social-icon',
            { scale: 0 },
            { scale: 1, duration: 0.3, stagger: 0.06, ease: 'back.out(1.7)', delay: 0.5 }
          );
        },
        once: true,
      });
    }, footerRef);
    
    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
      ctx.revert();
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer
      ref={footerRef}
      className="relative pt-16 pb-8 overflow-hidden"
    >
      {/* Top Border */}
      <div className="footer-border absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#55BBE0] to-transparent origin-center" />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1420] to-[#101D2F]" />
      
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="footer-item lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo.png" 
                alt="MK Projetos" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-md mb-6">
              Especialistas em soluções de tecnologia, automação e engenharia elétrica 
              para empresas e residências. Transformando espaços através da inovação 
              e excelência técnica.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="social-icon w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-[#55BBE0] hover:border-[#55BBE0]/30 hover:bg-[#55BBE0]/10 transition-all duration-300 hover:scale-110 hover:rotate-6"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="footer-item">
            <h4 className="text-white font-semibold font-montserrat mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/60 text-sm hover:text-[#55BBE0] hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 h-px bg-[#55BBE0] group-hover:w-2 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div className="footer-item">
            <h4 className="text-white font-semibold font-montserrat mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#55BBE0] text-sm">T:</span>
                <a href="tel:+5511999999999" className="text-white/60 text-sm hover:text-[#55BBE0] transition-colors">
                  (21) 98871-5996
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#55BBE0] text-sm">E:</span>
                <a href="mailto:contato@mkprojetos.com.br" className="text-white/60 text-sm hover:text-[#55BBE0] transition-colors">
                  contato@mkprojetos.com.br
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#55BBE0] text-sm">L:</span>
                <span className="text-white/60 text-sm">
                  São Paulo, SP - Brasil
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="footer-item pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} MK Projetos. Todos os direitos reservados.
          </p>
          
          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-white/40 hover:text-[#55BBE0] transition-colors"
          >
            <span className="text-sm">Voltar ao topo</span>
            <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-[#55BBE0]/10 group-hover:border-[#55BBE0]/30 transition-all duration-300">
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
