import { useState } from "react";
import { songs } from "../data/songs";
import CustomAudioPlayer from "../components/CustomAudioPlayer";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const Playlist = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const song = songs[current];

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % songs.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + songs.length) % songs.length);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-white text-red-900 overflow-x-hidden">
      {/* Header: altura fija para alinear el contenido */}
      <header className="fixed top-0 left-0 w-full h-16 md:h-24 flex items-center justify-between px-4 sm:px-6 md:px-10 bg-white/90 backdrop-blur-sm border-b border-red-100 shadow-sm z-20">
        <h1 className="text-xl sm:text-2xl font-serif italic text-red-800 flex items-center gap-1">
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

      {/* Main: padding-top igual a la altura del header para evitar espacio/solape */}
      <main className="min-h-screen pt-16 md:pt-24 flex flex-col md:flex-row bg-white text-red-900 overflow-hidden relative">
        {/* Fondo animado difuso (ajustado a la altura del header) */}
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block absolute left-0 top-24 w-[45%] h-[calc(100%-6rem)] z-0 overflow-hidden pointer-events-none"
        >
          <div className="w-full h-full bg-red-700 blur-xl opacity-50" />
        </motion.div>

        {/* Panel izquierdo */}
        <section className="relative z-10 w-full md:w-[45%] bg-red-700 text-white flex flex-col items-center md:justify-center px-4 sm:px-6 md:px-8 pt-4 md:pt-6 pb-8">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl italic font-serif text-white leading-tight mb-2">
              <strong className="font-extrabold">21</strong> songs for your <strong className="font-extrabold">21</strong>
            </h2>
            <p className="text-xs sm:text-sm italic text-white/80 max-w-md mx-auto mb-3 sm:mb-4">
              Cada canción es un momento, y un momento viene con un recuerdo, pasa el mouse por la imagen ;)
            </p>
            <AnimatePresence mode="wait">
              <motion.h1
                key={current}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                className="text-3xl sm:text-4xl font-extrabold text-white"
              >
                #{current + 1}
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 md:mb-6">
            <button
              onClick={handlePrev}
              className="text-xl sm:text-2xl p-2 rounded-full bg-red-200 hover:bg-red-300 text-red-700 transition"
              aria-label="Anterior"
            >
              ⬅
            </button>

            {/* Crossfade + animación de cambio de canción */}
            <AnimatePresence mode="wait">
              <motion.div
                key={song.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative w-36 sm:w-48 md:w-56 aspect-square overflow-hidden rounded-xl shadow-xl"
              >
                <motion.img
                  src={song.coverUrl}
                  alt="cover"
                  initial={false}
                  animate={{ opacity: isHovered ? 0 : 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover object-center rounded-xl"
                />
                <motion.img
                  src={song.hoverImgUrl}
                  alt="hover"
                  initial={false}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover object-center rounded-xl"
                />

                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.25 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-white/40 backdrop-blur-sm z-10 rounded-xl pointer-events-none"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <button
              onClick={handleNext}
              className="text-xl sm:text-2xl p-2 rounded-full bg-red-200 hover:bg-red-300 text-red-700 transition"
              aria-label="Siguiente"
            >
              ➡
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={song.id + "-text"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.4 }}
              className="text-center w-full max-w-md"
            >
              <h2 className="text-lg sm:text-xl font-semibold">{song.title}</h2>
              <p className="text-sm sm:text-base text-red-200">{song.artist}</p>
              <div className="mt-2">
                <CustomAudioPlayer src={song.spotifyUrl} />
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Panel derecho */}
        <section className="w-full md:w-[55%] p-5 sm:p-8 md:p-12 flex flex-col justify-center z-10 bg-white" id="playlist">
          <AnimatePresence mode="wait">
            <motion.div
              key={song.id + "-message"}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4 }}
            >
              {/* Título */}
              <h2 className="text-base sm:text-lg italic font-medium text-red-700/80 tracking-tight mb-2">
                {song.messageTitle || "Título pendiente..."}
              </h2>

              {/* Mensaje */}
              <p className="text-[16px] sm:text-[17px] text-red-700/90 leading-relaxed whitespace-pre-line first-letter:text-2xl sm:first-letter:text-3xl first-letter:font-extrabold first-letter:text-pink-600 first-letter:mr-1 first-letter:leading-none">
                {song.message || "Mensaje pendiente..."}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA solo en la última canción */}
          <AnimatePresence mode="wait">
            {current === songs.length - 1 && (
              <motion.div
                key={`${song.id}-cta`}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                className="mt-6 sm:mt-8"
              >
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/final"
                    className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition focus:outline-none focus:ring-2 focus:ring-pink-300/60 focus:ring-offset-2 focus:ring-offset-white no-underline"
                  >
                    Colorín colorado...
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-[10px] sm:text-xs text-white/70 bg-red-800 py-2 z-20">
        Hecho con 💖 para Isa · {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Playlist;
