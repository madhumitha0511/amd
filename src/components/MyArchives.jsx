import { Clock, ArrowRight } from 'lucide-react';

export default function MyArchives({ history, onViewPastBoard }) {
  if (!history || history.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          No previous curations found.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      <h2 className="serif" style={{ fontSize: '2.5rem', marginBottom: '40px' }}>My Lookbooks</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
        {history.map((board, idx) => (
          <div 
            key={idx} 
            onClick={() => onViewPastBoard(board)}
            style={{ 
              border: '1px solid var(--border-color)', 
              padding: '30px', 
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: '#fff'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
          >
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
               {board.color_palette?.slice(0, 3).map((color, i) => (
                 <div key={i} style={{ width: '16px', height: '16px', borderRadius: '50%', background: color, border: '1px solid var(--border-color)' }} />
               ))}
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '10px' }}>{board.theme}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={12} /> {new Date(board.timestamp).toLocaleDateString()}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '500' }}>
               View Collection <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
