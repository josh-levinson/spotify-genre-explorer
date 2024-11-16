import { useState, useEffect } from "react";
import "./MainPage.css";
import ArtistList from "../../components/ArtistList/ArtistList";
import React from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [artists, setArtists] = useState([]);
  const navitage = useNavigate();

  useEffect(() => {
    // authorize();
    window.scrollTo(0, 0);
  }, [artists]);

  async function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const artistName = formData.get("search");

    // You can pass formData as a fetch body directly:
    const response = await fetch(
      `http://localhost:3000/search_artist?artist_name=${encodeURIComponent(
        artistName
      )}`
    );
    const data = await response.json();
    setArtists(data?.artists?.items.filter((artist) => artist.genres.length));
  }

  async function handleGenreSelect(genre) {
    const response = await fetch(
      `http://localhost:3000/search_genre?genre=${encodeURIComponent(genre)}`
    );
    const data = await response.json();
    setArtists(data?.artists?.items);
  }

 return (
  <>
    {localStorage.getItem('access_token') ? (
      <div>
        <div className="search">
          <form onSubmit={handleSubmit}>
            <p>
              <input name="search" defaultValue="godspeed" />
            </p>
            <button type="submit">Search</button>
          </form>
        </div>
        <ArtistList artists={artists} onGenreSelect={handleGenreSelect} />
      </div>
    ) : (
      navigate("/auth")
    )}
  </>
); 
}

export default MainPage;
