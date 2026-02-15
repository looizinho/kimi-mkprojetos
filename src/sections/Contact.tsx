import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
  Send,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Phone,
    label: 'Telefone',
    value: '(21) 98871-5996',
    href: 'tel:+5511999999999',
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: 'Envie uma Mensagem',
    href: 'mailto:contato@mkprojetos.com.br',
  },
  {
    icon: MapPin,
    label: 'Endereço',
    value: 'Rio de Janeiro - Brasil',
    href: '#',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '(21) 98871-5996',
    href: 'https://wa.me/5511999999999',
  },
];

const subjects = [
  'Orçamento - CFTV',
  'Orçamento - Controle de Acesso',
  'Orçamento - Automação Industrial',
  'Orçamento - Eventos',
  'Suporte Técnico',
  'Outros',
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const titleTrigger = ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(titleRef.current?.querySelectorAll('.title-char') || [],
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.02, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(titleTrigger);
      
      // Contact info animation
      if (infoRef.current) {
        const items = infoRef.current.querySelectorAll('.contact-item');
        items.forEach((item, index) => {
          const itemTrigger = ScrollTrigger.create({
            trigger: item,
            start: 'top 90%',
            onEnter: () => {
              gsap.fromTo(item,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, delay: index * 0.1, ease: 'back.out(1.7)' }
              );
            },
            once: true,
          });
          triggersRef.current.push(itemTrigger);
        });
      }
      
      // Form animation
      if (formRef.current) {
        const fields = formRef.current.querySelectorAll('.form-field');
        const formTrigger = ScrollTrigger.create({
          trigger: formRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(fields,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'expo.out' }
            );
          },
          once: true,
        });
        triggersRef.current.push(formTrigger);
      }
      
    }, sectionRef);
    
    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!selectedSubject) {
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const message = String(formData.get('message') || '').trim();

    const mailSubject = `[Site] ${selectedSubject}`;
    const mailBody = [
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Telefone: ${phone || 'Não informado'}`,
      `Assunto: ${selectedSubject}`,
      '',
      'Mensagem:',
      message,
    ].join('\n');

    const mailtoLink = `mailto:contato@mkprojetos.com.br?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = mailtoLink;

    setIsSubmitting(false);
    setIsSubmitted(true);
    setSubmitAttempted(false);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };
  
  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#55BBE0]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#55BBE0]/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-montserrat mb-4">
            {'ENTRE EM CONTATO'.split('').map((char, i) => (
              <span key={i} className="title-char inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Solicite um orçamento ou tire suas dúvidas. Estamos prontos para atender você.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div ref={infoRef}>
            <h3 className="text-xl font-bold font-montserrat text-white mb-6">
              Informações de Contato
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="contact-item group flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#55BBE0]/30 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[#55BBE0]/10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-[#55BBE0]/20 group-hover:scale-110 animate-float-twice" style={{ animationDelay: `${index * 0.08}s` }}>
                    <item.icon className="w-5 h-5 text-[#55BBE0]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50 mb-1">{item.label}</p>
                    <p className="text-white font-medium group-hover:text-[#55BBE0] transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Map Placeholder */}
            <div className="mt-8 relative h-48 rounded-xl overflow-hidden bg-white/[0.02] border border-white/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-[#55BBE0] mx-auto mb-2" />
                  <p className="text-white/60 text-sm">Rio de Janeiro - Brasil</p>
                </div>
              </div>
              {/* Decorative Grid */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(#55BBE0 1px, transparent 1px), linear-gradient(90deg, #55BBE0 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }}
              />
            </div>
          </div>
          
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 lg:p-8"
          >
            <h3 className="text-xl font-bold font-montserrat text-white mb-6">
              Envie uma Mensagem
            </h3>
            
            <div className="space-y-4">
              <div className="form-field grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Nome</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Seu nome"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#55BBE0] focus:ring-[#55BBE0]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">E-mail</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="seu@email.com"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#55BBE0] focus:ring-[#55BBE0]/20"
                  />
                </div>
              </div>
              
              <div className="form-field grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Telefone</label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="(21) 98871-5996"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#55BBE0] focus:ring-[#55BBE0]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Assunto</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-[#55BBE0]/20">
                      <SelectValue placeholder="Selecione o assunto" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#101D2F] border-white/10">
                      {subjects.map((subject, index) => (
                        <SelectItem 
                          key={index} 
                          value={subject}
                          className="text-white hover:bg-[#55BBE0]/10 focus:bg-[#55BBE0]/10"
                        >
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!selectedSubject && submitAttempted && (
                    <p className="mt-2 text-xs text-white/40">Selecione um assunto para enviar.</p>
                  )}
                </div>
              </div>
              
              <div className="form-field">
                <label className="block text-sm text-white/60 mb-2">Mensagem</label>
                <Textarea
                  name="message"
                  placeholder="Descreva sua necessidade..."
                  required
                  rows={5}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#55BBE0] focus:ring-[#55BBE0]/20 resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`form-field w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : 'bg-[#55BBE0] text-[#101D2F] hover:shadow-glow hover:scale-[1.02]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Mensagem Enviada!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
