import { useState, useEffect } from 'react';

const SHAPE_OPTIONS = [
  { id: "Slim", label: "Slim / Tailored" },
  { id: "Athletic", label: "Athletic / Broad" },
  { id: "Curvy", label: "Curvy / Hourglass" },
  { id: "Petite", label: "Petite / Compact" },
  { id: "Plus", label: "Plus / Relaxed" }
];

const TONE_OPTIONS = [
  { id: "Deep", hex: "#4a2c20" },
  { id: "Rich", hex: "#7a4b3a" },
  { id: "Olive", hex: "#b48a66" },
  { id: "Medium", hex: "#d8ab87" },
  { id: "Fair", hex: "#fce0cd" }
];

const AESTHETIC_OPTIONS = [
  "Minimalist", "Streetwear", "Luxury Chic", 
  "Bohemian", "Vintage", "Techwear", 
  "Quiet Luxury", "Avant-Garde"
];

const BUDGET_OPTIONS = [
  { id: "Economy", label: "₹ Approachable" },
  { id: "Premium", label: "₹₹ Premium" },
  { id: "Luxury", label: "₹₹₹ Luxury" }
];

export default function StyleDNA({ onComplete }) {
  const [profile, setProfile] = useState({
    gender: '',
    bodyShape: '',
    skinTone: '',
    aesthetics: [],
    budget: '',
    customNote: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('LUMINA_DNA');
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('LUMINA_DNA', JSON.stringify(profile));
    onComplete();
  };

  const toggleAesthetic = (ast) => {
    if (profile.aesthetics.includes(ast)) {
      setProfile({ ...profile, aesthetics: profile.aesthetics.filter(a => a !== ast) });
    } else {
      setProfile({ ...profile, aesthetics: [...profile.aesthetics, ast] });
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 className="serif" style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Style Profile</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Define your parameters. Let the AI curate the rest.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        
        {/* Gender Selection */}
        <div>
          <label style={{ display: 'block', marginBottom: '20px', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Gender Identity</label>
          <div className="selection-grid">
            {["Masculine", "Feminine", "Unisex / Non-Binary"].map(opt => (
              <button 
                type="button" key={opt} 
                className={`select-chip ${profile.gender === opt ? 'selected' : ''}`}
                onClick={() => setProfile({...profile, gender: opt})}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Skin Tone: Swatches */}
        <div>
          <label style={{ display: 'block', marginBottom: '25px', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Skin Tone Base</label>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {TONE_OPTIONS.map(opt => (
              <button 
                type="button" key={opt.id} 
                onClick={() => setProfile({...profile, skinTone: opt.id})}
                style={{
                  width: '60px', height: '60px', borderRadius: '50%',
                  backgroundColor: opt.hex,
                  border: profile.skinTone === opt.id ? '2px solid #000' : 'none',
                  outline: profile.skinTone === opt.id ? '4px solid #fff' : 'none',
                  boxShadow: profile.skinTone === opt.id ? '0 0 0 6px #000' : '0 4px 10px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease', cursor: 'pointer',
                  position: 'relative'
                }}
                title={opt.id}
              />
            ))}
          </div>
        </div>

        {/* Body Profile: Minimalist Cards */}
        <div>
          <label style={{ display: 'block', marginBottom: '20px', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Body Profile</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '15px' }}>
            {SHAPE_OPTIONS.map(opt => (
              <button 
                type="button" key={opt.id} 
                onClick={() => setProfile({...profile, bodyShape: opt.id})}
                style={{
                  padding: '24px 10px',
                  border: profile.bodyShape === opt.id ? '2px solid #000' : '1px solid var(--border-color)',
                  background: profile.bodyShape === opt.id ? '#fafafa' : '#fff',
                  color: profile.bodyShape === opt.id ? '#000' : 'var(--text-secondary)',
                  fontSize: '0.85rem', fontWeight: profile.bodyShape === opt.id ? '600' : '400',
                  letterSpacing: '0.5px', textTransform: 'uppercase', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Aesthetics: Pill Tags */}
        <div>
          <label style={{ display: 'block', marginBottom: '20px', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Aesthetic Preferences</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {AESTHETIC_OPTIONS.map(opt => (
              <button 
                type="button" key={opt} 
                className={`select-chip ${profile.aesthetics.includes(opt) ? 'selected' : ''}`}
                onClick={() => toggleAesthetic(opt)}
                style={{ borderRadius: '30px', padding: '12px 24px' }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing: Clean Tabs */}
        <div>
          <label style={{ display: 'block', marginBottom: '20px', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Pricing Tier (INR)</label>
          <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
            {BUDGET_OPTIONS.map((opt, idx) => (
              <button 
                type="button" key={opt.id} 
                onClick={() => setProfile({...profile, budget: opt.id})}
                style={{
                  flex: 1, padding: '16px 10px',
                  background: profile.budget === opt.id ? '#000' : '#fff',
                  color: profile.budget === opt.id ? '#fff' : 'var(--text-secondary)',
                  borderRight: idx !== BUDGET_OPTIONS.length - 1 ? '1px solid var(--border-color)' : 'none',
                  fontSize: '0.85rem', fontWeight: '500', transition: 'all 0.2s'
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '20px', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Special Requests (Optional)</label>
          <input 
            placeholder="e.g. Hate skinny jeans, prefer silver over gold..."
            value={profile.customNote}
            onChange={e => setProfile({...profile, customNote: e.target.value})}
            style={{ fontSize: '1rem', paddingBottom: '16px' }}
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            type="submit" 
            className="btn-primary"
            disabled={!profile.gender || !profile.bodyShape || !profile.skinTone || !profile.budget}
            style={{ maxWidth: '300px' }}
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
