import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header.jsx";
import Main from "./Body.jsx";
import Preview from "./Preview.jsx";
import MediaPage from "./MediaPage.jsx";
import ContextProvider from "./Context.jsx";

function App() {
  return (
    <ContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<><Preview /><Main /></>} />
        <Route path="/movie" element={<MediaPage mode="movie" />} />
        <Route path="/tv" element={<MediaPage mode="tv" />} />
        <Route path="/genre/:id" element={<MediaPage mode="genre" />} />
        <Route path="/search" element={<MediaPage mode="search" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer className="site-footer">
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        <p>&copy; {new Date().getFullYear()} EJWatch. All rights reserved.</p>
      </footer>
    </ContextProvider>
  );
}

export default App;