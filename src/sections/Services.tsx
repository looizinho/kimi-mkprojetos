import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Camera, 
  Fingerprint, 
  PhoneCall, 
  Server, 
  Network, 
  Shield, 
  Bell, 
  DoorOpen, 
  Code
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Camera,
    title: 'CFTV',
    subtitle: 'Circuito Fechado de TV',
    description: 'Câmeras IP, Wireless/WiFi e Analógicas. Monitoramento 24/7 com alta definição.',
  },
  {
    icon: Fingerprint,
    title: 'Controle de Acesso',
    subtitle: 'Segurança Avançada',
    description: 'Social, Garagem, Reconhecimento Facial, Impressão Digital, Tags, Cancelas e Catracas.',
  },
  {
    icon: PhoneCall,
    title: 'Interfonia',
    subtitle: 'Comunicação Inteligente',
    description: 'Sistemas GSM, IP, Analógico e Digital para residências e empresas.',
  },
  {
    icon: Server,
    title: 'Central PABX',
    subtitle: 'Telefonia Corporativa',
    description: 'Sistemas completos de telefonia empresarial com integração total.',
  },
  {
    icon: Network,
    title: 'Cabeamento Estruturado',
    subtitle: 'Infraestrutura de Rede',
    description: 'Organização e eficiência para sua rede de dados e comunicação.',
  },
  {
    icon: Shield,
    title: 'Servidores e Firewall',
    subtitle: 'Segurança de Rede',
    description: 'Gerenciamento de servidores e proteção contra ameaças cibernéticas.',
  },
  {
    icon: Bell,
    title: 'Alarmes e Cerca Elétrica',
    subtitle: 'Proteção Perimetral',
    description: 'Central de alarmes e sistemas de proteção perimetral inteligentes.',
  },
  {
    icon: DoorOpen,
    title: 'Automação de Portões',
    subtitle: 'Acesso Remoto',
    description: 'Controle inteligente de portões com acesso remoto e segurança.',
  },
  {
    icon: Code,
    title: 'Desenvolvimento de Software',
    subtitle: 'Soluções Personalizadas',
    description: 'Sistemas sob medida para atender às necessidades específicas do seu negócio.',
  },
];

export default function Services() {
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
          gsap.fromTo(titleRef.current?.querySelectorAll('.title-word') || [],
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(titleTrigger);
      
      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.service-card');
        cards.forEach((card, index) => {
          const cardTrigger = ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
              gsap.fromTo(card,
                { rotateY: 90, opacity: 0 },
                { rotateY: 0, opacity: 1, duration: 0.7, delay: index * 0.08, ease: 'expo.out' }
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
      id="services"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #55BBE0 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-montserrat mb-4">
            <span className="title-word inline-block text-white">NOSSOS</span>{' '}
            <span className="title-word inline-block text-gradient">SERVIÇOS</span>
          </h2>
          <p className="title-word text-lg text-white/60 max-w-2xl mx-auto">
            Soluções completas em tecnologia e automação para sua empresa ou residência
          </p>
        </div>
        
        {/* Services Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-500 hover:-translate-y-3 hover:border-[#55BBE0]/50 hover:shadow-glow preserve-3d"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-[#55BBE0]/20 to-[#55BBE0]/5 rounded-lg flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:from-[#55BBE0]/30 group-hover:to-[#55BBE0]/10">
                <service.icon className="w-7 h-7 text-[#55BBE0] transition-transform duration-300 group-hover:rotate-6" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold font-montserrat text-white mb-1">
                {service.title}
              </h3>
              <p className="text-sm text-[#55BBE0] mb-3">{service.subtitle}</p>
              <p className="text-white/60 text-sm leading-relaxed">
                {service.description}
              </p>
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#55BBE0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl">
                <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-[#55BBE0]/50 to-transparent transform translate-x-4 group-hover:translate-x-0 transition-transform duration-500" />
                <div className="absolute top-0 right-0 h-px w-8 bg-gradient-to-l from-[#55BBE0]/50 to-transparent transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
