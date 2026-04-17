import ProductCard from './ProductCard';
import { Camera } from 'lucide-react';

export default function VisionBoard({ visionData, onAddToCart, onReset }) {
  if (!visionData || !visionData.items) return null;

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '20px 0' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="serif" style={{ fontSize: '3rem', marginBottom: '15px' }}>
          {visionData.theme}
        </h1>
        
        {visionData.analysis_log && (
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '20px', maxWidth: '800px', margin: '0 auto 30px auto', textAlign: 'left' }}>
            <h4 style={{ fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
               <Camera size={14} /> 360° Environmental Analysis Log
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
               {visionData.analysis_log}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          {visionData.color_palette?.map((color, idx) => (
             <div 
               key={idx} 
               style={{ 
                 width: '24px', height: '24px', borderRadius: '50%', 
                 backgroundColor: color, border: '1px solid var(--border-color)'
               }} 
               title={color}
             />
          ))}
        </div>
      </div>

      <div className="masonry-grid">
        {visionData.items.map((item, idx) => (
          <ProductCard key={idx} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '100px', paddingBottom: '40px' }}>
        <button className="btn-secondary" onClick={onReset}>
          Curate New Scene
        </button>
      </div>

    </div>
  );
}
