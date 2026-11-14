import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowUpRight, ArrowRight, Menu, X, Plus, Star, Heart, Sparkles } from "lucide-react";
import "./style.css";

const products = [
  {
    name: "Strawberry Dream",
    description: "Vanilla sponge · berry cream",
    price: "Rs. 3,800",
    tag: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Choco Cloud",
    description: "Dark chocolate · silky ganache",
    price: "Rs. 2,900",
    tag: "CUTE ALERT",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Pink Pop",
    description: "Strawberry · vanilla buttercream",
    price: "Rs. 4,200",
    tag: "A LITTLE ICONIC",
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=900&q=85",
  },
];

const reviews = [
  ["A", "Ayesha K.", "Birthday girl, now regular", "The cake was almost too pretty to eat. Almost. The strawberry filling? Actual perfection."],
  ["M", "Mahnoor R.", "Professional cake enthusiast", "Ordered at the last minute and they absolutely understood the assignment. 10/10 vibes."],
  ["Z", "Zara S.", "Repeat customer", "Not to be dramatic but this cake changed my life. My friends are still talking about it."],
];

function Reveal({ children, className = "" }) {
  const ref = React.useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? "visible" : ""} ${className}`}>{children}</div>;
}

function Logo() {
  return <a className="logo" href="#home"><span className="logo-mark">✳</span> sugar<span>rush.</span></a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <>
    <div className="announcement">✨ A little treat goes a long way — free delivery on orders over Rs. 5,000 ✨</div>
    <header className="header">
      <Logo />
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
        {open ? <X /> : <Menu />}
      </button>
      <nav className={`nav ${open ? "open" : ""}`}>
        <a href="#menu" onClick={close}>The menu</a>
        <a href="#story" onClick={close}>Our vibe</a>
        <a href="#reviews" onClick={close}>Love notes</a>
        <a className="nav-cta" href="#order" onClick={close}>Order a cake <ArrowUpRight size={15} /></a>
      </nav>
    </header>
  </>;
}

function Hero() {
  return <section className="hero" id="home">
    <Reveal className="hero-copy">
      <div className="eyebrow"><Sparkles size={14} /> BAKED FRESH. MADE WITH FEELING.</div>
      <h1>Life's too short<br />for <em>boring</em> cake<span className="pink-dot">.</span></h1>
      <p>Big main-character energy. Extra frosting. Zero boring bites. Meet your new favourite reason to celebrate.</p>
      <div className="hero-actions">
        <a className="button button-dark" href="#menu">Explore the menu <ArrowUpRight size={16} /></a>
        <a className="text-link" href="#story">Get to know us <ArrowRight size={15} /></a>
      </div>
      <div className="hero-social">
        <div className="avatar-stack"><span>🍓</span><span>🍒</span><span>🧁</span></div>
        <div><strong>4.9/5</strong><small>from 1,200+ happy sweet teeth</small></div>
      </div>
    </Reveal>
    <Reveal className="hero-art">
      <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
      <div className="hero-sticker">GOOD<br />MOOD<br />FOOD <span>♡</span></div>
      <img className="hero-cake" src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85" alt="Beautiful layered celebration cake" />
      <div className="floating-note note-one">made with<br />extra love <b>♡</b></div>
      <div className="floating-note note-two">100%<br />GOOD VIBES ✳</div>
      <span className="doodle doodle-one">✳</span><span className="doodle doodle-two">♡</span>
    </Reveal>
    <div className="hero-bottom"><span>SCROLL FOR THE GOOD STUFF</span><span className="scroll-line" /><span>01 / 04</span></div>
  </section>;
}

function Ticker() {
  return <div className="ticker"><div className="ticker-track">
    {Array.from({ length: 2 }).map((_, i) => <React.Fragment key={i}>
      <span>BAKED WITH LOVE</span> ✳ <span>FROSTED TO PERFECTION</span> ✳ <span>MADE FOR YOUR CAMERA ROLL</span> ✳
    </React.Fragment>)}
  </div></div>;
}

function MenuSection({ addToList }) {
  return <section className="menu-section section-pad" id="menu">
    <Reveal className="section-heading"><div><div className="eyebrow">THE GOOD STUFF</div><h2>Pick your <em>happy.</em></h2></div><p>For birthdays, breakups, Fridays, or literally just because. We don't judge.</p></Reveal>
    <div className="product-grid">
      {products.map((product, index) => <Reveal key={product.name} className="product-card">
        <div className="product-image">
          <span className={`product-tag tag-${index}`}>{product.tag}</span>
          <img src={product.image} alt={product.name} loading="lazy" />
          <button className="quick-add" onClick={() => addToList(product.name)} aria-label={`Add ${product.name}`}><Plus /></button>
        </div>
        <div className="product-info"><div><h3>{product.name}</h3><p>{product.description}</p></div><strong>{product.price}</strong></div>
      </Reveal>)}
    </div>
    <div className="center-action"><a className="button button-outline" href="#order">See what's baking <ArrowUpRight size={16} /></a></div>
  </section>;
}

function Story() {
  return <section className="story-section section-pad" id="story">
    <Reveal className="story-image"><img src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1000&q=85" alt="Freshly baked cupcakes" loading="lazy" /><span className="image-caption">A LITTLE JOY, EVERY DAY.</span></Reveal>
    <Reveal className="story-copy"><div className="eyebrow">NOT JUST A PRETTY CAKE</div><h2>We put the <em>extra</em><br />in extraordinary.</h2><p>We're a small-batch bakery with a big soft spot for life's little moments. Every cake is baked from scratch, decorated by hand, and made to bring people together.</p>
      <div className="stats"><div><strong>100%</strong><span>real ingredients</span></div><div><strong>0</strong><span>boring bites</span></div><div><strong>∞</strong><span>reasons to celebrate</span></div></div>
      <a className="text-link" href="#order">A little more about us <ArrowRight size={15} /></a>
    </Reveal>
  </section>;
}

function Reviews() {
  return <section className="reviews section-pad" id="reviews">
    <Reveal className="section-heading"><div><div className="eyebrow">DON'T JUST TAKE OUR WORD</div><h2>Sweet words from<br /><em>sweet people.</em></h2></div><div className="review-score"><strong>4.9</strong><span>★★★★★</span><small>REAL LOVE. REAL REVIEWS.</small></div></Reveal>
    <div className="review-grid">{reviews.map(([initial, name, role, quote], i) => <Reveal key={name} className={`review-card ${i === 1 ? "review-featured" : ""}`}>
      <div className="stars">★★★★★</div><p>“{quote}”</p><div className="reviewer"><span className="review-avatar">{initial}</span><div><strong>{name}</strong><small>{role}</small></div></div>
    </Reveal>)}</div>
  </section>;
}

function OrderSection() {
  return <section className="order-section section-pad" id="order">
    <div className="order-card"><div className="order-copy"><div className="eyebrow">YOUR NEXT HAPPY MOMENT</div><h2>Let's make<br />something <em>sweet.</em></h2><p>Tell us what you're craving. We'll take it from here.</p>
      <a className="button button-dark" href="https://wa.me/923003189260?text=Hi%20Sugar%20Rush!%20I'd%20love%20to%20order%20a%20cake." target="_blank" rel="noreferrer">Order on WhatsApp <ArrowUpRight size={16} /></a>
      <small>Update the demo WhatsApp number before publishing.</small></div>
      <div className="order-image"><img src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1000&q=85" alt="Decorated celebration cake" loading="lazy" /><span className="order-heart"><Heart /></span></div>
    </div>
  </section>;
}

function App() {
  const [toast, setToast] = useState("");
  const addToList = name => {
    setToast(`${name} added to your sweet list ♡`);
    window.clearTimeout(window.toastTimer);
    window.toastTimer = window.setTimeout(() => setToast(""), 2300);
  };
  return <>
    <Header />
    <main><Hero /><Ticker /><MenuSection addToList={addToList} /><Story />
      <section className="quote-band"><span className="quote-spark">✳</span><p>“Happiness is knowing<br />there's <em>cake</em> in the fridge.”</p><span className="quote-credit">— EVERYONE, PROBABLY</span></section>
      <Reviews /><OrderSection />
    </main>
    <footer className="footer"><Logo /><p>Made with frosting & feelings. © 2026 Sugar Rush.</p><div className="footer-links"><a href="#menu">Menu</a><a href="#story">Our vibe</a><a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a></div></footer>
    <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">{toast}</div>
  </>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
