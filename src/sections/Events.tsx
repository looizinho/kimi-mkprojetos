import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Monitor, 
  Volume2, 
  CreditCard, 
  Vote,
  Lightbulb,
  Projector
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const eventServices = [
  {
    icon: Monitor,
    title: 'Locação de Equipamentos',
    description: 'Áudio, Vídeo, Informática, Painel LED e Projeção Mapeada para eventos de todos os portes.',
    features: ['Painel LED', 'Projeção Mapeada', 'Equipamentos de Áudio', 'Informática'],
  },
  {
    icon: Volume2,
    title: 'Sonorização e Iluminação',
    description: 'Sonorização ambiente, iluminação fixa e dinâmica, projeções especiais para criar a atmosfera perfeita.',
    features: ['Sonorização Ambiente', 'Iluminação Dinâmica', 'Projeções Especiais', 'Iluminação Fixa'],
  },
  {
    icon: CreditCard,
    title: 'Sistema de Credenciamento',
    description: 'Controle de acesso para eventos com gestão completa de participantes e relatórios em tempo real.',
    features: ['Controle de Acesso', 'Gestão de Participantes', 'Relatórios', 'Badges Inteligentes'],
  },
  {
    icon: Vote,
    title: 'Sistema para Assembleias',
    description: 'Votação eletrônica e híbrida com tags, controle de presença e resultados instantâneos.',
    features: ['Votação Eletrônica', 'Votação Híbrida', 'Controle de Presença', 'Resultados em Tempo Real'],
  },
];

export default function Events() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const titleTrigger = ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(titleRef.current,
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(titleTrigger);
      
      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.event-card');
        cards.forEach((card, index) => {
          const isLeft = index % 2 === 0;
          const cardTrigger = ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
              gsap.fromTo(card,
                { y: 60, rotate: isLeft ? 5 : -5, opacity: 0 },
                { y: 0, rotate: 0, opacity: 1, duration: 0.7, delay: index * 0.15, ease: 'expo.out' }
              );
            },
            once: true,
          });
          triggersRef.current.push(cardTrigger);
        });
      }
      
    }, sectionRef);
    
    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);
  
  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#55BBE0]/5 to-transparent" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#55BBE0]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#55BBE0]/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#55BBE0]/10 border border-[#55BBE0]/20 rounded-full mb-6">
            <Lightbulb className="w-4 h-4 text-[#55BBE0]" />
            <span className="text-sm text-[#55BBE0]">Soluções Completas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-montserrat mb-4">
            <span className="text-white">SOLUÇÕES PARA</span>{' '}
            <span className="text-gradient">EVENTOS</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Tecnologia audiovisual para tornar seu evento inesquecível
          </p>
        </div>
        
        {/* Events Grid */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {eventServices.map((service, index) => (
            <div
              key={index}
              className={`event-card group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-5 hover:scale-[1.02] hover:border-[#55BBE0]/50 hover:shadow-glow-lg ${
                index % 2 === 0 ? 'md:mt-12' : ''
              }`}
            >
              {/* Header */}
              <div className="p-6 lg:p-8">
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#55BBE0] to-[#3A9BC0] rounded-xl flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <service.icon className="w-7 h-7 text-[#101D2F]" />
                  </div>
                  
                  {/* Title */}
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold font-montserrat text-white mb-2 group-hover:text-[#55BBE0] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Features */}
              <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, fIndex) => (
                    <span
                      key={fIndex}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70 hover:bg-[#55BBE0]/10 hover:border-[#55BBE0]/30 hover:text-[#55BBE0] transition-all duration-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#55BBE0] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Corner Glow */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#55BBE0]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 p-6 bg-white/[0.02] border border-white/10 rounded-xl">
            <div className="flex items-center gap-3">
              <Projector className="w-6 h-6 text-[#55BBE0]" />
              <span className="text-white/70 text-sm">Projeções Especiais</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex items-center gap-3">
              <Volume2 className="w-6 h-6 text-[#55BBE0]" />
              <span className="text-white/70 text-sm">Som Profissional</span>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-3">
              <Monitor className="w-6 h-6 text-[#55BBE0]" />
              <span className="text-white/70 text-sm">Painéis LED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
