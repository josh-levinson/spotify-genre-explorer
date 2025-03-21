import { SPOTIFY_API_URL } from "../../utils/constants";
import { makeSpotifyRequest } from "../../utils/make_spotify_request";
import "./Search.css";

function Search({ setArtists, search, setSearch, searchType, setSearchType }) {
  async function handleSearch() {
    const searchString = search.replaceAll(" ", "-");

    if (searchType === "artist") {
      const response = await makeSpotifyRequest(
        `${SPOTIFY_API_URL}/search?q=${searchString}&type=artist`
      );
      setArtists(response?.artists?.items);
    } else if (searchType === "genre") {
      const response = await makeSpotifyRequest(
        `${SPOTIFY_API_URL}/search?q=genre%3A${searchString}&type=artist&limit=20`
      );
      setArtists(response?.artists?.items);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
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
          onKeyDown={handleKeyDown}
        />
        <select
          name="searchType"
          className="search-type"
          onChange={(e) => setSearchType(e.target.value)}
          value={searchType}
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
