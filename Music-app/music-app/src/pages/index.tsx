import { useEffect, useState } from "react";
import SongCard from "@/components/SongCard";
import SearchBar from "@/components/SearchBar";
import FilterDropdown from "@/components/FilterDropdown";
import { Song } from "@/types/song";
import api from "@/utils/api";

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const fetchSongs = async () => {
    try {
      let url = "/songs";
      if (search) url = `/songs/search?query=${search}`;
      else if (type) url = `/songs?type=${type}`;

      const res = await api.get<Song[]>(url);
      setSongs(res.data);
    } catch (err) {
      console.error("Error fetching songs:", err);
    }
  };

  const toggleFavorite = async (id: number) => {
    try {
      await api.patch(`/songs/${id}/favorite`);
      fetchSongs();
    } catch (err) {
      console.error("Toggle favorite failed", err);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [search, type]);

  const types = ["Pop", "Rock", "Jazz", "Hip-Hop", "Classical"]; // or fetch from backend

  return (
    <div className="max-w-2xl mx-auto space-y-4 p-4">
      <h1 className="text-2xl font-bold">🎵 Music App</h1>
      <SearchBar value={search} onChange={setSearch} />
      <FilterDropdown value={type} onChange={setType} options={types} />

      <div className="space-y-2">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} onToggleFavorite={toggleFavorite} />
        ))}
      </div>
    </div>
  );
}
