import { useState } from 'react';
import './App.css'

function App() {
  const [artists, setArtists] = useState([])

  function handleArtistData(data) {
    setArtists(data);
    console.log(data);
  }

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const artistName = formData.get('search');

    // You can pass formData as a fetch body directly:
    fetch(`http://localhost:3000/search_artist?artist_name=${encodeURIComponent(artistName)}`).then(response => response.json()).then(data => handleArtistData(data));
  }

  return (
    <>
    <div>
      <form onSubmit={handleSubmit}>
        <p><input name="search" /></p>
        <button type="submit">Search</button>
      </form>
      </div>
      <div>{artists.toString()}</div>
    </>
  )
}

export default App
