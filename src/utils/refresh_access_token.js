import { CLIENT_ID, SPOTIFY_TOKEN_URL } from "./constants";
import { resetTokens } from "./reset_tokens";

export class RefreshTokenError extends Error {
  constructor(message, response) {
    super(message);
    this.name = "RefreshTokenError";
    this.response = response;
  }
}

export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new RefreshTokenError("No refresh token found");
    }

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

    const response = await fetch(SPOTIFY_TOKEN_URL, payload);

    if (!response.ok) {
      const errorData = await response.json();
      throw new RefreshTokenError(
        errorData.error_description || "Failed to refresh token",
        errorData
      );
    }

    const data = await response.json();

    if (data.error) {
      if (data.error_description === "Refresh token revoked") {
        resetTokens();
        return false;
      }
      throw new RefreshTokenError(data.error_description || data.error, data);
    }

    // Store new tokens
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("expires_at", Date.now() + data.expires_in * 1000);

    // Some Spotify implementations may return a new refresh token
    if (data.refresh_token) {
      localStorage.setItem("refresh_token", data.refresh_token);
    }

    return true;
  } catch (error) {
    console.error("Error refreshing access token:", error);

    if (error instanceof RefreshTokenError) {
      resetTokens();
      return false;
    }

    // Network errors or other unexpected errors
    throw error;
  }
};
