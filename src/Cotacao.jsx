import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, X, MessageCircle, Copy, Check, Table, Search, Filter } from 'lucide-react';

import { PRODUCT_DATA as PRODUCTS_DB, PRODUCT_NAMES as PRODUCTS } from './data/products';

const ProductSelectorModal = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  if (!isOpen) return null;

  const categories = ['Todos', 'Lubrificantes', 'Pneus'];
  
  const filteredProducts = PRODUCTS_DB.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-dark/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-background w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-dark/10">
        {/* Header */}
        <div className="p-5 md:p-8 border-b border-dark/5 flex justify-between items-center bg-dark/5">
          <div className="pr-4">
            <h2 className="text-xl md:text-3xl font-bold mb-1 leading-tight">Selecionar Produto</h2>
            <p className="text-[10px] md:text-sm opacity-60 font-mono uppercase tracking-wider">Lista completa de inventário</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-dark/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Filters Area */}
        <div className="p-5 md:p-8 bg-background border-b border-dark/5 space-y-4 md:space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
            <input 
              type="text"
              placeholder="Pesquise por nome, viscosidade ou modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark/5 border border-dark/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-primary transition-colors font-mono"
              autoFocus
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat 
                  ? 'bg-dark text-background' 
                  : 'bg-dark/5 text-dark hover:bg-dark/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Table/List */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="grid grid-cols-1 gap-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod) => (
                <div 
                  key={prod.id}
                  onClick={() => onSelect(prod.name)}
                  className="group flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:p-6 rounded-2xl border border-dark/5 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0 w-full md:w-auto">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-dark/5 rounded-xl flex items-center justify-center shrink-0">
                      {prod.category === 'Lubrificantes' ? <Filter size={18} className="opacity-40" /> : <Table size={18} className="opacity-40" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary mb-0.5 md:mb-1">{prod.category}</div>
                      <div className="font-bold text-sm md:text-lg leading-tight break-words">{prod.name}</div>
                    </div>
                  </div>
                  <button className="whitespace-nowrap bg-dark text-background px-6 py-3 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                    Selecionar Item
                  </button>
                  <button className="w-full md:hidden bg-dark text-background px-6 py-3 rounded-xl text-sm font-bold">
                    Selecionar
                  </button>
                </div>
              ))
            ) : (
              <div className="py-20 text-center opacity-40 font-mono">
                Nenhum produto encontrado para sua busca.
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-dark text-background/50 text-[10px] font-mono text-center uppercase tracking-[0.2em]">
          Lista de Inventário Union • {filteredProducts.length} itens encontrados
        </div>
      </div>
    </div>
  );
};

const Cotacao = ({ setView }) => {
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddItem = (e) => {
    if (e) e.preventDefault();
    if (!selectedProduct || !quantity || quantity <= 0) return;
    
    const isValid = PRODUCTS.includes(selectedProduct);
    if (!isValid) {
      alert("Por favor, selecione um produto válido da lista.");
      return;
    }

    setItems([...items, { name: selectedProduct, qty: parseInt(quantity) }]);
    setSelectedProduct('');
    setQuantity('');
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const generateTracker = () => {
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const ms = new Date().getMilliseconds().toString().padStart(3, '0');
    return `#COT-${ms}${random}`;
  };

  const generateMessage = () => {
    if (items.length === 0) {
      alert("Adicione pelo menos um produto ao pedido.");
      return null;
    }
    if (!clientName.trim() || !clientContact.trim()) {
      alert("Por favor, preencha o Nome e o Contato antes de enviar.");
      return null;
    }

    const tracker = generateTracker();
    let text = `*NOVA SOLICITAÇÃO DE COTAÇÃO*\n`;
    text += `*UNION INTERNATIONAL TRADING*\n`;
    text += `--------------------------------------\n`;
    text += `*ID:* ${tracker}\n`;
    text += `*Cliente:* ${clientName}\n`;
    text += `*Contato:* ${clientContact}\n`;
    text += `--------------------------------------\n`;
    text += `*ITENS SOLICITADOS:*\n\n`;

    items.forEach((item, index) => {
      text += `${index + 1}. [ ${item.qty} un ] - ${item.name}\n`;
    });

    text += `\n--------------------------------------\n`;
    text += `Aguardamos retorno com disponibilidade e preços.\n`;
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
    <>
      <ProductSelectorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSelect={(val) => {
          setSelectedProduct(val);
          setIsModalOpen(false);
        }}
      />
      
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => setView('home')} 
            className="flex items-center gap-2 opacity-60 hover:opacity-100 hover-lift mb-8 font-mono"
          >
            <ArrowLeft size={16} /> Voltar para o Site
          </button>

          <h1 className="text-4xl md:text-6xl mb-4">Pedido de Cotação</h1>
          <p className="text-lg opacity-70 mb-12 max-w-2xl font-mono">
            Adicione os produtos desejados à lista. Nossa equipe comercial receberá seu pedido diretamente com um ID de rastreio único para agilizar o atendimento.
          </p>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column: Form */}
            <div className="w-full lg:w-1/2">
              <div className="bg-dark/5 p-8 border border-dark/10 rounded-[2rem] mb-8">
                <h3 className="text-2xl mb-6 font-bold">1. Dados do Cliente</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm opacity-70 mb-2 font-mono">Nome / Empresa</label>
                    <input 
                      type="text" 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-background border border-dark/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                      placeholder="Sua Empresa Lda."
                    />
                  </div>
                  <div>
                    <label className="block text-sm opacity-70 mb-2 font-mono">Telefone / E-mail</label>
                    <input 
                      type="text" 
                      value={clientContact}
                      onChange={(e) => setClientContact(e.target.value)}
                      className="w-full bg-background border border-dark/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                      placeholder="+258 84 000 0000"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-dark/5 p-6 md:p-8 border border-dark/10 rounded-[2rem]">
                <h3 className="text-xl md:text-2xl mb-6 font-bold">2. Adicionar Produtos</h3>
                <form onSubmit={handleAddItem} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-[10px] md:text-sm opacity-70 mb-2 font-mono uppercase tracking-wider">Produto Selecionado</label>
                    <div className="relative flex gap-2">
                      <div className="relative flex-grow">
                        <input 
                          value={selectedProduct}
                          readOnly
                          onClick={() => setIsModalOpen(true)}
                          className="w-full bg-background border border-dark/20 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary transition-colors cursor-pointer text-sm"
                          placeholder="Toque para escolher →"
                        />
                      </div>
                      <button 
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary text-background p-3.5 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center shrink-0 group"
                      >
                        <Table size={22} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-end">
                    <div className="w-1/3">
                      <label className="block text-[10px] md:text-sm opacity-70 mb-2 font-mono uppercase tracking-wider">Qtd</label>
                      <input 
                        type="number" 
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full bg-background border border-dark/20 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary transition-colors text-sm"
                        placeholder="0"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-2/3 bg-dark text-background rounded-xl px-4 py-3.5 font-bold hover:bg-dark/90 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Plus size={18} /> Inserir Item
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Cart */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <div className="bg-background border-2 border-dark rounded-[2rem] p-8 flex-grow flex flex-col">
                <h3 className="text-2xl mb-6 font-bold flex justify-between items-center">
                  <span>Itens da Cotação</span>
                  <span className="text-sm font-data bg-dark text-background px-3 py-1 rounded-full">
                    {items.length} {items.length === 1 ? 'Item' : 'Itens'}
                  </span>
                </h3>

                <div className="flex-grow">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-40 py-20">
                      <div className="font-mono text-center">
                        Nenhum produto adicionado.<br/>
                        Use a busca ao lado para começar.
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 sm:p-4 bg-dark/5 rounded-xl border border-dark/5 gap-2">
                          <div className="flex flex-col min-w-0 flex-1">
                            <span className="font-bold text-xs sm:text-sm lg:text-base leading-tight mb-1 break-words">{item.name}</span>
                            <span className="font-data text-xs opacity-60">Qtd: {item.qty} un</span>
                          </div>
                          <button 
                            onClick={() => removeItem(idx)}
                            className="p-2 hover:bg-red-500 hover:text-white rounded-full transition-colors opacity-50 hover:opacity-100 flex-shrink-0"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-dark/10 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={copyToClipboard}
                    disabled={items.length === 0}
                    className="flex-1 border-2 border-dark text-dark rounded-xl py-3 sm:py-4 font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-dark hover:text-background text-sm sm:text-base"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? 'Copiado!' : 'Copiar Texto'}
                  </button>
                  <button 
                    onClick={sendToWhatsApp}
                    disabled={items.length === 0}
                    className="flex-1 bg-[#25D366] text-white rounded-xl py-3 sm:py-4 font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#20b858] text-sm sm:text-base"
                  >
                    <MessageCircle size={18} /> Enviar WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cotacao;
