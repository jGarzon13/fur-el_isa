import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const floatingParticles = Array.from({ length: 20 }, (_, i) => i);

const Home = () => {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    const audio = new Audio("audio/00-fur-elise.mp3");
    audio.loop = true;
    audio.play();
    setStarted(true);
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200 text-red-900 font-serif overflow-hidden">

      {/* Partículas flotantes */}
      {floatingParticles.map((i) => (
        <div
          key={i}
          className="absolute text-pink-400 text-xl animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 100}px`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          🎵
        </div>
      ))}

      {/* Contenido central */}
      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="text-center z-10 px-6"
          >
            <h1 className="text-5xl font-bold italic mb-6">
              Für El
              <span className="text-pink-600 font-extrabold">(Isa)</span>
              <span className="inline-block ml-1 text-xl animate-pulse">🎵</span>
            </h1>
            <button
              onClick={handleStart}
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full transition-all shadow-md"
            >
              Toca Aquí :)
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center z-10 px-6 max-w-xl mx-auto"
          >
            <h1 className="text-5xl font-bold italic mb-4">
              Für el
              <span className="text-pink-600 font-extrabold">(Isa)</span>
              <span className="inline-block ml-1 text-xl animate-pulse">🎵</span>
            </h1>

            <p className="mb-4 text-lg italic text-red-800 leading-relaxed">
              <span className="text-pink-600 font-extrabold text-3xl leading-none align-top">I</span>
              nicié esta idea recordando cómo siempre te he recomendado canciones, cómo muchas veces una melodía ha sido mi forma de decir lo que no encontraba en palabras.
              Inspirado en <em>Für Elise</em>, aquella pieza cuya primera melodia se tocar y, haciendo un juego de palabras con sus nombres, recolecté 21 canciones que han sido parte de nuestra historia — 21 momentos donde transmití mi cariño y quise que se quede contigo para siempre.
            </p>

            <p className="text-md text-red-700 mb-6">
              ¡Feliz cumpleaños, Flaca! 🎂🎉
            </p>

            <a
              href="/playlist"
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full transition-all shadow-md"
            >
              Ir a la Playlist
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
