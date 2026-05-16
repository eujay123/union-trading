import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Search, Plus } from 'lucide-react';
import { PRODUCTS } from './data/products';

const Catalogo = ({ setView, initialCategory = 'Todos' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);

  const categories = ['Todos', 'Pneus', 'Lubrificantes', 'Obras'];

  useEffect(() => {
    let result = PRODUCTS;
    if (activeCategory !== 'Todos') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(lowerSearch));
    }
    setFilteredProducts(result);
  }, [searchTerm, activeCategory]);

  return (
    <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => {
            setView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          className="flex items-center gap-2 opacity-60 hover:opacity-100 hover-lift mb-8 font-mono"
        >
          <ArrowLeft size={16} /> Voltar para o Site
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-16">
          <div>
            <h1 className="text-3xl md:text-6xl mb-4 leading-tight">
              {activeCategory === 'Todos' ? 'Catálogo de Produtos' : `Galeria de ${activeCategory}`}
            </h1>
            <p className="text-base md:text-lg opacity-70 max-w-2xl font-mono leading-relaxed">
              Explore a nossa galeria de produtos importados de alta qualidade.
            </p>
          </div>
        </div>

        {/* Product Sections */}
        {['Pneus', 'Lubrificantes', 'Obras']
          .filter(cat => activeCategory === 'Todos' || activeCategory === cat)
          .map(category => {
            const categoryProducts = filteredProducts.filter(p => p.category === category);
            
            // Special Case for Obras (On Demand)
            if (category === 'Obras') {
              return (
                <div key={category} className="mb-24 last:mb-0">
                  <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest">Materiais de Obra</h2>
                    <div className="h-px bg-dark/10 flex-grow"></div>
                  </div>

                  <div className="bg-dark/5 border border-dark/10 rounded-[3rem] overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="h-[300px] md:h-[500px] overflow-hidden">
                        <img 
                          src="/img/obras/obras.jpg?v=1" 
                          alt="Materiais Diversos" 
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                      </div>
                      <div className="p-8 md:p-16 flex flex-col justify-center bg-background">
                        <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4">Serviço Estratégico</span>
                        <h3 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">Suprimentos Sob Encomenda</h3>
                        <p className="text-lg opacity-70 font-mono mb-10 leading-relaxed">
                          Diferente dos nossos lubrificantes e pneus em stock, a nossa linha de materiais de construção (Aço, Cimento, Tubagens e Ferragens) funciona exclusivamente sob regime de <strong className="text-dark">importação direta e encomenda personalizada</strong>.
                        </p>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3 text-sm font-bold opacity-60">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Cotas de importação otimizadas
                          </div>
                          <div className="flex items-center gap-3 text-sm font-bold opacity-60">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Logística porta-a-porta
                          </div>
                          <div className="flex items-center gap-3 text-sm font-bold opacity-60">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Certificação de qualidade internacional
                          </div>
                        </div>
                        <button 
                          onClick={() => setView('solicitacao-especial')}
                          className="mt-12 bg-dark text-background px-8 py-5 rounded-2xl font-bold hover:scale-[1.02] transition-transform w-full md:w-max"
                        >
                          Solicitar Cotação Especial
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            if (categoryProducts.length === 0) return null;

            return (
              <div key={category} className="mb-24 last:mb-0">
                <div className="flex items-center gap-4 mb-8 md:mb-10">
                  <h2 className="text-lg md:text-3xl font-bold uppercase tracking-[0.2em]">{category}</h2>
                  <div className="h-px bg-dark/10 flex-grow"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
                  {categoryProducts.map(product => (
                    <div key={product.id} className="bg-dark/5 border border-dark/10 rounded-[2.5rem] overflow-hidden flex flex-col group hover:border-primary/50 transition-colors hover-lift">
                      <div className="relative h-56 md:h-64 overflow-hidden bg-background">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent opacity-50 mix-blend-multiply"></div>
                      </div>
                      <div className="p-6 md:p-8 flex flex-col flex-grow bg-background">
                        <h3 className="font-bold text-base md:text-lg leading-tight mb-4 flex-grow">{product.name}</h3>
                        <div className="w-12 h-1 bg-primary/20 rounded-full group-hover:w-full transition-all duration-500"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Download Button for this category */}
                <div className="flex justify-center md:justify-start">
                  <a 
                    href={`/catalogo-${category.toLowerCase()}.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-dark text-background px-6 md:px-8 py-4 md:py-5 rounded-2xl font-bold hover:scale-[1.02] transition-transform flex items-center gap-4 group w-full md:w-max"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group-hover:rotate-12 transition-transform shrink-0">
                      <Plus size={20} />
                    </div>
                    <div className="text-left">
                      <span className="block opacity-50 text-[9px] md:text-[10px] uppercase tracking-[0.2em] leading-none mb-1">Ficha Técnica Completa</span>
                      <span className="text-sm md:text-lg leading-none">Baixar Catálogo de {category}</span>
                    </div>
                  </a>
                </div>
              </div>
            );
          })}

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center opacity-50 font-mono">
            Nenhum produto encontrado.
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalogo;
