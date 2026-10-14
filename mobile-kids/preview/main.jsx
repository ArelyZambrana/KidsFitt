import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/fredoka/700.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';
import '@fontsource/nunito/900.css';
import Gallery from '../src/ui/Gallery.jsx';

const q = new URLSearchParams(location.search);
createRoot(document.getElementById('root')).render(
  <div id="phone"><div style={{ display: 'flex', flex: 1 }}>
    <Gallery initial={Number(q.get('s') || 0)} initialDark={q.get('dark') === '1'} controls={q.get('controls') !== '0'} />
  </div></div>,
);
