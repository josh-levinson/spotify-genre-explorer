const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

const codeVerifier  = generateRandomString(64);
const hashed = await sha256(codeVerifier)
const codeChallenge = base64encode(hashed);

const clientId = '1fd2e136ea1647d288b47d6341238387';
const redirectUri = 'http://localhost:5173/callback';

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")

// generated in the previous step
window.localStorage.setItem('code_verifier', codeVerifier);

const params =  {
  response_type: 'code',
  client_id: clientId,
  scope,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
}

// Serialize the params object into a query string
const queryString = new URLSearchParams(params).toString();

// Combine the auth URL with the query string
const fullAuthUrl = `${authUrl}?${queryString}`;

// Export the full auth URL as a string
export const spotifyAuthUrl = fullAuthUrl;
