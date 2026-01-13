import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Phone, CheckCircle2 } from 'lucide-react';
import { companyInfo, stats } from '../data/mock';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-condominio.jpg"
          alt="Condomínio moderno"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#11468d]/90 via-[#11468d]/75 to-[#11468d]/50" />
        {/* Additional gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2d5a]/60 via-transparent to-transparent" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#6cbbe1]/15 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#3488b2]/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <CheckCircle2 className="w-4 h-4 text-[#6cbbe1]" />
              <span className="text-white/90 text-sm font-medium">+15 anos de experiência no mercado</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Transformamos
              <span className="block text-[#6cbbe1]">seu patrimônio</span>
              com excelência
            </h1>
            
            <p className="text-lg sm:text-xl text-white/85 mb-8 max-w-xl mx-auto lg:mx-0">
              Soluções completas em pintura predial para condomínios, construtoras e empresas. 
              Qualidade, pontualidade e garantia em cada projeto.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={scrollToContact}
                className="bg-white text-[#11468d] hover:bg-[#6cbbe1] hover:text-white font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                Solicitar Orçamento
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <a href={companyInfo.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="border-2 border-white/40 text-white hover:bg-white/15 font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto backdrop-blur-sm"
                >
                  <Phone className="w-5 h-5" />
                  WhatsApp
                </Button>
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-start">
              {['Orçamento Gratuito', 'Garantia de Serviço', 'Profissionais Qualificados'].map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#6cbbe1]" />
                  <span className="text-white/85 text-sm">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Card - Glass Effect */}
          <div className="hidden lg:block">
            <div 
              className="rounded-3xl p-8 border border-white/20"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="text-center p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors duration-300 border border-white/10"
                  >
                    <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="lg:hidden mt-12">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="text-center p-4 rounded-xl border border-white/15"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/70 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
