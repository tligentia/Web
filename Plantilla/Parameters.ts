
import { GoogleGenAI, Modality } from "@google/genai";

// --- DOMAIN LOGIC ---
const getSystemSLD = (): string => {
  if (typeof window === 'undefined') return "localhost";
  const hostname = window.location.hostname;
  if (!hostname || hostname === 'localhost' || !hostname.includes('.')) return 'localhost';
  const parts = hostname.split('.');
  return parts[parts.length - 2];
};

const MASTER_KEY = getSystemSLD();
export const SHEET_ID = '1wJkM8rmiXCrnB0K4h9jtme0m7f5I3y1j1PX5nmEaTII';

/**
 * UI Theme configuration
 */
export const COLORS = {
  bg: 'bg-white',
  primary: 'text-red-700',
  secondary: 'text-gray-400',
  accent: 'text-gray-900',
};

// --- CRYPTO TOOL LOGIC (UTF-8 COMPLIANT) ---
export const crypto = {
  obfuscate: (text: string, key: string = MASTER_KEY): string => {
    if (!text) return "";
    try {
      // Usamos TextEncoder para soportar tildes y caracteres UTF-8
      const encoder = new TextEncoder();
      const textBytes = encoder.encode(text);
      const keyBytes = encoder.encode(key);
      
      const charData = Array.from(textBytes).map((b, i) => 
        b ^ keyBytes[i % keyBytes.length]
      );
      
      let binary = '';
      for (let i = 0; i < charData.length; i++) {
        binary += String.fromCharCode(charData[i]);
      }
      return btoa(binary);
    } catch (e) {
      console.error("Crypto error:", e);
      return "";
    }
  },
  deobfuscate: (encoded: string, key: string = MASTER_KEY): string => {
    if (!encoded) return "";
    try {
      const binary = atob(encoded);
      const encoder = new TextEncoder();
      const keyBytes = encoder.encode(key);
      
      const charData = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        charData[i] = binary.charCodeAt(i) ^ keyBytes[i % keyBytes.length];
      }
      
      const decoder = new TextDecoder();
      return decoder.decode(charData);
    } catch (e) {
      return "Error: Formato inválido o clave incorrecta";
    }
  }
};

// --- API & MODELS ---
const getActiveApiKey = () => {
  return localStorage.getItem('app_apikey_v2') || process.env.API_KEY;
};

export const fetchVaultKey = async (targetLabel: string, seed: string): Promise<string | null> => {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Claves`;
    const response = await fetch(url);
    if (!response.ok) return null;
    const text = await response.text();
    const rows = text.split(/\r?\n/).filter(line => line.trim() !== '');
    
    for (let i = 1; i < rows.length; i++) {
        const cols = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.replace(/"/g, '').trim());
        const label = cols[0];
        const obfuscatedValue = cols[1];
        if (label && label.toLowerCase() === targetLabel.toLowerCase()) {
            return crypto.deobfuscate(obfuscatedValue, seed);
        }
    }
  } catch (e) {
    console.error("SISTEMA: Error crítico al conectar con el Vault", e);
  }
  return null;
};

export const listAvailableModels = async (): Promise<string[]> => {
  const apiKey = getActiveApiKey();
  if (!apiKey) return ['gemini-3-flash-preview', 'gemini-3-pro-preview'];
  try {
    const ai = new GoogleGenAI({ apiKey });
    if (!ai.models || typeof ai.models.list !== 'function') {
      throw new Error("Models API not available in this version");
    }
    
    const result = await ai.models.list();
    const modelsSource = (result as any)?.models || result;
    const models: string[] = [];
    
    if (Array.isArray(modelsSource)) {
      modelsSource.forEach(m => {
        const shortName = m.name?.replace('models/', '') || '';
        if (shortName && !shortName.includes('1.5') && !shortName.includes('pro-vision')) {
          models.push(shortName);
        }
      });
    }
    
    return models.length > 0 ? models : ['gemini-3-flash-preview', 'gemini-3-pro-preview'];
  } catch (e) {
    console.warn("Could not list models via API, using defaults:", e);
    return [
      'gemini-3-flash-preview', 
      'gemini-3-pro-preview', 
      'gemini-flash-lite-latest', 
      'gemini-2.5-flash-image',
      'gemini-2.5-flash-preview-tts'
    ];
  }
};

export const validateKey = async (keyInput?: string): Promise<boolean> => {
  const key = keyInput || getActiveApiKey();
  if (!key) return false;
  try {
    const ai = new GoogleGenAI({ apiKey: key });
    await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: 'ping' });
    return true;
  } catch {
    return false;
  }
};

export const askGemini = async (prompt: string, modelOverride?: string): Promise<string> => {
  const apiKey = getActiveApiKey();
  if (!apiKey) throw new Error("API_KEY_REQUIRED");
  const ai = new GoogleGenAI({ apiKey });
  const model = modelOverride || localStorage.getItem('app_selected_model') || 'gemini-3-flash-preview';
  
  const isTTS = model.includes('tts');
  const isImage = model.includes('image');

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
      responseModalities: isTTS ? [Modality.AUDIO] : undefined,
    }
  });

  if (isTTS) {
    return "SISTEMA: Audio generado con éxito. Sandbox textual activo.";
  }

  if (isImage) {
    return response.candidates?.[0]?.content?.parts?.find(p => p.text)?.text || "SISTEMA: Imagen generada con éxito.";
  }

  return response.text || "No response received.";
};

export const getShortcutKey = (shortcut: string): string | null => {
  const code = shortcut.toLowerCase().trim();
  const DEV_KEY = "tligent";
  if (code === 'ok') return crypto.deobfuscate('NSUTBjYXNicpJlE3BxYWXhhSCFhFPzNQVyYZOBI5PR8ECg41Lw4i', DEV_KEY);
  if (code === 'cv') return crypto.deobfuscate('NSUTBjYXNRczGh8LBEwaBzEuFSpDIFUkOEgKIy5fOi0pHTYgIygi', DEV_KEY);
  return null;
};
