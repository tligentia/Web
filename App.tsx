import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  Cpu, 
  Database, 
  Video, 
  Scale, 
  BookOpen, 
  CheckCircle2, 
  Mail, 
  Linkedin,
  Globe,
  Zap,
  Target,
  Users,
  Search,
  PenTool,
  Clock,
  Terminal,
  Presentation,
  ChevronDown,
  Check,
  Laptop,
  FileText,
  MousePointer2,
  Building2,
  MessageSquare,
  Smartphone,
  GraduationCap,
  Briefcase,
  Layers,
  HeartPulse,
  BrainCircuit,
  Stethoscope,
  Microscope,
  ExternalLink,
  MapPin,
  Activity,
  Info,
  Tags
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
  PieChart, Pie
} from 'recharts';

// Importaciones de Plantilla
import { Shell } from './Plantilla/Shell';
import { crypto } from './Plantilla/Parameters';

type View = 'home' | 'bootcamp' | 'talleres' | 'minicamp';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [contactPrefill, setContactPrefill] = useState('');
  
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('app_apikey_v2') || '';
  });

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('app_apikey_v2', key);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const handleNavigate = (newView: View, section?: string) => {
    if (view !== newView) {
      setView(newView);
      if (section) {
        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (section) {
      const element = document.getElementById(section);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContactNavigation = (message: string) => {
    setContactPrefill(message);
    setView('home');
    setTimeout(() => {
      const element = document.getElementById('contacto');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="animate-in fade-in duration-700">
      <Shell apiKey={apiKey} onApiKeySave={saveApiKey} onNavigate={handleNavigate}>
        {view === 'home' && (
          <HomePage 
            setView={setView} 
            prefillMessage={contactPrefill} 
            clearPrefill={() => setContactPrefill('')} 
          />
        )}
        {view === 'bootcamp' && <BootcampPage onContactRequest={handleContactNavigation} setView={setView} />}
        {view === 'talleres' && <TalleresPage onContactRequest={handleContactNavigation} setView={setView} />}
        {view === 'minicamp' && <MiniCampPage onContactRequest={handleContactNavigation} setView={setView} />}
      </Shell>
    </div>
  );
}

const highlightIA = (text: string) => {
  return text.split(/(IA)/).map((part, i) => 
    part === 'IA' ? <span key={i} className="text-red-700">IA</span> : part
  );
};

// --- COMPONENTE PÁGINA PRINCIPAL ---
function HomePage({ 
  setView, 
  prefillMessage, 
  clearPrefill 
}: { 
  setView: (v: View) => void, 
  prefillMessage: string,
  clearPrefill: () => void 
}) {
  const [isAccepted, setIsAccepted] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const nombreInputRef = useRef<HTMLInputElement>(null);

  // Sincronizar el mensaje de pre-relleno cuando cambie y dar foco al nombre
  useEffect(() => {
    if (prefillMessage) {
      setMensaje(prefillMessage);
      // Timeout para asegurar que la navegación y el scroll se han iniciado
      const timer = setTimeout(() => {
        nombreInputRef.current?.focus();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [prefillMessage]);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('nombre');
    const organizacion = formData.get('organizacion');
    const email = formData.get('email');
    const telefono = formData.get('telefono');
    const msg = formData.get('mensaje');

    const subject = encodeURIComponent(`Consulta desde Tligent.com: ${nombre}`);
    const body = encodeURIComponent(
      `Nombre: ${nombre}\n` +
      `Organización: ${organizacion}\n` +
      `Email: ${email}\n` +
      `Teléfono: ${telefono}\n\n` +
      `Mensaje:\n${msg}`
    );

    window.location.href = `mailto:info@tligent.com?subject=${subject}&body=${body}`;
    clearPrefill();
  };

  const jumpToContact = (topic: string) => {
    setMensaje(`Hola, me interesa obtener información sobre la funcionalidad de ${topic} de ViTAG.`);
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      nombreInputRef.current?.focus();
    }, 800);
  };

  return (
    <div className="animate-in fade-in duration-700 w-full space-y-24">
      {/* HERO SECTION */}
      <section id="inicio" className="w-full pt-8 pb-6 md:pt-10 md:pb-8 border-b border-gray-100">
        <div className="grid md:grid-cols-10 gap-10 items-center">
          <div className="md:col-span-6 space-y-6">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-none">
              Tecnología e {highlightIA("IA")} 
              <span className="block text-red-700 text-3xl md:text-5xl mt-2 font-bold tracking-tight">con garantías legales</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl leading-relaxed font-medium">
              Acompañamos a tu organización en la transformación digital: 
              desarrollo de soluciones, vídeo inteligente, {highlightIA("IA")} en la nube y en local, 
              siempre alineados con LOPD, RGPD y el nuevo AI-Act.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-red-700 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.25em] hover:bg-red-800 transition-all shadow-[0_20px_40px_-12px_rgba(185,28,28,0.4)] flex items-center gap-4 active:scale-95 group"
              >
                HABLEMOS DE TU PROYECTO 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="md:col-span-4 relative">
            <div className="flex flex-col gap-4">
              <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Áreas Clave</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold text-gray-900 shadow-sm">{highlightIA("IA")} Aplicada</span>
                  <span className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold text-gray-900 shadow-sm">Tecnología & Desarrollo</span>
                  <span className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold text-gray-900 shadow-sm">Ciberseguridad</span>
                  <span className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold text-gray-900 shadow-sm">LegalTech & Compliance</span>
                </div>
              </div>

              <div 
                onClick={() => setView('bootcamp')}
                className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg flex items-center gap-6 group hover:border-red-100 transition-all cursor-pointer hover:shadow-xl active:scale-95"
              >
                <div className="w-16 h-16 bg-red-50 text-red-700 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-700 group-hover:text-white transition-all">
                  <BookOpen size={32} />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase mb-1 tracking-tight">BootCamp {highlightIA("IA")}</h4>
                  <p className="text-base text-gray-500 leading-relaxed font-medium">Programas de alta intensidad con enfoque 100% práctico para dominar la {highlightIA("IA")}.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ HACEMOS */}
      <section id="servicios" className="w-full">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase mb-2">Qué Hacemos</h2>
          <p className="text-base text-gray-500 max-w-2xl font-medium">Integramos tecnología, {highlightIA("IA")} y ciberseguridad con visión legal para una base sólida y segura.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "IA aplicada al negocio",
              desc: "Estrategia y despliegue de IA (cloud y local) con foco en productividad.",
              items: ["BootCamps IA", "Consultoría estratégica", "Modelos On-Premise"],
              icon: <CheckCircle2 className="text-red-700" size={24} />
            },
            {
              title: "Tecnología y Desarrollo",
              desc: "Diseño y gestión de aplicaciones, integraciones y plataformas orientadas a negocio.",
              items: ["Apps a medida", "Automatización", "Analítica de datos"],
              icon: <Cpu className="text-red-700" size={24} />
            },
            {
              title: "Ciberseguridad y Peritaje",
              desc: "Protección y evidencias digitales con enfoque pericial y validez legal.",
              items: ["Auditoría técnica", "Políticas de seguridad", "Peritaje informático"],
              icon: <ShieldCheck className="text-red-700" size={24} />
            },
            {
              title: "LegalTech & Compliance",
              desc: "Gobernanza y adecuación normativa para soluciones de IA y datos sensibles.",
              items: ["Cumplimiento AI-Act", "Privacidad por diseño", "Gobernanza del Dato"],
              icon: <Scale className="text-red-700" size={24} />
            }
          ].map((s, i) => (
            <article key={i} className="bg-white border border-gray-100 p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group border-b-4 border-b-transparent hover:border-b-red-700">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-700 group-hover:text-white transition-colors">
                {s.icon}
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-tighter leading-tight">{highlightIA(s.title)}</h3>
              <p className="text-base text-gray-500 mb-6 font-medium leading-relaxed">{highlightIA(s.desc)}</p>
              <ul className="space-y-3">
                {s.items.map((item, j) => (
                  <li key={j} className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-700 rounded-full"></span> {highlightIA(item)}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* PROGRAMAS IA AMPLIADO */}
      <section id="ia" className="w-full">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase mb-2">Programas {highlightIA("IA")}</h2>
            <p className="text-base text-gray-500 max-w-2xl font-medium">Desde formación intensiva hasta despliegues on-premise de alta privacidad.</p>
          </div>
          <a 
            href="https://guia.tligent.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border-2 border-red-700 text-red-700 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 hover:text-white transition-all shadow-sm active:scale-95 group"
          >
            Explorar GuIA <ExternalLink size={16} className="group-hover:rotate-12 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "BootCamp IA",
              tag: "Formación intensiva",
              desc: "Domina herramientas de IA generativa con enfoque ético y legal en sesiones prácticas.",
              icon: <BookOpen className="text-red-700" />,
              action: () => setView('bootcamp')
            },
            {
              title: "Talleres IA",
              tag: "Intensivos 1 jornada",
              desc: "Cápsulas formativas de alto impacto para resolver necesidades concretas en un solo día.",
              icon: <Zap className="text-red-700" />,
              action: () => setView('talleres')
            },
            {
              title: "MiniCamp IA",
              tag: "Sesiones divulgativas",
              desc: "Encuentros para entender el impacto de la IA y democratizar el conocimiento tecnológico.",
              icon: <Presentation className="text-red-700" />,
              action: () => setView('minicamp')
            },
            {
              title: "Consultoría de Implantación",
              tag: "Hoja de ruta",
              desc: "Te guiamos en el proceso de integrar soluciones de IA en tu negocio. Desde la estrategia inicial hasta la implementación y optimización, asegurando un retorno de inversión claro y medible.",
              icon: <Target className="text-red-700" />,
              action: () => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
            },
            {
              title: "IA en Local (On-Premise)",
              tag: "Privacidad Total",
              desc: "Implementa modelos de IA directamente en tu infraestructura. Maximiza la seguridad, privacidad y control de tus datos sensibles, garantizando un rendimiento óptimo sin depender de servicios en la nube.",
              icon: <Database className="text-red-700" />,
              action: () => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
            },
            {
              title: "Cumplimiento Legal en IA",
              tag: "Cumplimiento Normativo",
              desc: "Navega con seguridad el complejo panorama normativo. Asesoramiento experto para garantizar el cumplimiento con AI-Act, estándares ISO y normativas sectoriales.",
              icon: <Scale className="text-red-700" />,
              action: () => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
            }
          ].map((p, i) => (
            <div 
              key={i} 
              onClick={p.action}
              className="flex gap-6 p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-xl transition-all group cursor-pointer active:scale-95"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-red-700 group-hover:text-white transition-all">
                {React.cloneElement(p.icon as React.ReactElement<{ size?: number }>, { size: 28 })}
              </div>
              <div>
                <span className="text-[10px] font-black text-red-700 uppercase tracking-widest mb-1 block">{p.tag}</span>
                <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-2 leading-tight">{highlightIA(p.title)}</h4>
                <p className="text-base text-gray-500 font-medium leading-relaxed">{highlightIA(p.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VITAG SECTION REDISEÑADA CON LA NUEVA INFO ESTRUCTURADA */}
      <section id="vitag" className="w-full bg-white border border-gray-100 rounded-[3rem] p-10 md:p-16 text-gray-900 overflow-hidden relative shadow-sm">
        <div className="absolute top-0 right-0 p-12 text-gray-50 -z-0">
          <Video size={200} />
        </div>
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-red-700 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">ViTAG</span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Fácil de usar, sin instalación</span>
            </div>
            <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">Crea, Clasifica, Comparte</h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              La plataforma táctica para el análisis de vídeo. Sin complicaciones técnicas, centrada en tu contenido y en el trabajo en equipo.
            </p>
            <div className="space-y-6">
               {[
                 { 
                   n: "1",
                   t: "Clasifica tus videos", 
                   d: "Utiliza cualquier video de tu ordenador, soporte externo (USB, memorias, discos) o red. Compatible con Youtube y pronto más redes sociales." 
                 },
                 { 
                   n: "2",
                   t: "Etiqueta tus momentos", 
                   d: "Define tus propios criterios para marcar momentos clave. Agrupa marcas en botoneras personalizadas con los colores y símbolos que elijas." 
                 },
                 { 
                   n: "3",
                   t: "Comparte y trabaja en equipo", 
                   d: "Comparte vídeos y marcadores con amigos o alumnos fácilmente. Crea grupos personalizados para colaborar y analizar contenido en equipo." 
                 }
               ].map((item, i) => (
                 <div key={i} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-red-700 font-black text-lg group-hover:bg-red-700 group-hover:text-white transition-all border border-gray-100 flex-shrink-0 mt-0.5">
                      {item.n}
                    </div>
                    <div>
                      <p className="text-base font-black text-gray-900 leading-tight mb-1 uppercase tracking-tight">{item.t}</p>
                      <p className="text-sm text-gray-500 font-medium leading-snug">{item.d}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Videoteca", icon: <Database size={32} /> },
                { label: "Catalogación", icon: <Tags size={32} /> },
                { label: "Análisis", icon: <Activity size={32} /> },
                { label: "Colaboración", icon: <Users size={32} /> }
              ].map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => jumpToContact(item.label)}
                  className="aspect-square bg-gray-50 rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-center p-4 space-y-3 hover:border-red-200 transition-colors shadow-inner group active:scale-95"
                >
                    <div className="text-red-700 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.label}</p>
                </button>
              ))}
            </div>
            <a 
              href="https://vitag.es/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-red-700 text-white p-8 rounded-[2.5rem] flex items-center justify-between group hover:bg-gray-900 transition-all shadow-xl shadow-red-50/50 active:scale-[0.98]"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all">
                  <Globe size={24} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mb-0.5">Comienza ahora</p>
                  <p className="text-base font-black uppercase tracking-tighter">DATE DE ALTA GRATIS</p>
                </div>
              </div>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* SECTORES A LOS QUE NOS DIRIGIMOS */}
      <section id="sectores" className="w-full">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase mb-2">Sectores a los que nos dirigimos</h2>
          <p className="text-base text-gray-500 max-w-2xl font-medium">Soluciones tácticas adaptadas a las necesidades específicas de cada ámbito profesional.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Empresas y Pymes",
              desc: "Transformación digital, automatización de procesos y optimización de costes con IA táctica.",
              icon: <Briefcase size={28} />
            },
            {
              title: "Despachos y Profesionales",
              desc: "Eficiencia operativa para abogados y gestores. Tratamiento masivo de documentación legal con IA.",
              icon: <Scale size={28} />
            },
            {
              title: "Sector Educativo",
              desc: "Formación a docentes y alumnos en el uso ético de la IA, integrando herramientas seguras en el aula.",
              icon: <GraduationCap size={28} />
            },
            {
              title: "Administraciones Públicas",
              desc: "Modernización de la administración, atención al ciudadano y cumplimiento estricto del AI-Act.",
              icon: <Globe size={28} />
            }
          ].map((s, i) => (
            <div key={i} className="bg-gray-50/50 border border-gray-100 p-8 rounded-[2.5rem] hover:bg-white hover:shadow-xl transition-all group border-b-4 border-b-transparent hover:border-b-red-700">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-red-700 group-hover:bg-red-700 group-hover:text-white transition-all shadow-sm">
                {s.icon}
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tighter leading-tight">{s.title}</h3>
              <p className="text-base text-gray-500 font-medium leading-relaxed">{highlightIA(s.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE TLIGENT */}
      <section id="sobre-tligent" className="w-full scroll-mt-24">
        <div className="mb-12">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase mb-4">Sobre Tligent</h2>
          <div className="max-w-4xl space-y-6">
            <p className="text-xl text-gray-900 font-bold leading-relaxed tracking-tight">
              Tligent nace con la vocación de ser un socio tecnológico de confianza para organizaciones que quieren aprovechar la tecnología y la {highlightIA("IA")} sin descuidar la seguridad ni el cumplimiento legal.
            </p>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              Combinamos experiencia en desarrollo de software, ciberseguridad, peritaje informático e implantación de {highlightIA("IA")}, con una mirada clara hacia la normativa europea y las mejores prácticas de protección de datos.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 border border-gray-100 p-10 rounded-[3rem] space-y-4 hover:bg-white hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-700 shadow-sm group-hover:bg-red-700 group-hover:text-white transition-all">
              <MapPin size={28} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Dónde estamos</h3>
            <p className="text-base text-gray-500 font-medium leading-relaxed">
              Operamos principalmente en España, trabajando con clientes empresariales, despachos, centros educativos y organizaciones que apuestan por la innovación.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-100 p-10 rounded-[3rem] space-y-4 hover:bg-white hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-700 shadow-sm group-hover:bg-red-700 group-hover:text-white transition-all">
              <Activity size={28} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Cómo trabajamos</h3>
            <p className="text-base text-gray-500 font-medium leading-relaxed">
              Partimos de una fase de diagnóstico, definimos objetivos realistas y construimos un plan de acción, priorizando quick wins y una adopción gradual de la tecnología.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTO ACTUALIZADO */}
      <section id="contacto" className="w-full py-12 pb-24 scroll-mt-32 border-t border-gray-100">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">Contacto:</h2>
              <p className="text-xl text-red-700 font-bold mt-2 uppercase tracking-tight italic">Estamos a tu disposición</p>
            </div>
            <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-md">
              Cuéntanos tu situación y qué te gustaría conseguir. <br/>
              Nuestro equipo analizará tu consulta para ofrecerte la solución táctica más adecuada.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-5 group cursor-pointer">
                <div className="w-14 h-14 bg-red-50 text-red-700 rounded-2xl flex items-center justify-center group-hover:bg-red-700 group-hover:text-white transition-all shadow-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Email Corporativo</p>
                  <a href="mailto:info@tligent.com" className="text-lg text-gray-900 font-black hover:text-red-700 transition-colors">info@tligent.com</a>
                </div>
              </div>
              <div className="flex items-center gap-5 group cursor-pointer">
                <div className="w-14 h-14 bg-red-50 text-red-700 rounded-2xl flex items-center justify-center group-hover:bg-red-700 group-hover:text-white transition-all shadow-sm">
                  <Linkedin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Conecta con nosotros</p>
                  <a href="https://linkedin.com/company/tligent" target="_blank" className="text-lg text-gray-900 font-black hover:text-red-700 transition-colors">linkedin.com/company/tligent</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-10 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
            <form 
              onSubmit={handleContactSubmit}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Users size={12} /> Nombre completo
                  </label>
                  <input 
                    name="nombre" 
                    type="text" 
                    required 
                    ref={nombreInputRef}
                    className="w-full bg-white border border-gray-200 p-4 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-red-700 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Building2 size={12} /> Organización
                  </label>
                  <input name="organizacion" type="text" className="w-full bg-white border border-gray-200 p-4 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-red-700 transition-all" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Mail size={12} /> Correo electrónico
                  </label>
                  <input name="email" type="email" required className="w-full bg-white border border-gray-200 p-4 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-red-700 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Smartphone size={12} /> Teléfono / WhatsApp
                  </label>
                  <input name="telefono" type="tel" className="w-full bg-white border border-gray-200 p-4 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-red-700 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <MessageSquare size={12} /> ¿En qué podemos ayudarte?
                </label>
                <textarea 
                  name="mensaje" 
                  required 
                  rows={4} 
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  className="w-full bg-white border border-gray-200 p-4 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-red-700 transition-all resize-none shadow-inner" 
                />
              </div>

              <div className="flex items-start gap-3 pl-1">
                 <input 
                   type="checkbox" 
                   required 
                   id="privacy" 
                   checked={isAccepted}
                   onChange={(e) => setIsAccepted(e.target.checked)}
                   className="mt-1 accent-red-700" 
                 />
                 <label htmlFor="privacy" className="text-[10px] text-gray-400 font-medium leading-tight">
                    He leído y acepto la <span className="text-red-700 font-bold cursor-pointer hover:underline">política de privacidad</span> y el tratamiento de mis datos personales para fines de contacto comercial.
                 </label>
              </div>

              <button 
                type="submit" 
                disabled={!isAccepted}
                className="w-full bg-red-700 text-white py-5 rounded-xl font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-red-100 hover:bg-red-800 transition-all active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                ENVIAR CONSULTA <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- COMPONENTE PÁGINA TALLERES IA ---
function TalleresPage({ setView, onContactRequest }: { setView: (v: View) => void, onContactRequest: (m: string) => void }) {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [emailsPerWeek, setEmailsPerWeek] = useState(20);
  const [docsPerMonth, setDocsPerMonth] = useState(10);
  const [checks, setChecks] = useState({ chk1: false, chk2: false, chk3: false, chk4: false });

  const agenda = [
    { id: 1, time: "09:00 - 09:30", title: "Intro y Configuración", desc: "Nivelación de conocimientos, setup de herramientas y mentalidad 'AI-First' para delegar sin perder calidad.", obj: "Entorno de trabajo seguro.", prac: "Privacidad y opt-out.", tools: ["ChatGPT Plus", "Gemini", "Perplexity"], cat: "Fundamentos" },
    { id: 2, time: "09:30 - 11:00", title: "Módulo 1: Contenido y Marca", desc: "Sprint de creación. Generación de planes de contenido masivos y assets visuales coherentes.", obj: "Plan de 30 días en 20 min.", prac: "Imágenes corporativas.", tools: ["DALL-E 3", "Copilot", "Canva IA"], cat: "Marketing" },
    { id: 3, time: "11:00 - 11:30", title: "Pausa Café", desc: "Networking táctico entre asistentes.", obj: "Descanso.", prac: "N/A", tools: [], cat: "Break" },
    { id: 4, time: "11:30 - 12:45", title: "Módulo 2: Empleado Admin Digital", desc: "Uso de IA para tareas administrativas pesadas: análisis de contratos, facturas y redacción delicada.", obj: "Análisis documental veloz.", prac: "Análisis de PDFs reales.", tools: ["Gemini 1.5 Pro", "Data Analysis"], cat: "Operaciones" },
    { id: 5, time: "12:45 - 13:30", title: "Módulo 3: IA Cognitiva y Agéntica", desc: "De la automatización ciega a la IA que razona. Agentes que planifican y ejecutan tareas complejas.", obj: "Agentes autónomos básicos.", prac: "Flujo agéntico de investigación.", tools: ["Agentes GPT", "Copilot Studio"], cat: "Cognitiva" },
    { id: 6, time: "13:30 - 14:00", title: "Módulo 4: Compliance Táctico", desc: "Módulo CRÍTICO. Cómo usar IA sin violar RGPD, propiedad intelectual o secretos comerciales.", obj: "Seguridad jurídica total.", prac: "Anonimización de datos (PII).", tools: ["Protocolos de Seguridad"], cat: "Legal" },
    { id: 7, time: "14:00 - 15:30", title: "Comida", desc: "Recarga de energía y networking.", obj: "Networking.", prac: "N/A", tools: [], cat: "Break" },
    { id: 8, time: "15:30 - 17:00", title: "Módulo 5: Asistentes Personalizados", desc: "La Joya de la Corona. Crear un 'Clon Digital' entrenado con los datos de tu empresa.", obj: "GPT experto en tu negocio.", prac: "Entrenamiento con PDFs propios.", tools: ["Custom GPTs", "Knowledge"], cat: "Avanzado" },
    { id: 9, time: "17:00 - 17:30", title: "Cierre y Ciberseguridad", desc: "Hoja de ruta para el lunes siguiente y briefing final sobre riesgos (Phishing con IA, Deepfakes).", obj: "Plan de acción seguro.", prac: "Hoja de ruta personalizada.", tools: ["Plan de Acción"], cat: "Estrategia" }
  ];

  const radarData = [
    { subject: 'Marketing', A: 92, fullMark: 100 },
    { subject: 'Productividad', A: 98, fullMark: 100 },
    { subject: 'Legal', A: 100, fullMark: 100 },
    { subject: 'Datos', A: 88, fullMark: 100 },
    { subject: 'Estrategia', A: 95, fullMark: 100 },
  ];

  const roiMetrics = useMemo(() => {
    const totalManual = Math.round(((emailsPerWeek * 5 * 48) / 60) + ((docsPerMonth * 30 * 12) / 60));
    const totalAI = Math.round(((emailsPerWeek * 1 * 48) / 60) + ((docsPerMonth * 2 * 12) / 60));
    return {
      manual: totalManual,
      ai: totalAI,
      saved: totalManual - totalAI,
      days: ((totalManual - totalAI) / 8).toFixed(1)
    };
  }, [emailsPerWeek, docsPerMonth]);

  const barData = [
    { name: 'Sin IA', hours: roiMetrics.manual },
    { name: 'Con IA Táctica', hours: roiMetrics.ai },
  ];

  const securityPercentage = Math.round((Object.values(checks).filter(Boolean).length / 4) * 100);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-5xl mx-auto py-12 px-4 md:px-0 space-y-20">
      {/* BOTÓN VOLVER */}
      <button onClick={() => setView('home')} className="flex items-center gap-3 text-gray-400 hover:text-red-700 font-black text-[10px] uppercase tracking-[0.3em] mb-10 group">
        <ArrowLeft size={16} /> Volver al inicio
      </button>

      {/* HEADER ALINEADO A LA IZQUIERDA */}
      <section className="text-left space-y-6">
        <div className="flex items-center gap-4 text-red-700">
          <Zap size={24} fill="currentColor" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">7 Horas · Alta Intensidad</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">
          Taller {highlightIA("IA")} <br/>
          <span className="text-red-700 italic underline decoration-gray-900 decoration-4">Express</span>
        </h1>
        <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-3xl">
          Implementación inmediata y seguridad jurídica. Descubre el cronograma diseñado para transformar tu productividad blindando tu operativa legal.
        </p>
      </section>

      {/* CRONOGRAMA ACORDEÓN */}
      <section className="bg-white border border-gray-100 rounded-[3rem] shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Cronograma de la Jornada</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Pulsa para expandir cada módulo</p>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {agenda.map((m) => (
            <div key={m.id} className="group">
              <button 
                onClick={() => setActiveModule(activeModule === m.id ? null : m.id)}
                className={`w-full p-6 text-left transition-all flex items-center justify-between hover:bg-gray-50 ${activeModule === m.id ? 'bg-red-50/30' : ''}`}
              >
                <div className="flex items-center gap-6">
                  <span className={`text-[11px] font-black font-mono px-3 py-1 rounded-lg border shadow-sm ${m.cat === 'Break' ? 'bg-white text-gray-400 border-gray-100' : 'bg-white text-red-700 border-red-100'}`}>
                    {m.time}
                  </span>
                  <div>
                    <h4 className="text-lg font-black text-gray-900 uppercase tracking-tighter">{m.title}</h4>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">{m.cat}</span>
                  </div>
                </div>
                <ChevronDown className={`text-gray-300 transition-transform ${activeModule === m.id ? 'rotate-180 text-red-700' : ''}`} />
              </button>
              {activeModule === m.id && (
                <div className="p-8 bg-white border-l-4 border-red-700 animate-in slide-in-from-top-2">
                  <p className="text-base text-gray-600 mb-6 font-medium leading-relaxed">{m.desc}</p>
                  {m.cat !== 'Break' && (
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <Target className="text-red-700 mb-2" size={18} />
                        <h5 className="text-[10px] font-black uppercase text-gray-400 mb-1">Objetivo</h5>
                        <p className="text-xs font-bold text-gray-900">{m.obj}</p>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <MousePointer2 className="text-red-700 mb-2" size={18} />
                        <h5 className="text-[10px] font-black uppercase text-gray-400 mb-1">Práctica</h5>
                        <p className="text-xs font-bold text-gray-900">{m.prac}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {m.tools.map((t, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-900 text-[10px] font-black px-3 py-1.5 rounded-lg border border-gray-200 uppercase">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CHARTS SECTION */}
      <section className="grid md:grid-cols-2 gap-8">
        {/* Radar Skills */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center">
          <div className="w-full mb-10">
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Competencias Adquiridas</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Equilibrio técnica-legal</p>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#f3f4f6" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 'bold' }} />
                <Radar
                  name="Nivel"
                  dataKey="A"
                  stroke="#b91c1c"
                  fill="#b91c1c"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ROI Simulator */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
          <div>
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Simulador de Ahorro</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Impacto anual estimado</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Emails / Sem</label>
              <input 
                type="number" 
                value={emailsPerWeek} 
                onChange={(e) => setEmailsPerWeek(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Docs / Mes</label>
              <input 
                type="number" 
                value={docsPerMonth} 
                onChange={(e) => setDocsPerMonth(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
              />
            </div>
          </div>

          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={barData} margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="hours" radius={[0, 4, 4, 0]} barSize={30}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#4b5563' : '#b91c1c'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-center space-y-1">
            <span className="text-[10px] font-black text-red-700 uppercase tracking-[0.2em]">Tiempo Ahorrado Estimado</span>
            <div className="text-4xl font-black text-gray-900">{roiMetrics.saved} h/año</div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">≈ {roiMetrics.days} jornadas laborales ganadas</p>
          </div>
        </div>
      </section>

      {/* COMPLIANCE CHECKLIST REDISEÑADO A BLANCO */}
      <section className="bg-white border border-gray-100 rounded-[4rem] p-10 md:p-16 text-gray-900 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 p-12 text-gray-50 rotate-12 -z-0">
          <ShieldCheck size={180} />
        </div>
        <div className="relative z-10 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4 space-y-6">
            <span className="bg-red-700 text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest">Crítico</span>
            <h2 className="text-4xl font-black uppercase tracking-tighter leading-tight text-gray-900">Compliance</h2>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">¿Sabrías responder "SÍ" a estos puntos? El taller te enseñará a lograrlo.</p>
            
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 space-y-3 shadow-inner">
              <div className="flex items-end justify-between">
                <div className="text-5xl font-black text-gray-900">{securityPercentage}%</div>
                <div className="text-[9px] font-black uppercase tracking-widest text-gray-400">Puntuación</div>
              </div>
              <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-700 ${securityPercentage === 100 ? 'bg-green-500' : 'bg-red-700'}`} 
                  style={{ width: `${securityPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-8 grid sm:grid-cols-2 gap-4">
            {[
              { id: 'chk1', title: "Anonimización PII", desc: "Sé limpiar datos personales antes de usarlos en un chat." },
              { id: 'chk2', title: "Opt-out de Entrenamiento", desc: "He configurado la IA para que no aprenda de mis datos." },
              { id: 'chk3', title: "Propiedad Intelectual", desc: "Conozco los riesgos de copyright de las imágenes IA." },
              { id: 'chk4', title: "Política Interna", desc: "Mis empleados tienen guías claras de uso permitido." }
            ].map((c) => (
              <button 
                key={c.id} 
                onClick={() => setChecks({...checks, [c.id as keyof typeof checks]: !checks[c.id as keyof typeof checks]})}
                className="flex items-start gap-5 p-6 rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-xl hover:border-red-100 transition-all text-left group shadow-sm"
              >
                <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${checks[c.id as keyof typeof checks] ? 'bg-red-700 border-red-700 text-white' : 'bg-white border-gray-200 text-transparent'}`}>
                  <Check size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-tight mb-1 group-hover:text-red-700 transition-colors text-gray-900">{c.title}</h4>
                  <p className="text-base text-gray-500 font-medium leading-relaxed">{c.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="bg-gray-50 border border-gray-100 rounded-[3rem] p-10 md:p-16">
        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-10 flex items-center gap-4">
          <div className="w-10 h-10 bg-red-700 text-white rounded-xl flex items-center justify-center"><Laptop size={20} /></div>
          Requisitos Obligatorios
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Cpu />, title: "1. Hardware", desc: "Portátil obligatorio. El taller es 100% práctico. No tablets ni móviles." },
            { icon: <Globe />, title: "2. Software", desc: "Cuenta activa de ChatGPT Plus o Copilot Pro recomendada para el máximo provecho." },
            { icon: <FileText />, title: "3. Datos", desc: "Archivos PDF reales de su empresa (catálogos, normativas) para los ejercicios." }
          ].map((r, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-4">
              <div className="text-red-700">{React.cloneElement(r.icon, { size: 24 })}</div>
              <h5 className="font-black text-gray-900 uppercase tracking-tight">{r.title}</h5>
              <p className="text-base text-gray-500 font-medium leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final de página talleres */}
      <section className="bg-red-700 rounded-[3rem] p-12 text-center text-white space-y-6 shadow-2xl shadow-red-100">
        <h3 className="text-3xl font-black uppercase tracking-tighter">¿Listo para transformar tu organización?</h3>
        <p className="text-red-100 max-w-xl mx-auto font-medium">Ofrecemos modalidades de precio cerrado o planes personalizados adaptados a las necesidades de tu Pyme.</p>
        <button 
          onClick={() => onContactRequest("Hola, me gustaría solicitar más información sobre el Taller IA Express para mi organización.")}
          className="bg-white text-red-700 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.25em] hover:bg-gray-900 hover:text-white transition-all shadow-xl inline-flex items-center gap-4 active:scale-95 group"
        >
          SOLICITAR INFORMACIÓN 
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </section>
    </div>
  );
}

// --- COMPONENTE PÁGINA BOOTCAMP IA ---
function BootcampPage({ setView, onContactRequest }: { setView: (v: View) => void, onContactRequest: (m: string) => void }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-5xl mx-auto py-12 px-4 md:px-0">
      {/* BOTÓN VOLVER */}
      <button 
        onClick={() => setView('home')}
        className="flex items-center gap-3 text-gray-400 hover:text-red-700 font-black text-[10px] uppercase tracking-[0.3em] mb-10 transition-colors group"
      >
        <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-red-50 group-hover:border-red-100 transition-all">
          <ArrowLeft size={16} />
        </div>
        Volver al inicio
      </button>

      {/* HEADER PROGRAMA */}
      <header className="mb-20 space-y-6">
        <div className="flex items-center gap-4 text-red-700">
          <Zap size={24} fill="currentColor" />
          <span className="text-[10px] font-black uppercase tracking-0.4em">Programa Formativo Oficial</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">
          BootCamp <span className="text-red-700">IA</span>
        </h1>
        <p className="text-2xl text-gray-900 font-black tracking-tight mt-2 italic">
          Inteligencia Artificial Aplicada
        </p>
        <div className="grid md:grid-cols-2 gap-12 pt-10">
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            Este programa está diseñado para proporcionar una comprensión profunda y una metodología práctica sobre la aplicación de la {highlightIA("IA")} en el entorno profesional actual.
          </p>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <Target className="text-red-700 mb-2" size={20} />
                <p className="text-[10px] font-black uppercase text-gray-400">Enfoque</p>
                <p className="text-sm font-bold text-gray-900">100% Práctico</p>
             </div>
             <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <Users className="text-red-700 mb-2" size={20} />
                <p className="text-[10px] font-black uppercase text-gray-400">Dirigido a</p>
                <p className="text-sm font-bold text-gray-900">Profesionales</p>
             </div>
          </div>
        </div>
      </header>

      {/* ESTRUCTURA DE SESIONES */}
      <section className="mb-24">
        <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-0.3em mb-12 flex items-center gap-4">
          <span className="w-12 h-px bg-gray-200"></span> Estructura y Contenido de las Sesiones
        </h2>
        
        <div className="space-y-8">
          {[
            {
              num: "01",
              title: "Fundamentos de IA y Gestión de Proyectos Digitales",
              items: ["Introducción a Modelos de Lenguaje (LLMs): ChatGPT, Copilot, Notebook LM, Perplexity.", "Funcionamiento de contexto y tokens.", "Marco Normativo y Ético: AI Act, GDPR y principios de confidencialidad."]
            },
            {
              num: "02",
              title: "Análisis Comparativo y Proyectos con IA",
              items: ["Estudio Comparativo: Gemini, DeepSeek y modelos emergentes.", "Investigación Documental con Notebook LM.", "IA Especializada en Datos con Claude.", "Creación de GPTs y Gems personalizados."]
            },
            {
              num: "03",
              title: "IA Multimodal y Operativa en Local",
              items: ["IA Creativa: Generación y edición de audio con Riffusion.", "Optimización de Reuniones: TLDV, Tactic, Turboscribe.", "IA en Local: Whisper, LM Studio y Pinokio para privacidad total."]
            },
            {
              num: "04",
              title: "IA en Marketing y Automatización",
              items: ["Automatización Inteligente: Make, Zapier y N8N.", "Análisis Estratégico de Mercado con IA.", "Generación de Contenido Digital (Publicidad e infografías).", "IA Aplicada a SEO e investigación de keywords."]
            },
            {
              num: "05",
              title: "Integración de Conocimientos y Casos Reales",
              items: ["Resolución de desafíos reales en Marketing y Producto.", "Herramientas Avanzadas: Google AI Studio para desarrollo.", "Ecosistemas Colaborativos Humano-IA."]
            }
          ].map((session, i) => (
            <div key={i} className="group relative pl-20 md:pl-28 py-10 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors rounded-3xl">
              <span className="absolute left-4 md:left-8 top-10 font-mono text-5xl md:text-6xl font-black text-gray-100 group-hover:text-red-700/10 transition-colors">
                {session.num}
              </span>
              <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-4 group-hover:text-red-700 transition-colors">{highlightIA(session.title)}</h3>
              <ul className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                {session.items.map((item, j) => (
                  <li key={j} className="text-base text-gray-500 font-medium flex items-start gap-3 leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-red-700 rounded-full mt-1.5 flex-shrink-0"></span>
                    {highlightIA(item)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ECOSISTEMA DE HERRAMIENTAS */}
      <section className="mb-24 bg-white border border-gray-100 rounded-[3.5rem] p-10 md:p-16 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 p-12 text-gray-50 rotate-12 -z-0">
          <Terminal size={120} />
        </div>
        <div className="relative z-10">
          <h2 className="text-[11px] font-black text-red-700 uppercase tracking-0.3em mb-12">Ecosistema de Herramientas de {highlightIA("IA")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { cat: "Generación", tools: "ChatGPT, Copilot", icon: <PenTool size={20}/> },
              { cat: "Análisis", tools: "Notebook LM, Claude, Perplexity", icon: <Search size={20}/> },
              { cat: "Productividad", tools: "TLDV, Turboscribe, Tactic", icon: <Clock size={20}/> },
              { cat: "Seguridad/Local", tools: "Whisper, Pinokio, LM Studio", icon: <ShieldCheck size={20}/> }
            ].map((cat, i) => (
              <div key={i} className="space-y-4 group">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-700 group-hover:bg-red-700 group-hover:text-white transition-all shadow-sm">
                  {cat.icon}
                </div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">{cat.cat}</p>
                <p className="text-base font-black text-gray-900 leading-tight">{highlightIA(cat.tools)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL BOOTCAMP */}
      <section className="bg-red-700 rounded-[3rem] p-12 text-center text-white space-y-6 shadow-2xl shadow-red-100">
        <h3 className="text-3xl font-black uppercase tracking-tighter">¿Listo para transformar tu forma de trabajar?</h3>
        <p className="text-red-100 max-w-xl mx-auto font-medium">Ofrecemos modalidades de precio cerrado o planes personalizados adaptados a las necesidades de tu organización.</p>
        <button 
          onClick={() => onContactRequest("Hola, estoy interesado en recibir información detallada sobre el BootCamp IA de Tligent.")}
          className="bg-white text-red-700 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-0.25em hover:bg-gray-900 hover:text-white transition-all shadow-xl inline-flex items-center gap-4 active:scale-95 group"
        >
          SOLICITAR INFORMACIÓN 
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </section>
    </div>
  );
}

// --- COMPONENTE PÁGINA MINICAMP IA ---
function MiniCampPage({ setView, onContactRequest }: { setView: (v: View) => void, onContactRequest: (m: string) => void }) {
  const adaptacionData = [
    { name: 'Contenido Alumnos', value: 40 },
    { name: 'Contenido Base', value: 60 },
  ];

  const toolsData = [
    { subject: 'Generación', chatgpt: 9, gemini: 8, perplexity: 7 },
    { subject: 'Fuentes', chatgpt: 6, gemini: 8, perplexity: 10 },
    { subject: 'Edición', chatgpt: 9, gemini: 6, perplexity: 5 },
    { subject: 'Personalización', chatgpt: 8, gemini: 7, perplexity: 6 },
    { subject: 'Integración', chatgpt: 7, gemini: 9, perplexity: 6 },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-5xl mx-auto py-12 px-4 md:px-0 space-y-20 font-sans">
      {/* BOTÓN VOLVER */}
      <button 
        onClick={() => setView('home')}
        className="flex items-center gap-3 text-gray-400 hover:text-red-700 font-black text-[10px] uppercase tracking-[0.3em] transition-colors group"
      >
        <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-red-50 group-hover:border-red-100 transition-all">
          <ArrowLeft size={16} />
        </div>
        Volver al inicio
      </button>

      {/* HEADER ALINEADO A LA IZQUIERDA */}
      <header className="text-left space-y-6">
        <div className="flex items-center gap-4 text-red-700">
          <Presentation size={24} />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Experiencia Divulgativa</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none uppercase">
          MiniCamp <span className="text-red-700">IA</span>
        </h1>
        <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-3xl">
          De la Búsqueda a la Generación: Domina la {highlightIA("IA")} en tu Día a Día.
        </p>
      </header>

      {/* CURSO CREADO PARA TI */}
      <section className="bg-white border border-gray-100 rounded-[3rem] p-10 md:p-16 shadow-sm overflow-hidden relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
               <span className="bg-red-700 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Personalizado</span>
               <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Un Curso Creado para Ti</h2>
               <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  Este no es un curso genérico. Es una experiencia de aprendizaje dinámica que se moldea según las preguntas y desafíos reales de los participantes.
               </p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-700 p-8 rounded-r-3xl space-y-2 shadow-sm">
                <div className="text-5xl font-black text-red-700">40%</div>
                <p className="text-sm font-bold text-gray-900 uppercase tracking-tight italic">
                  del contenido se desarrolla directamente a partir de las consultas de los alumnos.
                </p>
            </div>
          </div>
          <div className="h-64 md:h-80 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={adaptacionData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {adaptacionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#b91c1c' : '#f3f4f6'} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Users size={32} className="text-gray-200" />
            </div>
          </div>
        </div>
      </section>

      {/* PARADIGMA: BUSCAR VS GENERAR */}
      <section className="space-y-12">
        <h2 className="text-3xl font-black text-gray-900 text-center uppercase tracking-tighter">El Cambio de Paradigma: Buscar vs. Generar</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-100 p-10 rounded-[3rem] shadow-sm space-y-6 group hover:border-gray-200 transition-all">
            <div className="flex items-center gap-4 text-gray-400">
               <Search size={32} />
               <h3 className="text-xl font-black uppercase text-gray-900">Búsqueda Tradicional</h3>
            </div>
            <p className="text-gray-500 font-medium leading-relaxed">Funciona como un índice. Proporciona una lista de enlaces y pistas, requiriendo investigación propia.</p>
            <ul className="space-y-3">
               <li className="flex items-start gap-3 text-sm font-bold text-gray-400">
                  <ArrowRight size={18} className="text-red-700 flex-shrink-0" /> Filtrado manual por el usuario.
               </li>
               <li className="flex items-start gap-3 text-sm font-bold text-gray-400">
                  <ArrowRight size={18} className="text-red-700 flex-shrink-0" /> Resultados patrocinados.
               </li>
               <li className="flex items-start gap-3 text-sm font-bold text-gray-400">
                  <ArrowRight size={18} className="text-red-700 flex-shrink-0" /> Proceso más lento.
               </li>
            </ul>
          </div>
          <div className="bg-red-700 p-10 rounded-[3rem] shadow-xl shadow-red-100 space-y-6 text-white group hover:bg-black transition-all duration-500">
            <div className="flex items-center gap-4">
               <Zap size={32} />
               <h3 className="text-xl font-black uppercase">Generación (IA)</h3>
            </div>
            <p className="text-red-100 font-medium leading-relaxed">Actúa como un asistente. Entiende, resume y genera contenido estructurado y relevante directamente.</p>
            <ul className="space-y-3">
               <li className="flex items-start gap-3 text-sm font-bold">
                  <CheckCircle2 size={18} className="text-white flex-shrink-0" /> Ahorro de tiempo significativo.
               </li>
               <li className="flex items-start gap-3 text-sm font-bold">
                  <CheckCircle2 size={18} className="text-white flex-shrink-0" /> Resúmenes directos con fuentes.
               </li>
               <li className="flex items-start gap-3 text-sm font-bold">
                  <CheckCircle2 size={18} className="text-white flex-shrink-0" /> Generación de nuevo contenido.
               </li>
            </ul>
          </div>
        </div>
      </section>

      {/* HERRAMIENTAS */}
      <section className="bg-gray-50 rounded-[4rem] p-10 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 text-gray-100 rotate-12 -z-0">
          <Layers size={180} />
        </div>
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Tu Nuevo Conjunto de Herramientas</h2>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
               Cada herramienta de {highlightIA("IA")} generativa tiene sus propias fortalezas. Conocer sus diferencias es clave para elegir la mejor herramienta para cada tarea.
            </p>
            <div className="space-y-4">
               {[
                 { title: "Perplexity", desc: "Ideal para investigación. Fusiona búsqueda tradicional con generación, citando fuentes." },
                 { title: "ChatGPT", desc: "El más versátil para creación de contenido y personalización profunda." },
                 { title: "Gemini (Google)", desc: "Excelente para el ecosistema Google y conexiones con Maps." }
               ].map((tool, i) => (
                 <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <h4 className="font-black text-gray-900 uppercase mb-1">{tool.title}</h4>
                    <p className="text-sm text-gray-500 font-medium">{tool.desc}</p>
                 </div>
               ))}
            </div>
          </div>
          <div className="h-80 w-full bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Comparativa de Herramientas</h4>
             <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={toolsData}>
                  <PolarGrid stroke="#f3f4f6" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 'bold' }} />
                  <Radar name="ChatGPT" dataKey="chatgpt" stroke="#b91c1c" fill="#b91c1c" fillOpacity={0.4} />
                  <Radar name="Gemini" dataKey="gemini" stroke="#4b5563" fill="#4b5563" fillOpacity={0.2} />
                  <Radar name="Perplexity" dataKey="perplexity" stroke="#9ca3af" fill="#9ca3af" fillOpacity={0.1} />
                  <Tooltip />
                </RadarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* EDICION Y PERSONALIZACION */}
      <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-100 p-10 rounded-[3rem] shadow-sm space-y-6">
            <div className="flex items-center gap-4 text-red-700">
               <PenTool size={32} />
               <h3 className="text-xl font-black uppercase text-gray-900">Edición Inteligente</h3>
            </div>
            <p className="text-gray-500 font-medium leading-relaxed italic border-l-4 border-gray-100 pl-4">Las herramientas modernas van más allá de la generación inicial.</p>
            <div className="space-y-4">
               <div className="p-5 bg-gray-50 rounded-2xl space-y-1">
                  <h4 className="font-black text-sm uppercase text-gray-900 tracking-tight">Modo Lienzo (Canvas)</h4>
                  <p className="text-xs text-gray-500 font-bold">Trabaja sobre fragmentos específicos sin afectar al resto del documento.</p>
               </div>
               <div className="p-5 bg-gray-50 rounded-2xl space-y-1">
                  <h4 className="font-black text-sm uppercase text-gray-900 tracking-tight">Inpainting de Imágenes</h4>
                  <p className="text-xs text-gray-500 font-bold">Modifica áreas concretas de una imagen generada manteniendo el resto.</p>
               </div>
            </div>
          </div>
          <div className="bg-white border border-gray-100 p-10 rounded-[3rem] shadow-sm space-y-6">
            <div className="flex items-center gap-4 text-red-700">
               <Users size={32} />
               <h3 className="text-xl font-black uppercase text-gray-900">Personalización</h3>
            </div>
            <p className="text-gray-500 font-medium leading-relaxed">Ahorra tiempo enseñando a la {highlightIA("IA")} cómo interactuar contigo.</p>
            <ul className="space-y-4">
               {[
                 { icon: "👤", text: "Define cómo debe llamarte." },
                 { icon: "👔", text: "Explica tu profesión o rol." },
                 { icon: "📊", text: "Especifica el formato de respuesta (analítico, estructurado)." },
                 { icon: "🤔", text: "Pide espíritu crítico y que no sea complaciente." }
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-4 group">
                    <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                    <span className="text-sm font-bold text-gray-900 tracking-tight">{item.text}</span>
                 </li>
               ))}
            </ul>
          </div>
      </section>

      {/* NOTEBOOK LM REDISEÑADO A BLANCO */}
      <section className="bg-white border border-gray-100 rounded-[4rem] p-10 md:p-16 text-gray-900 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 p-12 text-gray-50 rotate-12 -z-0">
          <BookOpen size={180} />
        </div>
        <div className="relative z-10 space-y-12">
          <div className="text-center space-y-4">
             <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-900">📚 Notebook LM: La Joya del Estudio</h2>
             <p className="text-gray-500 max-w-3xl mx-auto font-medium">Herramienta de Google que revoluciona la gestión del conocimiento sin riesgo de "alucinaciones".</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[
               { icon: <FileText />, title: "Carga", desc: "Sube hasta 50 fuentes para estudiar." },
               { icon: <MessageSquare />, title: "Q&A", desc: "Respuestas precisas basadas en tus docs." },
               { icon: <Globe />, title: "Guías", desc: "Crea mapas conceptuales y cronologías." },
               { icon: <Zap />, title: "Audio", desc: "Crea podcasts a partir de tus textos." }
             ].map((card, i) => (
               <div key={i} className="bg-gray-50 border border-gray-100 p-6 rounded-3xl text-center space-y-4 hover:bg-white hover:shadow-xl transition-all shadow-sm">
                  <div className="text-red-700 flex justify-center">{card.icon}</div>
                  <h4 className="font-black uppercase text-xs tracking-widest text-gray-900">{card.title}</h4>
                  <p className="text-[10px] text-gray-500 font-bold leading-relaxed">{card.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ETICA Y LEGALIDAD */}
      <section className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-100 p-10 rounded-[3rem] shadow-sm space-y-6">
            <div className="flex items-center gap-4 text-red-700">
               <BrainCircuit size={32} />
               <h3 className="text-xl font-black uppercase text-gray-900">Asistentes a Medida</h3>
            </div>
            <p className="text-gray-500 font-medium leading-relaxed">Configuraciones que permiten a la {highlightIA("IA")} adoptar una personalidad y base de conocimientos específica.</p>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-5 bg-gray-50 rounded-3xl space-y-2">
                  <h4 className="font-black text-xs uppercase tracking-widest text-red-700">GPTs (ChatGPT)</h4>
                  <p className="text-[11px] text-gray-500 font-bold leading-relaxed">Muchos se pueden usar gratis, pero crearlos requiere cuenta de pago.</p>
               </div>
               <div className="p-5 bg-gray-50 rounded-3xl space-y-2">
                  <h4 className="font-black text-xs uppercase tracking-widest text-red-700">Gemas (Gemini)</h4>
                  <p className="text-[11px] text-gray-500 font-bold leading-relaxed">Completamente gratuito tanto para crear como para usar en Gemini.</p>
               </div>
            </div>
          </div>
          <div className="bg-red-50 border border-red-100 p-10 rounded-[3rem] shadow-sm space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-red-100/30 rotate-12"><Scale size={60} /></div>
            <div className="flex items-center gap-4 text-red-700">
               <ShieldCheck size={32} />
               <h3 className="text-xl font-black uppercase text-gray-900">Legalidad y Ética</h3>
            </div>
            <p className="text-gray-600 text-sm font-bold uppercase tracking-tight italic">Acta Europea de {highlightIA("IA")}: No toda capacidad técnica es legal.</p>
            <div className="space-y-4">
               <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-red-700 text-white flex items-center justify-center text-[10px] font-black flex-shrink-0">!</div>
                  <div>
                    <h5 className="text-sm font-black uppercase tracking-tight text-gray-900">Anonimizar Datos</h5>
                    <p className="text-xs text-gray-500 font-medium">Prioridad absoluta al subir información a servidores fuera de la UE.</p>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-red-700 text-white flex items-center justify-center text-[10px] font-black flex-shrink-0">!</div>
                  <div>
                    <h5 className="text-sm font-black uppercase tracking-tight text-gray-900">Datos Sensibles</h5>
                    <p className="text-xs text-gray-500 font-medium">Prohibido compartir datos de salud, género o religión fuera de la UE.</p>
                  </div>
               </div>
            </div>
          </div>
      </section>

      {/* CTA FINAL MINICAMP */}
      <section className="bg-red-700 rounded-[3rem] p-12 text-center text-white space-y-6 shadow-2xl shadow-red-100">
        <h3 className="text-3xl font-black uppercase tracking-tighter">¿A qué estás esperando?</h3>
        <p className="text-red-100 max-w-xl mx-auto font-medium">Sesiones dinámicas, directas y adaptadas para que nadie se quede atrás en la revolución tecnológica.</p>
        <button 
          onClick={() => onContactRequest("Hola, me gustaría recibir más información sobre el programa MiniCamp IA.")}
          className="bg-white text-red-700 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-0.25em hover:bg-gray-900 hover:text-white transition-all shadow-xl inline-flex items-center gap-4 active:scale-95 group"
        >
          SOLICITAR INFORMACIÓN 
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

    </div>
  );
}
