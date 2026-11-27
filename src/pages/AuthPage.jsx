import React, { useState } from 'react';
import { use, h, A } from '../context/StudioContext.jsx';
import { el, icon, link, formData, field } from '../utils/ui.jsx';
import { uid } from '../data/demoData.js';
import { Brand } from '../components/Brand.jsx';
export function Access() {
  const { route, setReturnTo } = use(); return el(
    'section',
    'wrap section access',
    icon('Lock', 42),
    el('h1', '', 'Login to continue'),
    el('p', '', 'Everyone can explore Venus Creation. An account is required to book an event or buy creative assets.'),
    el(
      'div',
      'actions',
      h('a', { href: '#/login', className: 'btn gold', onClick: () => setReturnTo(route) }, 'Login'),
      h('a', { href: '#/register', className: 'btn outline', onClick: () => setReturnTo(route) }, 'Register')
    )
  );
}
export function Auth({ register }) {
  const { db, add, setUser, returnTo, go, notify } = use(); const [show, setShow] = useState(false), [error, setError] = useState(''); return el(
    'section',
    register ? 'auth-layout auth-register' : 'auth-layout auth-login',
    h(
      'div',
      { className: 'auth-art', style: { backgroundImage: `linear-gradient(0deg,#17120fe8,transparent 78%),url('${A(register ? 'auth-register' : 'auth-login')}')` } },
      el(
        'div',
        'auth-art-copy',
        el('div', 'eyebrow', 'VENUS CREATION / MEMBER STUDIO'),
        el('h1', '', register ? 'Your next story starts here.' : 'Welcome to the studio.'),
        el('p', '', 'Book your moments. Collect creative assets. Keep every request in one place.'),
        el(
          'div',
          'auth-benefits',
          el('span', '', icon('CalendarDays'), 'Event booking'),
          el('span', '', icon('ShoppingBag'), 'Creative store'),
          el('span', '', icon('Film'), 'Your account')
        ),
        link('← Back to Home', '/', 'btn outline light')
      )
    ),
    h(
      'form',
      {
        className: 'auth-form card', onSubmit: e => {
          e.preventDefault(); const v = formData(e); const email = v.email.trim().toLowerCase(); if (register && v.password !== v.confirm) {
            setError('Passwords do not match.');
            return;
          } let u = db.customers.find(c => c.email === email); if (register && u) {
            setError('A demo account already exists. Please log in.');
            return;
          } if (!register && !u) {
            setError('No local demo account found. Please register first.');
            return;
          } if (register) {
            u = { id: uid(), name: v.name.trim(), email, phone: v.phone, created: new Date().toISOString() };
            add('customers', u);
          } setUser(u); notify('Signed in to the local demo.'); go(returnTo || '/account');
        }
      },
      el(
        'div',
        'auth-form-heading',
        h(Brand),
        el('span', 'eyebrow', register ? '01 / JOIN THE STUDIO' : '01 / MEMBER ACCESS'),
        el('h2', '', register ? 'Create your account' : 'Good to see you.')
      ),
      el('p', 'muted', 'Frontend demo only — use fictional information and a disposable password. Passwords are not saved or verified.'),
      register && field('Full Name', 'name', 'text', { required: true }),
      field('Email Address', 'email', 'email', { required: true }),
      register && field('Mobile Number', 'phone', 'tel', { required: true }),
      el(
        'div',
        'password-field',
        field('Password', 'password', show ? 'text' : 'password', { required: true, minLength: 8 }),
        h(
          'button',
          { type: 'button', onClick: () => setShow(!show), 'aria-label': 'Toggle password visibility' },
          icon(show ? 'EyeOff' : 'Eye')
        )
      ),
      register && field('Confirm Password', 'confirm', show ? 'text' : 'password', { required: true, minLength: 8 }),
      register && h(
        'label',
        { className: 'checkbox' },
        h('input', { type: 'checkbox', required: true }),
        'I understand this is a local demonstration, not a secure account.'
      ),
      !register && h(
        'button',
        { type: 'button', className: 'text-button', onClick: () => notify('Password reset is not connected in this frontend demo.') },
        'Forgot Password?'
      ),
      error && el('p', 'error', error),
      h('button', { className: 'btn gold full' }, register ? 'Register →' : 'Login →'),
      el(
        'p',
        'center',
        register ? 'Already have an account? ' : 'New to Venus Creation? ',
        link(register ? 'Login Here' : 'Create an Account', register ? '/login' : '/register', 'text-link')
      )
    )
  );
}
