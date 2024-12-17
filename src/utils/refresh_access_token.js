import { CLIENT_ID, SPOTIFY_TOKEN_URL } from "./constants";

export const refreshAccessToken = async () => {
  // refresh token that has been previously stored
  const refreshToken = localStorage.getItem("refresh_token");
  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
    }),
  };
  const body = await fetch(SPOTIFY_TOKEN_URL, payload);
  const response = await body.json();

  localStorage.setItem("access_token", response.accessToken);
  if (response.refreshToken) {
    localStorage.setItem("refresh_token", response.refreshToken);
  }
};
