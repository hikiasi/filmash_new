import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, AlertCircle } from "lucide-react";

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  const scrollToConsultation = () => {
    setIsVisible(false);
    document.querySelector("#consultation")?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-slate-100 relative"
          >
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <Image src="/assets/2aa2806e602702e8a69e25cfba32814980b2b74b4cea99571313c57f9d2ea5_1768699893879.png" alt="Филмаш" width={105} height={48} className="object-contain" />
              </div>
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Подождите, не уходите!</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Законодательство 2026 года скрывает множество подводных камней. 
                Получите <b>бесплатный чек-лист</b> по проверке автомобиля перед импортом.
              </p>
              <div className="flex flex-col gap-3">
                <Button size="lg" variant="lime" className="w-full" onClick={scrollToConsultation}>
                  Получить консультацию и чек-лист
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => setIsVisible(false)}>
                  Я просто посмотрим
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
