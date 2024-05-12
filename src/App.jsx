import { useState } from "react";
import "./App.css";
import ArtistList from "./components/ArtistList/ArtistList";

function App() {
  const [artists, setArtists] = useState([]);

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
    setArtists(data?.artists?.items);
  }

  return (
    <>
      <div>
        <div className="search">
          <form onSubmit={handleSubmit}>
            <p>
              <input name="search" defaultValue="godspeed" />
            </p>
            <button type="submit">Search</button>
          </form>
        </div>
        <ArtistList artists={artists} />
      </div>
    </>
  );
}

export default App;
