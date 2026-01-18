import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { OrderForm } from "@/components/forms/order-form";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Info, FileText, CarFront, HelpCircle, Star, Users, Briefcase } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { ChatWidget } from "@/components/chat-widget";

export default function Home() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const faqItems = [
    {
      q: "Какие страны доступны для импорта?",
      a: "Мы специализируемся на импорте из Китая, Южной Кореи и ОАЭ. Это наиболее выгодные направления в 2026 году с точки зрения логистики и ассортимента."
    },
    {
      q: "Как рассчитывается итоговая стоимость?",
      a: "Цена включает: стоимость авто на аукционе/дилере, логистику до границы РФ, таможенную пошлину, утилизационный сбор по новым ставкам 2026 года и нашу комиссию."
    },
    {
      q: "Есть ли гарантия на автомобиль?",
      a: "Перед покупкой мы проводим полную техническую диагностику. Все условия, сроки и окончательная цена фиксируются в юридическом договоре."
    },
    {
      q: "Сколько времени занимает доставка?",
      a: "Из Китая — от 14 до 25 дней, из Кореи — от 20 до 35 дней, из ОАЭ — около 30-45 дней до вашего города."
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <ExitIntentPopup />
      <ChatWidget />
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0f172a] text-white">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#4380c2]/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-[#cff902]/10 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#cff902]" />
                <span className="text-sm font-medium tracking-wide">ЭКСПЕРТЫ В ИМПОРТЕ АВТО 2026</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-8">
                Ваш навигатор в мире <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cff902] to-green-400">трансграничного</span> импорта
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Честные цены, полная юридическая чистота и экспертное знание новых правил утилизационного сбора. Мы делаем покупку авто из-за рубежа прозрачной и безопасной.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="lime" className="h-14 px-8" onClick={() => scrollTo("#order")}>
                  Заказать авто
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-white border-white bg-transparent hover:bg-white/20 hover:text-white transition-all" onClick={() => scrollTo("#consultation")}>
                  Получить консультацию
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Hero Image / Graphic Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 container mx-auto px-4"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[21/9]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920" 
              alt="Premium Car Import" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20 text-left">
              <div className="text-[#cff902] font-display text-3xl font-bold">250+</div>
              <div className="text-gray-400 text-sm">Доставленных автомобилей</div>
            </div>
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 text-right">
              <div className="text-white font-display text-3xl font-bold">100%</div>
              <div className="text-gray-400 text-sm">Юридическая чистота</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* TRUST STATS SECTION */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-100 text-[#4380c2] mb-4">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">1500+</div>
              <div className="text-sm text-slate-500">Счастливых клиентов</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-100 text-[#4380c2] mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">8 лет</div>
              <div className="text-sm text-slate-500">Опыта на рынке</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-100 text-[#4380c2] mb-4">
                <Star className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">4.9/5</div>
              <div className="text-sm text-slate-500">Рейтинг сервиса</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-100 text-[#4380c2] mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">100%</div>
              <div className="text-sm text-slate-500">Финансовая гарантия</div>
            </div>
          </div>
        </div>
      </section>

      {/* REGULATIONS SECTION - EDUCATIONAL */}
      <section id="regulations" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2 sticky top-24">
              <span className="text-[#4380c2] font-bold tracking-widest text-sm uppercase mb-2 block">Важно знать</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
                Новые правила 2026: <br/>Утилизационный сбор
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Законодательство меняется стремительно. Мы держим руку на пульсе, чтобы вы не переплачивали. Наша команда ежедневно мониторит изменения в ФЗ и таможенных регламентах.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                    <Info className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Рост ставок</h3>
                    <p className="text-slate-600">Значительное повышение ставок утильсбора для юрлиц и физлиц, ввозящих авто для перепродажи.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Риски доначислений</h3>
                    <p className="text-slate-600">Неправильное оформление может привести к требованию доплатить сотни тысяч рублей через год после покупки.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Наше решение</h3>
                    <p className="text-slate-600">Мы оформляем документы так, чтобы зафиксировать ставку на момент ввоза и защитить вас от будущих претензий.</p>
                  </div>
                </div>
              </div>
            </div>

            <div id="consultation" className="lg:w-1/2 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <h3 className="text-2xl font-bold mb-6">Закажите консультацию эксперта</h3>
              <p className="text-slate-500 mb-8">Оставьте заявку, и мы бесплатно рассчитаем итоговую стоимость авто с учетом всех новых пошлин.</p>
              
              <div className="bg-[#0f172a] p-8 rounded-2xl shadow-2xl">
                 <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SHOWCASE */}
      <section id="gallery" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">Примеры привезенных авто</h2>
            <p className="text-lg text-slate-600">Реальные кейсы наших клиентов с итоговыми ценами "под ключ"</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Car Card 1 */}
            <motion.div whileHover={{ y: -10 }} className="group rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800" alt="Geely Monjaro" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-slate-800">В наличии</div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Geely Monjaro</h3>
                    <p className="text-slate-500 text-sm">2023 • 2.0L • 4WD</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-[#4380c2] font-bold text-lg">3.45 млн ₽</span>
                    <span className="text-xs text-slate-400">под ключ</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full h-12 rounded-xl" onClick={() => scrollTo("#order")}>Хочу такую</Button>
              </div>
            </motion.div>

            {/* Car Card 2 */}
            <motion.div whileHover={{ y: -10 }} className="group rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800" alt="Toyota Camry" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white">Доставлен</div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Toyota Camry XV70</h3>
                    <p className="text-slate-500 text-sm">2022 • 2.5L • Hybrid</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-[#4380c2] font-bold text-lg">2.95 млн ₽</span>
                    <span className="text-xs text-slate-400">под ключ</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full h-12 rounded-xl" onClick={() => scrollTo("#order")}>Хочу такую</Button>
              </div>
            </motion.div>

            {/* Car Card 3 */}
            <motion.div whileHover={{ y: -10 }} className="group rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800" alt="BMW X5" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white">Доставлен</div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">BMW X5 G05</h3>
                    <p className="text-slate-500 text-sm">2021 • 3.0d • M-Pack</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-[#4380c2] font-bold text-lg">7.80 млн ₽</span>
                    <span className="text-xs text-slate-400">под ключ</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full h-12 rounded-xl" onClick={() => scrollTo("#order")}>Хочу такую</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 bg-[#0f172a] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Zap className="w-10 h-10 text-[#cff902] mb-4" />
              <h3 className="text-xl font-bold mb-2">Скорость</h3>
              <p className="text-gray-400">Доставка из Китая от 14 дней, из Кореи от 20 дней. Логистика отлажена годами.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <ShieldCheck className="w-10 h-10 text-[#cff902] mb-4" />
              <h3 className="text-xl font-bold mb-2">Гарантия</h3>
              <p className="text-gray-400">Фиксируем цену в договоре. Никаких скрытых платежей по прибытии авто.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <CheckCircle2 className="w-10 h-10 text-[#cff902] mb-4" />
              <h3 className="text-xl font-bold mb-2">Осмотр</h3>
              <p className="text-gray-400">Детальный видеоотчет перед покупкой. Проверка ЛКП, салона и технической части.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <FileText className="w-10 h-10 text-[#cff902] mb-4" />
              <h3 className="text-xl font-bold mb-2">Документы</h3>
              <p className="text-gray-400">Полное оформление ЭПТС и СБКТС. Автомобиль готов к постановке на учет в ГИБДД.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <HelpCircle className="w-12 h-12 text-[#4380c2] mx-auto mb-4" />
              <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">Часто задаваемые вопросы</h2>
              <p className="text-slate-500">Всё, что вам нужно знать перед заказом автомобиля</p>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border rounded-2xl px-6 bg-slate-50/50">
                  <AccordionTrigger className="text-lg font-bold text-slate-900 hover:no-underline py-6">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed pb-6">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold text-center text-slate-900 mb-16">Отзывы клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-4 bg-[#cff902] rounded-full" />)}
              </div>
              <p className="text-slate-600 mb-6 italic">"Боялся заказывать авто 'вслепую', но ребята из Филмаш всё сделали четко. Скидывали видео каждого этапа. Машина пришла даже раньше срока."</p>
              <div className="font-bold text-slate-900">Дмитрий С.</div>
              <div className="text-sm text-slate-400">г. Москва, BMW X3</div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-4 bg-[#cff902] rounded-full" />)}
              </div>
              <p className="text-slate-600 mb-6 italic">"Очень грамотно проконсультировали по утильсбору. Сэкономил приличную сумму, выбрав правильную схему ввоза. Рекомендую как профессионалов."</p>
              <div className="font-bold text-slate-900">Александр К.</div>
              <div className="text-sm text-slate-400">г. Казань, Geely Monjaro</div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-4 bg-[#cff902] rounded-full" />)}
              </div>
              <p className="text-slate-600 mb-6 italic">"Заказывали машину жене. Все прозрачно, по договору. Цена не изменилась ни на копейку. Спасибо за честность!"</p>
              <div className="font-bold text-slate-900">Игорь В.</div>
              <div className="text-sm text-slate-400">г. Краснодар, Kia Sportage</div>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER FORM SECTION */}
      <section id="order" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-50 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[#4380c2] font-bold tracking-widest text-sm uppercase mb-2 block">Оставьте заявку</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">Подберем идеальный авто</h2>
              <p className="text-lg text-slate-600">Заполните форму, и мы пришлем 3 варианта авто под ваш бюджет в течение 24 часов.</p>
            </div>
            
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100">
              <OrderForm />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0f172a] text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#4380c2] rounded-lg flex items-center justify-center text-white">
                  <CarFront className="w-5 h-5" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight">
                  ФИЛ<span className="text-[#4380c2]">МАШ</span>
                </span>
              </div>
              <p className="text-gray-400 max-w-sm mb-6">
                Экспертный импорт автомобилей из Китая, Кореи и ОАЭ. Юридическая гарантия и полная прозрачность сделки.
              </p>
              <a 
                href="https://t.me/philmash" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[#4380c2] hover:text-[#cff902] transition-colors font-bold"
              >
                Мы в Telegram <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Навигация</h4>
              <ul className="space-y-4 text-gray-400">
                <li><button onClick={() => scrollTo("#about")} className="hover:text-white">О компании</button></li>
                <li><button onClick={() => scrollTo("#regulations")} className="hover:text-white">Утильсбор</button></li>
                <li><button onClick={() => scrollTo("#gallery")} className="hover:text-white">Каталог</button></li>
                <li><button onClick={() => scrollTo("#reviews")} className="hover:text-white">Отзывы</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Контакты</h4>
              <ul className="space-y-4 text-gray-400">
                <li>Москва, Пресненская наб., 12</li>
                <li>+7 (999) 000-00-00</li>
                <li>info@philmash.ru</li>
                <li>Пн-Вс: 10:00 - 20:00</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div>© 2026 Филмаш. Все права защищены.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white">Договор оферты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
