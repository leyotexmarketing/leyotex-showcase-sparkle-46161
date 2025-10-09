import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-primary">
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Desktop: moldura nas laterais com cor da header */}
        <div className="hidden md:block absolute inset-0 bg-primary">
          <video
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/hero-banner.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Mobile: zoom para cortar laterais pretas */}
        <div className="block md:hidden absolute inset-0 overflow-hidden">
          <video
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-auto min-w-[120%] object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/hero-banner.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Gradient Overlay - apenas na base */}
      <div className="absolute inset-x-0 bottom-0 h-32 md:h-40 bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none" />

      {/* CTA Button - base da hero */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10">
        <Link to="/produtos">
          <button className="btn-golden px-6 py-2.5 md:px-10 md:py-4 text-sm md:text-lg font-semibold rounded-full shadow-golden hover:scale-105 transform transition-all duration-300">
            Explorar Novidades
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;