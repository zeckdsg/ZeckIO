import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Phone, FileText, Briefcase, MessageSquare } from 'lucide-react';
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

  const quickActions = [
    { label: 'Orçamento', href: '#contato', icon: FileText },
    { label: 'Serviços', href: '#servicos', icon: Briefcase },
    { label: 'WhatsApp', href: companyInfo.whatsapp, icon: MessageSquare, external: true },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-2' : 'py-3'
      }`}
    >
      {/* Liquid Glass Background */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/60 backdrop-blur-2xl shadow-[0_8px_32px_rgba(17,70,141,0.15)]' 
            : 'bg-white/5 backdrop-blur-lg'
        }`}
        style={{
          borderBottom: isScrolled ? '1px solid rgba(108, 187, 225, 0.25)' : '1px solid rgba(255,255,255,0.1)',
        }}
      />
      
      {/* Liquid Glass Shine Effect */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isScrolled ? 'opacity-100' : 'opacity-40'
        }`}
        style={{
          background: isScrolled 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 40%, rgba(108,187,225,0.08) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <img
              src={companyInfo.logo}
              alt="RGS Soluções em Pintura"
              className="h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
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

          {/* Quick Action Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              const isExternal = action.external;
              
              if (isExternal) {
                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="sm"
                      className={`font-medium px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                        action.label === 'WhatsApp'
                          ? 'bg-[#25D366] hover:bg-[#22c55e] text-white shadow-md hover:shadow-lg'
                          : isScrolled
                            ? 'bg-[#11468d]/10 hover:bg-[#11468d] text-[#11468d] hover:text-white'
                            : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="hidden xl:inline">{action.label}</span>
                    </Button>
                  </a>
                );
              }
              
              return (
                <Button
                  key={action.label}
                  size="sm"
                  onClick={() => scrollToSection(action.href)}
                  className={`font-medium px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                    action.label === 'Orçamento'
                      ? isScrolled
                        ? 'bg-[#11468d] hover:bg-[#3488b2] text-white shadow-md hover:shadow-lg'
                        : 'bg-white hover:bg-white/90 text-[#11468d] shadow-md hover:shadow-lg'
                      : isScrolled
                        ? 'bg-[#11468d]/10 hover:bg-[#11468d] text-[#11468d] hover:text-white'
                        : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden xl:inline">{action.label}</span>
                </Button>
              );
            })}
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
          isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div 
          className="relative mx-4 mt-2 rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 8px 32px rgba(17, 70, 141, 0.18), inset 0 1px 0 rgba(255,255,255,0.6)',
            border: '1px solid rgba(108, 187, 225, 0.25)',
          }}
        >
          {/* Glass shine effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, transparent 35%, rgba(108,187,225,0.08) 100%)',
            }}
          />
          
          <div className="relative px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-4 py-3 text-[#11468d] font-medium hover:bg-[#6cbbe1]/15 rounded-xl transition-all duration-300"
              >
                {link.label}
              </button>
            ))}
            
            {/* Quick Actions Mobile */}
            <div className="pt-3 mt-3 border-t border-[#6cbbe1]/20 space-y-2">
              <p className="px-4 text-xs font-semibold text-[#737373] uppercase tracking-wider">Ações Rápidas</p>
              <div className="grid grid-cols-2 gap-2 px-2">
                <Button 
                  onClick={() => scrollToSection('#contato')}
                  className="bg-[#11468d] hover:bg-[#3488b2] text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Orçamento
                </Button>
                <a
                  href={companyInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-[#25D366] hover:bg-[#22c55e] text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
