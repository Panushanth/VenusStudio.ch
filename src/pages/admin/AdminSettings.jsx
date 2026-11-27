import React from 'react';
import { use, h } from '../../context/StudioContext.jsx';
import { formData, el, field, area } from '../../utils/ui.jsx';
export function Settings() {
  const { db, update, notify } = use(); const s = db.settings; return h(
    'form',
    { className: 'card form-card settings-form', onSubmit: e => { e.preventDefault(); update('settings', { ...s, ...formData(e) }); notify('Website settings saved.'); } },
    el('h2', '', 'Business Information'),
    el(
      'div',
      'form-grid',
      [['email', 'Business Email', 'email'], ['phone', 'Telephone', 'tel'], ['whatsapp', 'WhatsApp international number', 'tel'], ['address', 'Studio Address'], ['hours', 'Opening Hours'], ['currency', 'Store Currency'], ['eventsCovered', 'Events Covered'], ['happyClients', 'Happy Clients'], ['yearsExperience', 'Years of Experience'], ['clientSatisfaction', 'Client Satisfaction'], ['instagram', 'Instagram URL', 'url'], ['facebook', 'Facebook URL', 'url'], ['youtube', 'YouTube URL', 'url'], ['tiktok', 'TikTok URL', 'url']].map(([k, l, t]) => field(l, k, t || 'text', { defaultValue: s[k] }))
    ),
    el('h2', '', 'Studio Content'),
    ['story', 'vision', 'mission', 'values'].map(k => area(k[0].toUpperCase() + k.slice(1), k, { defaultValue: s[k], required: true })),
    h('button', { className: 'btn gold' }, 'Save Website Settings')
  );
}
