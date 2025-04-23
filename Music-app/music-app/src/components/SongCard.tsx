import { Song } from "@/types/song";

type Props = {
  song: Song;
  onToggleFavorite: (id: number) => void;
};

export default function SongCard({ song, onToggleFavorite }: Props) {
  return (
    <div className="border p-4 rounded shadow-sm flex justify-between items-center">
      <div>
        <h2 className="text-lg font-bold">{song.title}</h2>
        <p className="text-sm text-gray-600">{song.artist} • {song.type}</p>
      </div>
      <button onClick={() => onToggleFavorite(song.id)}>
        {song.isFavorite ? '💖' : '🤍'}
      </button>
    </div>
  );
}
