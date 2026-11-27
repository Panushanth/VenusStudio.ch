import React, { useState, useEffect } from 'react';
import { load, uid } from './data/demoData.js';
import { h, C } from './context/StudioContext.jsx';
import { Admin } from './pages/admin/AdminDashboard.jsx';
import { Access, Auth } from './pages/AuthPage.jsx';
import { Home } from './pages/HomePage.jsx';
import { About } from './pages/AboutPage.jsx';
import { ServicePage } from './pages/ServicesPage.jsx';
import { Packages } from './pages/PackagesPage.jsx';
import { Moments } from './pages/MomentsPage.jsx';
import { Shop, ProductDetail } from './pages/ShopPage.jsx';
import { Contact } from './pages/ContactPage.jsx';
import { Booking } from './pages/BookingPage.jsx';
import { Cart } from './pages/CartPage.jsx';
import { Account } from './pages/AccountPage.jsx';
import { el, link, icon, btn } from './utils/ui.jsx';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { band } from './components/SectionBand.jsx';
import { Modal } from './components/MediaModal.jsx';
export function App() {
  const [db, setDb] = useState(load), [route, setRoute] = useState(location.hash.slice(1) || '/'), [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('venus-demo-user') || 'null');
    }
    catch {
      return null;
    }
  }), [admin, setAdmin] = useState(false), [toast, setToast] = useState(''), [modal, setModal] = useState(null), [returnTo, setReturnTo] = useState('/account');
  const go = p => { location.hash = p; };
  const notify = t => setToast(t);
  const update = (key, fn) => setDb(d => ({ ...d, [key]: typeof fn === 'function' ? fn(d[key]) : fn }));
  const add = (key, obj) => update(key, a => [...a, { id: uid(), ...obj }]);
  useEffect(
    () => { const fn = () => { setRoute(location.hash.slice(1) || '/'); setModal(null); window.scrollTo(0, 0); }; addEventListener('hashchange', fn); return () => removeEventListener('hashchange', fn); },
    []
  );
  useEffect(
    () => {
      try {
        localStorage.setItem('venus-demo-v1', JSON.stringify(db));
      }
      catch {
        notify('Browser storage is full. Changes may not persist.');
      }
    },
    [db]
  );
  useEffect(() => { sessionStorage.setItem('venus-demo-user', JSON.stringify(user)); }, [user]);
  useEffect(
    () => {
      if (toast) {
        const t = setTimeout(() => setToast(''), 4200);
        return () => clearTimeout(t);
      }
    },
    [toast]
  );
  useEffect(
    () => {
      if (route.startsWith('/admin') || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
        return; const nodes = document.querySelectorAll('main .section-heading, main .photo-stack, main .service-grid .service-card, main .package-card, main .product-card, main .gallery-tile, main .stats, main .values, main .team, main .showreel, main .register-banner, main .soft-cta'); const observer = new IntersectionObserver(entries => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add('reveal-in');
              observer.unobserve(e.target);
            }
          }
        }, { threshold: 0.08 }); nodes.forEach((n, i) => {
          if (n.getBoundingClientRect().top > window.innerHeight) {
            n.classList.add('reveal-ready');
            n.style.setProperty('--reveal-delay', `${Math.min(i % 4, 3) * 70}ms`);
            observer.observe(n);
          }
        }); return () => { observer.disconnect(); nodes.forEach(n => { n.classList.remove('reveal-ready', 'reveal-in'); }); };
    },
    [route]
  );
  const requireAccount = p => {
    if (user)
      go(p);
    else {
      setReturnTo(p);
      go('/login');
      notify('Please log in or register to continue.');
    }
  };
  const cartAdd = p => {
    if (!db.cart.includes(p.id))
      update('cart', a => a.includes(p.id) ? a : [...a, p.id]); notify('Added to your cart');
  };
  const value = { db, update, add, user, setUser, admin, setAdmin, route, go, notify, modal, setModal, returnTo, setReturnTo, requireAccount, cartAdd, money: n => `${db.settings.currency || 'USD'} ${Number(n || 0).toFixed(2)}` };
  let page;
  const privatePage = route === '/booking' || route.startsWith('/booking/') || route === '/checkout' || route === '/account';
  if (route.startsWith('/admin'))
    page = h(Admin);
  else if (privatePage && !user)
    page = h(Access);
  else if (route === '/')
    page = h(Home);
  else if (route === '/about')
    page = h(About);
  else if (route === '/services')
    page = h(ServicePage);
  else if (route === '/packages')
    page = h(Packages);
  else if (route === '/moments')
    page = h(Moments);
  else if (route === '/shop')
    page = h(Shop);
  else if (route.startsWith('/product/'))
    page = h(ProductDetail, { id: route.split('/')[2] });
  else if (route === '/contact')
    page = h(Contact);
  else if (route === '/login' || route === '/register')
    page = h(Auth, { register: route === '/register', key: route });
  else if (route === '/booking' || route.startsWith('/booking/'))
    page = h(Booking, { packageId: route.split('/')[2] });
  else if (route === '/cart' || route === '/checkout')
    page = h(Cart, { checkout: route === '/checkout' });
  else if (route === '/account')
    page = h(Account);
  else
    page = el('section', 'wrap section', el('h1', '', 'Page not found'), link('Return home', '/', 'btn gold'));
  // Single-content pages get a dedicated full-width, theme-aware background.
  if (!route.startsWith('/admin')) {
    const variant = privatePage && !user ? 'access'
      : route === '/login' || route === '/register' ? 'auth'
      : route === '/booking' || route.startsWith('/booking/') ? 'booking'
      : route === '/cart' || route === '/checkout' ? 'cart'
      : route.startsWith('/product/') ? 'product' : null;
    if (variant) page = band(variant, page);
  }
  return h(
    C.Provider,
    { value },
    !route.startsWith('/admin') && h(Header),
    h('main', { key: route, className: route.startsWith('/admin') ? 'admin-page' : 'public-page' }, page),
    !route.startsWith('/admin') && h(Footer),
    modal && h(Modal),
    toast && h('div', { className: 'toast', role: 'status' }, icon('Info'), toast, btn('Close', () => setToast(''), 'plain'))
  );
}
