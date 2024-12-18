import { refreshAccessToken } from "./refresh_access_token";

export const makeSpotifyRequest = async (url) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const expiresAt = localStorage.getItem("expires_at");
    if (!expiresAt || Date.now() + 5000 > expiresAt) {
      // Token expired, refresh it
      await refreshAccessToken();
      // Retry the request with new token
      return makeSpotifyRequest(url);
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      // Token expired, refresh it
      if (response.error_description == "Refresh token revoked") {
        // Reset tokens
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("expires_at");
        // Redirect to login page
        window.location.href = "/";
        return;
      }

      await refreshAccessToken();
      // Retry the request with new token
      return makeSpotifyRequest(url);
    }

    return response.json();
  } catch (error) {
    console.error("Error making Spotify request:", error);
    throw error;
  }
};
