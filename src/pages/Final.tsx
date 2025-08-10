import { motion } from "framer-motion";
import { useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const floatingParticles = Array.from({ length: 20 }, (_, i) => i);

export default function Farewell() {
  const seeds = useMemo(
    () =>
      floatingParticles.map(() => ({
        left: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 100}px`,
        delay: `${Math.random() * 5}s`,
      })),
    []
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/final.mp3");
    audio.loop = false;
    audio.play().catch(() => {
      // Por si el navegador bloquea autoplay sin interacción
      console.warn("Autoplay bloqueado por el navegador");
    });
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div className="relative min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200 text-red-900 font-serif overflow-hidden">
      {floatingParticles.map((i) => (
        <div
          key={i}
          className="absolute text-pink-400 text-xl animate-float select-none"
          style={{
            left: seeds[i].left,
            bottom: seeds[i].bottom,
            animationDelay: seeds[i].delay,
          }}
          aria-hidden="true"
        >
          🎵
        </div>
      ))}

      <div className="z-10 px-6 max-w-2xl mx-auto text-center mt-8">
        {/* Botón de volver al inicio */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Link
  to="/"
  className="inline-block px-5 py-2 bg-pink-600 hover:bg-pink-700
             text-white hover:text-white visited:text-white active:text-white focus:text-white
             rounded-full shadow-md transition
             focus:outline-none focus:ring-2 focus:ring-pink-300/60 focus:ring-offset-2 focus:ring-offset-pink-100
             no-underline hover:no-underline"
>
  ⬅ Volver al inicio
</Link>

        </motion.div>

        <motion.img
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          src="/img/snupi.png"
          alt="Snoopy con saxofón"
          className="mx-auto w-32 h-auto mb-6 drop-shadow-lg"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold italic mb-6"
        >
          Für el <span className="text-pink-600 font-extrabold">(Isa)</span>
          <span className="inline-block ml-1 text-xl align-top">🎵</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-6 text-lg italic text-red-800 leading-relaxed"
        >
          Este pequeño viaje musical fue mi forma de decirte todo lo que a veces no alcanzan las palabras. Cada pista fue un recuerdo, un guiño y un abrazo escondido entre melodías.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-6 text-lg italic text-red-800 leading-relaxed"
        >
          Gracias por escuchar, por acompañarme y por dejar que la música nos cuente la historia. También creé la playlist en Spotify para que puedas revivir estos momentos cuando quieras.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-md text-red-700 mb-8"
        >
          Con cariño, de mí para ti. 💌
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full"
        >
          <div className="mx-auto w-full max-w-lg p-2 bg-white/40 backdrop-blur-sm rounded-2xl shadow-lg hover:scale-[1.02] transition-transform">
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/5u6abiApL5Tsdwy9AqQNvp?utm_source=generator"
              className="w-full"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10" />
    </div>
  );
}
