import React from "react";
import "./Genre.css";

export default function Genre({ genre, onGenreSelect }) {
  return (
    <div className="genre">
      <button className="genre-button" onClick={() => onGenreSelect(genre)}>
        {genre}
      </button>
    </div>
  );
}
