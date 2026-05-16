import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Copy, Check, Send } from 'lucide-react';

const SolicitacaoEspecial = ({ setView }) => {
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [description, setDescription] = useState('');
  const [copied, setCopied] = useState(false);

  const generateTracker = () => {
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const ms = new Date().getMilliseconds().toString().padStart(3, '0');
    return `#ESP-${ms}${random}`;
  };

  const generateMessage = () => {
    if (!description.trim()) {
      alert("Por favor, descreva os produtos que deseja solicitar.");
      return null;
    }
    if (!clientName.trim() || !clientContact.trim()) {
      alert("Por favor, preencha o Nome e o Contato antes de enviar.");
      return null;
    }

    const tracker = generateTracker();
    let text = `*SOLICITAÇÃO ESPECIAL (SOB ENCOMENDA)*\n`;
    text += `*UNION INTERNATIONAL TRADING*\n`;
    text += `--------------------------------------\n`;
    text += `*ID:* ${tracker}\n`;
    text += `*Cliente:* ${clientName}\n`;
    text += `*Contato:* ${clientContact}\n`;
    text += `--------------------------------------\n`;
    text += `*DESCRIÇÃO DO PEDIDO:*\n\n`;
    text += `${description}\n`;
    text += `\n--------------------------------------\n`;
    text += `Solicito cotação para importação destes itens.\n`;
    text += `*Em cada movimento, confie na Union.*\n`;

    return text;
  };

  const sendToWhatsApp = () => {
    const text = generateMessage();
    if (!text) return;
    const phone = "258866159195";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const copyToClipboard = () => {
    const text = generateMessage();
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => setView('home')} 
          className="flex items-center gap-2 opacity-60 hover:opacity-100 hover-lift mb-8 font-mono"
        >
          <ArrowLeft size={16} /> Voltar para o Site
        </button>

        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl mb-6">Solicitação Especial</h1>
          <div className="inline-block bg-primary text-background px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Importação Direta & Encomendas
          </div>
          <p className="text-lg opacity-70 max-w-2xl font-mono">
            Para materiais de construção e suprimentos estruturais, utilize este formulário para descrever exatamente o que precisa. Nossa equipe logística fará o levantamento internacional para si.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <div className="bg-dark/5 p-8 border border-dark/10 rounded-[2rem] flex flex-col h-full">
              <h3 className="text-2xl mb-8 font-bold">Detalhes da Solicitação</h3>
              
              <div className="space-y-6 flex-grow">
                <div>
                  <label className="block text-sm opacity-70 mb-2 font-mono">Nome / Empresa</label>
                  <input 
                    type="text" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-background border border-dark/20 rounded-xl px-4 py-4 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Ex: Construções Moçambique Lda."
                  />
                </div>
                
                <div>
                  <label className="block text-sm opacity-70 mb-2 font-mono">Telefone / E-mail de Contacto</label>
                  <input 
                    type="text" 
                    value={clientContact}
                    onChange={(e) => setClientContact(e.target.value)}
                    className="w-full bg-background border border-dark/20 rounded-xl px-4 py-4 focus:outline-none focus:border-primary transition-colors"
                    placeholder="+258 8X XXX XXXX"
                  />
                </div>

                <div className="flex-grow">
                  <label className="block text-sm opacity-70 mb-2 font-mono">O que precisa? (Produtos e Quantidades)</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-background border border-dark/20 rounded-2xl px-4 py-4 focus:outline-none focus:border-primary transition-colors h-64 md:h-80 resize-none font-mono"
                    placeholder="Ex: 500 toneladas de Aço CA-50, 2000 sacos de cimento CP-IV..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-dark text-background p-8 md:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                 <Send size={200} className="translate-x-1/4 -translate-y-1/4" />
              </div>
              
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-6">Próximos Passos</h4>
                <ul className="space-y-6 mb-12">
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                    <p className="text-sm opacity-80 leading-relaxed">Sua solicitação é processada pelo nosso departamento de compras internacionais.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                    <p className="text-sm opacity-80 leading-relaxed">Identificamos os melhores fornecedores globais e calculamos a logística até Moçambique.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                    <p className="text-sm opacity-80 leading-relaxed">Entramos em contacto com uma proposta técnica e comercial detalhada.</p>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 relative z-10">
                <button 
                  onClick={sendToWhatsApp}
                  className="w-full bg-[#25D366] text-white rounded-2xl py-5 font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-xl"
                >
                  <MessageCircle size={24} /> Enviar via WhatsApp
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="w-full border border-background/20 text-background rounded-2xl py-5 font-bold flex items-center justify-center gap-3 hover:bg-background/10 transition-colors"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                  {copied ? 'Copiado!' : 'Copiar para Área de Transferência'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolicitacaoEspecial;
