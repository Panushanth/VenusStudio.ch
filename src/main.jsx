import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import './styles/base.css';
import './styles/premium.css';
import './styles/services-auth.css';
import './styles/glass-navbar.css';
import './styles/theme.css';
import './styles/section-backgrounds.css';
import './styles/flowing-surfaces.css';
import './styles/hero-slideshow.css';
import './styles/editorial-pages.css';
import './styles/large-visuals.css';
import './styles/elegant-surfaces.css';
import './styles/atelier-pages.css';
import './styles/marketplace.css';

createRoot(document.getElementById('root')).render(
  <ThemeProvider><App /></ThemeProvider>
);
