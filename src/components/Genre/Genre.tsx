import React from "react";
import "./Genre.css";

export default function Genre({ genre }) {
  return (
    <div className="genre">
      <strong>{genre}</strong>
    </div>
  );
}
