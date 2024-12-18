import { CLIENT_ID, SPOTIFY_TOKEN_URL } from "./constants";

export const refreshAccessToken = async () => {
  // refresh token that has been previously stored
  const refreshToken = localStorage.getItem("refresh_token");

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

  if (response.error_description === "Refresh token revoked") {
    // Reset tokens
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_at");
    // Redirect to login page
    window.location.href = "/";
    return;
  }

  localStorage.setItem("access_token", response.access_token);
  if (response.refreshToken) {
    localStorage.setItem("refresh_token", response.refresh_token);
  }
};
