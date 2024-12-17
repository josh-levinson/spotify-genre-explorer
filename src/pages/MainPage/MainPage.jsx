import { useState, useEffect } from "react";
import "./MainPage.css";
import AuthPage from "../AuthPage/AuthPage";
import ArtistList from "../../components/ArtistList/ArtistList";
import Search from "../../components/Search/Search";
import { SPOTIFY_API_URL } from "../../utils/constants";
import { makeSpotifyRequest } from "../../utils/make_spotify_request";

function MainPage() {
  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("artist");

  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [artists]);

  async function handleGenreSelect(genre) {
    const genreString = genre.replaceAll(" ", "-");

    const response = await makeSpotifyRequest(
      `${SPOTIFY_API_URL}/search?q=genre%3A${encodeURIComponent(
        genreString
      )}&type=artist&limit=20`
    );
    setArtists(response?.artists?.items);
    setSearch(genre);
    setSearchType("genre");
  }

  return (
    <>
      {accessToken === null || accessToken === undefined ? (
        <AuthPage />
      ) : (
        <div className="main">
          <Search
            setArtists={setArtists}
            search={search}
            setSearch={setSearch}
            searchType={searchType}
            setSearchType={setSearchType}
          />
          <ArtistList artists={artists} onGenreSelect={handleGenreSelect} />
        </div>
      )}
    </>
  );
}

export default MainPage;
