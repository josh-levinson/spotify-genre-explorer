import React from "react";
import "./Artist.css";
import Genre from "../Genre/Genre";

export default function Artist({ artist, onGenreSelect }) {
  const imageUrl = artist.images[0]?.url;
  const spotifyUrl = artist.external_urls.spotify;

  return (
    <div className="artist">
      <div className="artist-details">
        <h3>
          {artist.name}
          <a className="spotify-logo" href={spotifyUrl} target="_blank">
            <img src="../../assets/spotify_icon.svg" />
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
