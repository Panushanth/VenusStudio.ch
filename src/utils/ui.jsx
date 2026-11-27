import React from 'react';
import * as Icons from 'lucide-react';
import { h, A } from '../context/StudioContext.jsx';
export const el = (tag, cls, ...children) => h(tag, { className: cls }, ...children.flat(Infinity));
export const icon = (name, size = 20) => h(Icons[name] || Icons.Camera, { size, strokeWidth: 1.65, 'aria-hidden': true });
export const btn = (label, onClick, cls = 'gold', ico) => h(
  'button',
  { className: 'btn ' + cls, onClick, type: 'button', 'aria-label': label || ico },
  ico && icon(ico, 17),
  cls.includes('slider-control') ? el('span', 'sr-only', label) : label
);
export const link = (label, path, cls = '') => h('a', { href: '#' + path, className: cls }, label);
export const picture = (src, alt = '', cls = '') => h(
  'img',
  {
    src, alt, className: cls, loading: 'lazy', decoding: 'async', onError: e => {
      if (!e.currentTarget.dataset.fallback) {
        e.currentTarget.dataset.fallback = '1';
        e.currentTarget.src = A('hero');
      }
    }
  }
);
export const field = (label, name, type = 'text', props = {}) => h('label', { className: 'field' }, el('span', '', label), h('input', { name, type, ...props }));
export const area = (label, name, props = {}) => h('label', { className: 'field' }, el('span', '', label), h('textarea', { name, rows: 4, ...props }));
export const select = (label, name, options, props = {}) => h(
  'label',
  { className: 'field' },
  el('span', '', label),
  h('select', { name, ...props }, options.map(o => h('option', { key: o, value: o }, o)))
);
export const formData = e => Object.fromEntries(new FormData(e.currentTarget));
