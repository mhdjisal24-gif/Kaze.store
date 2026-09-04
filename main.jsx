import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ShoppingBag, Search, Menu, X, Plus, Minus, Trash2,
  MessageCircle, ChevronRight, Star
} from "lucide-react";
import "./styles.css";

const WHATSAPP_NUMBER = "919946375868"; // CHANGE THIS to your WhatsApp number, country code included.

const products = [
  { id: 1, name: "Urban Runner", category: "Shoes", price: 1499, oldPrice: 1999, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80", rating: 4.8 },
  { id: 2, name: "Classic Street", category: "Shoes", price: 1799, oldPrice: 2299, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80", rating: 4.7 },
  { id: 3, name: "Minimal Chrono", category: "Watches", price: 1299, oldPrice: 1699, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80", rating: 4.9 },
  { id: 4, name: "Steel Classic", category: "Watches", price: 1599, oldPrice: 2099, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80", rating: 4.8 },
  { id: 5, name: "Everyday Slides", category: "Footwear", price: 699, oldPrice: 899, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=900&q=80", rating: 4.6 },
  { id: 6, name: "Leather Wallet", category: "Accessories", price: 599, oldPrice: 799, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80", rating: 4.7 }
];

function money(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function App() {
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = useMemo(() => products.filter(p =>
    (category === "All" || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  ), [category, search]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  function addToCart(product) {
    setCart(old => {
      const found = old.find(x => x.id === product.id);
      if (found) return old.map(x => x.id === product.id ? {...x, qty: x.qty + 1} : x);
      return [...old, {...product, qty: 1}];
    });
    setCartOpen(true);
  }

  function changeQty(id, delta) {
    setCart(old => old.flatMap(x => x.id !== id ? [x] : x.qty + delta <= 0 ? [] : [{...x, qty: x.qty + delta}]));
  }

  function openCheckout() {
    setCartOpen(false);
    setCheckoutOpen(true);
  }

  function placeOrder(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const customer = {
      name: f.get("name"),
      phone: f.get("phone"),
      address: f.get("address"),
      note: f.get("note")
    };
    const lines = cart.map(x => `• ${x.name} × ${x.qty} — ${money(x.price * x.qty)}`).join("\n");
    const message =
`*NEW ORDER — CASE STORE*

*Customer:* ${customer.name}
*Phone:* ${customer.phone}
*Address:* ${customer.address}

*Order:*
${lines}

*Total:* ${money(total)}
${customer.note ? `\n*Note:* ${customer.note}` : ""}

Please confirm my order.`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <button className="icon-btn mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X/> : <Menu/>}
          </button>
          <a className="logo" href="#">CASE<span>STORE</span></a>
          <nav className={menuOpen ? "nav open" : "nav"}>
            {["All", "Shoes", "Watches", "Footwear", "Accessories"].map(c =>
              <button key={c} className={category === c ? "active" : ""} onClick={() => {setCategory(c); setMenuOpen(false)}}>{c}</button>
            )}
          </nav>
          <div className="header-actions">
            <label className="search">
              <Search size={18}/>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." />
            </label>
            <button className="bag" onClick={() => setCartOpen(true)} aria-label="Cart">
              <ShoppingBag size={21}/><span>{count}</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">SIMPLE • PREMIUM • EVERYDAY</p>
            <h1>Style that fits<br/><em>your everyday.</em></h1>
            <p className="hero-text">Discover clean, modern shoes, watches and essentials — carefully picked for your daily life.</p>
            <button className="primary" onClick={() => document.getElementById("products").scrollIntoView({behavior:"smooth"})}>
              Shop collection <ChevronRight size={18}/>
            </button>
          </div>
          <div className="hero-card">
            <img src={products[0].image} alt="Urban Runner shoes"/>
            <div className="floating"><b>New drop</b><span>Urban Runner</span></div>
          </div>
        </section>

        <section className="benefits">
          <div><strong>01</strong><span>Quality picks<br/><small>Made for everyday</small></span></div>
          <div><strong>02</strong><span>Easy ordering<br/><small>Order directly on WhatsApp</small></span></div>
          <div><strong>03</strong><span>Quick support<br/><small>We're one message away</small></span></div>
        </section>

        <section id="products" className="products-section">
          <div className="section-head">
            <div><p className="eyebrow">OUR COLLECTION</p><h2>Shop your favourites</h2></div>
            <span>{filtered.length} products</span>
          </div>
          <div className="filters">
            {["All","Shoes","Watches","Footwear","Accessories"].map(c =>
              <button className={category===c ? "selected":""} onClick={()=>setCategory(c)} key={c}>{c}</button>
            )}
          </div>
          <div className="grid">
            {filtered.map(p => (
              <article className="product" key={p.id}>
                <div className="product-image">
                  <img src={p.image} alt={p.name}/>
                  {p.oldPrice && <b className="sale">SALE</b>}
                  <button className="quick-add" onClick={() => addToCart(p)}><Plus size={18}/></button>
                </div>
                <div className="product-info">
                  <div className="product-category">{p.category}</div>
                  <h3>{p.name}</h3>
                  <div className="rating"><Star size={14} fill="currentColor"/>{p.rating}</div>
                  <div className="price">{money(p.price)} <del>{money(p.oldPrice)}</del></div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div><a className="logo" href="#">CASE<span>STORE</span></a><p>Simple products. Easy shopping.</p></div>
        <div><b>Shop</b><button onClick={()=>setCategory("Shoes")}>Shoes</button><button onClick={()=>setCategory("Watches")}>Watches</button><button onClick={()=>setCategory("Accessories")}>Accessories</button></div>
        <div><b>Order</b><p>Place your order directly<br/>through WhatsApp.</p></div>
      </footer>

      <a className="whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><MessageCircle size={22}/><span>Chat with us</span></a>

      {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)}>
        <aside className="drawer" onClick={e=>e.stopPropagation()}>
          <div className="drawer-head"><h2>Your bag</h2><button className="icon-btn" onClick={()=>setCartOpen(false)}><X/></button></div>
          {cart.length === 0 ? <div className="empty"><ShoppingBag size={42}/><p>Your bag is empty.</p></div> :
          <>
            <div className="cart-items">{cart.map(x=>
              <div className="cart-item" key={x.id}>
                <img src={x.image} alt=""/>
                <div><b>{x.name}</b><span>{money(x.price)}</span>
                  <div className="qty"><button onClick={()=>changeQty(x.id,-1)}><Minus size={13}/></button><span>{x.qty}</span><button onClick={()=>changeQty(x.id,1)}><Plus size={13}/></button><button className="remove" onClick={()=>setCart(c=>c.filter(i=>i.id!==x.id))}><Trash2 size={14}/></button></div>
                </div>
              </div>
            )}</div>
            <div className="cart-bottom"><div><span>Total</span><strong>{money(total)}</strong></div><button className="primary full" onClick={openCheckout}>Continue to order</button></div>
          </>}
        </aside>
      </div>}

      {checkoutOpen && <div className="overlay" onClick={() => setCheckoutOpen(false)}>
        <div className="checkout" onClick={e=>e.stopPropagation()}>
          <div className="drawer-head"><div><p className="eyebrow">FINAL STEP</p><h2>Place your order</h2></div><button className="icon-btn" onClick={()=>setCheckoutOpen(false)}><X/></button></div>
          <div className="order-summary"><span>{count} item(s)</span><strong>{money(total)}</strong></div>
          <form onSubmit={placeOrder}>
            <input name="name" required placeholder="Full name"/>
            <input name="phone" required type="tel" placeholder="WhatsApp / phone number"/>
            <textarea name="address" required placeholder="Full delivery address" rows="3"/>
            <textarea name="note" placeholder="Order note (optional)" rows="2"/>
            <button className="whatsapp-submit" type="submit"><MessageCircle size={20}/> Place order on WhatsApp</button>
            <small>After clicking, WhatsApp will open with your complete order details ready to send.</small>
          </form>
        </div>
      </div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
