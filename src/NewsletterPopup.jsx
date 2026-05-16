import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  useEffect(() => {
    // Initialize Firebase only once
    const firebaseConfig = {
      apiKey: "AIzaSyCqKJQj...", // Substitua pela sua chave real
      authDomain: "your-domain.firebaseapp.com",
      projectId: "your-project-id",
      storageBucket: "your-storage-bucket.appspot.com",
      messagingSenderId: "1234567890",
      appId: "1:1234567890:web:..."
    };

    if (window.firebase && !window.firebase.apps.length) {
      window.firebase.initializeApp(firebaseConfig);
    }

    // Check if user has already subscribed using a cookie
    const checkSubscriptionStatus = () => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; subscribed=`);
      if (parts.length === 2) return parts.pop().split(';').shift() === 'true';
      return false;
    };

    // Show popup if not subscribed
    if (!checkSubscriptionStatus()) {
      // Delay popup slightly for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const setSubscriptionCookie = () => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 year
    document.cookie = `subscribed=true; expires=${expirationDate.toUTCString()}; path=/`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    if (window.firebase) {
      window.firebase.firestore().collection("subscribers").add({
        email: email,
        timestamp: window.firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        setStatus('success');
        setSubscriptionCookie();
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
      }).catch((error) => {
        console.error("Erro ao subscrever:", error);
        setStatus('error');
      });
    } else {
      // Fallback se o script não carregar
      alert("Firebase não está carregado. Verifique os scripts no index.html");
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
      
      <div className="relative w-full max-w-md bg-background border border-dark/10 rounded-3xl p-8 md:p-10 shadow-2xl animate-in fade-in zoom-in duration-500">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 opacity-50 hover:opacity-100 hover:bg-dark/5 rounded-full transition-all"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-3xl font-bold mb-2">Fique na Vanguarda.</h2>
        <p className="text-dark/70 font-mono text-sm mb-8">
          Assine a nossa newsletter para receber as últimas novidades, atualizações de stock e insights do setor.
        </p>

        {status === 'success' ? (
          <div className="bg-primary/10 text-primary p-4 rounded-xl border border-primary/20 font-bold text-center animate-in fade-in">
            Obrigado por se inscrever!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="O seu melhor e-mail" 
              required
              className="w-full bg-dark/5 border border-dark/10 rounded-xl px-4 py-4 focus:outline-none focus:border-primary transition-colors font-mono"
            />
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full bg-dark text-background rounded-xl px-6 py-4 font-bold hover:bg-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === 'loading' ? 'A processar...' : (
                <>Assinar Agora <Send size={16} /></>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewsletterPopup;
