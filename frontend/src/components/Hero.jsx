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
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-[#11468d]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#11468d] via-[#11468d]/95 to-[#3488b2]/80" />
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#6cbbe1]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#3488b2]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <CheckCircle2 className="w-4 h-4 text-[#6cbbe1]" />
              <span className="text-white/90 text-sm font-medium">+15 anos de experiência no mercado</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Transformamos
              <span className="block text-[#6cbbe1]">seu patrimônio</span>
              com excelência
            </h1>
            
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
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
                  className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
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
                  <span className="text-white/80 text-sm">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="text-center p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors duration-300"
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
                className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl"
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
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
