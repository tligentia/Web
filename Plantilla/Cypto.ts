
/**
 * Algoritmo de ofuscación simétrica utilizando XOR y codificación Base64
 * Versión mejorada con soporte UTF-8 (TextEncoder/TextDecoder)
 */

export const obfuscate = (text: string, key: string): string => {
  if (!text) return "";
  const effectiveKey = key || "default_key";
  
  const encoder = new TextEncoder();
  const textBytes = encoder.encode(text);
  const keyBytes = encoder.encode(effectiveKey);
  
  const obfuscated = textBytes.map((b, i) => b ^ keyBytes[i % keyBytes.length]);
  
  let binary = '';
  for (let i = 0; i < obfuscated.length; i++) {
    binary += String.fromCharCode(obfuscated[i]);
  }
  return btoa(binary);
};

export const deobfuscate = (encoded: string, key: string): string => {
  if (!encoded) return "";
  const effectiveKey = key || "default_key";
  try {
    const binary = atob(encoded);
    const encoder = new TextEncoder();
    const keyBytes = encoder.encode(effectiveKey);
    
    const charData = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      charData[i] = binary.charCodeAt(i) ^ keyBytes[i % keyBytes.length];
    }
    
    const decoder = new TextDecoder();
    return decoder.decode(charData);
  } catch (e) {
    return "Error: Formato inválido o clave incorrecta";
  }
};
