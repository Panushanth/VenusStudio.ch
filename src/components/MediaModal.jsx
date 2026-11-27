import React, { useEffect } from 'react';
import { use, h } from '../context/StudioContext.jsx';
import { btn, el, picture } from '../utils/ui.jsx';
export function Modal() {
  const { modal, setModal } = use(); useEffect(
    () => {
      const key = e => {
        if (e.key === 'Escape')
          setModal(null);
      }; addEventListener('keydown', key); return () => removeEventListener('keydown', key);
    },
    []
  ); return h(
    'div',
    { className: 'modal-backdrop', onClick: () => setModal(null) },
    h(
      'section',
      { className: 'modal', role: 'dialog', 'aria-modal': true, onClick: e => e.stopPropagation() },
      btn('', () => setModal(null), 'round modal-close', 'X'),
      modal.type === 'video' ? h('video', { src: modal.src, controls: true, autoPlay: true, playsInline: true }) : el('div', '', picture(modal.image, modal.title), el('h3', '', modal.title))
    )
  );
}
