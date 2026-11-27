import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { use, h } from '../../context/StudioContext.jsx';
import { el, icon, btn, link } from '../../utils/ui.jsx';
import { Brand } from '../../components/Brand.jsx';
import { modules } from './adminConfig.js';
import { Overview } from './AdminOverview.jsx';
import { Settings } from './AdminSettings.jsx';
import { AdminTable } from './AdminRecords.jsx';
export function Admin() {
  const { theme, toggleTheme } = useTheme(); const { admin, setAdmin, go, route, db } = use(); const section = route.split('/')[2] || 'overview'; const [mobile, setMobile] = useState(false); if (!admin)
    return el(
      'section',
      'admin-entry',
      h(Brand),
      h(
        'button',
        { type: 'button', className: 'glass-tool', onClick: toggleTheme, 'aria-label': `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode` },
        icon(theme === 'dark' ? 'Sun' : 'Moon')
      ),
      el('h1', '', 'Admin Dashboard'),
      el('p', '', 'Local frontend preview. This is not a secure administrator login. Do not enter real customer information.'),
      btn('Enter Demo Admin', () => setAdmin(true)),
      link('← Return to Website', '/', 'btn outline')
    ); return el(
      'div',
      'admin-shell',
      h(
        'aside',
        { className: mobile ? 'sidebar visible' : 'sidebar' },
        h(Brand),
        el('span', 'admin-label', 'MANAGEMENT PORTAL'),
        modules.map(([label, i, k]) => h(
          'a',
          { href: '#/admin/' + k, className: k === section ? 'side-link active' : 'side-link', onClick: () => setMobile(false) },
          icon(i, 20),
          label
        )),
        el(
          'div',
          'sidebar-bottom',
          link('View Website', '/', 'side-link'),
          btn('Exit Admin', () => { setAdmin(false); go('/'); }, 'outline', 'LogOut')
        )
      ),
      el(
        'div',
        'admin-main',
        el(
          'header',
          'admin-top',
          btn('', () => setMobile(!mobile), 'outline admin-toggle', 'Menu'),
          el(
            'div',
            '',
            el('small', 'muted', 'VENUS CREATION / MANAGEMENT'),
            el('h2', '', modules.find(x => x[2] === section)?.[0] || 'Overview')
          ),
          h(
            'button',
            { type: 'button', className: 'glass-tool admin-theme-toggle', onClick: toggleTheme, 'aria-label': `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode` },
            icon(theme === 'dark' ? 'Sun' : 'Moon')
          ),
          el('span', 'status', 'DEMO ADMIN')
        ),
        el(
          'div',
          'admin-content',
          el(
            'div',
            'demo-alert',
            icon('Info'),
            'Frontend preview · Data is stored in this browser only. No secure authentication, live payments or automatic notifications.'
          ),
          section === 'overview' ? h(Overview) : section === 'settings' ? h(Settings) : h(AdminTable, { kind: section, key: section })
        )
      )
    );
}
