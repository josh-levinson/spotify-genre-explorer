import codeVerifier from "./code_verifier";
import {
  CLIENT_ID,
  REDIRECT_URI,
  SPOTIFY_USER_SCOPES,
  SPOTIFY_AUTH_URL,
} from "./constants";

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const hashed = await sha256(codeVerifier);
const codeChallenge = base64encode(hashed);

// generated in the previous step
window.localStorage.setItem("code_verifier", codeVerifier);

const params = {
  response_type: "code",
  client_id: CLIENT_ID,
  SPOTIFY_USER_SCOPES,
  code_challenge_method: "S256",
  code_challenge: codeChallenge,
  redirect_uri: REDIRECT_URI,
};

// Serialize the params object into a query string
const queryString = new URLSearchParams(params).toString();

// Combine the auth URL with the query string
export const authCodeUrl = `${SPOTIFY_AUTH_URL}?${queryString}`;
