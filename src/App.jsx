import "./App.css";
import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Callback from "./pages/Callback/Callback";
import NotFound from "./pages/NotFound/NotFound";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<MainPage />} />
          <Route path="callback" element={<Callback />} />
          <Route path="auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
