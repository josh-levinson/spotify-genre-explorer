import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Callback from "./pages/Callback/Callback";
import NotFound from "./pages/NotFound/NotFound";
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="callback" element={<Callback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
