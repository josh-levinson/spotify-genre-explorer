import React from "react";
import { spotifyAuthUrl } from "../../utils/spotify_auth";

function Auth() {
  return (
    <div>
      <a href={spotifyAuthUrl}>Login to Spotify</a>
    </div>
  );
}

export default Auth;