import { useState, useRef } from 'react';
import { Paperclip, ArrowRight } from 'lucide-react';

export default function DestinationInput({ onAnalyze }) {
  const [textInput, setTextInput] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setImageBase64(null);
    if(fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div style={{ maxWidth: '800px', margin: '80px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <h2 className="serif" style={{ fontSize: '3rem', marginBottom: '20px', textAlign: 'center' }}>Analyze Your Aesthetic</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '50px', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'center' }}>
        Upload a full-body or portrait photo for 360° personal analysis.
      </p>

      <form 
        onSubmit={(e) => { e.preventDefault(); onAnalyze(textInput, imageBase64); }}
        style={{ width: '100%', maxWidth: '600px' }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', borderBottom: '1px solid var(--text-primary)', paddingBottom: '10px' }}>
          
          <button 
            type="button"
            onClick={() => fileInputRef.current.click()}
            style={{ padding: '0 15px 0 5px', color: imageBase64 ? 'var(--text-primary)' : 'var(--text-secondary)' }}
            title="Attach a photo"
          >
            <Paperclip size={24} strokeWidth={1.5} />
          </button>
          
          <input 
            style={{ flex: 1, border: 'none', padding: 0, fontSize: '1.2rem' }}
            placeholder="e.g. Need an outfit for a summer wedding..."
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
          />

          <button 
            type="submit"
            disabled={!textInput && !imageBase64}
            style={{ padding: '0 5px 0 15px', color: (!textInput && !imageBase64) ? 'var(--border-color)' : 'var(--text-primary)' }}
          >
            <ArrowRight size={28} strokeWidth={1.5} />
          </button>
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageChange} 
          accept="image/*" 
          style={{ display: 'none' }} 
        />

        {imageBase64 && (
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
             <img src={imageBase64} alt="Preview" style={{ maxHeight: '150px', objectFit: 'cover' }} />
             <div style={{ marginTop: '10px' }}>
               <button type="button" onClick={handleClearImage} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                 Remove Photo
               </button>
             </div>
          </div>
        )}
      </form>
    </div>
  );
}
