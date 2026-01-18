import { Link } from "wouter";
import { Button } from "./ui/button";
import { Menu, X, CarFront } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "О нас", href: "#about" },
    { name: "Утильсбор 2026", href: "#regulations" },
    { name: "Авто в наличии", href: "#gallery" },
    { name: "Отзывы", href: "#reviews" },
  ];

  const handleScroll = (id: string) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 h-20">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-[#4380c2] rounded-lg flex items-center justify-center text-white group-hover:bg-[#326094] transition-colors">
            <CarFront className="w-6 h-6" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-slate-900">
            ФИЛ<span className="text-[#4380c2]">МАШ</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleScroll(link.href)}
              className="text-sm font-medium text-slate-600 hover:text-[#4380c2] transition-colors"
            >
              {link.name}
            </button>
          ))}
          <Button 
            variant="lime" 
            onClick={() => handleScroll("#consultation")}
          >
            Связаться
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleScroll(link.href)}
                    className="text-lg font-medium text-left text-slate-800 hover:text-[#4380c2]"
                  >
                    {link.name}
                  </button>
                ))}
                <Button 
                  variant="lime" 
                  className="w-full"
                  onClick={() => handleScroll("#consultation")}
                >
                  Связаться с нами
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
