import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAccessToken } from "../../utils/get_access_token";

function Callback() {
  const location = useLocation(); // Get the current location (URL)
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    getAccessToken(code).then(() => {
      console.log(
        "access token",
        localStorage.getItem("access_token", response.access_token)
      );
      navigate("/");
    });
  }, [navigate, location.search]); // Re-run the effect if the query string changes

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
}
export default Callback;
