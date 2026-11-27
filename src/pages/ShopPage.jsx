import React, { useState } from 'react';
import { band } from '../components/SectionBand.jsx';
import { use, A } from '../context/StudioContext.jsx';
import { picture, icon } from '../utils/ui.jsx';

const categories = [
  { name: 'LUTs', caption: 'Cinematic color grades', icon: 'Box', image: 'product4' },
  { name: 'SFX', caption: 'Sound effect packs', icon: 'AudioLines', image: 'product2' },
  { name: 'Overlays', caption: 'Light leaks & textures', icon: 'Film', image: 'product3' },
  { name: 'Presets', caption: 'Photo & video presets', icon: 'Layers', image: 'portrait' },
  { name: 'Transitions', caption: 'Seamless video transitions', icon: 'PlayCircle', image: 'moment7' },
  { name: 'Other Assets', caption: 'Tools, templates & more', icon: 'LayoutGrid', image: 'product5' },
];
const known = categories.slice(0, 5).map(c => c.name.toLowerCase());
const matches = (p, filter) => filter === 'All Products' || (filter === 'Other Assets' ? !known.includes(String(p.category).toLowerCase()) : String(p.category).toLowerCase() === filter.toLowerCase());
const isColor = p => ['luts', 'presets'].includes(String(p.category).toLowerCase());
const imageFor = p => p.id === 'd0' && p.image === A('product1') ? A('product4') : p.id === 'd3' && p.image === A('product4') ? A('portrait') : p.image;
const featuredOrder = ['d0', 'd1', 'd3', 'd2'];
function MarketCards({ items }) {
  const { money, cartAdd, requireAccount, db } = use();
  return <div className="market-grid">{items.map(p => <article className="market-card" key={p.id}>
    <a className="market-card-photo" href={'#/product/' + p.id} aria-label={'View ' + p.title}>
      {picture(imageFor(p), p.title)}<span className="market-card-tag">{p.category}</span>
      <span className="market-cover-title">{p.title}<small>VENUS / CREATIVE COLLECTION</small></span>
      <span className="market-card-open">{icon('ArrowUpRight', 19)}</span>
    </a>
    <div className="market-card-body"><h3><a href={'#/product/' + p.id}>{p.title}</a></h3><p>{p.description}</p>
      <div className="market-card-actions"><strong>{money(p.price)}</strong><button type="button" className="market-buy" onClick={() => { cartAdd(p); requireAccount('/checkout'); }}>{icon('ShoppingCart', 17)} Buy Now</button></div>
      <button type="button" className="market-card-cart" onClick={() => cartAdd(p)}>{icon(db.cart.includes(p.id) ? 'Check' : 'Plus', 15)} {db.cart.includes(p.id) ? 'In your cart' : 'Add to cart'}</button>
    </div>
  </article>)}</div>;
}
export function Shop() {
  const { db } = use();
  const [filter, setFilter] = useState('All Products');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('featured');
  const [showAll, setShowAll] = useState(false);
  const list = db.products.filter(p => matches(p, filter) && `${p.title} ${p.description} ${p.category}`.toLowerCase().includes(q.trim().toLowerCase()));
  if (sort === 'low') list.sort((a,b) => Number(a.price)-Number(b.price));
  else if (sort === 'high') list.sort((a,b) => Number(b.price)-Number(a.price));
  else if (sort === 'name') list.sort((a,b) => a.title.localeCompare(b.title));
  else list.sort((a,b) => (featuredOrder.includes(a.id) ? featuredOrder.indexOf(a.id) : 99) - (featuredOrder.includes(b.id) ? featuredOrder.indexOf(b.id) : 99));
  const featured = !showAll && filter === 'All Products' && !q.trim() && sort === 'featured';
  const reset = () => { setFilter('All Products'); setQ(''); setSort('featured'); setShowAll(true); };
  return <div className="market-page">
    <section className="market-hero" aria-labelledby="market-title">
      <div className="market-hero-image" aria-hidden="true" />
      <div className="market-wrap market-hero-inner"><span className="market-kicker">Digital marketplace <span> / </span> Venus</span>
        <h1 id="market-title">LUTs, SFX &amp;<br />Creative Assets<span>.</span></h1>
        <p>Professional color grades, sound effects and creative resources for photographers and filmmakers.</p>
        <div className="market-hero-features">{[['Zap','Digital assets'],['ShieldCheck','Account checkout'],['Layers','Creative collections']].map(([i,t]) => <span key={t}>{icon(i,23)}{t}</span>)}</div>
        <a className="market-hero-link" href="#/shop" onClick={e => { e.preventDefault(); document.getElementById('market-collection')?.scrollIntoView({behavior:'smooth'}); }}>Explore the collection {icon('ArrowDownRight',18)}</a>
      </div>
    </section>
    {band('store', <section className="market-wrap market-collection" id="market-collection">
      <div className="market-categories" aria-label="Creative asset categories">{categories.map(c => <button key={c.name} type="button" className={`market-category ${filter === c.name ? 'active' : ''}`} aria-pressed={filter === c.name} onClick={() => { setFilter(filter === c.name ? 'All Products' : c.name); setShowAll(true); }} style={{'--category-image': `url(${A(c.image)})`}}>{icon(c.icon,30)}<strong>{c.name}</strong><small>{c.caption}</small></button>)}</div>
      <div className="market-title-row"><h2>{featured ? 'Featured Collections' : filter === 'All Products' ? 'All Creative Assets' : filter}</h2><span className="market-title-line"/><button type="button" className="market-text-button" onClick={reset}>View All {icon('ArrowRight',20)}</button></div>
      <div className="market-toolbar"><label className="market-search">{icon('Search',19)}<input type="search" placeholder="Find your next creative asset…" aria-label="Search products" value={q} onChange={e=>setQ(e.target.value)}/></label><span role="status">{featured ? `Showing ${Math.min(4,list.length)} of ${list.length}` : `${list.length} products`}</span><label className="market-sort"><span>Sort by</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="name">Name: A–Z</option></select></label></div>
      {list.length ? <MarketCards items={featured ? list.slice(0,4) : list}/> : <div className="market-empty">{icon('PackageOpen',36)}<h3>No products found</h3><p>Explore another category or try a different search.</p><button type="button" className="market-buy" onClick={reset}>Browse all assets</button></div>}
      <p className="market-note">Demo marketplace — sample products and prices. No real payment or digital file delivery.</p>
    </section>)}
    {band('shop-assurance', <section className="market-wrap market-studio"><div><span className="market-kicker">From our studio to yours</span><h2>Give every frame<br/>your signature.</h2><p>Discover tools for your creative workflow, or get in touch with our studio for help choosing an asset.</p><a className="market-buy" href="#/contact">Talk to us {icon('ArrowUpRight',17)}</a></div><img src={A('commercial-wide')} alt="Professional cinema camera in the Venus studio" loading="lazy"/></section>)}
  </div>;
}

function ProductPreview({ p }) {
  const comparison = isColor(p);
  const samples = comparison ? [...new Set([imageFor(p), A('moment7'), A('portrait'), A('wedding')])].map((src,i)=>({src, label: i === 0 ? 'Main preview' : `Sample ${i}`})) : [{src:p.image,label:'Product preview'}];
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState(50);
  const current = samples[active] || samples[0];
  return <div className="market-preview-layout">
    <div className="market-thumbs" aria-label="Preview images">{samples.map((s,i)=><button key={s.src} type="button" aria-label={s.label} aria-pressed={active===i} className={active===i?'active':''} onClick={()=>{setActive(i);setPosition(50);}}>{picture(s.src,s.label)}</button>)}</div>
    <div><div className={`market-preview ${comparison?'is-comparison':''}`} style={{'--compare':`${position}%`}}>
      {picture(current.src, p.title + ' preview', comparison?'market-before':'')}
      {comparison && <><img src={current.src} className="market-after" alt="Illustrative color graded preview"/><span className="market-before-label">Before</span><span className="market-after-label">After</span><div className="market-divider" aria-hidden="true"><span>{icon('ChevronsLeftRight',23)}</span></div><input className="market-compare-range" aria-label="Before and after comparison position" type="range" min="0" max="100" value={position} onChange={e=>setPosition(Number(e.target.value))}/></>}
    </div>{comparison && <p className="market-compare-note">Drag to compare an illustrative color grade. Actual LUT or preset output is not supplied in this demo.</p>}</div>
  </div>;
}
export function ProductDetail({ id }) {
  const { db, money, cartAdd, requireAccount, notify } = use();
  const p = db.products.find(x=>x.id===id);
  const [saved,setSaved] = useState(()=>{try{return JSON.parse(localStorage.getItem('venus-market-favourites')||'[]')}catch{return []}});
  const toggleSave = () => { const next=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id]; setSaved(next); try{localStorage.setItem('venus-market-favourites',JSON.stringify(next));}catch{} };
  const share = async () => { try { if(navigator.share) await navigator.share({title:p.title,url:location.href}); else { await navigator.clipboard.writeText(location.href); notify('Product link copied.'); } } catch(e) { if(e.name!=='AbortError') notify('Copy the product URL from your address bar.'); } };
  if(!p) return <section className="market-wrap market-detail"><h1>Product not found</h1><a className="market-buy" href="#/shop">Back to shop</a></section>;
  const related=db.products.filter(x=>x.id!==id).slice(0,4);
  return <div className="market-wrap market-detail">
    <nav className="market-crumb" aria-label="Breadcrumb"><a href="#/" aria-label="Home">{icon('House',17)}</a>{icon('ChevronRight',14)}<a href="#/shop">Shop</a>{icon('ChevronRight',14)}<span>{p.category}</span>{icon('ChevronRight',14)}<span aria-current="page">{p.title}</span></nav>
    <div className="market-detail-grid"><ProductPreview p={p} key={id}/><div className="market-detail-info">
      <div className="market-detail-top"><span className="market-detail-tag">{icon('Layers',18)}{p.category}</span><div><button type="button" className={`market-circle ${saved.includes(id)?'saved':''}`} aria-label={saved.includes(id)?'Remove from favourites':'Save to favourites'} aria-pressed={saved.includes(id)} onClick={toggleSave}>{icon('Heart',21)}</button><button type="button" className="market-circle" aria-label="Share product" onClick={share}>{icon('Share2',20)}</button></div></div>
      <h1>{p.title}</h1><p className="market-detail-description">{p.description}</p><strong className="market-detail-price">{money(p.price)}</strong>
      <div className="market-detail-perks">{[['FileDown','Digital product'],['UserRound','Account checkout'],['Headphones','Studio support']].map(([i,t])=><div key={t}>{icon(i,27)}<span>{t}</span></div>)}</div>
      <div className="market-detail-actions"><button type="button" className="market-outline" onClick={()=>cartAdd(p)}>{icon(db.cart.includes(id)?'Check':'ShoppingCart',21)}{db.cart.includes(id)?'In your cart':'Add to Cart'}</button><button type="button" className="market-buy" onClick={()=>{cartAdd(p);requireAccount('/checkout');}}>{icon('Zap',20)} Buy Now</button></div>
      <p className="market-note">One copy per digital product. This is a demo listing; payment, download and licensing are not implemented.</p>
      <div className="market-detail-more"><h3>About this asset</h3><p>{p.description}</p><a href="#/contact">Ask us about compatibility or licensing {icon('ArrowUpRight',16)}</a></div>
    </div></div>
    {!!related.length && <section className="market-related"><div className="market-title-row"><h2>Explore more collections</h2><span className="market-title-line"/><a href="#/shop" className="market-text-button">View All {icon('ArrowRight',20)}</a></div><MarketCards items={related}/></section>}
  </div>;
}
