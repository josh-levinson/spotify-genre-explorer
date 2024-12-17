import { useState, useEffect } from "react";
import "./MainPage.css";
import AuthPage from "../AuthPage/AuthPage";
import ArtistList from "../../components/ArtistList/ArtistList";
import Search from "../../components/Search/Search";
import { SPOTIFY_API_URL } from "../../utils/constants";
import { makeSpotifyRequest } from "../../utils/make_spotify_request";

function MainPage() {
  const [artists, setArtists] = useState([]);

  const accessToken = localStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [artists]);

  async function handleGenreSelect(genre) {
    const response = await makeSpotifyRequest(
      `${SPOTIFY_API_URL}/search?q=genre%3A${encodeURIComponent(
        genre
      )}&type=artist&limit=20`
    );
    setArtists(response?.artists?.items);
  }

  return (
    <>
      {accessToken === null || accessToken === undefined ? (
        <AuthPage />
      ) : (
        <div className="main">
          <Search setArtists={setArtists} />
          <ArtistList artists={artists} onGenreSelect={handleGenreSelect} />
        </div>
      )}
    </>
  );
}

export default MainPage;
