import { useNavigate } from "react-router-dom";

export const resetTokens = async () => {
  const navigate = useNavigate();
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expires_at");
  navigate("/auth");
};
