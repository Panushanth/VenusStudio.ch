import React from 'react';
import { use } from '../context/StudioContext.jsx';
import { icon } from '../utils/ui.jsx';
import { Brand } from './Brand.jsx';
import { SocialLinks } from './SocialLinks.jsx';
import '../styles/studio-footer.css';
export function Footer() {
  const { db, requireAccount } = use();
  const s = db.settings;
  const phone = String(s.phone || '').replace(/[^+\d]/g,'');
  return <footer className="studio-footer">
    <div className="studio-footer-photo" aria-hidden="true"/>
    <div className="studio-footer-inner">
      <div className="studio-footer-top"><div><span className="studio-footer-kicker">VENUS / PHOTOGRAPHY &amp; FILM</span><h2>Every moment.<br/><em>A story worth keeping.</em></h2></div><div className="studio-footer-actions"><button type="button" onClick={()=>requireAccount('/booking')}>Book your event {icon('ArrowUpRight',18)}</button><a href="#/contact">Contact us {icon('ArrowRight',17)}</a></div></div>
      <div className="studio-footer-info"><div className="studio-footer-brand"><Brand/><SocialLinks/></div><nav aria-label="Footer navigation"><a href="#/about">About</a><a href="#/services">Services</a><a href="#/moments">Portfolio</a><a href="#/shop">Shop</a><a href="#/contact">Contact</a></nav><div className="studio-footer-contact">{s.phone && <a href={`tel:${phone}`}>{icon('Phone',17)}{s.phone}</a>}{s.email && <a href={`mailto:${s.email}`}>{icon('Mail',17)}{s.email}</a>}{s.address && <a href="#/contact">{icon('MapPin',17)}{s.address}</a>}{!s.phone && !s.email && !s.address && <a href="#/contact">{icon('Mail',17)}Send an enquiry</a>}</div></div>
      <div className="studio-footer-bottom"><span>© {new Date().getFullYear()} Venus Creation. All rights reserved.</span><div><button type="button" onClick={()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})} aria-label="Back to top">{icon('ArrowUp',18)}</button></div></div>
    </div>
  </footer>;
}
