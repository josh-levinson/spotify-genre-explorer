import { useState } from "react";
import { SPOTIFY_API_URL } from "../../utils/constants";
import { makeSpotifyRequest } from "../../utils/make_spotify_request";
import "./Search.css";

function Search({ setArtists }) {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("artist");

  async function handleSearch() {
    if (searchType === "artist") {
      const response = await makeSpotifyRequest(
        `${SPOTIFY_API_URL}/search?q=${encodeURIComponent(search)}&type=artist`
      );
      setArtists(
        response?.artists?.items.filter((artist) => artist.genres.length)
      );
    } else if (searchType === "genre") {
      const response = await makeSpotifyRequest(
        `${SPOTIFY_API_URL}/search?q=genre%3A${encodeURIComponent(
          search
        )}&type=artist&limit=20`
      );
      setArtists(response?.artists?.items);
    }
  }

  return (
    <div className="search">
      <div>
        <input
          name="search"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          name="searchType"
          className="search-type"
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="artist">Artist</option>
          <option value="genre">Genre</option>
        </select>
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;
