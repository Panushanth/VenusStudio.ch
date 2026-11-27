import React from 'react';
import { use } from '../context/StudioContext.jsx';
import { icon } from '../utils/ui.jsx';
export const instagramURL = 'https://www.instagram.com/venuscreation/';
const youtubeURL = 'https://www.youtube.com/@venus.creations';
function safeURL(value) {
  try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : ''; } catch { return ''; }
}
export function socialItems(s) {
  return [
    ['Instagram','Instagram',s.instagram || instagramURL],
    ['Youtube','YouTube',s.youtube || youtubeURL],
    ['Facebook','Facebook',s.facebook],
    ['Music2','TikTok',s.tiktok],
    ['MessageCircle','WhatsApp',String(s.whatsapp || '').replace(/\D/g,'') ? `https://wa.me/${String(s.whatsapp).replace(/\D/g,'')}` : ''],
  ].map(([symbol,label,url])=>({symbol,label,url:safeURL(url)})).filter(s=>s.url);
}
export function SocialLinks({ className = '' }) {
  const { db } = use();
  return <div className={`studio-social-links ${className}`}>{socialItems(db.settings).map(({symbol,label,url})=><a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>{icon(symbol,19)}</a>)}</div>;
}
