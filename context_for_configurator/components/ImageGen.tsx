
import React, { useState } from 'react';
import { gemini } from '../services/gemini';
import { Sparkles, Download, Wand2, Loader2, Maximize2 } from 'lucide-react';

const ImageGen: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<"1K" | "2K" | "4K">("1K");
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const img = await gemini.generateDreamCar(prompt, size);
      if (img) {
        setResult(img);
      } else {
        setError("Не удалось сгенерировать изображение.");
      }
    } catch (e: any) {
      if (e.message?.includes("Requested entity was not found")) {
        setError("Пожалуйста, выберите ваш API ключ в настройках.");
        // Normally we'd call window.aistudio.openSelectKey() here as per guidelines
      } else {
        setError("Произошла ошибка при генерации.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4">Создай свой <span className="text-indigo-500 italic">Vision</span></h1>
        <p className="text-zinc-400 text-lg">Опишите автомобиль мечты, а наш ИИ визуализирует его в 4K разрешении.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <label className="text-xs font-bold text-zinc-500 uppercase block mb-3 px-1">Текст запроса</label>
            <textarea 
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-sm h-32 focus:outline-none focus:border-indigo-500 transition-all resize-none mb-4"
              placeholder="Футуристичный Zeekr 001 на улицах ночного Токио, киберпанк стиль..."
            />

            <label className="text-xs font-bold text-zinc-500 uppercase block mb-3 px-1">Разрешение</label>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {(['1K', '2K', '4K'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    size === s ? 'bg-white text-black border-white' : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Wand2 size={20} />}
              Генерировать
            </button>
            {error && <p className="text-red-400 text-[10px] mt-2 text-center">{error}</p>}
          </div>

          <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
            <h4 className="text-xs font-bold text-indigo-400 uppercase flex items-center gap-2 mb-2">
              <Sparkles size={14} />
              Совет
            </h4>
            <p className="text-[10px] text-zinc-400 leading-relaxed">
              Используйте ключевые слова: "8k", "photorealistic", "soft lighting", "cinematic shot".
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="aspect-video bg-zinc-900/50 border border-zinc-800 border-dashed rounded-[40px] flex items-center justify-center overflow-hidden relative group">
            {result ? (
              <>
                <img src={result} alt="Generated" className="w-full h-full object-cover animate-in fade-in duration-1000" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform">
                    <Download size={24} />
                  </button>
                  <button className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform">
                    <Maximize2 size={24} />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center p-8">
                {isLoading ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                    <p className="text-zinc-500 text-sm animate-pulse">Создаем шедевр для вас...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 opacity-20">
                    <Sparkles size={64} />
                    <p className="text-sm font-medium">Ваше изображение появится здесь</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGen;
