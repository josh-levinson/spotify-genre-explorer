export const getAccessToken = async (code) => {
  // stored in the previous step
  try {
    let codeVerifier = localStorage.getItem("code_verifier");
    const clientId = "1fd2e136ea1647d288b47d6341238387";
    const redirectUri = "http://localhost:5173/callback";
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    const response = await fetch(url, payload);

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
    return data;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
};
