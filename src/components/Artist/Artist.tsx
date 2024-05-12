import React from "react";
import "./Artist.css";
import Genre from "../Genre/Genre";

export default function Artist({ artist }) {
  const imageUrl = artist.images[0]?.url;
  const spotifyUrl = artist.external_urls.spotify;

  return (
    <div className="artist">
      <div className="artist-details">
        <h3>
          <a href={spotifyUrl} target="_blank">
            {artist.name}
          </a>
        </h3>
        {imageUrl && <img src={imageUrl} alt={`Picture of ${artist.name}`} />}
      </div>
      <div className="artist-genres">
        {artist.genres.map((genre) => (
          <Genre key={genre} genre={genre} />
        ))}
      </div>
    </div>
  );
}
