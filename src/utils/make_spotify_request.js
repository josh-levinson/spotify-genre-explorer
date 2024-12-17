import { refreshAccessToken } from "./refresh_access_token";

export const makeSpotifyRequest = async (url) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      // Token expired, refresh it
      const newToken = await refreshAccessToken();
      // Retry the request with new token
      return makeSpotifyRequest(url);
    }

    return response.json();
  } catch (error) {
    console.error("Error making Spotify request:", error);
    throw error;
  }
};
