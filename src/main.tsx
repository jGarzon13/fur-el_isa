import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Playlist from './pages/Playlist.tsx';
import './index.css';
import Final from "./pages/Final";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/playlist" element={<Playlist />} />
  <Route path="/final" element={<Final />} />
  <Route path="*" element={<Home />} />   {/* fallback */}
</Routes>

    </BrowserRouter>
  </React.StrictMode>
);
