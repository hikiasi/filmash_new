
import React, { useState, useRef, useEffect } from 'react';
import { gemini } from '../services/gemini';
import { MessageSquare, Send, X, Bot, User, Volume2, Loader2 } from 'lucide-react';

interface Message {
  role: 'bot' | 'user';
  content: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Привет! Я виртуальный эксперт Filmash. Какой автомобиль вас интересует?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await gemini.chatWithExpert(userMsg);
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Ой, что-то пошло не так. Попробуйте еще раз.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTTS = async (text: string) => {
    try {
      const audioData = await gemini.textToSpeech(text);
      if (audioData) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const buffer = await audioContext.decodeAudioData(audioData.buffer);
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
      }
    } catch (e) {
      console.error("TTS Error", e);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="w-[380px] h-[550px] bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50 rounded-t-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                <Bot size={22} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Filmash Expert</h3>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-zinc-400 font-medium">Онлайн</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white p-2">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm relative group ${
                  msg.role === 'user' ? 'bg-zinc-100 text-black rounded-tr-none' : 'bg-zinc-800 text-zinc-100 rounded-tl-none'
                }`}>
                  {msg.content}
                  {msg.role === 'bot' && (
                    <button 
                      onClick={() => handleTTS(msg.content)}
                      className="absolute -right-8 top-0 p-1.5 text-zinc-600 hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Volume2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 p-4 rounded-2xl rounded-tl-none">
                  <Loader2 size={18} className="animate-spin text-zinc-500" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-zinc-800">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Задайте вопрос..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 pr-12 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-2 p-2 text-indigo-500 hover:text-indigo-400 disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/20 hover:scale-110 transition-transform group"
        >
          <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 border-4 border-zinc-950 rounded-full" />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
