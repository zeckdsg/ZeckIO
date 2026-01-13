import React from 'react';
import { Card, CardContent } from './ui/card';
import { services } from '../data/mock';
import { Building2, Home, Wrench, Droplets, Paintbrush, ClipboardCheck } from 'lucide-react';

const iconMap = {
  Building2,
  Home,
  Wrench,
  Droplets,
  Paintbrush,
  ClipboardCheck,
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
            return (
              <Card
                key={service.id}
                className="group bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden rounded-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-[#6cbbe1]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#11468d] transition-colors duration-500">
                    {IconComponent && (
                      <IconComponent className="w-8 h-8 text-[#11468d] group-hover:text-white transition-colors duration-500" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-[#11468d] mb-3 group-hover:text-[#3488b2] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#737373] leading-relaxed">
                    {service.description}
                  </p>
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
