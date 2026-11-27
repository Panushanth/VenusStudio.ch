import React from 'react';
import { band } from '../components/SectionBand.jsx';
import { use, A } from '../context/StudioContext.jsx';
import { icon, formData, field, select, area } from '../utils/ui.jsx';
import { StudioMap } from '../components/StudioMap.jsx';
import { today } from '../data/demoData.js';

export function Contact() {
  const { db, add, notify } = use();
  const s = db.settings;
  const phone = String(s.phone || '').trim();
  const email = String(s.email || '').trim();
  const whatsapp = String(s.whatsapp || '').replace(/\D/g, '');
  const details = [
    ['Phone', 'Give us a call', phone, phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : ''],
    ['Mail', 'Write to us', email, email ? `mailto:${email}` : ''],
    ['MapPin', 'Visit the studio', s.address, ''],
    ['Clock', 'Studio hours', s.hours, ''],
  ];
  function sendEnquiry(event) {
    event.preventDefault();
    add('enquiries', { ...formData(event), status: 'New', created: new Date().toISOString() });
    event.currentTarget.reset();
    notify('Enquiry saved locally. Email delivery is not connected.');
  }
  return (
    <div className="contact-page editorial-page atelier-contact">
      <section className="atelier-contact-hero" aria-labelledby="contact-title">
        <img className="atelier-contact-backdrop" src={A('contact-hero')} alt="Cinema camera in warm studio lighting" fetchPriority="high" />
        <div className="atelier-contact-shade" aria-hidden="true" />
        <div className="wrap atelier-contact-hero-inner">
          <div className="atelier-contact-copy"><span className="eyebrow atelier-kicker">CONTACT / VENUS CREATION</span>
            <h1 id="contact-title">Every great story<br />begins with <em>hello.</em></h1>
            <p>Have an occasion, an idea, or a vision in mind? We would love to hear about it.</p>
            <div className="actions"><button className="btn gold" type="button" onClick={() => document.getElementById('contact-enquiry')?.scrollIntoView({ behavior: 'auto' })}>Start a conversation {icon('ArrowDownRight', 18)}</button><a href="#/services" className="btn outline light">Explore services {icon('ArrowUpRight', 17)}</a></div>
          </div>
          <span className="atelier-contact-mark" aria-hidden="true">01 — BEHIND THE LENS</span>
        </div>
      </section>
      {band('contact', <section id="contact-enquiry" className="wrap section atelier-contact-workspace">
        <div className="atelier-contact-info">
          <span className="eyebrow atelier-kicker">LET’S CONNECT / 02</span>
          <h2>We’re here<br />to <em>listen.</em></h2>
          <p className="muted">For bookings, creative collaborations and general questions, choose the way that works best for you.</p>
          <div className="contact-info-list">
            {details.map(([symbol, label, value, href]) => <div className="contact-info-item" key={label}>
              <span className="contact-icon">{icon(symbol, 23)}</span>
              <div><small>{label}</small>{href ? <a href={href}>{value}</a> : <strong>{value || 'To be updated'}</strong>}</div>
            </div>)}
          </div>
          {whatsapp && <a className="btn outline" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">{icon('MessageCircle', 19)} Chat on WhatsApp {icon('ArrowUpRight', 16)}</a>}
        </div>
        <form className="contact-editorial-form atelier-enquiry" onSubmit={sendEnquiry}>
          <span className="eyebrow atelier-kicker">YOUR ENQUIRY</span>
          <h2>Tell us your story.</h2>
          <p className="muted">Share a few details and let’s begin.</p>
          <div className="contact-fields">
            {field('Your name', 'name', 'text', { required: true, autoComplete: 'name', placeholder: 'Full name' })}
            {field('Email address', 'email', 'email', { required: true, autoComplete: 'email', placeholder: 'you@example.com' })}
            {field('Phone number', 'phone', 'tel', { required: true, autoComplete: 'tel', placeholder: 'Your contact number' })}
            {select('Event type', 'event', ['General enquiry', ...db.services.map(service => service.title)])}
            <div className="contact-field-wide">{field('Event date (optional)', 'date', 'date', { min: today() })}</div>
            <div className="contact-field-wide">{area('Your message', 'message', { required: true, placeholder: 'Tell us about your vision, event or requirements…' })}</div>
          </div>
          <button type="submit" className="btn gold">Send Enquiry {icon('ArrowRight', 18)}</button>
          <small className="muted">Demo enquiry form: messages are saved on this device only.</small>
        </form>
      </section>)}
      {band('location', <StudioMap address={s.address} />)}
    </div>
  );
}
