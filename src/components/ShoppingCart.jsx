import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';

export default function ShoppingCart({ isOpen, onClose, cartItems, onRemove }) {
  const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 400 }}
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', maxWidth: '100vw',
              zIndex: 500, background: '#fff', padding: '40px 30px', display: 'flex', flexDirection: 'column',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <h2 className="serif" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Shopping Bag
              </h2>
              <button onClick={onClose} style={{ padding: '8px', color: 'var(--text-secondary)' }}>
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartItems.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '40px', fontSize: '0.9rem' }}>Your bag is empty.</p>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
                    <div style={{ paddingRight: '20px' }}>
                      <div style={{ fontWeight: '400', marginBottom: '8px', fontSize: '0.9rem' }}>{item.name}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>₹{Number(item.price).toLocaleString('en-IN')}</div>
                    </div>
                    <button onClick={() => onRemove(idx)} style={{ color: 'var(--text-secondary)', padding: '4px', alignSelf: 'flex-start' }}>
                       <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div style={{ marginTop: '20px', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '1.1rem', fontWeight: '500' }}>
                <span>Subtotal</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <button 
                className="btn-primary"
                disabled={cartItems.length === 0}
              >
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
