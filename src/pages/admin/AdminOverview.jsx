import React from 'react';
import { use, h } from '../../context/StudioContext.jsx';
import { el, icon, link } from '../../utils/ui.jsx';
export function Overview() {
  const { db } = use(); return el(
    'div',
    '',
    el('h1', '', 'Dashboard Overview'),
    el('p', 'muted', 'Manage studio operations and website content from one place.'),
    el(
      'div',
      'kpi-grid',
      [['CalendarDays', 'Bookings', db.bookings.length], ['ShoppingBag', 'Orders', db.orders.length], ['Users', 'Customers', db.customers.length], ['MessageSquare', 'Enquiries', db.enquiries.length], ['Store', 'Products', db.products.length], ['Images', 'Moments', db.moments.length]].map(([i, t, n]) => el('div', 'card kpi', icon(i, 30), el('p', 'muted', t), el('strong', '', n)))
    ),
    el(
      'div',
      'overview-grid',
      el(
        'section',
        'card form-card',
        el('h2', '', 'Recent Bookings'),
        db.bookings.slice(-5).reverse().map(b => el('div', 'admin-recent', el('span', '', b.name + ' · ' + b.service), el('span', 'status', b.status))),
        !db.bookings.length && el('p', 'muted', 'No booking requests yet.'),
        link('Manage Bookings →', '/admin/bookings', 'btn outline')
      ),
      el(
        'section',
        'card form-card',
        el('h2', '', 'Booking Status'),
        ['Pending', 'Confirmed', 'Rejected', 'Completed'].map(s => {
          const n = db.bookings.filter(b => b.status === s).length; return el(
            'div',
            'bar-row',
            el('span', '', s),
            el('div', 'bar-track', h('div', { style: { width: `${n / Math.max(1, db.bookings.length) * 100}%` } })),
            el('strong', '', n)
          );
        })
      ),
      el(
        'section',
        'card form-card',
        el('h2', '', 'Content Shortcuts'),
        ['services', 'packages', 'moments', 'products', 'reviews', 'settings'].map(k => link('Manage ' + k, '/admin/' + k, 'shortcut'))
      ),
      el(
        'section',
        'card form-card',
        el('h2', '', 'Recent Orders'),
        db.orders.slice(-5).reverse().map(o => el('div', 'admin-recent', o.name, el('span', 'status', o.status))),
        !db.orders.length && el('p', 'muted', 'No orders yet.'),
        link('Manage Orders →', '/admin/orders', 'btn outline')
      )
    )
  );
}
