import React from 'react';
import { el } from '../utils/ui.jsx';
import { h } from '../context/StudioContext.jsx';
export function Filters({ options, value, set }) {
  return el(
    'div',
    'filters',
    options.map(o => h('button', { type: 'button', className: o === value ? 'chip selected' : 'chip', onClick: () => set(o) }, o))
  );
}
