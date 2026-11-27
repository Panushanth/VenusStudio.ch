import React from 'react';
import { el } from '../utils/ui.jsx';
import { h } from '../context/StudioContext.jsx';
export function Heading({ eyebrow, title, sub }) { return el('div', 'section-heading', eyebrow && el('div', 'eyebrow', eyebrow), el('h2', '', title), sub && el('p', 'muted', sub)); }
export function PageHero({ eyebrow, title, sub, image }) {
  return h(
    'section',
    { className: 'page-hero', style: { '--hero': `url("${image}")` } },
    el('div', 'wrap hero-copy', el('span', 'eyebrow', eyebrow), el('h1', '', title), el('p', '', sub))
  );
}
