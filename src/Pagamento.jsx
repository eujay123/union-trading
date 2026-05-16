import React, { useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { gsap } from 'gsap';
import { ArrowLeft, Phone, MessageSquare, CreditCard, Copy, CheckCircle2 } from 'lucide-react';

const Pagamento = ({ setView }) => {
  const containerRef = useRef(null);
  const phone = "+258 866 159 195";
  const cleanPhone = "258866159195";
  const whatsappLink = `https://wa.me/${cleanPhone}?text=Olá! Gostaria de proceder com o pagamento do meu pedido na Union Trading.`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pay-card', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
      
      gsap.from('.qr-container', {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'back.out(1.7)'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-dark/60 hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm uppercase tracking-widest">Voltar para o Início</span>
        </button>

        <header className="mb-16">
          <h1 className="font-drama text-5xl md:text-7xl text-dark mb-4">Portal de Pagamento</h1>
          <p className="font-mono text-lg opacity-70 max-w-2xl">
            Escolha o método de sua preferência para concluir a transação de forma segura.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* WhatsApp / Deep Link Card */}
          <div className="pay-card bg-white border border-dark/5 rounded-[2.5rem] p-8 md:p-10 shadow-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-600 mb-6">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Pagar via WhatsApp</h3>
            <p className="text-sm opacity-60 mb-8 font-mono">
              Escaneie o código abaixo para abrir o chat diretamente com o nosso financeiro.
            </p>
            
            <div className="qr-container p-4 bg-white border-4 border-primary/10 rounded-3xl mb-8">
              <QRCodeSVG 
                value={whatsappLink} 
                size={200}
                includeMargin={true}
                level="H"
                fgColor="#111111"
              />
            </div>

            <a 
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-dark text-white py-4 rounded-full font-bold hover:bg-primary transition-colors flex items-center justify-center gap-2"
            >
              Abrir WhatsApp <ArrowLeft className="rotate-180" size={18} />
            </a>
          </div>

          {/* M-Pesa / Instructions Card */}
          <div className="pay-card bg-dark text-background rounded-[2.5rem] p-8 md:p-10 shadow-xl flex flex-col">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6">
              <CreditCard size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">M-Pesa / e-Mola</h3>
            <p className="text-sm opacity-60 mb-8 font-mono">
              Siga os passos abaixo no seu telemóvel para realizar o pagamento manual.
            </p>

            <div className="space-y-6 flex-grow">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center text-primary font-bold shrink-0">1</div>
                <div>
                  <p className="font-bold text-white">Número da Conta</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono text-xl text-primary">{phone}</span>
                    <button 
                      onClick={() => copyToClipboard(cleanPhone)}
                      className="p-1 hover:text-primary transition-colors"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center text-primary font-bold shrink-0">2</div>
                <div>
                  <p className="font-bold text-white">Procedimento</p>
                  <p className="text-sm opacity-70">Disque *150# (M-Pesa) ou *155# (e-Mola) e escolha a opção "Transferir Dinheiro".</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center text-primary font-bold shrink-0">3</div>
                <div>
                  <p className="font-bold text-white">Confirmação</p>
                  <p className="text-sm opacity-70">Após o envio, encaminhe o comprovativo para o nosso WhatsApp para validação imediata.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 text-xs font-mono opacity-50 uppercase tracking-tighter">
                <CheckCircle2 size={14} className="text-primary" />
                <span>Transação Protegida pela Union International</span>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-20 p-8 border border-dark/5 rounded-[2rem] bg-background/50 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                <Phone size={20} />
             </div>
             <div>
               <h4 className="font-bold">Precisa de Ajuda?</h4>
               <p className="text-sm opacity-60 font-mono">Suporte Financeiro: {phone}</p>
             </div>
          </div>
          <button className="text-primary font-bold hover:underline font-mono text-sm">Falar com Atendimento</button>
        </section>
      </div>
    </div>
  );
};

export default Pagamento;
