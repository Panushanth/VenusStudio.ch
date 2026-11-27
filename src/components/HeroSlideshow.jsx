import React, { useEffect, useState } from 'react';
import { A, use } from '../context/StudioContext.jsx';
import { icon } from '../utils/ui.jsx';

const slides = [
  { image: A('hero'), label: 'Wedding stories' },
  { image: A('hero-film'), label: 'Cinematic films' },
  { image: A('hero-event'), label: 'Event coverage' },
];
const duration = 5500;
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function HeroSlideshow() {
  const { requireAccount, setModal } = use();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(() => !reducedMotion());
  const [revision, setRevision] = useState(0);
  const [visible, setVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = event => { if (event.matches) setPlaying(false); };
    media.addEventListener?.('change', onMotion);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      media.removeEventListener?.('change', onMotion);
    };
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    const timer = window.setTimeout(() => setIndex(current => (current + 1) % slides.length), duration);
    return () => window.clearTimeout(timer);
  }, [index, playing, visible, revision]);

  function choose(next) {
    setIndex((next + slides.length) % slides.length);
    setRevision(current => current + 1);
  }

  return (
    <section className="home-hero flowing-hero" aria-label="Featured photography slideshow" aria-roledescription="carousel">
      <div className="hero-image-deck" aria-hidden="true">
        {slides.map((slide, i) => <div key={slide.image} className={`hero-photo ${i === index ? 'is-current' : ''}`}>
          <img src={slide.image} alt="" loading="eager" fetchPriority={i === 0 ? 'high' : 'auto'} />
        </div>)}
      </div>
      <div className="wrap hero-copy">
        <span className="eyebrow">PHOTOGRAPHY &amp; VIDEOGRAPHY</span>
        <h1>Turning Your<br />Special Moments<br />into <em>Timeless Stories</em></h1>
        <p>Wedding · Events · Portraits · Commercials<br />Cinematic Films and More</p>
        <div className="actions">
          <button type="button" className="btn gold" onClick={() => requireAccount('/booking')}>Book Your Event {icon('ArrowRight', 16)}</button>
          <button type="button" className="btn outline" onClick={() => setModal({ type: 'video', src: '/assets/showreel.mp4' })}>{icon('Play', 16)} Explore Our Work</button>
        </div>
        <div className="hero-pagination" aria-label="Choose a featured image">
          <span className="hero-page-number">{String(index + 1).padStart(2, '0')} / 03</span>
          {slides.map((slide, i) => <button key={slide.image} type="button" className={`hero-segment ${i === index ? 'is-current' : ''}`} onClick={() => choose(i)} aria-label={`Show ${slide.label}`} aria-current={i === index ? 'true' : undefined}>
            {i === index && <span key={`${index}-${revision}-${playing}-${visible}`} className={playing && visible ? 'is-running' : ''} style={{ '--slide-duration': `${duration}ms` }} />}
          </button>)}
        </div>
      </div>
      <div className="slider-arrows hero-transport" aria-label="Slideshow controls">
        <button type="button" className="btn round slider-control" aria-label="Previous slide" onClick={() => choose(index - 1)}>{icon('ChevronLeft')}</button>
        <button type="button" className="btn round slider-control" aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} onClick={() => setPlaying(p => !p)}>{icon(playing ? 'Pause' : 'Play', 17)}</button>
        <button type="button" className="btn round slider-control" aria-label="Next slide" onClick={() => choose(index + 1)}>{icon('ChevronRight')}</button>
      </div>
    </section>
  );
}
