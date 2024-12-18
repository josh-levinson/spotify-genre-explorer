import { CLIENT_ID, REDIRECT_URI, SPOTIFY_TOKEN_URL } from "./constants";

export const getAccessToken = async (code) => {
  // stored in the previous step
  try {
    let codeVerifier = localStorage.getItem("code_verifier");
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier,
      }),
    };

    const response = await fetch(SPOTIFY_TOKEN_URL, payload);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${JSON.stringify(
          errorData
        )}`
      );
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem("expires_at", Date.now() + data.expires_in * 1000);
    return data;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
};
