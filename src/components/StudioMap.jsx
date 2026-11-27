import React, { useState } from 'react';
import { icon } from '../utils/ui.jsx';

export function StudioMap({ address }) {
  const location = String(address || '').trim();
  const [loadedAddress, setLoadedAddress] = useState('');
  const query = encodeURIComponent(location);
  const directions = `https://www.google.com/maps/search/?api=1&query=${query}`;
  return (
    <section className="wrap studio-map-section section" aria-labelledby="studio-map-heading">
      <div className="studio-map-copy">
        <span className="eyebrow">FIND US</span>
        <h2 id="studio-map-heading">See you at the studio.</h2>
        <p className="muted">{location || 'The studio location will appear here once the business address is confirmed.'}</p>
        {location && <a className="btn outline" href={directions} target="_blank" rel="noopener noreferrer">{icon('MapPin', 18)} Get directions {icon('ArrowUpRight', 16)}</a>}
      </div>
      <div className="studio-map-frame">
        {location && loadedAddress === location ? (
          <iframe title="Venus Creation studio location on Google Maps" src={`https://maps.google.com/maps?q=${query}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        ) : (
          <div className="studio-map-placeholder">
            <span className="map-pin-orbit">{icon('MapPin', 35)}</span>
            <strong>{location ? 'Explore our location' : 'Studio location coming soon'}</strong>
            {location ? <><button className="btn gold" type="button" onClick={() => setLoadedAddress(location)}>Load Google Maps {icon('ArrowRight', 17)}</button><small>Loads an external Google Maps embed.</small></> : <small>Address can be added in Admin → Settings → Studio Address.</small>}
          </div>
        )}
      </div>
    </section>
  );
}
