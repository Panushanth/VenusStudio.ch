import React from 'react';
import { use } from '../context/StudioContext.jsx';
import { el, btn, link } from '../utils/ui.jsx';
import { band } from '../components/SectionBand.jsx';

export function Account() {
  const { db, user, setUser, go } = use();
  const bookings = db.bookings.filter(x => x.customerId === user.id);
  const orders = db.orders.filter(x => x.customerId === user.id);
  return el('div', 'member-page',
    band('account', el('section', 'wrap section account-head',
      el('div', '', el('span', 'eyebrow', 'MY ACCOUNT'), el('h1', '', 'Welcome, ' + user.name), el('p', 'muted', user.email)),
      btn('Sign Out', () => { setUser(null); go('/'); }, 'outline', 'LogOut')
    )),
    band('booking', el('section', 'wrap section member-records',
      el('h2', '', 'My Bookings'),
      bookings.length ? el('div', 'record-grid', bookings.map(x => el('article', 'card form-card', el('h3', '', x.service), el('p', '', `${x.date} · ${x.time}`), el('span', 'status', x.status)))) : el('p', 'muted', 'No bookings yet.'),
      link('Book an Event', '/booking', 'btn gold')
    )),
    band('orders', el('section', 'wrap section member-records',
      el('h2', '', 'My Orders'),
      orders.length ? el('div', 'record-grid', orders.map(x => el('article', 'card form-card', el('h3', '', x.items.map(i => i.title).join(', ')), el('span', 'status', x.status), el('p', 'muted', 'Demo order — digital delivery requires a backend.')))) : el('p', 'muted', 'No orders yet.'),
      link('Browse Creative Store', '/shop', 'btn outline')
    ))
  );
}
