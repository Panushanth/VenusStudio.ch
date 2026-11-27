import React from 'react';
import { use } from '../context/StudioContext.jsx';
import { el, picture, icon, link, btn } from '../utils/ui.jsx';
export function PackageCards({ limit, compact = false }) {
  const { db, requireAccount } = use(); return el(
    'div',
    compact ? 'package-grid compact-packages' : 'package-grid',
    db.packages.slice(0, limit ?? db.packages.length).map(p => el(
      'article',
      'card package-card',
      picture(p.image, p.title),
      el(
        'div',
        'card-body',
        el('h3', '', p.title),
        el('p', '', p.description),
        !compact && el('ul', 'checks', String(p.features).split('\n').filter(Boolean).map(f => el('li', '', icon('Check', 17), f))),
        compact ? link('View Package →', '/packages', 'btn outline') : btn('Book This Package →', () => requireAccount('/booking/' + p.id))
      )
    ))
  );
}
