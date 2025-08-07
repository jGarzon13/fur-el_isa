import { useState } from "react";
import { songs } from "../data/songs";
import CustomAudioPlayer from "../components/CustomAudioPlayer";
import { AnimatePresence, motion } from "framer-motion";

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
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-4 bg-white/90 backdrop-blur-sm border-b border-red-100 shadow-sm z-20">
        <h1 className="text-2xl font-serif italic text-red-800">
          <strong className="font-extrabold">Fur el</strong>
          <span className="relative text-red-600 font-semibold">
            (Isa)
            <span className="absolute -top-2 -right-5 text-sm animate-pulse">❤️</span>
          </span>
        </h1>
        <nav className="space-x-6 text-sm font-medium">
          <a href="/" className="text-red-800 hover:text-red-500 transition">Inicio</a>
          <a href="#playlist" className="text-red-800 hover:text-red-500 transition">Playlist</a>
        </nav>
      </header>

      <main className="min-h-screen flex bg-white text-red-900 overflow-hidden relative">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="absolute left-0 top-[96px] w-[45%] h-[calc(100%-96px)] z-0 overflow-hidden pointer-events-none"
        >
          <div className="w-full h-full bg-red-700 blur-xl opacity-50" />
        </motion.div>

        <div className="w-[45%] min-h-screen bg-red-700 text-white flex flex-col justify-center items-center px-8 pt-24 pb-10 relative z-10">
          <div className="text-center mb-4">
            <h2 className="text-5xl italic font-serif text-white leading-tight mb-2 text-center">
              <strong className="font-extrabold">21</strong> songs for your <strong className="font-extrabold">21</strong>
            </h2>
            <p className="text-sm italic text-white/70 text-center max-w-md mx-auto mb-4">
              Cada canción es un momento, y un momento viene con un recuerdo, pasa el mouse por la imagen ;)
            </p>
            <AnimatePresence mode="wait">
              <motion.h1
                key={current}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                className="text-4xl font-extrabold text-white"
              >
                #{current + 1}
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={handlePrev}
              className="text-2xl p-2 rounded-full bg-red-200 hover:bg-red-300 text-red-700 transition"
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
                className="relative w-48 aspect-square overflow-hidden rounded-xl shadow-xl"
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
              className="text-2xl p-2 rounded-full bg-red-200 hover:bg-red-300 text-red-700 transition"
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
              <h2 className="text-xl font-semibold">{song.title}</h2>
              <p className="text-md text-red-200">{song.artist}</p>
              <div className="mt-2">
                <CustomAudioPlayer src={song.spotifyUrl} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-[55%] p-12 flex flex-col justify-center z-10 bg-white" id="playlist">
          <AnimatePresence mode="wait">
            <motion.div
              key={song.id + "-message"}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-lg font-semibold text-red-700 mb-2">Mensaje</h2>
              <p className="text-base italic text-red-500 whitespace-pre-line">
                {song.message || "Mensaje pendiente..."}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="w-full text-center text-xs text-white/60 bg-red-800 py-2 z-20">
        Hecho con 💖 para Isa · {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Playlist;
