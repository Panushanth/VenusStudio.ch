import React, { useState } from 'react';
import { use, A, h } from '../context/StudioContext.jsx';
import { el, picture, icon, link, formData, field, select, area } from '../utils/ui.jsx';
import { today } from '../data/demoData.js';
export function Booking({ packageId }) {
  const { db, user, add, notify } = use(); const [date, setDate] = useState(''), [receipt, setReceipt] = useState(null); const packageName = db.packages.find(p => p.id === packageId)?.title || db.services.find(p => p.id === packageId)?.title; const configured = db.slots.filter(s => s.date === date && s.status === 'Available' && !db.bookings.some(b => b.date === date && b.time === s.time && b.status === 'Confirmed')); const times = db.slots.length ? configured.map(s => s.time) : ['09:00', '12:00', '15:00', '18:00'].filter(t => !db.bookings.some(b => b.date === date && b.time === t && b.status === 'Confirmed')); const message = receipt ? `Venus Creation event request\nName: ${receipt.name}\nEmail: ${receipt.email}\nService: ${receipt.service}\nDate: ${receipt.date} ${receipt.time}\nLocation: ${receipt.location}\nDetails: ${receipt.message}` : ''; return el(
    'section',
    'wrap section booking-grid',
    el(
      'div',
      '',
      el('span', 'eyebrow', 'BOOK YOUR EVENT'),
      el('h1', '', 'Let’s Capture Your Story'),
      el('p', '', 'Choose a service, event date and preferred time. Our team will review your request.'),
      picture(A('hero'), 'Wedding', 'rounded wide'),
      el('p', 'muted', 'Booking requests are saved in this browser only. No automatic notifications are sent.')
    ),
    receipt ? el(
      'div',
      'card form-card',
      icon('CheckCircle2', 40),
      el('h2', '', 'Request saved'),
      el('p', '', 'Status: Pending. Use the contact buttons below to share your request if configured.'),
      db.settings.email && h(
        'a',
        { className: 'btn gold', href: `mailto:${db.settings.email}?subject=Event%20booking&body=${encodeURIComponent(message)}` },
        'Open email draft'
      ),
      db.settings.whatsapp && h(
        'a',
        { className: 'btn outline', href: `https://wa.me/${db.settings.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, target: '_blank', rel: 'noreferrer' },
        'Open WhatsApp'
      ),
      link('My Bookings →', '/account', 'btn outline')
    ) : h(
      'form',
      { className: 'card form-card', onSubmit: e => { e.preventDefault(); const v = formData(e); const item = { ...v, customerId: user.id, status: 'Pending', created: new Date().toISOString() }; add('bookings', item); setReceipt(item); notify('Booking request saved locally.'); } },
      el('h2', '', 'Event Booking'),
      field('Full Name', 'name', 'text', { required: true, defaultValue: user.name }),
      field('Email', 'email', 'email', { required: true, defaultValue: user.email }),
      field('Phone', 'phone', 'tel', { required: true, defaultValue: user.phone }),
      select(
        'Service / Package',
        'service',
        [...db.packages.map(p => p.title), ...db.services.map(s => s.title)],
        { required: true, defaultValue: packageName }
      ),
      field('Event Date', 'date', 'date', { min: today(), value: date, onChange: e => setDate(e.target.value), required: true }),
      select('Preferred Time', 'time', times.length ? ['', ...times] : [''], { required: true, key: date }),
      !times.length && el('p', 'error', 'No configured time slots are available for this date.'),
      field('Event Location', 'location', 'text', { required: true }),
      area('Special Requirements', 'message'),
      h('button', { className: 'btn gold full', disabled: !times.length }, 'Submit Booking Request →')
    )
  );
}
