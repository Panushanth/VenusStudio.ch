import React from 'react';
import { use } from '../context/StudioContext.jsx';
import { el, picture, btn, link } from '../utils/ui.jsx';
export function Cart({ checkout }) {
  const { db, update, user, requireAccount, add, go, notify, money } = use(); const items = db.products.filter(p => db.cart.includes(p.id)); const total = items.reduce((a, p) => a + Number(p.price), 0); return el(
    'section',
    'wrap section',
    el('h1', '', checkout ? 'Checkout' : 'Your Shopping Cart'),
    el('p', 'muted', 'Demo store — no real payment will be taken.'),
    items.length ? el(
      'div',
      'cart-grid',
      el(
        'div',
        'card cart-list',
        items.map(p => el(
          'article',
          'cart-row',
          picture(p.image, p.title),
          el('div', '', el('h3', '', p.title), el('p', '', money(p.price))),
          btn('Remove', () => update('cart', a => a.filter(id => id !== p.id)), 'outline', 'Trash2')
        ))
      ),
      el(
        'div',
        'card form-card',
        el('h2', '', 'Order Summary'),
        el('p', '', `${items.length} digital products`),
        el('h3', '', money(total)),
        checkout ? btn(
          'Place Demo Order',
          () => {
            add(
              'orders',
              { customerId: user.id, name: user.name, email: user.email, items: items.map(p => ({ id: p.id, title: p.title, price: p.price })), total, status: 'Pending', created: new Date().toISOString() }
            ); update('cart', []); notify('Demo order created. No payment collected.'); go('/account');
          }
        ) : btn('Continue to Checkout →', () => requireAccount('/checkout'))
      )
    ) : el('div', 'access', el('p', '', 'Your cart is empty.'), link('Explore Shop', '/shop', 'btn gold'))
  );
}
