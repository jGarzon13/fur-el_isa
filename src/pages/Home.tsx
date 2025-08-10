import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const floatingParticles = Array.from({ length: 20 }, (_, i) => i);

const Home = () => {
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Crear y precargar el audio al montar
  useEffect(() => {
    const audio = new Audio("/audio/00-fur-elise.mp3");
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0; // para hacer fade-in
    audioRef.current = audio;
    audio.load();

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  const handleStart = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      // Fade-in suave
      const target = 1;
      const step = 0.1;
      const interval = setInterval(() => {
        if (!audioRef.current) return clearInterval(interval);
        const v = Math.min(target, (audioRef.current.volume || 0) + step);
        audioRef.current.volume = v;
        if (v >= target) clearInterval(interval);
      }, 30);
    } catch {
      // Ignorar errores de autoplay
    }
    setStarted(true);
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
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
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full 
                         transition-all shadow-md
                         focus:outline-none focus:ring-2 focus:ring-pink-300/60 focus:ring-offset-2 focus:ring-offset-pink-100"
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

            <Link
  to="/playlist"
  onClick={stopAudio}
  className="bg-pink-600 hover:bg-pink-700 text-white hover:text-white visited:text-white active:text-white focus:text-white 
             font-semibold px-8 py-3 rounded-full transition-all shadow-md
             focus:outline-none focus:ring-2 focus:ring-pink-300/60 focus:ring-offset-2 focus:ring-offset-pink-100
             no-underline hover:no-underline"
>
  Ir a la Playlist
</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
