import { refreshAccessToken } from "./refresh_access_token";

const UNAUTHORIZED = 401;
const MAX_RETRIES = 2;

class TokenError extends Error {
  constructor(message) {
    super(message);
    this.name = "TokenError";
  }
}

const clearAuthTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expires_at");
};

const handleUnauthorized = async (response) => {
  const errorData = await response.json().catch(() => ({}));

  if (errorData.error_description === "Refresh token revoked") {
    clearAuthTokens();
    throw new TokenError("Refresh token revoked");
  }

  const result = await refreshAccessToken();
  if (!result) {
    clearAuthTokens();
    throw new TokenError("Failed to refresh access token");
  }

  return true;
};

export const makeSpotifyRequest = async (url, retryCount = 0) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const expiresAt = localStorage.getItem("expires_at");

    // Proactively refresh if token is expired or will expire soon
    if (!expiresAt || Date.now() + 5000 > expiresAt) {
      const result = await refreshAccessToken();
      if (!result) {
        clearAuthTokens();
        throw new TokenError("Failed to refresh access token");
      }
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === UNAUTHORIZED && retryCount < MAX_RETRIES) {
      await handleUnauthorized(response);
      return makeSpotifyRequest(url, retryCount + 1);
    }

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof TokenError) {
      // Handle authentication errors by redirecting to login
      window.location.href = "/";
      return null;
    }

    console.error("Error making Spotify request:", error);
    throw error;
  }
};
