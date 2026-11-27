import React, { useState, useEffect, useRef } from 'react';
import { use } from '../context/StudioContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { nav } from '../data/navigation.js';
import { Brand } from './Brand.jsx';
import { icon } from '../utils/ui.jsx';
export function Header() {
  const { route, db, user, setUser, go, setReturnTo } = use();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const headerRef = useRef(null);
  const profileRef = useRef(null);
  const navIcons = ['House', 'Info', 'Camera', 'Package', 'Images', 'ShoppingBag', 'Mail'];
  const activePath = route.startsWith('/product/') || ['/cart', '/checkout'].includes(route) ? '/shop' : route;
  const activeIndex = nav.findIndex(([, path]) => path === activePath);
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [route]);
  useEffect(
    () => {
      const outside = event => {
        if (!headerRef.current?.contains(event.target)) {
          setMobileOpen(false);
          setProfileOpen(false);
        }
        else if (!profileRef.current?.contains(event.target)) {
          setProfileOpen(false);
        }
      };
      const escape = event => {
        if (event.key === 'Escape') {
          if (profileOpen)
            profileRef.current?.querySelector('button')?.focus();
          setMobileOpen(false);
          setProfileOpen(false);
        }
      };
      document.addEventListener('pointerdown', outside);
      document.addEventListener('keydown', escape);
      return () => {
        document.removeEventListener('pointerdown', outside);
        document.removeEventListener('keydown', escape);
      };
    },
    [profileOpen]
  );
  const authLink = path => {
    if (!['/login', '/register'].includes(route))
      setReturnTo('/account');
    setProfileOpen(false);
    go(path);
  };
  return (<header className="header liquid-header" ref={headerRef}>
    <div className="liquid-shell">
      <Brand />
      <nav id="main-nav" className={`liquid-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Main navigation" style={{ '--active-index': Math.max(0, activeIndex), '--tab-count': nav.length }}>
        <div className={`liquid-indicator ${activeIndex < 0 ? 'is-hidden' : ''}`} aria-hidden="true"><span /></div>
        {nav.map(([label, path], index) => (<a key={path} href={'#' + path} className={`liquid-tab ${activePath === path ? 'active' : ''}`} aria-current={activePath === path ? 'page' : undefined} onClick={() => setMobileOpen(false)}>
          <span className="liquid-tab-icon">{icon(navIcons[index], 19)}</span>
          <span>{label}</span>
        </a>))}
      </nav>
      <div className="liquid-actions">
        <button className="glass-tool theme-switch" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {icon(theme === 'dark' ? 'Sun' : 'Moon', 20)}
        </button>
        <a className="glass-tool bag-tool" href="#/cart" aria-label={`Shopping cart, ${db.cart.length} items`}>
          {icon('ShoppingBag', 20)}<span className="bag-count">{db.cart.length}</span>
        </a>
        <div className="profile-area" ref={profileRef}>
          <button className="glass-tool profile-tool" type="button" aria-label="Customer profile" title="Customer profile" aria-expanded={profileOpen} aria-controls="profile-panel" onClick={() => { setProfileOpen(v => !v); setMobileOpen(false); }}>
            {icon('UserRound', 20)}<span className="profile-caption">{user ? 'Account' : 'Profile'}</span>{icon('ChevronDown', 13)}
          </button>
          {profileOpen && <div className="profile-panel" id="profile-panel">
            <span className="eyebrow">VENUS / MEMBER STUDIO</span>
            <h3>{user ? `Welcome, ${user.name}` : 'Your creative space'}</h3>
            <p>{user ? 'Your bookings and digital orders.' : 'Sign in to book your event or purchase creative assets.'}</p>
            {user ? <>
              <a href="#/account" className="profile-option" onClick={() => setProfileOpen(false)}>{icon('UserRound', 18)} My Account</a>
              <a href="#/account" className="profile-option" onClick={() => setProfileOpen(false)}>{icon('CalendarDays', 18)} My Bookings & Orders</a>
              <button className="profile-option" onClick={() => { setUser(null); setProfileOpen(false); go('/'); }}>{icon('LogOut', 18)} Sign Out</button>
            </> : <>
              <button className="btn gold full" onClick={() => authLink('/login')}>{icon('LogIn', 17)} Login</button>
              <button className="btn outline full" onClick={() => authLink('/register')}>{icon('UserPlus', 17)} Create Account</button>
            </>}
          </div>}
        </div>
        <button className="glass-tool liquid-mobile-toggle" type="button" aria-label="Toggle navigation" aria-expanded={mobileOpen} aria-controls="main-nav" onClick={() => { setMobileOpen(v => !v); setProfileOpen(false); }}>{icon(mobileOpen ? 'X' : 'Menu', 23)}</button>
      </div>
    </div>
  </header>);
}
