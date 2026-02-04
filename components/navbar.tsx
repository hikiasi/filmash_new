"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
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
          <Image 
            src="/assets/2aa2806e602702e8a69e25cfba32814980b2b74b4cea99571313c57f9d2ea5_1768699893879.png"
            alt="Филмаш Логотип"
            width={90}
            height={40}
            className="object-contain transition-all duration-300" 
          />
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
