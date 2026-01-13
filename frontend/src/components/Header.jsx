import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Phone } from 'lucide-react';
import { companyInfo } from '../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Contato', href: '#contato' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-2'
          : 'py-4'
      }`}
    >
      {/* Liquid Glass Background */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(17,70,141,0.12)]' 
            : 'bg-white/10 backdrop-blur-md'
        }`}
        style={{
          borderBottom: isScrolled ? '1px solid rgba(108, 187, 225, 0.3)' : '1px solid rgba(255,255,255,0.1)',
        }}
      />
      
      {/* Liquid Glass Shine Effect */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isScrolled ? 'opacity-100' : 'opacity-50'
        }`}
        style={{
          background: isScrolled 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(108,187,225,0.1) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <img
              src={companyInfo.logo}
              alt="RGS Soluções em Pintura"
              className={`h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                isScrolled ? 'brightness-100' : 'brightness-100'
              }`}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`relative text-sm font-medium transition-all duration-300 hover:text-[#3488b2] group ${
                  isScrolled ? 'text-[#11468d]' : 'text-white'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3488b2] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={companyInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className={`font-semibold px-6 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  isScrolled
                    ? 'bg-[#11468d] hover:bg-[#3488b2] text-white shadow-lg hover:shadow-xl'
                    : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30'
                }`}
              >
                <Phone className="w-4 h-4" />
                Fale Conosco
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
              isScrolled 
                ? 'bg-[#11468d]/10 hover:bg-[#11468d]/20' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-[#11468d]' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-[#11468d]' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Liquid Glass Style */}
      <div
        className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div 
          className="relative mx-4 mt-2 rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(17, 70, 141, 0.15), inset 0 1px 0 rgba(255,255,255,0.5)',
            border: '1px solid rgba(108, 187, 225, 0.3)',
          }}
        >
          {/* Glass shine effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 40%, rgba(108,187,225,0.1) 100%)',
            }}
          />
          
          <div className="relative px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-4 py-3 text-[#11468d] font-medium hover:bg-[#6cbbe1]/20 rounded-xl transition-all duration-300"
              >
                {link.label}
              </button>
            ))}
            <a
              href={companyInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block pt-2"
            >
              <Button className="w-full bg-[#11468d] hover:bg-[#3488b2] text-white font-semibold py-3 rounded-xl shadow-lg">
                <Phone className="w-4 h-4 mr-2" />
                Fale Conosco
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
