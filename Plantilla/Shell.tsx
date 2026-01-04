import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, HelpCircle, AlertCircle, CheckCircle2, Key, ArrowRight, Loader2, Home } from 'lucide-react';
import { COLORS, validateKey, listAvailableModels, fetchVaultKey } from './Parameters';
import { Footer } from './Footer';
import { Cookies } from './Cookies';
import { Ajustes } from './Ajustes';
import { Manual } from './Manual';
import { NavMenu } from './NavMenu';

interface ShellProps {
  children: React.ReactNode;
  apiKey: string;
  onApiKeySave: (key: string) => void;
  onNavigate: (view: any, section?: string) => void;
  view: string;
}

export const Shell: React.FC<ShellProps> = ({ children, apiKey, onApiKeySave, onNavigate, view }) => {
  const [showAjustes, setShowAjustes] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  const [showManual, setShowManual] = useState(false);
  
  const [isKeyValid, setIsKeyValid] = useState<boolean | null>(null);
  const [userIp, setUserIp] = useState<string | null>(null);
  const [isVaultRecovering, setIsVaultRecovering] = useState(false);

  const initializeSystem = useCallback(async () => {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      setUserIp(data.ip);
    } catch {
      setUserIp('IP Offline');
    }

    let activeKey = apiKey || localStorage.getItem('app_apikey_v2');
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
    const isDevMode = !hostname || hostname === 'localhost';

    if (!activeKey && isDevMode) {
      setIsVaultRecovering(true);
      const recovered = await fetchVaultKey('OK', 'tligent');
      if (recovered) {
        activeKey = recovered;
        onApiKeySave(recovered);
      }
      setIsVaultRecovering(false);
    }
    
    if (!activeKey) {
      setIsKeyValid(false);
      return;
    }

    const isValid = await validateKey(activeKey);
    setIsKeyValid(isValid);

    if (isValid) {
      const currentModel = localStorage.getItem('app_selected_model');
      if (!currentModel) {
        const models = await listAvailableModels();
        const optimal = models.find(m => m === 'gemini-3-flash-preview') || 
                        models.find(m => m.includes('flash-preview')) || 
                        models.find(m => m.includes('flash')) || 
                        models[0];
        if (optimal) localStorage.setItem('app_selected_model', optimal);
      }
    }
  }, [apiKey, onApiKeySave]);

  useEffect(() => {
    initializeSystem();
  }, [initializeSystem]);

  return (
    <div className={`min-h-screen ${COLORS.bg} font-sans flex flex-col p-4 md:px-8 md:py-4 animate-in fade-in duration-700`}>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md mb-4 border-b border-gray-100 pb-4 pt-4 flex justify-between items-center px-2">
        <div>
          <h1 
            onClick={() => onNavigate('home')}
            className="text-2xl font-black tracking-tighter text-gray-900 flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform flex-shrink-0">
              <span className="text-white text-base font-black">T</span>
            </div>
            Tligent
          </h1>
          <div className="flex items-center gap-3 mt-1 pl-1">
            <div className="flex items-center gap-1.5">
              {isKeyValid === true ? (
                <span className="flex items-center gap-1 text-[8px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-1.5 py-0.5 rounded-md border border-green-100">
                  <CheckCircle2 size={8} /> AI ONLINE
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[8px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-1.5 py-0.5 rounded-md border border-gray-100">
                  <AlertCircle size={8} className="text-red-700" /> AI STANDBY
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {view !== 'home' && (
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white text-gray-900 border border-gray-100 hover:border-gray-900 transition-all duration-300 font-bold focus:outline-none group shadow-sm active:scale-95"
            >
              <div className="relative flex items-center justify-center">
                  <Home size={16} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              </div>
              <span className="text-[10px] uppercase tracking-widest hidden sm:inline">Inicio</span>
            </button>
          )}
          <NavMenu onNavigate={onNavigate} />
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full flex flex-col items-center">
        {isVaultRecovering && (
           <div className="w-full max-w-sm bg-white border border-gray-100 p-8 rounded-[2rem] shadow-xl flex flex-col items-center justify-center gap-4 animate-pulse mb-6">
              <Loader2 size={32} className="text-red-700 animate-spin" />
              <div className="center text-center">
                 <h4 className="text-base font-black text-gray-900 uppercase tracking-tighter">Sincronizando Bóveda</h4>
                 <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Localhost Autorecovery Active</p>
              </div>
           </div>
        )}
        {children}
      </main>

      <Footer 
        userIp={userIp} 
        onShowCookies={() => setShowCookies(true)} 
        onShowAjustes={() => setShowAjustes(true)} 
      />

      <Ajustes 
        isOpen={showAjustes} 
        onClose={() => setShowAjustes(false)} 
        apiKey={apiKey}
        onApiKeySave={(key) => {
          onApiKeySave(key);
          initializeSystem();
        }}
        userIp={userIp}
      />

      <Cookies isOpen={showCookies} onClose={() => setShowCookies(false)} />
      <Manual isOpen={showManual} onClose={() => setShowManual(false)} />
    </div>
  );
};
