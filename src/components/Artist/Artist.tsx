import React from "react";
import "./Artist.css";
import Genre from "../Genre/Genre";
import spotifyLogo from "/spotify_logo.svg";

export default function Artist({ artist, onGenreSelect }) {
  const imageUrl = artist.images[0]?.url;
  const spotifyUrl = artist.external_urls.spotify;

  return (
    <div className="artist">
      <div className="artist-details">
        <h3>
          {artist.name}
          <a href={spotifyUrl} target="_blank">
            <img
              className="spotify-logo"
              src={spotifyLogo}
              alt="Spotify Logo"
            />
          </a>
        </h3>
        {imageUrl && (
          <img
            className="artist-image"
            src={imageUrl}
            alt={`Picture of ${artist.name}`}
          />
        )}
      </div>
      <div className="artist-genres">
        {artist.genres.map((genre) => (
          <Genre key={genre} genre={genre} onGenreSelect={onGenreSelect} />
        ))}
      </div>
    </div>
  );
}
