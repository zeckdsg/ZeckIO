import React from 'react';
import { Card, CardContent } from './ui/card';
import { services } from '../data/mock';
import { Building2, Home, Wrench, Droplets, Paintbrush, ClipboardCheck, ArrowRight } from 'lucide-react';

const iconMap = {
  Building2,
  Home,
  Wrench,
  Droplets,
  Paintbrush,
  ClipboardCheck,
};

// Map service names to their images
const imageMap = {
  'Pintura de Fachadas': '/images/fachadas.png',
  'Pintura Interna': '/images/interna.png',
  'Tratamento de Trincas': '/images/trincas.png',
  'Impermeabilização': '/images/impermeabilizacao.png',
  'Textura e Grafiato': '/images/textura.png',
  'Consultoria Técnica': '/images/consultoria.png',
};

const Services = () => {
  return (
    <section id="servicos" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#3488b2] font-semibold text-sm uppercase tracking-wider mb-3">
            Nossos Serviços
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#11468d] mb-4">
            Soluções completas em pintura
          </h2>
          <p className="text-[#737373] text-lg max-w-2xl mx-auto">
            Oferecemos uma ampla gama de serviços especializados para atender todas as necessidades do seu projeto.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            const imageUrl = imageMap[service.title];
            
            return (
              <Card
                key={service.id}
                className="group bg-white border-0 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11468d]/80 via-[#11468d]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {IconComponent && (
                      <IconComponent className="w-6 h-6 text-[#11468d]" />
                    )}
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#11468d] mb-3 group-hover:text-[#3488b2] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#737373] leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  {/* Learn more link */}
                  <div className="flex items-center text-[#3488b2] font-medium group/link cursor-pointer">
                    <span className="group-hover/link:underline">Saiba mais</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
