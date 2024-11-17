export const getAccessToken = async (code) => {
  // stored in the previous step
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

  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem("access_token", response.access_token);
};
