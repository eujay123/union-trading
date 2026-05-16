import React, { useState } from 'react';
import { ArrowLeft, Calendar, ArrowRight, X } from 'lucide-react';
import { BLOG_POSTS } from './data/blog';

const Blog = ({ setView, initialPost = null }) => {
  const [activePost, setActivePost] = useState(initialPost);

  const renderContent = (content) => {
    return content.trim().split('\n\n').map((paragraph, index) => {
      // Header check
      if (paragraph.trim().startsWith('###')) {
        return <h3 key={index} className="text-2xl font-bold mt-8 mb-4 text-dark">{paragraph.replace('###', '').trim()}</h3>;
      }
      
      // List check
      const lines = paragraph.split('\n');
      if (lines.some(line => line.trim().startsWith('- '))) {
        return (
          <ul key={index} className="mb-8 space-y-4">
            {lines.map((line, li) => {
              const cleanLine = line.trim().startsWith('- ') ? line.trim().substring(2) : line.trim();
              const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
              return (
                <li key={li} className="flex gap-4 opacity-80 leading-relaxed text-lg font-mono">
                  <span className="text-primary mt-1.5 shrink-0">•</span>
                  <span>
                    {parts.map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="font-bold text-dark">{part.slice(2, -2)}</strong>;
                      }
                      return part;
                    })}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      }

      // Normal paragraph
      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={index} className="mb-6 opacity-80 leading-relaxed text-lg font-mono">
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className="font-bold text-dark">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 bg-background min-h-screen relative">
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

        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl mb-4">Blog & Conhecimento</h1>
          <p className="text-lg opacity-70 max-w-2xl font-mono">
            Estratégias de otimização, guias de manutenção e novidades do setor de logística e construção em Moçambique.
          </p>
        </div>

        {/* Blog Grid */}
        {!activePost && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map(post => (
              <article 
                key={post.id} 
                className="bg-dark/5 border border-dark/10 rounded-3xl overflow-hidden flex flex-col group hover:border-primary/50 transition-colors hover-lift cursor-pointer"
                onClick={() => {
                  setActivePost(post);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="relative h-64 overflow-hidden bg-background">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-60 mix-blend-multiply"></div>
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md text-dark text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2">
                    <Calendar size={12} /> {post.date}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow bg-background">
                  <h3 className="font-bold text-xl md:text-2xl leading-tight mb-4 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="opacity-70 font-mono text-sm mb-8 flex-grow">
                    {post.excerpt}
                  </p>
                  <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary group-hover:gap-4 transition-all">
                    Ler Artigo <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Expanded Post View */}
        {activePost && (
          <div className="max-w-4xl mx-auto bg-background rounded-3xl p-6 md:p-12 border border-dark/10 shadow-lg relative animate-in fade-in zoom-in duration-500">
            <button 
              onClick={() => {
                setActivePost(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="absolute top-6 right-6 p-2 bg-dark/5 hover:bg-dark/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-center gap-2 opacity-50 font-mono text-sm mb-6">
              <Calendar size={16} /> {activePost.date}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
              {activePost.title}
            </h1>
            
            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
              <img 
                src={activePost.image} 
                alt={activePost.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="prose prose-lg max-w-none text-dark">
              {renderContent(activePost.content)}
            </div>

            <div className="mt-16 pt-8 border-t border-dark/10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col gap-4 w-full md:w-auto">
                <span className="font-bold opacity-50 uppercase tracking-widest text-xs">Partilhar Artigo</span>
                <div className="flex items-center gap-3">
                  {/* WhatsApp */}
                  <a 
                    href={`https://wa.me/?text=${encodeURIComponent(activePost.title + ' - ' + window.location.href)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full border border-dark/10 flex items-center justify-center hover:bg-[#25D366] hover:text-white hover:border-transparent transition-all hover-lift"
                    title="Partilhar no WhatsApp"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>

                  {/* Facebook */}
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full border border-dark/10 flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-transparent transition-all hover-lift"
                    title="Partilhar no Facebook"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>

                  {/* LinkedIn */}
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full border border-dark/10 flex items-center justify-center hover:bg-[#0077B5] hover:text-white hover:border-transparent transition-all hover-lift"
                    title="Partilhar no LinkedIn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
                  </a>

                  {/* Native Share (Mobile) */}
                  {navigator.share && (
                    <button 
                      onClick={() => {
                        navigator.share({
                          title: activePost.title,
                          text: activePost.excerpt,
                          url: window.location.href,
                        }).catch(() => {});
                      }}
                      className="w-12 h-12 rounded-full border border-dark/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-transparent transition-all hover-lift"
                      title="Outras opções de partilha"
                    >
                      <ArrowRight size={20} className="-rotate-45" />
                    </button>
                  )}

                  {/* Copy Link */}
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copiado para a área de transferência!');
                    }}
                    className="flex items-center gap-2 px-4 h-12 rounded-full border border-dark/10 hover:bg-dark hover:text-white hover:border-transparent transition-all hover-lift font-mono text-xs uppercase tracking-widest font-bold"
                  >
                    Copiar Link
                  </button>
                </div>
              </div>

              <button 
                onClick={() => {
                  setActivePost(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-dark text-background px-8 py-4 rounded-full font-bold hover:opacity-80 transition-all hover-lift flex items-center gap-2 w-full md:w-auto justify-center"
              >
                <ArrowLeft size={18} /> Voltar à Lista
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
