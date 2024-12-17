import { authCodeUrl } from "../../utils/auth_code_url";
import "./AuthPage.css";

function AuthPage() {
  return (
    <div className="auth">
      <h3>You must login through Spotify to use this application</h3>
      <a href={authCodeUrl}>
        <img width="30%" src="sign_in_with_spotify.jpg" />
      </a>
    </div>
  );
}

export default AuthPage;
