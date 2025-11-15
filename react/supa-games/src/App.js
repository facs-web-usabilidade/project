import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Games from "./pages/Games";
import GameInfo from "./pages/GameInfo";
import Genres from "./pages/Genres";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import MyGames from "./pages/MyGames";
import History from "./pages/History";
import Settings from "./pages/Settings";

const App = () => (
  <Router>
    <Routes>
      {/* <Route element={<Layout />}> */}
      <Route path="/home" element={<Home />} />
      <Route path="/games" element={<Games />} />
      <Route path="/games/gameInfo" element={<GameInfo />} />
      <Route path="games/gameInfo/:id" element={<GameInfo />} />
      <Route path="/genres" element={<Genres />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/myGames" element={<MyGames />} />
      <Route path="/history" element={<History />} />
      <Route path="/settings" element={<Settings />} />
      {/* </Route> */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
);

export default App;