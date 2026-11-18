import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { BrandPreloader, hasPreloaderFinished } from './BrandPreloader';
import { CustomCursor } from './CustomCursor';

interface GlobalInteractionsContextValue {
  isPreloaderActive: boolean;
  isHeroReady: boolean;
}

const GlobalInteractionsContext = createContext<GlobalInteractionsContextValue>({
  isPreloaderActive: false,
  isHeroReady: true,
});

export function useGlobalInteractions() {
  return useContext(GlobalInteractionsContext);
}

export function GlobalInteractions({ children }: { children: ReactNode }) {
  const [isHeroReady, setIsHeroReady] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    if (hasPreloaderFinished()) return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [isPreloaderActive, setIsPreloaderActive] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    if (hasPreloaderFinished()) return false;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const handleRevealReady = useCallback(() => {
    setIsHeroReady(true);
  }, []);

  const handleComplete = useCallback(() => {
    setIsPreloaderActive(false);
    setIsHeroReady(true);
  }, []);

  return (
    <GlobalInteractionsContext.Provider value={{ isPreloaderActive, isHeroReady }}>
      <BrandPreloader
        onRevealReady={handleRevealReady}
        onComplete={handleComplete}
      />
      <CustomCursor />
      {children}
    </GlobalInteractionsContext.Provider>
  );
}
