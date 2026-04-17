# Lumina 2.0: Phygital 360° AI Stylist

**An intent-driven retail e-commerce platform built for the future of Phygital (Physical-to-Digital) shopping.**

Lumina bridges the gap between physical aesthetics and digital retail. By utilizing Google's Gemini Multimodal AI, Lumina acts as an elite personal shopper. Users upload a photo of themselves, and the AI conducts a 360° biometric and aesthetic analysis—extracting body type, skin tone, current outfit vibes, and gender identity—to autonomously synthesize a highly-curated luxury wardrobe.

### 🌟 Breakthrough Features (Ambani/Ajio Luxe Inspired)

1. **360° Phygital Biometric Scanner**  
   Instead of basic text prompts, the engine physically "sees" the user. The UI provides a complex *Diagnostic Log*, physically proving to the user exactly what lighting, textures, and bodily features the AI extracted from their photo before curating items.
2. **Pinterest-Grade Masonry Lookbook**  
   Breaking the rigid, boring e-commerce spreadsheet, Lumina natively calculates a dense, breathtaking 5-column CSS masonry grid entirely reminiscent of Pinterest discovery boards.
3. **Dual-AI Dynamic Synthesis Pipeline (Zero-Asset Architecture)**  
   To remain under 1MB for hackathon compliance, the app uses zero internal asset images. When Google Gemini suggests an item (e.g. *Tortoise-Shell Polarized Wayfarers*), the text string is instantaneously piped into the **Pollinations Generative Image API** to render a hyper-realistic, isolated product photograph of that exact item precisely on the fly. No random stock photos!
4. **Enterprise Visual Match Data**  
   Calculates simulated "Match Confidence %" scores for each item to mimic high-end enterprise visual search mechanisms.
5. **My Archives (Curation History)**  
   Features deep `localStorage` integration that saves an offline timeline of every lookbook generated, allowing for fluid asynchronous browsing.

## 🛠️ Technology Stack
* **Frontend**: React.js + Vite + Framer Motion
* **Styling**: Pure CSS (Custom minimalist glass and masonry grids)
* **Intelligence**: `@google/generative-ai` (Gemini 1.5 Series Models)
* **Image Synthesis**: Pollinations AI (Text-to-Image E-commerce rendering)
* **Icons**: Lucide React 

## 🚀 Running Locally
1. Clone the repository
2. Run `npm install`
3. Add your `VITE_GEMINI_API_KEY=` into a `.env` file at the root.
4. Run `npm run dev` to launch the server.
