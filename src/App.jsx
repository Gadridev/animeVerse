import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LibraryProvider } from "./context/LibraryContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import AnimeCatalog from "./pages/AnimeCatalog";
import AnimeDetail from "./pages/AnimeDetail";
import AnimeCharacters from "./pages/AnimeCharacters";
import Characters from "./pages/Characters";
import CharacterDetail from "./pages/CharacterDetail";
import Favorites from "./pages/Favorites";
import Ratings from "./pages/Ratings";
import Library from "./pages/Library";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <LibraryProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/anime" element={<AnimeCatalog />} />
            <Route path="/anime/:id" element={<AnimeDetail />} />
            <Route path="/anime/:id/characters" element={<AnimeCharacters />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:id" element={<CharacterDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/ratings" element={<Ratings />} />
            <Route path="/library" element={<Library />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LibraryProvider>
  );
}
