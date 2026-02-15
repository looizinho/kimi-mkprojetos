import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Phone, ChevronDown } from 'lucide-react';
import ParticleField from '../components/effects/ParticleField';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      
      // Headline animation - clip reveal
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.headline-line');
        tl.fromTo(lines,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8, stagger: 0.15 },
          0.4
        );
      }
      
      // Subheadline
      tl.fromTo(subheadlineRef.current,
        { filter: 'blur(10px)', opacity: 0 },
        { filter: 'blur(0px)', opacity: 1, duration: 0.6 },
        1
      );
      
      // CTA buttons
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('button');
        tl.fromTo(buttons,
          { scale: 0.8, y: 30, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
          1.2
        );
      }
      
      // Decorative elements
      if (decorRef.current) {
        const elements = decorRef.current.querySelectorAll('.decor-element');
        tl.fromTo(elements,
          { scale: 0, opacity: 0, rotation: -180 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1, stagger: 0.1, ease: 'back.out(1.7)' },
          0.8
        );
      }
      
      // Floating animation for decorative elements
      gsap.to('.decor-float', {
        y: -20,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
      
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#101D2F] via-[#0F2435] to-[#101D2F]" />
      
      {/* Animated Gradient Mesh */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at 20% 30%, rgba(85, 187, 224, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(85, 187, 224, 0.1) 0%, transparent 50%)',
        }}
      />
      
      {/* Particle Field */}
      <ParticleField />
      
      {/* Decorative Elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        {/* Floating Hexagons */}
        <div className="decor-element decor-float absolute top-20 right-[15%] w-16 h-16 opacity-30">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              fill="none"
              stroke="#55BBE0"
              strokeWidth="2"
              className="animate-spin-slow"
            />
          </svg>
        </div>
        
        <div className="decor-element decor-float absolute bottom-32 right-[25%] w-12 h-12 opacity-20 animation-delay-500">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              fill="none"
              stroke="#55BBE0"
              strokeWidth="2"
              className="animate-spin-slow"
              style={{ animationDirection: 'reverse' }}
            />
          </svg>
        </div>
        
        {/* Circuit Lines */}
        <svg className="decor-element absolute top-1/4 left-10 w-32 h-64 opacity-20" viewBox="0 0 100 200">
          <path
            d="M10,0 L10,50 L40,80 L40,120 L10,150 L10,200"
            fill="none"
            stroke="#55BBE0"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="animate-draw-line"
          />
          <circle cx="10" cy="50" r="4" fill="#55BBE0" className="animate-pulse" />
          <circle cx="40" cy="80" r="4" fill="#55BBE0" className="animate-pulse animation-delay-300" />
          <circle cx="40" cy="120" r="4" fill="#55BBE0" className="animate-pulse animation-delay-600" />
        </svg>
        
        <svg className="decor-element absolute bottom-1/4 right-10 w-24 h-48 opacity-15" viewBox="0 0 100 200">
          <path
            d="M90,0 L90,60 L50,100 L50,140 L90,180 L90,200"
            fill="none"
            stroke="#55BBE0"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="animate-draw-line"
          />
          <circle cx="90" cy="60" r="4" fill="#55BBE0" className="animate-pulse animation-delay-200" />
          <circle cx="50" cy="100" r="4" fill="#55BBE0" className="animate-pulse animation-delay-500" />
        </svg>
        
        {/* Glowing Orbs */}
        <div className="decor-element absolute top-1/3 left-1/4 w-3 h-3 bg-[#55BBE0] rounded-full blur-sm animate-pulse" />
        <div className="decor-element absolute bottom-1/3 right-1/3 w-2 h-2 bg-[#55BBE0] rounded-full blur-sm animate-pulse animation-delay-400" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Headline */}
          <div ref={headlineRef} className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat leading-tight">
              <span className="headline-line block text-white">SOLUÇÕES EM</span>
              <span className="headline-line block text-gradient mt-2">TECNOLOGIA E</span>
              <span className="headline-line block text-gradient mt-2">AUTOMAÇÃO</span>
            </h1>
          </div>
          
          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Proteja, conecte e transforme seu espaço com as soluções mais avançadas em 
            segurança eletrônica, automação e engenharia elétrica.
          </p>
          
          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToServices}
              className="group px-8 py-4 bg-[#55BBE0] text-[#101D2F] font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-glow-strong flex items-center gap-2"
            >
              Conheça Nossos Serviços
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={scrollToContact}
              className="group px-8 py-4 border-2 border-[#55BBE0] text-[#55BBE0] font-semibold rounded-lg transition-all duration-300 hover:bg-[#55BBE0] hover:text-[#101D2F] flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Fale Conosco
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToServices}
          className="text-white/50 hover:text-[#55BBE0] transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
}
