import type { FC } from "react";

interface SongCardProps {
  title: string;
  artist: string;
  spotifyUrl: string;
  message: string;
}

const SongCard: FC<SongCardProps> = ({ title, artist, spotifyUrl, message }) => {
  return (
    <div className="bg-white/80 rounded-xl shadow-md p-4 mb-6">
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="text-sm text-gray-600 mb-2">{artist}</p>
      <iframe
        src={spotifyUrl}
        width="100%"
        height="80"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded mb-2"
      ></iframe>
      <p className="text-xs text-gray-500 mb-2">
        Inicia sesión en Spotify para escuchar la canción completa.
      </p>
      <p className="text-sm text-gray-700 italic">{message}</p>
    </div>
  );
};

export default SongCard;
