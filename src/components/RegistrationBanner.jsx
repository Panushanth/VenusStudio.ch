import React from 'react';
import { use, A } from '../context/StudioContext.jsx';
import { el, picture, btn } from '../utils/ui.jsx';
export function RegistrationBanner() {
  const { user, requireAccount, go } = use(); return el(
    'section',
    'register-banner wrap invitation-large',
    el('div', 'invitation-photo invitation-camera', picture(A('banner-camera'), 'Cinema camera'), el('span', 'invitation-photo-label', '01 / CAPTURE YOUR STORY')),
    el(
      'div',
      'banner-copy',
      el('span', 'eyebrow', user ? 'YOUR ACCOUNT' : 'REGISTER TO BOOK & PURCHASE'),
      el('h2', '', 'Book Your Event or Purchase Creative Assets'),
      el('p', '', 'Create an account to book events, manage bookings and purchase LUTs, SFX and more.'),
      el(
        'div',
        'actions',
        user ? btn('Book Your Event', () => requireAccount('/booking')) : btn('Register Now →', () => go('/register')),
        btn(user ? 'Shop Now' : 'Login →', () => go(user ? '/shop' : '/login'), 'outline')
      )
    ),
    el('div', 'invitation-photo invitation-edit', picture(A('banner-laptop'), 'Editing workspace'), el('span', 'invitation-photo-label', '02 / CREATE YOUR VISION'))
  );
}
