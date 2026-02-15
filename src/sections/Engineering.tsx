import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ClipboardCheck, 
  Cpu, 
  Monitor, 
  Plug, 
  Settings2, 
  Wrench, 
  RefreshCw, 
  Cloud, 
  GraduationCap,
  Cog
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const engineeringServices = [
  {
    icon: ClipboardCheck,
    title: 'Consultoria e Projeto de Automação',
    description: 'Diagnóstico de processos, desenvolvimento de projetos elétricos e definição da arquitetura de automação.',
  },
  {
    icon: Cpu,
    title: 'Programação de CLP',
    description: 'Lógica de controle para máquinas e processos. Parametrização de CLPs Siemens, Schneider, Rockwell.',
  },
  {
    icon: Monitor,
    title: 'Sistemas Supervisórios SCADA',
    description: 'Interfaces de operação, monitoramento em tempo real, históricos, alarmes e relatórios.',
  },
  {
    icon: Plug,
    title: 'Integração de Sistemas',
    description: 'Comunicação industrial com protocolos Modbus, Profibus, Profinet, EtherNet/IP, OPC-UA.',
  },
  {
    icon: Settings2,
    title: 'Inversores de Frequência',
    description: 'Controle de motores, sistemas de bombeamento, ventilação e transporte com controle variável.',
  },
  {
    icon: Cog,
    title: 'Montagem de Painéis Elétricos',
    description: 'Painéis de comando e controle com conformidade NR-10 e NR-12.',
  },
  {
    icon: Wrench,
    title: 'Instalação e Comissionamento',
    description: 'Instalação de campo, testes de comunicação, lógica de controle e partida de sistemas.',
  },
  {
    icon: RefreshCw,
    title: 'Retrofit de Máquinas',
    description: 'Atualização tecnológica de sistemas antigos para melhoria de desempenho e segurança.',
  },
  {
    icon: Cloud,
    title: 'IIoT e Monitoramento Remoto',
    description: 'Sensores inteligentes, gateways e dashboards em nuvem para análise de dados em tempo real.',
  },
  {
    icon: Wrench,
    title: 'Manutenção e Suporte',
    description: 'Manutenção preventiva, corretiva, diagnóstico de falhas e otimização de processos.',
  },
  {
    icon: GraduationCap,
    title: 'Treinamentos',
    description: 'Capacitação técnica para operadores, manutenção e engenharia sobre sistemas implantados.',
  },
];

export default function Engineering() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const titleTrigger = ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(titleRef.current?.querySelectorAll('.title-word') || [],
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(titleTrigger);
      
      // List items animation
      if (listRef.current) {
        const items = listRef.current.querySelectorAll('.engineering-item');
        items.forEach((item, index) => {
          const itemTrigger = ScrollTrigger.create({
            trigger: item,
            start: 'top 90%',
            onEnter: () => {
              gsap.fromTo(item,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, delay: index * 0.06, ease: 'expo.out' }
              );
            },
            once: true,
          });
          triggersRef.current.push(itemTrigger);
        });
      }
      
      // Visual animation
      const visualTrigger = ScrollTrigger.create({
        trigger: visualRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(visualRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(visualTrigger);
      
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
      id="engineering"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Circuit Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0,10 L8,10 L10,8 L12,10 L20,10" fill="none" stroke="#55BBE0" strokeWidth="0.5"/>
            <path d="M10,0 L10,8" fill="none" stroke="#55BBE0" strokeWidth="0.5"/>
            <path d="M10,12 L10,20" fill="none" stroke="#55BBE0" strokeWidth="0.5"/>
            <circle cx="10" cy="10" r="1" fill="#55BBE0"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#101D2F] via-transparent to-[#101D2F]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-montserrat mb-4">
            <span className="title-word inline-block text-white">ENGENHARIA</span>{' '}
            <span className="title-word inline-block text-gradient">ELÉTRICA</span>
          </h2>
          <p className="title-word text-lg text-white/60 max-w-3xl mx-auto">
            Automação Industrial - Soluções completas para otimizar seus processos industriais
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Services List */}
          <div ref={listRef} className="space-y-4">
            {engineeringServices.map((service, index) => (
              <div
                key={index}
                className="engineering-item group flex items-start gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#55BBE0]/30 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-[#55BBE0]/10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-[#55BBE0]/20 group-hover:scale-110">
                  <service.icon className="w-5 h-5 text-[#55BBE0]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-white mb-1 group-hover:text-[#55BBE0] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Visual */}
          <div ref={visualRef} className="relative lg:sticky lg:top-32">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Central Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#55BBE0]/20 to-[#55BBE0]/5 border border-[#55BBE0]/30 flex items-center justify-center animate-pulse-glow">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#55BBE0]/30 to-[#55BBE0]/10 border border-[#55BBE0]/40 flex items-center justify-center">
                    <Settings2 className="w-16 h-16 text-[#55BBE0]" />
                  </div>
                </div>
              </div>
              
              {/* Orbiting Elements */}
              <div className="absolute inset-0 animate-spin-slow">
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <div
                    key={i}
                    className="absolute w-4 h-4"
                    style={{
                      top: `${50 + 40 * Math.sin((angle * Math.PI) / 180)}%`,
                      left: `${50 + 40 * Math.cos((angle * Math.PI) / 180)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="w-full h-full bg-[#55BBE0] rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  </div>
                ))}
              </div>
              
              {/* Outer Ring */}
              <div className="absolute inset-0 border-2 border-dashed border-[#55BBE0]/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
              
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                {[0, 45, 90, 135].map((angle, i) => (
                  <line
                    key={i}
                    x1="100"
                    y1="100"
                    x2={100 + 80 * Math.cos((angle * Math.PI) / 180)}
                    y2={100 + 80 * Math.sin((angle * Math.PI) / 180)}
                    stroke="#55BBE0"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    opacity="0.3"
                    className="animate-draw-line"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </svg>
              
              {/* Floating Icons */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#101D2F] border border-[#55BBE0]/30 rounded-lg flex items-center justify-center animate-float">
                <Cpu className="w-6 h-6 text-[#55BBE0]" />
              </div>
              <div className="absolute bottom-8 right-0 w-10 h-10 bg-[#101D2F] border border-[#55BBE0]/30 rounded-lg flex items-center justify-center animate-float animation-delay-300">
                <Monitor className="w-5 h-5 text-[#55BBE0]" />
              </div>
              <div className="absolute bottom-8 left-0 w-10 h-10 bg-[#101D2F] border border-[#55BBE0]/30 rounded-lg flex items-center justify-center animate-float animation-delay-600">
                <Cog className="w-5 h-5 text-[#55BBE0]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
