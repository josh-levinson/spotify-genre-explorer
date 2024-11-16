import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getToken } from '../../utils/spotify_auth';

function Callback() {
    const location = useLocation(); // Get the current location (URL)
    const navigate = useNavigate();

    useEffect(() => {
    // Get the query string from the URL
    const queryParams = new URLSearchParams(location.search);

    // Parse the query parameters, for example:
    // Assuming the URL is something like:
    // http://localhost:3000/callback?code=abcdef12345&state=xyz
    const codeParam = queryParams.get('code');  // Get 'code' from the query string

    // Assign the 'code' to your variable (or perform any other logic)
    const authToken = getToken(codeParam);
    localStorage.setItem('access_token', authToken);
    navigate("/");
  }, [location.search]); // Re-run the effect if the query string changes

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};
export default Callback;
