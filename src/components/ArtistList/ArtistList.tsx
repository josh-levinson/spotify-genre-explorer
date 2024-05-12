// @ts-check

import './ArtistList.css';
import Artist from '../Artist/Artist';
import React from 'react';

export default function ArtistList({ artists }) {
  return (
    <div className="artist-list">
      {artists.map((artist) => (
        <Artist key={artist.id} artist={artist} /> 
      ))}
    </div>
  );
}


