import { useState, useEffect, useRef, useCallback } from "react";

// ─── Constantes de marca ───────────────────────────────────────────────────
const BRAND = {
  name: "Alasa Boho",
  instagram: "https://www.instagram.com/alasa.boho/",
  instagramHandle: "@alasa.boho",
  whatsapp: "5537596038",
  whatsappFormatted: "+52 55 3759 6038",
  email: "alasaboho@gmail.com",
  mapsUrl: "https://www.google.com/maps/place/alasa/@19.2909515,-99.2188474,17z",
  location: "Acanceh 147, Lomas de Padierna, Tlalpan, 14200 CDMX",
  locationShort: "Lomas de Padierna · Tlalpan, CDMX",
  waMessage: "Hola! Me interesa conocer más sobre Alasa Boho 🌿",
};

const WA_LINK = (msg = BRAND.waMessage) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;

// ─── useInView ─────────────────────────────────────────────────────────────
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.15, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ─── Data ──────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Colección", id: "coleccion" },
  { label: "Categorías", id: "categorias" },
  { label: "Nosotras",   id: "nosotras"  },
  { label: "Galería",    id: "galeria"   },
  { label: "Contacto",   id: "contacto"  },
];

const CATEGORIES = ["Todos", "Vestidos", "Tops", "Faldas", "Pantalones", "Accesorios"];

const PRODUCTS = [
  { id: 1, name: "Vestido Lino Sahara",  cat: "Vestidos",   price: "$1,290", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=90", badge: "Nuevo" },
  { id: 2, name: "Top Crochet Playa",    cat: "Tops",       price: "$590",   img: "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=1200&q=90", badge: "" },
  { id: 3, name: "Falda Maxi Boho",      cat: "Faldas",     price: "$890",   img: "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=1200&q=90", badge: "Favorito" },
  { id: 4, name: "Pantalón Wide Leg",    cat: "Pantalones", price: "$1,090", img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=1200&q=90", badge: "" },
  { id: 5, name: "Vestido Mini Arena",   cat: "Vestidos",   price: "$980",   img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=90", badge: "Nuevo" },
  { id: 6, name: "Bolso Rafia Natural",  cat: "Accesorios", price: "$490",   img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=90", badge: "" },
  { id: 7, name: "Top Lino Blanco",      cat: "Tops",       price: "$490",   img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&q=90", badge: "" },
  { id: 8, name: "Falda Lino Camel",     cat: "Faldas",     price: "$790",   img: "https://images.unsplash.com/photo-1551803091-e20673f15770?w=1200&q=90", badge: "Favorito" },
];

const GALLERY = [
  { id: 1, img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=90", label: "Lookbook Verano" },
  { id: 2, img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=90", label: "Alma Libre" },
  { id: 3, img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=90", label: "Lino & Luz" },
  { id: 4, img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=90", label: "Brisa Boho" },
  { id: 5, img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=90", label: "Naturaleza Viva" },
  { id: 6, img: "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=1200&q=90", label: "Texturas" },
];

// ─── Iconos SVG reutilizables ──────────────────────────────────────────────
const Icon = {
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  whatsapp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.845L.057 23.882l6.186-1.443A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.003-1.368l-.36-.214-3.717.867.936-3.417-.234-.372A9.794 9.794 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
    </svg>
  ),
  email: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  pin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  phone: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.1 9.75a19.79 19.79 0 01-3.07-8.67A2 2 0 012.05 1h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  ),
  arrowUpRight: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 11L11 1M11 1H4M11 1v7"/>
    </svg>
  ),
};

// ─── Global Styles ─────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Jost', sans-serif;
      background: #faf7f4; color: #3a2e26; overflow-x: hidden;
    }
    body.lightbox-open { overflow: hidden; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #faf7f4; }
    ::-webkit-scrollbar-thumb { background: #c4a882; border-radius: 2px; }

    .font-display { font-family: 'Cormorant Garamond', serif; }

    .fade-up { opacity: 0; transform: translateY(32px); transition: opacity 0.75s ease, transform 0.75s ease; }
    .fade-up.visible { opacity: 1; transform: translateY(0); }

    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .marquee-track { animation: marquee 22s linear infinite; }

    @keyframes waPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.4); }
      50%       { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
    }
    .wa-fab { animation: waPulse 2.5s infinite; }
    .menu-open { max-height: 320px !important; opacity: 1 !important; }
    .hero-bg { will-change: transform; }

    /* Pills */
    .pills-divider { margin-top: 56px; margin-bottom: 8px; }
    @media (max-width: 768px) { .pills-divider { margin-top: 36px; } }

    /* Badges */
    .badge-warm {
      background: rgba(196,168,130,0.82); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.35); box-shadow: 0 2px 12px rgba(196,168,130,0.4); color: #faf7f4;
    }
    .badge-light {
      background: rgba(250,247,244,0.82); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(196,168,130,0.4); box-shadow: 0 2px 12px rgba(58,46,38,0.1); color: #b8956a;
    }

    /* Category pills */
    .cat-pill { transition: all 0.28s cubic-bezier(0.34,1.56,0.64,1) !important; }
    .cat-pill:hover { transform: translateY(-2px) !important; box-shadow: 0 6px 20px rgba(196,168,130,0.3) !important; border-color: #c4a882 !important; color: #c4a882 !important; }
    .cat-pill.active { box-shadow: 0 4px 18px rgba(58,46,38,0.2) !important; }
    .cat-pill.active:hover { color: #faf7f4 !important; border-color: #3a2e26 !important; }

    /* Product card */
    .product-card { cursor: pointer; transition: transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s cubic-bezier(0.23,1,0.32,1) !important; }
    .product-card:hover { transform: translateY(-8px) !important; box-shadow: 0 16px 48px rgba(58,46,38,0.15) !important; }
    .product-card:hover .p-img { transform: scale(1.07) !important; }
    .product-card:hover .p-overlay { opacity: 1 !important; }
    .product-card:hover .p-cta { transform: translateX(-50%) translateY(0) !important; opacity: 1 !important; }
    .product-card:hover .p-eye { opacity: 1 !important; transform: translate(-50%,-50%) scale(1) !important; }
    .p-img { transition: transform 0.7s cubic-bezier(0.23,1,0.32,1) !important; }
    .p-cta { transition: all 0.45s cubic-bezier(0.23,1,0.32,1) !important; }
    .p-eye { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%) scale(0.8); opacity: 0; transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1); width: 48px; height: 48px; border-radius: 50%; background: rgba(250,247,244,0.14); border: 1px solid rgba(250,247,244,0.45); display: flex; align-items: center; justify-content: center; pointer-events: none; }

    /* Gallery */
    .g-item { cursor: pointer; transition: transform 0.5s cubic-bezier(0.23,1,0.32,1); }
    .g-item:hover { transform: scale(1.015); }
    .g-item img { transition: transform 0.7s cubic-bezier(0.23,1,0.32,1); }
    .g-item:hover img { transform: scale(1.06); }
    .g-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 40px 20px 18px; background: linear-gradient(to top, rgba(58,46,38,0.7) 0%, transparent 100%); opacity: 0; transform: translateY(6px); transition: all 0.4s ease; pointer-events: none; }
    .g-item:hover .g-caption { opacity: 1 !important; transform: translateY(0) !important; }
    .g-item:hover .g-corner { opacity: 1 !important; }
    .g-corner { position: absolute; top: 14px; right: 14px; width: 28px; height: 28px; border-radius: 50%; background: rgba(250,247,244,0.12); backdrop-filter: blur(6px); border: 1px solid rgba(250,247,244,0.25); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; }

    /* Social link hover */
    .social-link { transition: all 0.25s ease; opacity: 0.5; }
    .social-link:hover { opacity: 1; transform: translateY(-2px); }

    /* Contact info links */
    .contact-info-link { transition: color 0.25s ease; }
    .contact-info-link:hover { color: #c4a882 !important; }

    /* Lightbox */
    .lb-backdrop { position: fixed; inset: 0; z-index: 1000; background: rgba(16,10,6,0); backdrop-filter: blur(0px); -webkit-backdrop-filter: blur(0px); display: flex; align-items: center; justify-content: center; padding: 20px; transition: background 0.55s cubic-bezier(0.16,1,0.3,1), backdrop-filter 0.55s cubic-bezier(0.16,1,0.3,1); }
    .lb-backdrop.open { background: rgba(16,10,6,0.9); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
    .lb-panel { position: relative; display: flex; width: 100%; max-width: 960px; max-height: 90vh; border-radius: 8px; overflow: hidden; background: #18100b; opacity: 0; transform: scale(0.92) translateY(24px); transition: opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1); box-shadow: 0 40px 100px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(196,168,130,0.18); }
    .lb-panel.open { opacity: 1; transform: scale(1) translateY(0); }
    .lb-img-wrap { flex: 0 0 58%; position: relative; overflow: hidden; background: #120d09; }
    .lb-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.23,1,0.32,1); transform: scale(1.04); }
    .lb-panel.open .lb-img-wrap img { transform: scale(1); }
    .lb-info { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 48px 40px; }
    .lb-close { position: absolute; top: 18px; right: 18px; z-index: 10; width: 36px; height: 36px; border-radius: 50%; background: rgba(250,247,244,0.08); border: 1px solid rgba(250,247,244,0.18); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.25s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1); color: rgba(250,247,244,0.7); }
    .lb-close:hover { background: rgba(196,168,130,0.2); border-color: rgba(196,168,130,0.5); transform: rotate(90deg) scale(1.1); color: #c4a882; }
    .lb-nav { position: absolute; top: 50%; z-index: 10; width: 40px; height: 40px; border-radius: 50%; background: rgba(250,247,244,0.08); border: 1px solid rgba(250,247,244,0.18); display: flex; align-items: center; justify-content: center; cursor: pointer; transform: translateY(-50%); transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); color: rgba(250,247,244,0.7); }
    .lb-nav:hover { background: rgba(196,168,130,0.2); border-color: rgba(196,168,130,0.5); color: #c4a882; transform: translateY(-50%) scale(1.1); }
    @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
    .lb-shimmer::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(196,168,130,0.07), transparent); animation: shimmer 1.6s infinite; }

    /* Responsive */
    @media (max-width: 680px) {
      .lb-panel { flex-direction: column; max-height: 92vh; }
      .lb-img-wrap { flex: 0 0 52%; }
      .lb-info { padding: 22px 22px 26px; }
      .lb-nav { display: none; }
    }
    @media (max-width: 768px) {
      .hidden-mobile { display: none !important; }
      .show-mobile { display: flex !important; }
      .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
      .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
      .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
      .footer-row { flex-direction: column !important; align-items: flex-start !important; gap: 32px !important; }
    }
  `}</style>
);

// ─── Lightbox ──────────────────────────────────────────────────────────────
function Lightbox({ items, initialIndex, onClose }) {
  const [idx, setIdx] = useState(initialIndex);
  const [open, setOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const item = items[idx];
  const isProduct = "price" in item;

  useEffect(() => {
    const t = requestAnimationFrame(() => setOpen(true));
    document.body.classList.add("lightbox-open");
    return () => { cancelAnimationFrame(t); document.body.classList.remove("lightbox-open"); };
  }, []);

  const handleClose = useCallback(() => { setOpen(false); setTimeout(onClose, 500); }, [onClose]);
  const goNext = useCallback(() => { setImgLoaded(false); setIdx(i => (i + 1) % items.length); }, [items.length]);
  const goPrev = useCallback(() => { setImgLoaded(false); setIdx(i => (i - 1 + items.length) % items.length); }, [items.length]);

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") handleClose(); if (e.key === "ArrowRight") goNext(); if (e.key === "ArrowLeft") goPrev(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [idx]);

  const touchStart = useRef(null);

  return (
    <div className={`lb-backdrop ${open ? "open" : ""}`} onClick={handleClose}>
      <div className={`lb-panel ${open ? "open" : ""}`} onClick={e => e.stopPropagation()}
        onTouchStart={e => { touchStart.current = e.touches[0].clientX; }}
        onTouchEnd={e => { const d = (touchStart.current || 0) - e.changedTouches[0].clientX; if (Math.abs(d) > 50) d > 0 ? goNext() : goPrev(); }}>

        <button className="lb-close" onClick={handleClose}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="1" y1="1" x2="12" y2="12"/><line x1="12" y1="1" x2="1" y2="12"/>
          </svg>
        </button>

        {items.length > 1 && <>
          <button className="lb-nav" style={{ left: 14 }} onClick={goPrev}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="8,1 3,6.5 8,12"/></svg>
          </button>
          <button className="lb-nav" style={{ right: 14 }} onClick={goNext}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="5,1 10,6.5 5,12"/></svg>
          </button>
        </>}

        <div className={`lb-img-wrap ${!imgLoaded ? "lb-shimmer" : ""}`}>
          <img key={item.img} src={item.img} alt={item.name || item.label || ""}
            onLoad={() => setImgLoaded(true)}
            style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.5s ease" }} />
          {items.length > 1 && (
            <div style={{ position: "absolute", bottom: 16, right: 16, display: "flex", gap: 5 }}>
              {items.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setImgLoaded(false); setIdx(i); }}
                  style={{ width: i === idx ? 20 : 5, height: 5, borderRadius: 3, background: i === idx ? "#c4a882" : "rgba(250,247,244,0.3)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)" }} />
              ))}
            </div>
          )}
          <div style={{ position: "absolute", bottom: 16, left: 20, fontSize: 9, letterSpacing: "0.3em", color: "rgba(250,247,244,0.4)", fontFamily: "'Jost', sans-serif" }}>
            {String(idx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </div>
        </div>

        <div className="lb-info">
          {isProduct ? (
            <>
              <div style={{ fontSize: 8, letterSpacing: "0.4em", color: "#c4a882", textTransform: "uppercase", marginBottom: 14 }}>{item.cat}</div>
              <h2 className="font-display" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 300, color: "#faf7f4", lineHeight: 1.2, marginBottom: 18 }}>{item.name}</h2>
              <div style={{ width: 30, height: 1, background: "rgba(196,168,130,0.4)", marginBottom: 20 }} />
              <div className="font-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#c4a882", fontWeight: 300, marginBottom: 28 }}>{item.price}</div>
              {item.badge && (
                <div style={{ display: "inline-block", marginBottom: 28, background: "rgba(196,168,130,0.1)", border: "1px solid rgba(196,168,130,0.28)", borderRadius: 50, padding: "5px 16px", fontSize: 8, letterSpacing: "0.25em", color: "#c4a882", textTransform: "uppercase" }}>{item.badge}</div>
              )}
              <a href={WA_LINK(`Hola! Me interesa la prenda: ${item.name} (${item.price})`)} target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#c4a882", color: "#faf7f4", padding: "13px 26px", borderRadius: 2, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'Jost', sans-serif", transition: "background 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#b8956a"}
                onMouseLeave={e => e.currentTarget.style.background = "#c4a882"}>
                Consultar por WhatsApp {Icon.arrowUpRight}
              </a>
            </>
          ) : (
            <>
              <div style={{ fontSize: 8, letterSpacing: "0.4em", color: "#c4a882", textTransform: "uppercase", marginBottom: 18 }}>{BRAND.instagramHandle}</div>
              <h2 className="font-display" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 300, color: "#faf7f4", fontStyle: "italic", lineHeight: 1.2, marginBottom: 20 }}>{item.label}</h2>
              <div style={{ width: 30, height: 1, background: "rgba(196,168,130,0.35)", marginBottom: 20 }} />
              <p style={{ fontSize: 12, lineHeight: 1.85, color: "rgba(250,247,244,0.4)", fontWeight: 300, letterSpacing: "0.04em" }}>Moda boho contemporánea<br />para mujeres auténticas</p>
              <a href={BRAND.instagram} target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 26, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c4a882", textDecoration: "none", borderBottom: "1px solid rgba(196,168,130,0.3)", paddingBottom: 4 }}>
                Ver en Instagram {Icon.arrowUpRight}
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Section wrapper ───────────────────────────────────────────────────────
function Section({ id, className = "", children }) {
  const [ref, inView] = useInView();
  return (
    <section id={id} ref={ref} className={`fade-up ${inView ? "visible" : ""} ${className}`}>
      {children}
    </section>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: scrolled ? "12px 0" : "20px 0", background: "rgba(250,247,244,0.97)", backdropFilter: "blur(12px)", boxShadow: scrolled ? "0 1px 0 rgba(196,168,130,0.25)" : "0 1px 0 rgba(196,168,130,0.08)", transition: "padding 0.4s ease, box-shadow 0.4s ease" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="font-display" style={{ fontSize: 22, letterSpacing: "0.15em", color: "#3a2e26", fontWeight: 400 }}>ALASA</div>
          <div style={{ fontSize: 9, letterSpacing: "0.4em", color: "#c4a882", fontWeight: 300, marginTop: -2 }}>BOHO</div>
        </div>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="hidden-mobile">
          {NAV_LINKS.map(({ label, id }) => (
            <button key={id} onClick={() => go(id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, letterSpacing: "0.2em", color: "#3a2e26", fontFamily: "'Jost', sans-serif", fontWeight: 300, textTransform: "uppercase", padding: "4px 0", borderBottom: "1px solid transparent", transition: "border-color 0.3s, color 0.3s" }}
              onMouseEnter={e => { e.target.style.borderBottomColor = "#c4a882"; e.target.style.color = "#c4a882"; }}
              onMouseLeave={e => { e.target.style.borderBottomColor = "transparent"; e.target.style.color = "#3a2e26"; }}>
              {label}
            </button>
          ))}
          <button onClick={() => go("contacto")} style={{ background: "#3a2e26", color: "#faf7f4", border: "none", padding: "10px 22px", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, fontFamily: "'Jost', sans-serif", transition: "background 0.3s" }}
            onMouseEnter={e => e.target.style.background = "#c4a882"}
            onMouseLeave={e => e.target.style.background = "#3a2e26"}>
            Contáctanos
          </button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="show-mobile" style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none" }}>
          <div style={{ width: 24, height: 2, background: "#3a2e26", marginBottom: 5, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <div style={{ width: 18, height: 2, background: "#3a2e26", marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
          <div style={{ width: 24, height: 2, background: "#3a2e26", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      </div>
      <div style={{ maxHeight: 0, opacity: 0, overflow: "hidden", transition: "max-height 0.4s ease, opacity 0.4s ease", background: "rgba(250,247,244,0.98)", backdropFilter: "blur(12px)" }} className={menuOpen ? "menu-open" : ""}>
        <div style={{ padding: "20px 24px 24px" }}>
          {[...NAV_LINKS, { label: "Contáctanos", id: "contacto" }].map(({ label, id }) => (
            <button key={id} onClick={() => go(id)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "12px 0", fontSize: 13, letterSpacing: "0.15em", color: "#3a2e26", fontFamily: "'Jost', sans-serif", textTransform: "uppercase", borderBottom: "1px solid rgba(196,168,130,0.2)" }}>{label}</button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  const [sy, setSy] = useState(0);
  useEffect(() => {
    const fn = () => setSy(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div id="coleccion" style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
      <div className="hero-bg" style={{ position: "absolute", inset: 0, transform: `translateY(${sy * 0.35}px)`, backgroundImage: "url('https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=90')", backgroundSize: "cover", backgroundPosition: "center top", scale: "1.15" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(58,46,38,0.28) 0%, rgba(58,46,38,0.08) 40%, rgba(58,46,38,0.58) 100%)" }} />
      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
        <div style={{ fontSize: 9, letterSpacing: "0.55em", color: "rgba(250,247,244,0.75)", textTransform: "uppercase", marginBottom: 24, fontWeight: 300, animation: "fadeDown 1s ease both" }}>
          Moda Boho Contemporánea · Verano 2025
        </div>
        <h1 className="font-display" style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)", color: "#faf7f4", fontWeight: 300, lineHeight: 1.15, maxWidth: 780, marginBottom: 18, animation: "fadeDown 1s 0.2s ease both" }}>
          Piezas únicas para<br /><em style={{ fontStyle: "italic" }}>mujeres auténticas</em>
        </h1>
        <p style={{ fontSize: 12, letterSpacing: "0.18em", color: "rgba(250,247,244,0.65)", marginBottom: 48, fontWeight: 300, maxWidth: 380, lineHeight: 1.8, animation: "fadeDown 1s 0.4s ease both" }}>
          Esencia natural · Elegancia libre · Alma boho
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", animation: "fadeDown 1s 0.6s ease both" }}>
          <button onClick={() => document.getElementById("categorias")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: "transparent", border: "1.5px solid rgba(250,247,244,0.65)", color: "#faf7f4", padding: "14px 38px", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, fontFamily: "'Jost', sans-serif", transition: "all 0.35s" }}
            onMouseEnter={e => { e.target.style.background = "rgba(250,247,244,0.12)"; e.target.style.borderColor = "#faf7f4"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(250,247,244,0.65)"; }}>
            Descubrir colección
          </button>
          <a href={WA_LINK("Hola! Quisiera conocer más sobre la colección actual de Alasa Boho 🌿")} target="_blank" rel="noreferrer"
            style={{ background: "rgba(250,247,244,0.12)", border: "1.5px solid rgba(250,247,244,0.3)", color: "#faf7f4", padding: "14px 38px", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, fontFamily: "'Jost', sans-serif", textDecoration: "none", transition: "all 0.35s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(250,247,244,0.18)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(250,247,244,0.12)"; }}>
            Escribirnos
          </a>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ fontSize: 8, letterSpacing: "0.45em", color: "rgba(250,247,244,0.45)", textTransform: "uppercase" }}>Scroll</div>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(250,247,244,0.45), transparent)", animation: "scrollLine 1.6s ease infinite" }} />
      </div>
      <style>{`
        @keyframes fadeDown { from { opacity:0; transform:translateY(-18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scrollLine { 0%,100%{transform:scaleY(0);transform-origin:top;} 50%{transform:scaleY(1);transform-origin:top;} }
      `}</style>
    </div>
  );
}

// ─── Marquee ───────────────────────────────────────────────────────────────
function MarqueeBanner() {
  const items = ["Vestidos · ", "Tops · ", "Faldas · ", "Accesorios · ", "Esencia Natural · ", "Moda Boho · ", "Estilo Auténtico · ", "Hecho con Amor · "];
  const repeated = [...items, ...items];
  return (
    <div style={{ background: "#3a2e26", padding: "13px 0", overflow: "hidden" }}>
      <div className="marquee-track" style={{ display: "flex", whiteSpace: "nowrap" }}>
        {repeated.map((t, i) => <span key={i} style={{ fontSize: 9, letterSpacing: "0.35em", color: "#c4a882", textTransform: "uppercase", fontWeight: 300 }}>{t}</span>)}
      </div>
    </div>
  );
}

// ─── Catalog ───────────────────────────────────────────────────────────────
function CatalogSection() {
  const [active, setActive] = useState("Todos");
  const [lightbox, setLightbox] = useState(null);
  const filtered = active === "Todos" ? PRODUCTS : PRODUCTS.filter(p => p.cat === active);

  return (
    <div id="categorias" style={{ padding: "100px 24px", maxWidth: 1280, margin: "0 auto" }}>
      <Section style={{ textAlign: "center", marginBottom: 0 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.4em", color: "#c4a882", textTransform: "uppercase", marginBottom: 14 }}>Colecciones con esencia natural</div>
        <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#3a2e26", marginBottom: 22 }}>Nuestras Prendas</h2>
        <p style={{ fontSize: 12, letterSpacing: "0.08em", color: "#7a6a5e", fontWeight: 300, maxWidth: 380, margin: "0 auto 36px", lineHeight: 1.8 }}>
          Cada pieza seleccionada con intención, para que te sientas libre, cómoda y hermosa.
        </p>
        <div style={{ width: 36, height: 1, background: "#c4a882", margin: "0 auto 44px" }} />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} className={`cat-pill ${active === cat ? "active" : ""}`}
              style={{ background: active === cat ? "#3a2e26" : "transparent", color: active === cat ? "#faf7f4" : "#3a2e26", border: `1px solid ${active === cat ? "#3a2e26" : "rgba(58,46,38,0.22)"}`, padding: "9px 22px", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", borderRadius: 50, fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              {cat}
            </button>
          ))}
        </div>
        <div className="pills-divider">
          <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, rgba(196,168,130,0.45), transparent)", margin: "0 auto" }} />
        </div>
      </Section>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
        {filtered.map((p, i) => (
          <div key={p.id} className="product-card fade-up visible" onClick={() => setLightbox(PRODUCTS.indexOf(p))}
            style={{ borderRadius: 6, overflow: "hidden", background: "#fff", boxShadow: "0 2px 20px rgba(58,46,38,0.05)", transitionDelay: `${i * 0.05}s` }}>
            <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
              <img className="p-img" src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div className="p-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(58,46,38,0.55) 0%, transparent 55%)", opacity: 0, transition: "opacity 0.4s ease" }} />
              <div className="p-eye">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(250,247,244,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              {p.badge && (
                <div className={p.badge === "Favorito" ? "badge-light" : "badge-warm"} style={{ position: "absolute", top: 16, left: 16, fontSize: 8, letterSpacing: "0.22em", padding: "6px 14px", textTransform: "uppercase", borderRadius: 3, display: "flex", alignItems: "center", gap: 5 }}>
                  {p.badge === "Favorito" && <svg width="8" height="8" viewBox="0 0 24 24" fill="#b8956a"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>}
                  {p.badge}
                </div>
              )}
              <div className="p-cta" style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%) translateY(20px)", opacity: 0, background: "rgba(250,247,244,0.92)", backdropFilter: "blur(8px)", padding: "10px 28px", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#3a2e26", borderRadius: 2, whiteSpace: "nowrap" }}>
                Ver prenda
              </div>
            </div>
            <div style={{ padding: "20px 22px 24px" }}>
              <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#c4a882", textTransform: "uppercase", marginBottom: 8 }}>{p.cat}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 400, color: "#3a2e26", letterSpacing: "0.02em" }}>{p.name}</span>
                <span className="font-display" style={{ fontSize: 16, color: "#c4a882", fontWeight: 400 }}>{p.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {lightbox !== null && <Lightbox items={PRODUCTS} initialIndex={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────
function AboutSection() {
  const [ref, inView] = useInView();
  return (
    <div id="nosotras" style={{ background: "#f2ece4", padding: "100px 24px", overflow: "hidden" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", opacity: inView ? 1 : 0, transition: "opacity 0.8s ease" }} className="about-grid">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-30px)", transition: "all 0.9s ease 0.1s" }}>
          <div style={{ fontSize: 9, letterSpacing: "0.45em", color: "#c4a882", textTransform: "uppercase", marginBottom: 18 }}>Nuestra Historia</div>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#3a2e26", lineHeight: 1.25, marginBottom: 26 }}>
            Colecciones elegidas<br /><em>con el corazón</em>
          </h2>
          <div style={{ width: 36, height: 1, background: "#c4a882", marginBottom: 26 }} />
          <p style={{ fontSize: 14, lineHeight: 1.95, color: "#5a4a3e", fontWeight: 300, marginBottom: 18 }}>
            Alasa Boho nació del amor por la moda consciente, femenina y libre. Somos una boutique con alma propia, ubicada en la Zona Metropolitana de CDMX, comprometida con un estilo que trasciende tendencias.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.95, color: "#5a4a3e", fontWeight: 300, marginBottom: 40 }}>
            Cada prenda es seleccionada cuidadosamente pensando en la mujer auténtica que se viste con intención — que abraza lo natural, lo libre y lo bello.
          </p>
          <div style={{ display: "flex", gap: 40, marginBottom: 40 }}>
            {[["200+", "Prendas únicas"], ["3+", "Años de estilo"], ["♡", "Con amor"]].map(([n, l]) => (
              <div key={l}>
                <div className="font-display" style={{ fontSize: 28, color: "#c4a882", fontWeight: 300 }}>{n}</div>
                <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "#3a2e26", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
          <a href={BRAND.instagram} target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#3a2e26", textDecoration: "none", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", borderBottom: "1px solid #c4a882", paddingBottom: 4, transition: "color 0.25s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#c4a882"}
            onMouseLeave={e => e.currentTarget.style.color = "#3a2e26"}>
            <span style={{ color: "#c4a882" }}>{Icon.instagram}</span> Síguenos en Instagram ↗
          </a>
        </div>
        <div style={{ position: "relative", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(30px)", transition: "all 0.9s ease 0.3s" }}>
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80" alt="Alasa Boho" style={{ width: "85%", borderRadius: 4, display: "block" }} />
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80" alt="Alasa Boho estilo" style={{ width: "52%", borderRadius: 4, position: "absolute", bottom: -40, right: -20, border: "6px solid #f2ece4", boxShadow: "0 8px 32px rgba(58,46,38,0.15)" }} />
          <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, border: "1px solid rgba(196,168,130,0.4)", borderRadius: "50%" }} />
        </div>
      </div>
    </div>
  );
}

// ─── Gallery ───────────────────────────────────────────────────────────────
function GallerySection() {
  const [ref, inView] = useInView();
  const [lightbox, setLightbox] = useState(null);
  return (
    <div id="galeria" style={{ padding: "100px 24px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div style={{ fontSize: 9, letterSpacing: "0.4em", color: "#c4a882", textTransform: "uppercase", marginBottom: 14 }}>{BRAND.instagramHandle}</div>
        <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, color: "#3a2e26", marginBottom: 14 }}>Galería de Inspiración</h2>
        <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "#7a6a5e", fontWeight: 300 }}>Descubre tu estilo a través de nuestras colecciones</p>
        <div style={{ width: 36, height: 1, background: "#c4a882", margin: "20px auto 0" }} />
      </div>
      <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, opacity: inView ? 1 : 0, transition: "opacity 0.8s ease" }} className="gallery-grid">
        {GALLERY.map((item, i) => (
          <div key={item.id} className="g-item" onClick={() => setLightbox(i)}
            style={{ overflow: "hidden", borderRadius: 6, position: "relative", gridColumn: item.id === 4 ? "2 / 4" : "auto", gridRow: item.id === 1 ? "span 2" : "auto", aspectRatio: item.id === 4 ? "16/9" : item.id === 1 ? "2/3" : "1", opacity: inView ? 1 : 0, transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.5s cubic-bezier(0.23,1,0.32,1)` }}>
            <img src={item.img} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div className="g-caption">
              <div style={{ fontSize: 8, letterSpacing: "0.3em", color: "rgba(250,247,244,0.55)", textTransform: "uppercase", marginBottom: 4 }}>{BRAND.instagramHandle}</div>
              <div className="font-display" style={{ fontSize: 15, color: "#faf7f4", fontWeight: 300, fontStyle: "italic" }}>{item.label}</div>
            </div>
            <div className="g-corner">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="rgba(250,247,244,0.8)" strokeWidth="1.5" strokeLinecap="round"><path d="M1 11L11 1M11 1H5M11 1v6"/></svg>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 48 }}>
        <a href={BRAND.instagram} target="_blank" rel="noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#3a2e26", textDecoration: "none", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", borderBottom: "1px solid #c4a882", paddingBottom: 4 }}>
          <span>Síguenos en Instagram</span><span style={{ color: "#c4a882" }}>↗</span>
        </a>
      </div>
      {lightbox !== null && <Lightbox items={GALLERY} initialIndex={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────
//
// ─── CONFIGURACIÓN EMAILJS ────────────────────────────────────────────────
// 1. Crea cuenta gratis en https://emailjs.com
// 2. Add Service → Gmail → conecta alasaboho@gmail.com → copia el Service ID
// 3. Email Templates → Create Template:
//      PLANTILLA 1 — "alasa_to_brand" (te llega a ti)
//        To email:   alasaboho@gmail.com
//        Subject:    ✉️ Nuevo mensaje de {{from_name}} · Alasa Boho
//        Body:
//          Nombre:   {{from_name}}
//          Email:    {{from_email}}
//          Mensaje:  {{message}}
//          Fecha:    {{sent_at}}
//
//      PLANTILLA 2 — "alasa_autoreply" (le llega al usuario)
//        To email:   {{from_email}}
//        To name:    {{from_name}}
//        Subject:    Hola {{from_name}}, recibimos tu mensaje 🌿
//        Body:
//          Hola {{from_name}},
//          Gracias por escribirnos. Recibimos tu mensaje y te responderemos
//          a la brevedad, generalmente en menos de 24 horas.
//          Tu mensaje: "{{message}}"
//          Con cariño, Alasa Boho
//
// 4. Account → API Keys → copia tu Public Key
// 5. Reemplaza los 3 valores de abajo:
//
const EMAILJS_CONFIG = {
  publicKey:         "B6t10F87O4-DniogF",
  serviceId:         "service_i8v80lb",
  templateBrand:     "template_dimjnyn",    // Contact Us template
  templateAutoreply: "template_lx3vhpc",    // Auto-Reply template
};

// Carga el SDK de EmailJS una sola vez
function useEmailJS() {
  useEffect(() => {
    if (window.emailjs) return;
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => window.emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
    document.head.appendChild(script);
  }, []);
}

function ContactSection() {
  useEmailJS();

  const [form, setForm]       = useState({ name: "", email: "", message: "", honeypot: "" });
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState("idle"); // idle | sending | success | error
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);

  // ── Validación ────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "Ingresa tu nombre completo";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Ingresa un correo válido";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "El mensaje debe tener al menos 10 caracteres";
    return e;
  };

  // ── Envío ─────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    // Anti-spam: honeypot
    if (form.honeypot) return;
    // Cooldown activo
    if (cooldown > 0) return;

    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setStatus("sending");

    const templateParams = {
      from_name:  form.name.trim(),
      from_email: form.email.trim(),
      name:       form.name.trim(),   // {{name}} en plantilla Contact Us
      email:      form.email.trim(),  // {{email}} en Reply To
      message:    form.message.trim(),
      title:      `Mensaje de ${form.name.trim()}`,
      sent_at:    new Date().toLocaleString("es-MX", { dateStyle: "long", timeStyle: "short" }),
    };

    try {
      // Envía a Alasa Boho
      await window.emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateBrand,
        templateParams
      );
      // Envía confirmación al usuario
      await window.emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateAutoreply,
        templateParams
      );

      setStatus("success");
      setForm({ name: "", email: "", message: "", honeypot: "" });

      // Cooldown de 60 segundos
      setCooldown(60);
      cooldownRef.current = setInterval(() => {
        setCooldown(s => { if (s <= 1) { clearInterval(cooldownRef.current); return 0; } return s - 1; });
      }, 1000);

    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  useEffect(() => () => clearInterval(cooldownRef.current), []);

  // ── Estilos ───────────────────────────────────────────────────────────
  const inputStyle = {
    width: "100%", background: "transparent", border: "none",
    borderBottom: "1px solid rgba(196,168,130,0.45)",
    padding: "12px 4px", fontSize: 13, color: "#faf7f4",
    fontFamily: "'Jost', sans-serif", outline: "none", transition: "border-color 0.3s",
  };
  const errorStyle = {
    fontSize: 10, color: "#e8998a", letterSpacing: "0.05em",
    marginTop: 6, display: "block",
  };

  const CONTACT_ITEMS = [
    { icon: Icon.pin,       label: "Ubicación",  value: BRAND.location,          href: BRAND.mapsUrl,              sub: "Ver en Google Maps ↗" },
    { icon: Icon.instagram, label: "Instagram",  value: BRAND.instagramHandle,   href: BRAND.instagram             },
    { icon: Icon.phone,     label: "WhatsApp",   value: BRAND.whatsappFormatted, href: WA_LINK()                   },
    { icon: Icon.email,     label: "Correo",     value: BRAND.email,             href: `mailto:${BRAND.email}`     },
  ];

  return (
    <div id="contacto" style={{ background: "#3a2e26", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, right: -100, width: 320, height: 320, border: "1px solid rgba(196,168,130,0.12)", borderRadius: "50%" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 220, height: 220, border: "1px solid rgba(196,168,130,0.08)", borderRadius: "50%" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontSize: 9, letterSpacing: "0.45em", color: "#c4a882", textTransform: "uppercase", marginBottom: 16 }}>Hablemos</div>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#faf7f4", marginBottom: 16 }}>Encuéntranos</h2>
          <p style={{ fontSize: 12, letterSpacing: "0.08em", color: "rgba(250,247,244,0.4)", fontWeight: 300 }}>Estamos aquí para ayudarte a encontrar tu prenda perfecta</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="contact-grid">

          {/* ── Info lateral ── */}
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 28, marginBottom: 44 }}>
              {CONTACT_ITEMS.map(item => (
                <div key={item.label} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ marginTop: 1, flexShrink: 0, color: "#c4a882" }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 8, letterSpacing: "0.28em", color: "#c4a882", textTransform: "uppercase", marginBottom: 5 }}>{item.label}</div>
                    <a href={item.href} target={item.href.startsWith("mailto") ? "_self" : "_blank"} rel="noreferrer"
                      className="contact-info-link"
                      style={{ fontSize: 14, color: "rgba(250,247,244,0.75)", textDecoration: "none", display: "block" }}>
                      {item.value}
                    </a>
                    {item.sub && (
                      <a href={item.href} target="_blank" rel="noreferrer"
                        style={{ fontSize: 9, color: "rgba(196,168,130,0.6)", textDecoration: "none", letterSpacing: "0.15em", display: "block", marginTop: 3 }}>
                        {item.sub}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a href={WA_LINK()} target="_blank" rel="noreferrer" className="wa-fab"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: "#fff", textDecoration: "none", padding: "14px 26px", borderRadius: 50, fontSize: 11, letterSpacing: "0.1em", fontFamily: "'Jost', sans-serif", fontWeight: 400, boxShadow: "0 4px 20px rgba(37,211,102,0.3)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.845L.057 23.882l6.186-1.443A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.003-1.368l-.36-.214-3.717.867.936-3.417-.234-.372A9.794 9.794 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
              Escríbenos ahora
            </a>
          </div>

          {/* ── Formulario ── */}
          <div>
            {status === "success" ? (
              /* Estado de éxito */
              <div style={{ textAlign: "center", padding: "64px 0" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", border: "1px solid rgba(196,168,130,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4a882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="font-display" style={{ fontSize: 26, color: "#faf7f4", fontWeight: 300, marginBottom: 14 }}>¡Mensaje enviado!</h3>
                <p style={{ color: "rgba(250,247,244,0.5)", fontSize: 13, lineHeight: 1.9, marginBottom: 32 }}>
                  Te respondemos en menos de 24 horas. 🤍<br />
                  Revisa tu correo, también te enviamos<br />una confirmación.
                </p>
                <button onClick={() => setStatus("idle")}
                  style={{ background: "transparent", border: "1px solid rgba(196,168,130,0.35)", color: "rgba(250,247,244,0.5)", padding: "10px 24px", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, fontFamily: "'Jost', sans-serif", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.target.style.borderColor = "#c4a882"; e.target.style.color = "#c4a882"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "rgba(196,168,130,0.35)"; e.target.style.color = "rgba(250,247,244,0.5)"; }}>
                  Enviar otro mensaje
                </button>
              </div>

            ) : (
              /* Formulario activo */
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(250,247,244,0.28)", textTransform: "uppercase" }}>
                  Envíanos un mensaje
                </div>

                {/* Honeypot — invisible para humanos, bots lo llenan */}
                <input
                  value={form.honeypot}
                  onChange={e => setForm({ ...form, honeypot: e.target.value })}
                  style={{ display: "none" }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                {/* Nombre */}
                <div>
                  <label style={{ fontSize: 9, letterSpacing: "0.25em", color: "#c4a882", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Nombre</label>
                  <input
                    value={form.name}
                    onChange={e => { setForm({ ...form, name: e.target.value }); setErrors(ev => ({ ...ev, name: "" })); }}
                    placeholder="Tu nombre completo"
                    style={{ ...inputStyle, borderBottomColor: errors.name ? "#e8998a" : "rgba(196,168,130,0.45)" }}
                    onFocus={e => e.target.style.borderBottomColor = "#c4a882"}
                    onBlur={e => e.target.style.borderBottomColor = errors.name ? "#e8998a" : "rgba(196,168,130,0.45)"}
                  />
                  {errors.name && <span style={errorStyle}>⚠ {errors.name}</span>}
                </div>

                {/* Email */}
                <div>
                  <label style={{ fontSize: 9, letterSpacing: "0.25em", color: "#c4a882", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Correo electrónico</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => { setForm({ ...form, email: e.target.value }); setErrors(ev => ({ ...ev, email: "" })); }}
                    placeholder="tu@correo.com"
                    style={{ ...inputStyle, borderBottomColor: errors.email ? "#e8998a" : "rgba(196,168,130,0.45)" }}
                    onFocus={e => e.target.style.borderBottomColor = "#c4a882"}
                    onBlur={e => e.target.style.borderBottomColor = errors.email ? "#e8998a" : "rgba(196,168,130,0.45)"}
                  />
                  {errors.email && <span style={errorStyle}>⚠ {errors.email}</span>}
                </div>

                {/* Mensaje */}
                <div>
                  <label style={{ fontSize: 9, letterSpacing: "0.25em", color: "#c4a882", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Mensaje</label>
                  <textarea
                    value={form.message}
                    onChange={e => { setForm({ ...form, message: e.target.value }); setErrors(ev => ({ ...ev, message: "" })); }}
                    placeholder="¿En qué podemos ayudarte? Cuéntanos sobre la prenda que buscas…"
                    rows={4}
                    style={{ ...inputStyle, resize: "none", borderBottomColor: errors.message ? "#e8998a" : "rgba(196,168,130,0.45)" }}
                    onFocus={e => e.target.style.borderBottomColor = "#c4a882"}
                    onBlur={e => e.target.style.borderBottomColor = errors.message ? "#e8998a" : "rgba(196,168,130,0.45)"}
                  />
                  {errors.message && <span style={errorStyle}>⚠ {errors.message}</span>}
                  {/* Contador de caracteres */}
                  <span style={{ fontSize: 9, color: "rgba(250,247,244,0.2)", float: "right", marginTop: 6, letterSpacing: "0.05em" }}>
                    {form.message.length} / 500
                  </span>
                </div>

                {/* Error de envío */}
                {status === "error" && (
                  <div style={{ background: "rgba(232,153,138,0.1)", border: "1px solid rgba(232,153,138,0.3)", borderRadius: 3, padding: "12px 16px", fontSize: 12, color: "#e8998a", lineHeight: 1.7 }}>
                    Hubo un problema al enviar. Intenta de nuevo o escríbenos directo a{" "}
                    <a href={`mailto:${BRAND.email}`} style={{ color: "#c4a882" }}>{BRAND.email}</a>
                  </div>
                )}

                {/* Botón enviar */}
                <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                  <button
                    onClick={handleSubmit}
                    disabled={status === "sending" || cooldown > 0}
                    style={{
                      background: status === "sending" ? "rgba(196,168,130,0.5)" : "#c4a882",
                      color: "#faf7f4", border: "none", padding: "15px 40px",
                      fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
                      cursor: status === "sending" || cooldown > 0 ? "not-allowed" : "pointer",
                      borderRadius: 2, fontFamily: "'Jost', sans-serif",
                      transition: "background 0.3s", display: "flex", alignItems: "center", gap: 10,
                      opacity: cooldown > 0 ? 0.6 : 1,
                    }}
                    onMouseEnter={e => { if (status !== "sending" && cooldown === 0) e.currentTarget.style.background = "#b8956a"; }}
                    onMouseLeave={e => { if (status !== "sending" && cooldown === 0) e.currentTarget.style.background = "#c4a882"; }}
                  >
                    {status === "sending" ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                          <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/>
                          <path d="M12 2a10 10 0 0110 10"/>
                        </svg>
                        Enviando…
                      </>
                    ) : cooldown > 0 ? `Espera ${cooldown}s` : "Enviar mensaje"}
                  </button>

                  <span style={{ fontSize: 10, color: "rgba(250,247,244,0.2)", letterSpacing: "0.05em" }}>
                    Recibirás confirmación por correo
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  const SOCIALS = [
    { label: "Instagram", href: BRAND.instagram, icon: Icon.instagram },
    { label: "WhatsApp",  href: WA_LINK(),        icon: Icon.whatsapp },
    { label: "Email",     href: `mailto:${BRAND.email}`, icon: Icon.email },
  ];

  const FOOTER_LINKS = [
    { label: "Colección",  id: "coleccion" },
    { label: "Categorías", id: "categorias" },
    { label: "Nosotras",   id: "nosotras" },
    { label: "Galería",    id: "galeria" },
    { label: "Contacto",   id: "contacto" },
  ];

  return (
    <footer style={{ background: "#1e1510", padding: "64px 24px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Top */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48, marginBottom: 56, flexWrap: "wrap" }} className="footer-top">
          {/* Brand */}
          <div>
            <div className="font-display" style={{ fontSize: 26, color: "#faf7f4", fontWeight: 300, letterSpacing: "0.15em" }}>ALASA</div>
            <div style={{ fontSize: 9, letterSpacing: "0.45em", color: "#c4a882", marginTop: -2, marginBottom: 18 }}>BOHO</div>
            <p style={{ fontSize: 12, lineHeight: 1.85, color: "rgba(250,247,244,0.35)", fontWeight: 300, maxWidth: 220 }}>
              Moda boho contemporánea para mujeres auténticas. Piezas únicas con esencia natural y elegante.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <div style={{ fontSize: 8, letterSpacing: "0.35em", color: "#c4a882", textTransform: "uppercase", marginBottom: 20 }}>Navegación</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {FOOTER_LINKS.map(({ label, id }) => (
                <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                  style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: 12, color: "rgba(250,247,244,0.4)", fontFamily: "'Jost', sans-serif", letterSpacing: "0.08em", padding: 0, transition: "color 0.25s" }}
                  onMouseEnter={e => e.target.style.color = "#c4a882"}
                  onMouseLeave={e => e.target.style.color = "rgba(250,247,244,0.4)"}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <div style={{ fontSize: 8, letterSpacing: "0.35em", color: "#c4a882", textTransform: "uppercase", marginBottom: 20 }}>Contacto</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a href={WA_LINK()} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(250,247,244,0.4)", textDecoration: "none", fontSize: 12, transition: "color 0.25s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#c4a882"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,244,0.4)"}>
                <span style={{ color: "#c4a882", opacity: 0.7 }}>{Icon.phone}</span> {BRAND.whatsappFormatted}
              </a>
              <a href={`mailto:${BRAND.email}`} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(250,247,244,0.4)", textDecoration: "none", fontSize: 12, transition: "color 0.25s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#c4a882"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,244,0.4)"}>
                <span style={{ color: "#c4a882", opacity: 0.7 }}>{Icon.email}</span> {BRAND.email}
              </a>
              <a href={BRAND.mapsUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "rgba(250,247,244,0.4)", textDecoration: "none", fontSize: 12, transition: "color 0.25s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#c4a882"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,244,0.4)"}>
                <span style={{ color: "#c4a882", opacity: 0.7, marginTop: 1, flexShrink: 0 }}>{Icon.pin}</span> {BRAND.locationShort}
              </a>
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 14, marginTop: 24 }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target={s.href.startsWith("mailto") ? "_self" : "_blank"} rel="noreferrer"
                  title={s.label} className="social-link"
                  style={{ color: "#c4a882", textDecoration: "none" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(196,168,130,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 10, color: "rgba(250,247,244,0.2)", letterSpacing: "0.05em" }}>
            © 2025 Alasa Boho · Todos los derechos reservados
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 10, color: "rgba(250,247,244,0.2)", letterSpacing: "0.05em" }}>Hecho con</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#c4a882"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span style={{ fontSize: 10, color: "rgba(250,247,244,0.2)", letterSpacing: "0.05em" }}>en México</span>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────
export default function AlasaBoho() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <MarqueeBanner />
      <CatalogSection />
      <AboutSection />
      <GallerySection />
      <ContactSection />
      <Footer />

      {/* FAB WhatsApp */}
      <a href={WA_LINK()} target="_blank" rel="noreferrer" className="wa-fab"
        style={{ position: "fixed", bottom: 28, right: 28, zIndex: 999, background: "#25D366", borderRadius: "50%", width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", boxShadow: "0 4px 20px rgba(37,211,102,0.35)" }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.845L.057 23.882l6.186-1.443A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.003-1.368l-.36-.214-3.717.867.936-3.417-.234-.372A9.794 9.794 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
      </a>
    </>
  );
}
