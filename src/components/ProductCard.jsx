import { useState } from 'react';
import { getFallbackImage, getDynamicImage } from '../services/imageFetcher';

export default function ProductCard({ item, onAddToCart }) {
  const imgUrl = getDynamicImage(item.unsplash_query || item.name);
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="masonry-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'zoom-in' }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '16px', backgroundColor: 'var(--bg-secondary)' }}>
        <img 
          src={imgSrc} 
          onError={() => setImgSrc(getFallbackImage(item.unsplash_query))}
          alt={item.name} 
          style={{ width: '100%', height: 'auto', display: 'block', transform: isHovered ? 'scale(1.02)' : 'scale(1)', transition: 'transform 0.4s ease' }} 
        />
        
        {isHovered && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.1)', transition: 'background-color 0.3s ease' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); onAddToCart(item); }}
              style={{ position: 'absolute', top: '12px', right: '12px', background: '#111', color: '#fff', padding: '10px 18px', borderRadius: '24px', fontSize: '0.85rem', fontWeight: 'bold' }}
            >
              Add to Bag
            </button>
            <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '8px' }}>
              <span style={{ background: 'rgba(255,255,255,0.95)', padding: '6px 12px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: '600', color: '#000' }}>
                ₹{item.price.toLocaleString('en-IN')}
              </span>
              {item.match_score && (
                <span style={{ background: 'rgba(0,0,0,0.8)', padding: '6px 12px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: '600', color: '#fff' }}>
                  {item.match_score}% MATCH
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '0 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: '500', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h3>
      </div>
    </div>
  );
}
