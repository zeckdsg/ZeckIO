import React from 'react';
import { differentials } from '../data/mock';
import { Award, Users, BadgeCheck, Shield, Clock, FileText } from 'lucide-react';

const iconMap = {
  Award,
  Users,
  BadgeCheck,
  Shield,
  Clock,
  FileText,
};

const Differentials = () => {
  return (
    <section id="diferenciais" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#11468d]/5 rounded-l-[100px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-[#3488b2] font-semibold text-sm uppercase tracking-wider mb-3">
              Por que escolher a RGS?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#11468d] mb-6">
              Excelência em cada
              <span className="text-[#3488b2]"> detalhe</span>
            </h2>
            <p className="text-[#737373] text-lg mb-8">
              Nossa missão é transformar ambientes com qualidade superior, respeitando prazos 
              e superando as expectativas dos nossos clientes. Conheça nossos diferenciais:
            </p>

            {/* CTA */}
            <div className="flex items-center gap-4 p-6 bg-[#6cbbe1]/10 rounded-2xl">
              <div className="w-12 h-12 bg-[#11468d] rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-[#11468d]">Garantia Total</h4>
                <p className="text-sm text-[#737373]">Todos os serviços possuem garantia estendida por escrito</p>
              </div>
            </div>
          </div>

          {/* Differentials Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {differentials.slice(0, 6).map((item, index) => {
              const IconComponent = iconMap[item.icon];
              return (
                <div
                  key={item.id}
                  className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-[#11468d]/5'
                  }`}
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4">
                    {IconComponent && (
                      <IconComponent className="w-6 h-6 text-[#11468d]" />
                    )}
                  </div>
                  <h3 className="font-bold text-[#11468d] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#737373]">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentials;
