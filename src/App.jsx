import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CircleDashed, Droplets, HardHat, MapPin, Calendar } from 'lucide-react';
import { BLOG_POSTS } from './data/blog';
import { ErrorBoundary } from 'react-error-boundary';
import Cotacao from './Cotacao';
import Catalogo from './Catalogo';
import Blog from './Blog';
import SolicitacaoEspecial from './SolicitacaoEspecial';

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({ setView, setCategory }) => {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: { className: 'nav-scrolled', targets: navRef.current },
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full border border-transparent [&.nav-scrolled]:bg-background/50 [&.nav-scrolled]:backdrop-blur-xl [&.nav-scrolled]:border-dark/10 [&.nav-scrolled]:text-dark text-background px-4 md:px-6 py-2 md:py-3 flex justify-between items-center w-[95%] md:w-[90%] max-w-5xl">
      <div 
        className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
        onClick={() => {
          setView('home', null, true);
        }}
      >
        <img src="/logo.png" alt="UNION Logo" className="nav-logo" />
      </div>
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 lg:gap-10 text-sm font-medium whitespace-nowrap">
        <button className="hover-lift" onClick={() => { setView('home'); setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Produtos</button>
        <button className="hover-lift" onClick={() => { setView('blog'); }}>Blog</button>
        <button className="hover-lift" onClick={() => { setView('home'); setTimeout(() => document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Manifesto</button>
        <button className="hover-lift" onClick={() => { setView('home'); setTimeout(() => document.getElementById('identidade')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Identidade</button>
        <button className="hover-lift" onClick={() => { setView('home'); setTimeout(() => document.getElementById('contactos')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Contactos</button>
      </div>
      <div className="ml-auto">
        <button 
          onClick={() => setView('cotacao')}
          className="bg-primary text-background px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold magnetic-btn"
        >
          <div className="magnetic-btn-bg"></div>
          <span className="magnetic-btn-content flex items-center gap-1 md:gap-2">
            Pedir Cotação <ArrowRight size={14} />
          </span>
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state: video is blurred
      gsap.set(videoRef.current, { filter: 'blur(15px)' });

      // Intro text animations
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      // Master Scroll Sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=3000', // Keeps the hero pinned for 3000px of scroll
          pin: true,
          scrub: true,
        }
      });

      // 1. Fade out text and blur first
      tl.to('.hero-fade', { opacity: 0, y: -30, duration: 1 }, 0);
      tl.to(videoRef.current, { filter: 'blur(0px)', duration: 1 }, 0);

      // 2. Animate video AFTER text disappears
      const videoProgress = { val: 0 };
      tl.to(videoProgress, {
        val: 1,
        duration: 5, // Takes up the remaining 5 parts of the scroll
        ease: 'none',
        onUpdate: () => {
          if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration)) {
            // Precise frame seeking
            videoRef.current.currentTime = videoRef.current.duration * videoProgress.val;
          }
        }
      }, 1); 

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-wrapper">
      <section ref={containerRef} className="relative h-[100dvh] w-full flex items-center justify-center text-center overflow-hidden rounded-b-[3rem] bg-dark">
        <div className="absolute inset-0 z-0">
          <video 
            ref={videoRef}
            src="/hero-bg-intra.mp4" 
            muted 
            playsInline
            className="w-full h-full object-cover scale-[1.05]"
          ></video>
        </div>
        
        <div className="hero-fade relative z-10 w-full max-w-6xl px-6 text-background">
          <h1 className="hero-text font-drama text-4xl sm:text-5xl md:text-7xl lg:text-[8rem] text-background/90 leading-[1] mb-6 drop-shadow-2xl">
            Union International Trading
          </h1>
          <p className="hero-text text-base sm:text-lg md:text-2xl font-mono opacity-90 drop-shadow-lg tracking-widest lowercase">
            em cada movimento confie na union
          </p>
        </div>
      </section>
    </div>
  );
};

const ProductCard = ({ title, description, setView, setCategory, category, icon: Icon, initialItems }) => {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newItems = [...prev];
        const last = newItems.pop();
        newItems.unshift(last);
        return newItems;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [initialItems]);

  return (
    <div onClick={() => { setCategory(category); setView('catalogo'); }} className="block bg-background border border-dark/10 rounded-[2rem] p-8 shadow-sm flex flex-col h-auto min-h-[350px] md:min-h-[380px] hover:border-primary transition-colors hover:shadow-md cursor-pointer group">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="text-primary group-hover:scale-110 transition-transform" />
        <h3 className="text-xl group-hover:text-primary transition-colors">{title}</h3>
      </div>
      <p className="text-sm opacity-70 mb-auto">{description}</p>
      
      <div className="relative h-40 w-full mt-6 perspective-1000 overflow-hidden">
        {items.map((item, i) => (
          <div 
            key={item}
            className="absolute w-full bg-dark text-background p-4 rounded-xl font-data text-xs flex flex-col justify-center transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] gap-1"
            style={{
              top: `${i * 15}px`,
              scale: 1 - i * 0.05,
              opacity: 1 - i * 0.2,
              zIndex: 10 - i,
            }}
          >
            <div className="flex items-center justify-between opacity-50 mb-1">
               <span>SKU_0{i+1}</span>
               <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            </div>
            <span className="leading-tight text-[11px] uppercase">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Features = ({ setView, setCategory }) => {
  return (
    <section id="features" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProductCard 
           title="Pneus de Alto Desempenho"
           description="Pneus industriais projetados para máxima durabilidade, tração superior e resistência em terrenos extremos."
           setView={setView}
           setCategory={setCategory}
           category="Pneus"
           icon={CircleDashed}
           initialItems={[
             "CHAOYANG 11.00R20-18PR [CR926] MIX - MISTO",
             "CHAOYANG 12.00R20-18PR [CB919] MINING - MINERACAO"
           ]}
        />
        <ProductCard 
           title="Lubrificantes"
           description="Fluidos sintéticos e minerais de altíssima performance para garantir a vida útil dos seus equipamentos pesados."
           setView={setView}
           setCategory={setCategory}
           category="Lubrificantes"
           icon={Droplets}
           initialItems={[
             "UNION ENERGY MARULA SAE 20W-50 API SL/CF 24x1 L",
             "UNION ENERGY TRANSFORMER OIL 208L"
           ]}
        />
        <ProductCard 
           title="Materiais para Obra"
           description="Suprimentos estruturais e insumos baseados em precisão para garantir a fundação e segurança dos seus projetos."
           setView={setView}
           setCategory={setCategory}
           category="Obras"
           icon={HardHat}
           initialItems={[
             "CIMENTO ESTRUTURAL CP-II Z-32 50KG",
             "AÇO CA-50 VERGALHÃO 10mm (BARRA 12M)"
           ]}
        />
      </div>
    </section>
  );
};

const Philosophy = () => {
  const containerRef = useRef(null);

  const partners = [
    "UNION ENERGY, LDA", "WATT TRADE, LDA", "BACERA SOLUTIONS, LDA", "MISSO ENERGY, LDA", "UNION OIL DEPOT, LDA", "3S TRANSPORT, LDA", "TOYUAM ENERGY, LDA"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-word', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out'
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="philosophy" className="relative pt-40 pb-20 px-0 bg-dark text-background overflow-hidden rounded-[3rem]">
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-24 mb-32">
        <h2 className="text-3xl md:text-5xl lg:text-7xl leading-[1.2] flex flex-wrap mb-16">
          {"Diariamente garantimos que o mercado nacional e internacional tenha os melhores produtos da diáspora.".split(" ").map((w,i) => <span key={`t1-${i}`} className="phil-word mr-3 md:mr-5 mb-2">{w}</span>)}
        </h2>
        <p className="font-mono text-lg md:text-xl opacity-80 flex flex-wrap max-w-4xl leading-relaxed">
          {"Pneus e lubrificantes de qualidade que complementam o dia a dia das suas operações no seu ambiente de trabalho.".split(" ").map((w,i) => <span key={`t2-${i}`} className="phil-word mr-3 mb-2">{w}</span>)}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 mb-10">
        <span className="font-mono text-xs uppercase tracking-[0.3em] opacity-40">Nossos parceiros</span>
      </div>

      <div className="relative z-10 w-full overflow-hidden border-y border-background/10 py-6 bg-dark/50 backdrop-blur-sm">
        <div className="flex w-max animate-marquee">
          {[...Array(2)].map((_, blockIdx) => (
            <div key={blockIdx} className="flex gap-12 md:gap-24 items-center px-6 md:px-12 flex-shrink-0">
               {partners.map((p, i) => (
                 <span key={`p${blockIdx}-${i}`} className="font-drama text-3xl md:text-4xl opacity-50 whitespace-nowrap">
                   {p}
                 </span>
               ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProtocolCard = ({ index, title, desc, children }) => {
  return (
    <div className="w-full">
      <div className="protocol-card min-h-[60vh] md:min-h-[80vh] bg-background border border-dark/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-8 md:gap-12 sticky top-24 mb-16 md:mb-24">
        <div className="w-full md:w-1/2">
          <div className="font-data text-primary text-xl mb-6">0{index}</div>
          <h2 className="text-4xl md:text-5xl mb-6">{title}</h2>
          <div className="text-lg opacity-70 max-w-md">{desc}</div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center h-[300px]">
          {children}
        </div>
      </div>
    </div>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: 'top 10%',
          endTrigger: containerRef.current,
          end: 'bottom 20%',
          pin: true,
          pinSpacing: false,
          animation: gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            filter: 'blur(10px)',
            ease: 'none'
          }),
          scrub: true
        });
      });
      
      // Step 1 animation
      gsap.to('.geo-shape', { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
      
      // Step 2 animation
      gsap.to('.laser-line', { y: 200, duration: 2, yoyo: true, repeat: -1, ease: 'linear' });
      
      // Step 3 animation
      gsap.to('.ekg-path', { strokeDashoffset: 0, duration: 2, repeat: -1, ease: 'power1.inOut' });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="identidade" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-background relative">
      <div className="max-w-5xl mx-auto mb-20 md:mb-32">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Union International Trading</h2>
        <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-6 font-mono">
          A Union International Trading é uma empresa especializada na importação e distribuição de lubrificantes e pneus de alto desempenho. Como parte do Grupo Union, conectamos Moçambique aos melhores produtos e marcas internacionais, oferecendo soluções de qualidade, confiabilidade e competitividade para os setores de transportes, mineração, indústria e retalho.
        </p>
        <p className="text-lg md:text-xl opacity-80 leading-relaxed font-mono">
          Com foco na excelência operacional e em parcerias sólidas, garantimos entrega rápida e segura em todo o país, contribuindo ativamente no desenvolvimento económico e social de Moçambique.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <ProtocolCard 
          index={1} 
          title="Missão" 
          desc="Ser o parceiro de referência em comércio internacional, entregando produtos de alta qualidade de forma confiável, eficiente e com excelência no atendimento, criando valor sustentável para os nossos clientes e para o país."
        >
          <svg viewBox="0 0 200 200" className="w-64 h-64 geo-shape text-primary">
            <rect x="50" y="50" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="2" className="geo-shape opacity-50"/>
            <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
            <path d="M100 20 L100 180 M20 100 L180 100" stroke="currentColor" strokeWidth="1" className="opacity-30" />
          </svg>
        </ProtocolCard>

        <ProtocolCard 
          index={2} 
          title="Visão" 
          desc="Ser a principal referência em distribuição de lubrificantes e pneus na África Austral, garantindo confiabilidade, qualidade e excelência no fornecimento de produtos até 2035."
        >
          <div className="relative w-64 h-64 bg-dark/5 border border-dark/10 rounded-xl overflow-hidden flex flex-wrap gap-1 p-2">
            {Array.from({length: 64}).map((_, i) => (
              <div key={i} className="w-[calc(12.5%-4px)] aspect-square bg-dark/10 rounded-sm"></div>
            ))}
            <div className="laser-line absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_10px_#154E9B] z-10"></div>
          </div>
        </ProtocolCard>

        <ProtocolCard 
          index={3} 
          title="Valores" 
          desc={
            <ul className="space-y-3 list-none">
              <li>• Integridade e Transparência</li>
              <li>• Excelência e Qualidade</li>
              <li>• Confiabilidade</li>
              <li>• Inovação</li>
              <li>• Compromisso com o desenvolvimento sustentável</li>
            </ul>
          }
        >
          <svg viewBox="0 0 300 100" className="w-full">
            <path 
              className="ekg-path"
              d="M0 50 L80 50 L95 20 L115 90 L135 10 L150 50 L300 50" 
              fill="none" 
              stroke="#154E9B" 
              strokeWidth="3" 
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="400"
              strokeDashoffset="400"
            />
          </svg>
        </ProtocolCard>
      </div>
    </section>
  );
};

const Clients = () => {
  const clients = [
    { name: "FOSELEV", logo: "/img/marcas/1.png", link: "https://www.foselev.com/" },
    { name: "MTM", logo: "/img/marcas/4.png", link: "https://www.mtm.co.mz/" },
    { name: "TCR TRANSPORTES", logo: "/img/marcas/5.png", link: "#" },
    { name: "Frigo Expresso", logo: "/img/marcas/frigo.png", link: "https://frigoexpresso.co.mz/" }
  ];

  return (
    <section id="clients" className="py-12 md:py-16 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Nossos Clientes</h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-12 md:gap-x-24 gap-y-12">
          {clients.map((client, i) => (
            <a 
              key={i} 
              href={client.link} 
              target="_blank" 
              rel="noreferrer"
              className="group transition-all duration-500"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-10 md:h-14 w-auto object-contain grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const LatestBlog = ({ setView }) => {
  // Get the 3 most recent posts
  const recentPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Últimas do Blog</h2>
            <p className="text-lg opacity-70 font-mono">
              Fique por dentro das novidades, guias técnicos e estratégias do setor em Moçambique.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {recentPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-dark/5 border border-dark/10 rounded-[2rem] overflow-hidden flex flex-col group hover:border-primary/50 transition-colors hover-lift cursor-pointer"
              onClick={() => {
                setView('blog', post);
              }}
            >
              <div className="relative h-48 overflow-hidden bg-dark">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md text-dark text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-2">
                  <Calendar size={10} /> {post.date}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow bg-background">
                <h3 className="font-bold text-lg leading-tight mb-4 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="opacity-70 font-mono text-xs mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary group-hover:gap-4 transition-all">
                  Ler Artigo <ArrowRight size={14} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center">
          <button 
            onClick={() => setView('blog')}
            className="bg-primary text-background px-8 py-4 rounded-full text-lg font-bold magnetic-btn w-full md:w-auto"
          >
            <div className="magnetic-btn-bg"></div>
            <span className="magnetic-btn-content flex items-center justify-center gap-3">
              Ver Todo o Blog <ArrowRight />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

const GetStarted = ({ setView }) => {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-4xl mx-auto bg-dark text-background rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-dark to-dark"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-6">Solicite sua Cotação.</h2>
          <p className="text-base md:text-lg opacity-70 mb-10 max-w-2xl mx-auto font-mono">
            Sistema ágil e direto. Adicione pneus, lubrificantes e materiais ao seu carrinho e envie diretamente para nossa equipe comercial.
          </p>
          <button 
            onClick={() => {
              setView('cotacao');
              window.scrollTo(0,0);
            }}
            className="bg-primary text-background px-6 md:px-10 py-4 md:py-5 rounded-full text-base md:text-xl font-bold magnetic-btn w-full md:w-auto"
          >
            <div className="magnetic-btn-bg"></div>
            <span className="magnetic-btn-content flex items-center justify-center gap-3">
              Fazer Pedido de Cotação <ArrowRight />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

const unionData = {
  contact: {
    address: "Tchumene N. 3380/8-Matola- EN4",
    phone: "+258 866 159 195",
    email: "sales@uniontradingmz.com",
    website: "www.uniontrading.com"
  },
  socials: {
    googleMaps: "https://maps.app.goo.gl/wgeARrGRoJta2VVA8",
    instagram: "https://www.instagram.com/union.international.trading?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    facebook: "https://www.facebook.com/union.intern/?modal=focused_switcher_dialog",
    tiktok: "https://www.tiktok.com/@union.international.trad?is_from_webapp=1&sender_device=pc"
  }
};

const Footer = ({ setView }) => {
  return (
    <footer id="contactos" className="bg-dark text-background rounded-t-[3rem] md:rounded-t-[4rem] px-6 py-12 md:py-16 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12 md:mb-16">
        <div className="md:col-span-2">
          <div className="mb-6">
            <img src="/logo.png" alt="UNION Logo" className="h-10 w-auto brightness-0 invert" />
          </div>
          <p className="font-drama text-2xl opacity-80 max-w-md">Em cada movimento, confie na Union.</p>
          
          <div className="flex gap-4 mt-8">
            <a href={unionData.socials.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-background hover:text-dark transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href={unionData.socials.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-background hover:text-dark transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href={unionData.socials.tiktok} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-background hover:text-dark transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6 opacity-50 text-sm tracking-wider uppercase">Navegação</h4>
          <ul className="space-y-3">
            <li><button onClick={() => { setView('home'); setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover-lift inline-block">Produtos</button></li>
            <li><button onClick={() => { setView('blog'); }} className="hover-lift inline-block">Blog</button></li>
            <li><button onClick={() => { setView('home'); setTimeout(() => document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover-lift inline-block">Manifesto</button></li>
            <li><button onClick={() => { setView('home'); setTimeout(() => document.getElementById('identidade')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover-lift inline-block">Identidade</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 opacity-50 text-sm tracking-wider uppercase">Contato</h4>
          <ul className="space-y-4 font-data text-sm opacity-80">
            <li>
              <a href={`mailto:${unionData.contact.email}`} className="hover:text-primary transition-colors">{unionData.contact.email}</a>
            </li>
            <li>
              <a href={`tel:${unionData.contact.phone.replace(/\s+/g, '')}`} className="hover:text-primary transition-colors">{unionData.contact.phone}</a>
            </li>
            <li>
              <a href={unionData.socials.googleMaps} target="_blank" rel="noreferrer" className="flex items-start gap-2 hover:text-primary transition-colors group">
                <MapPin size={16} className="mt-0.5 shrink-0 group-hover:animate-bounce" />
                <span className="leading-snug">{unionData.contact.address}</span>
              </a>
            </li>
            <li className="pt-6">
              <div className="flex items-center gap-3 px-4 py-2 border border-background/20 rounded-full w-max">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs tracking-widest uppercase">System Operational</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-background/10 text-xs font-data opacity-50 text-center md:text-left">
        <p>&copy; {new Date().getFullYear()} Union International Trading. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

const App = () => {
  // Use localStorage to persist the view and category on refresh
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('union_currentView') || 'home';
  });
  const [currentCategory, setCurrentCategory] = useState(() => {
    return localStorage.getItem('union_currentCategory') || 'Todos';
  });

  // Handle browser history for back button support
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state) {
        const { view, category, blogPost } = event.state;
        setCurrentView(view || 'home');
        setCurrentCategory(category || 'Todos');
        setSelectedBlogPost(blogPost || null);
        
        // Handle scroll position restoration if going back to home
        if (view === 'home') {
          setTimeout(() => {
            window.scrollTo({ top: homeScrollPos, behavior: 'instant' });
          }, 0);
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      } else {
        // Fallback to home if no state
        setCurrentView('home');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Initial state setup if user refreshes on a subview
    if (window.history.state === null) {
      window.history.replaceState({ 
        view: currentView, 
        category: currentCategory, 
        blogPost: selectedBlogPost 
      }, '');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, [homeScrollPos, currentView, currentCategory, selectedBlogPost]);

  // Handle view changes and scroll restoration
  const handleSetView = (newView, blogPost = null, forceTop = false) => {
    if (currentView === newView && !forceTop) return;

    if (currentView === 'home' && newView !== 'home') {
      setHomeScrollPos(window.scrollY);
    }
    
    // Push new state to browser history
    window.history.pushState({ 
      view: newView, 
      category: newView === 'catalogo' ? currentCategory : 'Todos', 
      blogPost 
    }, '', newView === 'home' ? '/' : `?view=${newView}`);

    setSelectedBlogPost(blogPost);
    setCurrentView(newView);

    if (newView === 'home') {
      setTimeout(() => {
        window.scrollTo({ top: forceTop ? 0 : homeScrollPos, behavior: forceTop ? 'instant' : 'instant' });
      }, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="noise-overlay"></div>
      <Navbar setView={handleSetView} setCategory={setCurrentCategory} />
      
      {currentView === 'home' ? (
        <>
          <Hero />
          <Features setView={handleSetView} setCategory={setCurrentCategory} />
          <Philosophy />
          <Protocol />
          <Clients />
          <LatestBlog setView={handleSetView} />
          <GetStarted setView={handleSetView} />
        </>
      ) : currentView === 'catalogo' ? (
        <ErrorBoundary fallbackRender={({error}) => <div className="p-20 text-red-500 bg-white z-50 absolute inset-0"><h1>Erro:</h1><pre>{error.message}</pre><pre>{error.stack}</pre></div>}>
          <Catalogo setView={handleSetView} initialCategory={currentCategory} />
        </ErrorBoundary>
      ) : currentView === 'blog' ? (
        <ErrorBoundary fallbackRender={({error}) => <div className="p-20 text-red-500 bg-white z-50 absolute inset-0"><h1>Erro:</h1><pre>{error.message}</pre><pre>{error.stack}</pre></div>}>
          <Blog setView={handleSetView} initialPost={selectedBlogPost} />
        </ErrorBoundary>
      ) : currentView === 'solicitacao-especial' ? (
        <ErrorBoundary fallbackRender={({error}) => <div className="p-20 text-red-500 bg-white z-50 absolute inset-0"><h1>Erro:</h1><pre>{error.message}</pre><pre>{error.stack}</pre></div>}>
          <SolicitacaoEspecial setView={handleSetView} />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary fallbackRender={({error}) => <div className="p-20 text-red-500 bg-white z-50 absolute inset-0"><h1>Erro:</h1><pre>{error.message}</pre><pre>{error.stack}</pre></div>}>
          <Cotacao setView={handleSetView} />
        </ErrorBoundary>
      )}
      <Footer setView={handleSetView} />
    </div>
  );
}

export default App;
