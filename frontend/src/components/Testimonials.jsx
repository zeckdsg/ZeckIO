import React from 'react';
import { Card, CardContent } from './ui/card';
import { testimonials } from '../data/mock';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section id="depoimentos" className="py-24 bg-[#11468d] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#3488b2]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#6cbbe1]/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#6cbbe1] font-semibold text-sm uppercase tracking-wider mb-3">
            Depoimentos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            A satisfação dos nossos clientes é nossa maior recompensa. Confira alguns depoimentos:
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-sm border-white/10 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8">
                <Quote className="w-10 h-10 text-[#6cbbe1]/50 mb-4" />
                
                <p className="text-white/90 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#6cbbe1] text-[#6cbbe1]" />
                  ))}
                </div>

                {/* Author */}
                <div className="border-t border-white/10 pt-4">
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-white/60 text-sm">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
