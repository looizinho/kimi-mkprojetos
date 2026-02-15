import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  {
    id: 1,
    title: 'Sistema CFTV Corporativo',
    category: 'Segurança Eletrônica',
    description: 'Instalação completa de sistema de CFTV com 32 câmeras IP de alta definição em empresa do setor financeiro.',
    details: 'Projeto incluiu instalação de câmeras IP 4K, NVR com capacidade de 64 canais, cabeamento estruturado CAT6 e sistema de monitoramento centralizado com acesso remoto.',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=600&fit=crop',
    size: 'large',
  },
  {
    id: 2,
    title: 'Automação Industrial',
    category: 'Engenharia Elétrica',
    description: 'Modernização completa do sistema de automação de fábrica de alimentos.',
    details: 'Implementação de CLPs Siemens S7-1500, sistemas SCADA Wonderware, inversores de frequência e integração com sistema ERP existente. Redução de 30% no tempo de parada.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1000&fit=crop',
    size: 'tall',
  },
  {
    id: 3,
    title: 'Evento Corporativo',
    category: 'Soluções para Eventos',
    description: 'Estrutura completa de áudio, vídeo e iluminação para convenção anual.',
    details: 'Fornecimento de painel LED P3 de 6x4m, sistema de som line array, iluminação moving head, sistema de credenciamento e projeção mapeada no palco principal.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    size: 'large',
  },
  {
    id: 4,
    title: 'Controle de Acesso Inteligente',
    category: 'Segurança Eletrônica',
    description: 'Sistema de controle de acesso com reconhecimento facial para condomínio residencial.',
    details: 'Instalação de 8 terminais de reconhecimento facial, integração com catracas, controle de visitantes via aplicativo e relatórios de acesso em tempo real.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop',
    size: 'large',
  },
  {
    id: 5,
    title: 'Central PABX IP',
    category: 'Telefonia',
    description: 'Migração de sistema analógico para PABX IP em empresa de telecomunicações.',
    details: 'Implantação de central PABX IP com 200 ramais, integração com CRM, softphones, URA inteligente e relatórios de chamadas detalhados.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
    size: 'large',
  },
  {
    id: 6,
    title: 'Assembleia Virtual',
    category: 'Soluções para Eventos',
    description: 'Sistema de votação eletrônica para assembleia de condomínio com 500 participantes.',
    details: 'Plataforma de votação híbrida com autenticação de participantes, votação em tempo real, apuração instantânea e certificados digitais.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
    size: 'large',
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const titleTrigger = ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(titleRef.current,
            { scale: 0.95, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(titleTrigger);
      
      // Grid items animation
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll('.portfolio-item');
        items.forEach((item, index) => {
          const itemTrigger = ScrollTrigger.create({
            trigger: item,
            start: 'top 85%',
            onEnter: () => {
              gsap.fromTo(item,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, delay: index * 0.1, ease: 'expo.out' }
              );
            },
            once: true,
          });
          triggersRef.current.push(itemTrigger);
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
      id="portfolio"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#101D2F] via-[#0D1A2A] to-[#101D2F]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-montserrat mb-4">
            <span className="text-white">NOSSO</span>{' '}
            <span className="text-gradient">PORTFÓLIO</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Conheça alguns dos nossos projetos entregues com excelência
          </p>
        </div>
        
        {/* Masonry Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className={`portfolio-item group relative overflow-hidden rounded-xl cursor-pointer ${
                item.size === 'tall' ? 'md:row-span-2' : ''
              }`}
              onClick={() => setSelectedProject(item)}
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${item.size === 'tall' ? 'h-full min-h-[500px]' : 'h-64'}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101D2F] via-[#101D2F]/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-[#55BBE0] text-xs font-medium uppercase tracking-wider mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold font-montserrat text-white mb-2 group-hover:text-[#55BBE0] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm line-clamp-2 group-hover:line-clamp-none transition-all">
                    {item.description}
                  </p>
                  
                  {/* View Project Button */}
                  <div className="mt-4 flex items-center gap-2 text-[#55BBE0] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-sm font-medium">Ver Projeto</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                
                {/* Border Glow */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#55BBE0]/50 rounded-xl transition-colors duration-500" />
              </div>
            </div>
          ))}
        </div>
        
        {/* View More */}
        <div className="mt-12 text-center">
          <button className="group inline-flex items-center gap-2 px-6 py-3 border border-[#55BBE0]/30 text-[#55BBE0] rounded-lg hover:bg-[#55BBE0]/10 hover:border-[#55BBE0] transition-all duration-300">
            <span className="font-medium">Ver Mais Projetos</span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
      
      {/* Project Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl bg-[#101D2F] border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-montserrat">
              {selectedProject?.title}
            </DialogTitle>
            <DialogDescription className="text-[#55BBE0]">
              {selectedProject?.category}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <img
              src={selectedProject?.image}
              alt={selectedProject?.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-white/80 leading-relaxed">
              {selectedProject?.details}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
