import "./Logout.css";
import { resetTokens } from "../../utils/reset_tokens";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  function handleLogout() {
    resetTokens();
    navigate("/auth");
  }

  return (
    <div className="logout">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
