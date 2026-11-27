import React from 'react';
import { use } from '../context/StudioContext.jsx';
import { picture, icon } from '../utils/ui.jsx';

export function ProductCards({ items, editorial = false }) {
  const { money, cartAdd, requireAccount } = use();
  return (
    <div className={`product-grid ${editorial ? 'editorial-product-grid' : ''}`}>
      {items.map(p => <article className="card product-card" key={p.id}>
        <a className="product-visual" href={'#/product/' + p.id}>
          {picture(p.image, p.title)}
          {editorial && <span className="product-preview-label">Preview {icon('ArrowUpRight', 15)}</span>}
        </a>
        <div className="card-body">
          <span className="tag">{p.category}</span>
          <h3><a href={'#/product/' + p.id}>{p.title}</a></h3>
          <p className="muted">{p.description}</p>
          <strong className="price">{money(p.price)}</strong>
          <div className="product-actions">
            <button className="btn gold" type="button" onClick={() => { cartAdd(p); requireAccount('/checkout'); }}>Buy Now {editorial && icon('ArrowRight', 15)}</button>
            <button className="btn outline" type="button" onClick={() => cartAdd(p)}>{icon('ShoppingCart', 17)} Add to Cart</button>
          </div>
        </div>
      </article>)}
    </div>
  );
}
