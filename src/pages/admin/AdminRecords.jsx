import React, { useState } from 'react';
import { use, h } from '../../context/StudioContext.jsx';
import { el, btn, formData, area, select, field, picture } from '../../utils/ui.jsx';
import { schemas } from './adminConfig.js';
import { initial, today } from '../../data/demoData.js';
export function AdminTable({ kind }) {
  const { db, update, add, notify } = use(); const [q, setQ] = useState(''), [edit, setEdit] = useState(null), [detail, setDetail] = useState(null); const items = (db[kind] || []).filter(x => JSON.stringify({ ...x, image: undefined }).toLowerCase().includes(q.toLowerCase())); const statusOptions = { bookings: ['Pending', 'Confirmed', 'Rejected', 'Completed'], orders: ['Pending', 'Completed', 'Cancelled'], enquiries: ['New', 'Read', 'Resolved'] }; const columns = kind === 'bookings' ? ['name', 'service', 'date', 'time', 'status'] : kind === 'orders' ? ['name', 'email', 'total', 'status'] : kind === 'enquiries' ? ['name', 'email', 'event', 'status'] : kind === 'customers' ? ['name', 'email', 'phone'] : kind === 'slots' ? ['date', 'time', 'status'] : kind === 'reviews' ? ['name', 'rating', 'description'] : kind === 'products' ? ['title', 'category', 'price'] : kind === 'moments' ? ['title', 'category'] : ['title', 'description']; const setStatus = (item, status) => {
    if (kind === 'bookings' && status === 'Confirmed' && db.bookings.some(b => b.id !== item.id && b.date === item.date && b.time === item.time && b.status === 'Confirmed')) {
      notify('This date and time is already confirmed for another booking.');
      return;
    } update(kind, a => a.map(x => x.id === item.id ? { ...x, status } : x)); notify('Status updated');
  }; return el(
    'section',
    'card admin-table-card',
    el(
      'div',
      'table-toolbar',
      h('input', { className: 'search', placeholder: 'Search records…', value: q, onChange: e => setQ(e.target.value) }),
      schemas[kind] && btn('Add New', () => setEdit({}), 'gold', 'Plus')
    ),
    el(
      'div',
      'table-scroll',
      h(
        'table',
        null,
        h('thead', null, h('tr', null, columns.map(c => h('th', null, c)), h('th', null, 'Actions'))),
        h(
          'tbody',
          null,
          items.map(x => h(
            'tr',
            { key: x.id },
            columns.map(c => h(
              'td',
              null,
              c === 'status' && statusOptions[kind] ? h('select', { value: x.status, onChange: e => setStatus(x, e.target.value) }, statusOptions[kind].map(s => h('option', null, s))) : String(x[c] ?? '—')
            )),
            h(
              'td',
              null,
              el(
                'div',
                'table-actions',
                btn('', () => setDetail(x), 'outline', 'Eye'),
                schemas[kind] && btn('', () => setEdit(x), 'outline', 'Pencil'),
                btn(
                  '',
                  () => {
                    if (window.confirm('Delete this record?')) {
                      update(kind, a => a.filter(y => y.id !== x.id));
                      notify('Record deleted');
                    }
                  },
                  'outline',
                  'Trash2'
                )
              )
            )
          ))
        )
      )
    ),
    !items.length && el('p', 'center muted', 'No records found.'),
    edit && h(
      Editor,
      {
        kind, item: edit, onClose: () => setEdit(null), onSave: v => {
          if (kind === 'slots' && db.slots.some(s => s.id !== edit.id && s.date === v.date && s.time === v.time)) {
            notify('This date and time already exists.');
            return;
          } if (edit.id)
            update(kind, a => a.map(x => x.id === edit.id ? { ...x, ...v } : x));
          else
            add(kind, v); setEdit(null); notify('Record saved');
        }
      }
    ),
    detail && h(
      'div',
      { className: 'modal-backdrop', onClick: () => setDetail(null) },
      h(
        'div',
        { className: 'modal detail-modal', onClick: e => e.stopPropagation() },
        btn('', () => setDetail(null), 'round modal-close', 'X'),
        el('h2', '', 'Record Details'),
        Object.entries(detail).filter(([k]) => !['id', 'customerId', 'image', 'file'].includes(k)).map(([k, v]) => el('div', 'detail-row', el('strong', '', k), el('p', '', typeof v === 'object' ? JSON.stringify(v) : String(v))))
      )
    )
  );
}
export function Editor({ kind, item, onClose, onSave }) {
  const [image, setImage] = useState(item.image || ''); return h(
    'div',
    { className: 'modal-backdrop', onClick: onClose },
    h(
      'form',
      {
        className: 'modal form-card editor', onClick: e => e.stopPropagation(), onSubmit: e => {
          e.preventDefault(); const v = formData(e); if ('image' in v)
            v.image = image || v.image; if ('price' in v)
            v.price = Number(v.price); if ('rating' in v)
            v.rating = Number(v.rating); onSave(v);
        }
      },
      btn('', onClose, 'round modal-close', 'X'),
      el('h2', '', item.id ? 'Edit Record' : 'Add New Record'),
      schemas[kind].map(([k, l, t]) => t === 'textarea' ? area(
        l,
        k,
        { defaultValue: item[k] || (kind === 'services' && k === 'features' ? initial.services.find(s => s.id === item.id)?.features : '') || '', required: true }
      ) : t === 'slot' ? select(l, k, ['Available', 'Unavailable'], { defaultValue: item[k] || 'Available' }) : t === 'image' ? el(
        'div',
        '',
        field(l, k, 'text', { value: image, onChange: e => setImage(e.target.value) }),
        h(
          'input',
          {
            type: 'file', accept: 'image/*', onChange: e => {
              const f = e.target.files[0]; if (!f)
                return; if (f.size > 700000) {
                  alert('Choose an image below 700 KB for browser storage.');
                  return;
                } const r = new FileReader(); r.onload = () => setImage(r.result); r.readAsDataURL(f);
            }
          }
        ),
        image && picture(image, 'Image preview', 'editor-preview')
      ) : field(
        l,
        k,
        t || 'text',
        { defaultValue: item[k] ?? '', required: !['video', 'file', 'description', 'icon'].includes(k), ...(t === 'number' ? { min: k === 'rating' ? 1 : 0, max: k === 'rating' ? 5 : undefined, step: k === 'rating' ? 1 : 0.01 } : {}), ...(t === 'date' ? { min: today() } : {}) }
      )),
      h('button', { className: 'btn gold full' }, 'Save Changes')
    )
  );
}
