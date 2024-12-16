const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

let codeVerifier = localStorage.getItem("code_verifier");

if (!codeVerifier) {
  codeVerifier = generateRandomString(64);
  window.localStorage.setItem("code_verifier", codeVerifier);
}

export default codeVerifier;
