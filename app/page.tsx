'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { products } from '@/data/coffee';
import ScrollyCanvas from '@/components/ScrollyCanvas';
import OverlayText from '@/components/OverlayText';

export default function Home() {
  const [activeProductId, setActiveProductId] = useState(products[0].id);
  const activeProduct = products.find((p) => p.id === activeProductId) || products[0];



  // Calculate progress for the hero section specifically if needed, 
  // but if the Hero is the main scrolly container, we use scrollYProgress.
  // Actually, we want the canvas to animate over the length of the Hero section.

  // Ref for the sticky container
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  const handleSwitchProduct = (id: string) => {
    setActiveProductId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="bg-brand-dark min-h-screen selection:bg-brand-gold selection:text-brand-dark">

      {/* Flavor Switcher (Fixed) */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex gap-4 bg-brand-dark/80 backdrop-blur-md px-6 py-3 rounded-full border border-brand-gold/20">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => handleSwitchProduct(product.id)}
            className={`text-sm tracking-widest uppercase transition-colors duration-300 ${activeProductId === product.id ? 'text-brand-gold font-bold' : 'text-brand-cream/60 hover:text-brand-cream'
              }`}
          >
            {product.name}
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeProduct.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero Scrolly Section (500vh) */}
          <div ref={heroRef} className="relative h-[500vh]">
            <div className="sticky top-0 h-screen overflow-hidden">
              {/* Background Canvas */}
              <ScrollyCanvas folderPath={activeProduct.folderPath} scrollProgress={heroProgress} />

              {/* Overlay Text Segments */}
              {activeProduct.scrollySegments.map((segment, idx) => (
                <OverlayText
                  key={idx}
                  text={segment.text}
                  triggerPercent={segment.triggerPercent}
                  scrollProgress={heroProgress}
                />
              ))}

              {/* Initial Title */}
              <motion.div
                style={{ opacity: useTransform(heroProgress, [0, 0.05], [1, 0]) }}
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              >
                <h1 className="text-6xl md:text-8xl font-serif text-brand-gold mb-4">{activeProduct.name}</h1>
                <p className="text-xl md:text-2xl text-brand-cream tracking-[0.2em]">{activeProduct.slogan}</p>
                <div className="mt-12 text-sm text-brand-cream/50 animate-bounce">SCROLL TO AWAKEN</div>
              </motion.div>
            </div>
          </div>

          {/* Flavor Profile Section */}
          <section className="relative z-10 py-32 px-6 md:px-20 bg-brand-dark border-t border-brand-gold/10">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-4xl font-serif text-brand-gold mb-8">Flavor Profile</h3>
                <div className="space-y-6">
                  {/* Roast Level */}
                  <div>
                    <div className="flex justify-between text-brand-cream mb-2">
                      <span>Roast Intensity</span>
                      <span>{activeProduct.roastLevel}/10</span>
                    </div>
                    <div className="h-2 w-full bg-brand-cream/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(activeProduct.roastLevel / 10) * 100}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-brand-gold"
                      />
                    </div>
                  </div>

                  {/* Origin & Elevation */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="p-4 border border-brand-gold/20 rounded-lg">
                      <span className="block text-brand-gold text-xs uppercase tracking-wider mb-1">Origin</span>
                      <span className="text-brand-cream text-lg">{activeProduct.meta.origin}</span>
                    </div>
                    <div className="p-4 border border-brand-gold/20 rounded-lg">
                      <span className="block text-brand-gold text-xs uppercase tracking-wider mb-1">Elevation</span>
                      <span className="text-brand-cream text-lg">{activeProduct.meta.elevation}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-brand-cream/80 leading-relaxed font-sans text-lg">
                <p>
                  Every bean of <span className="text-brand-gold">{activeProduct.name}</span> tells a story required by the soil and the sun.
                  Experienced sommeliers have carefully selected this roast to embody the spirit of its origin.
                </p>
              </div>
            </div>
          </section>

          {/* The Sommelier's Note */}
          <section className="relative z-10 py-32 px-6 bg-brand-cream text-brand-dark">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-5xl md:text-7xl font-serif mb-8 italic">The Sommelier's Note</h3>
              <p className="text-xl md:text-2xl leading-relaxed">
                "A symphony of notes that begins with a whisper and ends with a crescendo. {activeProduct.name} is not just coffee; it is a ritual of introspection."
              </p>
            </div>
          </section>

          {/* Purchase Section */}
          <section className="relative z-10 py-32 px-6 flex justify-center items-center bg-[url('/noise.png')]">
            <div className="absolute inset-0 bg-brand-gold/5 pointer-events-none" />
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 p-12 rounded-2xl max-w-lg w-full text-center shadow-2xl">
              <h2 className="text-4xl font-serif text-brand-gold mb-2">{activeProduct.name}</h2>
              <div className="text-3xl text-brand-cream font-light mb-8">{activeProduct.meta.price}</div>

              <button className="w-full py-4 bg-brand-gold text-brand-dark font-bold tracking-widest uppercase hover:bg-white transition-colors duration-300">
                Add to Cart
              </button>
              <p className="mt-4 text-xs text-brand-cream/40 uppercase tracking-widest">Free Shipping Worldwide</p>
            </div>
          </section>

        </motion.div>
      </AnimatePresence>
    </main>
  );
}
