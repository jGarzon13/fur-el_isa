import { useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { songs } from "../data/songs";

const floatingParticles = Array.from({ length: 20 }, (_, i) => i);

export default function Album() {
  const seeds = useMemo(
    () =>
      floatingParticles.map(() => ({
        left: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 100}px`,
        delay: `${Math.random() * 5}s`,
      })),
    []
  );

  const images = useMemo(
    () => Array.from({ length: 21 }, (_, i) => `/img/${String(i + 1).padStart(2, "0")}.jpg`),
    []
  );

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(() => setOpenIndex((i) => (i === null ? 0 : (i + 1) % images.length)), [images.length]);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length)),
    [images.length]
  );

  const currentSong = openIndex !== null ? songs.find((s) => s.id === openIndex + 1) : null;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (openIndex === null) return;
      if (e.key === "Escape") { e.preventDefault(); close(); }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "PageDown" || e.key === "PageUp" || e.key === "Home" || e.key === "End" || e.key === " ") {
        e.preventDefault();
      }
    }
    window.addEventListener("keydown", onKey, { passive: false } as any);
    return () => window.removeEventListener("keydown", onKey as any);
  }, [openIndex, close, next, prev]);

  useEffect(() => {
    if (openIndex === null) return;
    const n1 = new Image();
    n1.src = images[(openIndex + 1) % images.length];
    const n2 = new Image();
    n2.src = images[(openIndex - 1 + images.length) % images.length];
  }, [openIndex, images]);

  useEffect(() => {
    const original = document.body.style.overflow;
    if (openIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = original || '';
    }
    return () => { document.body.style.overflow = original || ''; };
  }, [openIndex]);

  // Swipe gestures
  useEffect(() => {
    if (openIndex === null) return;
    let startX = 0;
    function handleTouchStart(e: TouchEvent) {
      startX = e.touches[0].clientX;
    }
    function handleTouchEnd(e: TouchEvent) {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) next();
      if (endX - startX > 50) prev();
    }
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [openIndex, next, prev]);

  return (
    <div className="relative min-h-screen w-screen flex flex-col items-center bg-gradient-to-br from-pink-200 to-purple-200 text-red-900 font-serif overflow-hidden">
      {floatingParticles.map((i) => (
        <div
          key={i}
          className="absolute text-pink-400 text-xl animate-float select-none"
          style={{ left: seeds[i].left, bottom: seeds[i].bottom, animationDelay: seeds[i].delay }}
          aria-hidden="true"
        >
          🎵
        </div>
      ))}

      {/* Header más compacto */}
      <header className="fixed top-0 left-0 w-full h-14 md:h-16 flex items-center justify-between px-4 sm:px-6 md:px-10 bg-white/90 backdrop-blur-sm border-b border-red-100 shadow-sm z-20">
        <h1 className="text-lg sm:text-xl font-serif italic text-red-800 flex items-center gap-1">
          <strong className="font-extrabold">Fur el</strong>
          <span className="relative text-red-600 font-semibold">
            (Isa)
            <span className="absolute -top-2 -right-5 text-xs md:text-sm animate-pulse">❤️</span>
          </span>
        </h1>
        <nav className="hidden sm:flex gap-4 md:gap-6 text-xs sm:text-sm font-medium">
          <Link to="/" className="text-red-800 hover:text-red-500 transition">Inicio</Link>
          <Link to="/playlist" className="text-red-800 hover:text-red-500 transition">Playlist</Link>
          <Link to="/album" className="text-red-800 hover:text-red-500 transition">Album</Link>
        </nav>
      </header>

      <div className="z-10 w-full max-w-6xl px-4 sm:px-6 md:px-8 pt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mt-6 mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-bold italic text-center">
            Álbum <span className="text-pink-600 font-extrabold">(Isa)</span>
            <span className="inline-block ml-1 text-xl align-top">📷</span>
          </h1>
          <p className="text-center mt-3 text-red-800 italic">
            21 fotos — recuerda tocar o hacer click para ver en grande; usa ← → o swipe para navegar.
          </p>
        </motion.div>

        {/* Grid armonioso con auto-fit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {images.map((src, idx) => (
            <motion.button
              key={src}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setOpenIndex(idx)}
              className="block w-full rounded-xl overflow-hidden bg-white/50 backdrop-blur ring-1 ring-white/50 shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <img
                src={src}
                alt={`Foto ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover aspect-square"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overscroll-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key={openIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full flex justify-center"
            >
              <img
                src={images[openIndex]}
                alt={`Foto ${openIndex + 1} — ${currentSong?.title ?? ""}`}
                className="max-h-[85vh] w-auto rounded-xl shadow-xl"
              />

              {/* Caption con título y subtítulo */}
              {currentSong && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-4 max-w-[90%]">
                  <div className="inline-block px-3 py-2 rounded-lg bg-black/60 text-white text-center shadow">
                    <div className="text-sm sm:text-base font-semibold leading-tight">
                      {currentSong.title}
                    </div>
                    {currentSong.messageTitle && (
                      <div className="text-xs sm:text-sm italic text-white/90 leading-tight">
                        {currentSong.messageTitle}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-6 pointer-events-none">
                <button
                  onClick={prev}
                  aria-label="Anterior"
                  className="pointer-events-auto p-1.5 sm:p-2 rounded-full bg-white/80 hover:bg-white shadow text-lg"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  aria-label="Siguiente"
                  className="pointer-events-auto p-1.5 sm:p-2 rounded-full bg-white/80 hover:bg-white shadow text-lg"
                >
                  →
                </button>
              </div>

              <button
                onClick={close}
                aria-label="Cerrar"
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white shadow"
              >
                ✕
              </button>

              <div className="absolute bottom-2 right-4 text-white/90 text-sm bg-black/40 px-2 py-1 rounded">
                {openIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10" />
    </div>
  );
}
