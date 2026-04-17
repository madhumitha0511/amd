import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import StyleDNA from './components/StyleDNA';
import DestinationInput from './components/DestinationInput';
import VisionBoard from './components/VisionBoard';
import ShoppingCart from './components/ShoppingCart';
import MyArchives from './components/MyArchives';
import { analyzeDestination } from './services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [phase, setPhase] = useState('checking'); // checking -> dna -> input -> loading -> board -> archives
  const [visionData, setVisionData] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedDna = localStorage.getItem('LUMINA_DNA');
    const savedHistory = localStorage.getItem('LUMINA_HISTORY');
    if(savedHistory) setHistory(JSON.parse(savedHistory));

    if (savedDna) {
      setPhase('input');
    } else {
      setPhase('dna');
    }
  }, []);

  const handleAnalyze = async (textInput, imageBase64) => {
    setPhase('loading');
    setErrorMsg('');
    try {
      const profile = JSON.parse(localStorage.getItem('LUMINA_DNA'));
      const result = await analyzeDestination(textInput, imageBase64, profile);
      
      // Save Timestamp and append to history
      const finalData = { ...result, timestamp: new Date().toISOString() };
      const newHistory = [finalData, ...history];
      setHistory(newHistory);
      localStorage.setItem('LUMINA_HISTORY', JSON.stringify(newHistory));

      setVisionData(finalData);
      setPhase('board');
    } catch (e) {
      setErrorMsg(e.message);
      setPhase('input');
    }
  };

  const handleViewPastBoard = (board) => {
    setVisionData(board);
    setPhase('board');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ 
        padding: '24px 60px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid var(--border-color)',
        background: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center', flex: 1 }}>
           <button onClick={() => setPhase('dna')} style={{ fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Style Profile
           </button>
           <button onClick={() => setPhase('input')} style={{ fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Curate
           </button>
           <button onClick={() => setPhase('archives')} style={{ fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
              My Archives
           </button>
        </div>

        <h1 className="serif" style={{ fontSize: '2rem', letterSpacing: '8px', cursor: 'pointer', textAlign: 'center' }} onClick={() => setPhase('input')}>
          LUMINA
        </h1>
        
        <div style={{ display: 'flex', gap: '20px', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <button style={{ fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Sign In</button>
          <button onClick={() => setIsCartOpen(true)} style={{ position: 'relative' }}>
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cart.length > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -10, background: 'var(--accent)', 
                color: '#fff', borderRadius: '50%', width: '18px', height: '18px', 
                fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main style={{ flex: 1, padding: '40px 60px' }}>
        <AnimatePresence mode="wait">
          
          {phase === 'dna' && (
            <motion.div key="dna" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <StyleDNA onComplete={() => setPhase('input')} />
            </motion.div>
          )}

          {phase === 'input' && (
            <motion.div key="input" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <DestinationInput onAnalyze={handleAnalyze} />
              
              {errorMsg && (
                <div style={{ color: 'var(--error)', textAlign: 'center', marginTop: '30px', padding: '15px', border: '1px solid var(--error)', maxWidth: '600px', margin: '30px auto 0 auto', fontSize: '0.9rem' }}>
                  {errorMsg}
                </div>
              )}
            </motion.div>
          )}

          {phase === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center', marginTop: '150px' }}>
              <h2 className="serif" style={{ fontSize: '2.5rem', marginBottom: '20px', letterSpacing: '1px' }}>
                Curating your collection...
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Conducting 360° Biometric & Aesthetic Analysis.
              </p>
            </motion.div>
          )}

          {phase === 'board' && (
            <motion.div key="board" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <VisionBoard 
                visionData={visionData} 
                onAddToCart={(item) => setCart([...cart, item])} 
                onReset={() => setPhase('input')}
              />
            </motion.div>
          )}

          {phase === 'archives' && (
            <motion.div key="archives" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <MyArchives history={history} onViewPastBoard={handleViewPastBoard} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '40px 60px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '40px' }}>
         <span>© 2026 LUMINA LUXURY</span>
         <div style={{ display: 'flex', gap: '20px' }}>
            <span>TERMS</span>
            <span>PRIVACY</span>
            <span>CONTACT</span>
         </div>
      </footer>

      <ShoppingCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart} 
        onRemove={(idx) => setCart(cart.filter((_, i) => i !== idx))} 
      />
    </div>
  );
}

export default App;
