
import React, { useState, useEffect, useRef } from 'react';
import { Menu, Home, BookOpen, Zap, Presentation, Video, Mail, ChevronRight, X, Briefcase, Search } from 'lucide-react';

interface NavMenuProps {
  onNavigate: (view: 'home' | 'bootcamp' | 'talleres' | 'minicamp' | 'servicios_detalle' | 'guia', section?: string) => void;
}

export const NavMenu: React.FC<NavMenuProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (isOpen) {
      timeoutRef.current = window.setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }
  };

  const items = [
    { name: 'Home', icon: <Home size={16} />, action: () => onNavigate('home', 'inicio') },
    { name: 'BootCamp IA', icon: <BookOpen size={16} />, action: () => onNavigate('bootcamp', 'bootcamp-top') },
    { name: 'Taller IA', icon: <Zap size={16} />, action: () => onNavigate('talleres', 'talleres-top') },
    { name: 'MiniCamp IA', icon: <Presentation size={16} />, action: () => onNavigate('minicamp', 'minicamp-top') },
    { name: 'Servicios Pro', icon: <Briefcase size={16} />, action: () => onNavigate('servicios_detalle', 'servicios-top') },
    { name: 'ViTAG', icon: <Video size={16} />, action: () => onNavigate('home', 'vitag') },
    { name: 'GuIA', icon: <Search size={16} />, action: () => onNavigate('guia', 'guia-top') },
    { name: 'Contacto', icon: <Mail size={16} />, action: () => onNavigate('home', 'contacto') },
  ];

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-bold focus:outline-none group ${
          isOpen 
            ? 'bg-red-700 text-white shadow-lg shadow-red-900/20' 
            : 'bg-white text-gray-900 border border-gray-100 hover:border-gray-900'
        }`}
      >
        <div className="relative flex items-center justify-center">
            {isOpen ? <X size={16} className="animate-in spin-in-90 duration-300" /> : <Menu size={16} className="text-gray-400 group-hover:text-gray-900" />}
        </div>
        <span className="text-[10px] uppercase tracking-widest">Menú</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[100] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 ring-1 ring-black/5">
          <div className="p-4 border-b border-gray-50 bg-gray-50/50">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Navegación</h3>
          </div>
          
          <div className="p-1">
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => handleAction(item.action)}
                className="w-full group flex items-center p-2 rounded-xl transition-all duration-200 hover:bg-gray-900 text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-red-700 group-hover:text-white transition-all">
                  {React.cloneElement(item.icon as React.ReactElement<{ size?: number }>, { size: 14 })}
                </div>
                <div className="ml-3 flex-1 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900 group-hover:text-white transition-colors uppercase tracking-tight">
                    {item.name}
                  </span>
                  <ChevronRight size={12} className="text-gray-200 group-hover:text-white/20 transition-all transform group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>

          <div className="p-2 border-t border-gray-50 bg-gray-50/30 flex justify-center">
            <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.3em]">Tligent Corporate Site</p>
          </div>
        </div>
      )}
    </div>
  );
};
