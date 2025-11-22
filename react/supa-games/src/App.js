import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import MyGameInfo from "./pages/MyGameInfo";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Cart from "./pages/Cart";
import VerifyToken from "./components/VerifyToken";
import VerifyNoToken from "./components/VerifyNoToken";
import VerifyAdmin from "./components/VerifyAdmin";

const App = () => (
  <Router>
    <Routes>
      <Route element={<VerifyNoToken />}>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
      </Route>
      <Route element={<VerifyToken />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" replace />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/games" element={<Games />}/>
          <Route path="/games/gameInfo/:id" element={<GameInfo />} />
          <Route path="/genres" element={<Genres />}/>
          <Route path="/wishlist" element={<Wishlist />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/myGames" element={<MyGames />}/>
          <Route path="/myGames/myGameInfo/:id" element={<MyGameInfo />} />
          <Route path="/history" element={<History />}/>
          <Route path="/settings" element={<Settings />}/>
          <Route path="/cart" element={<Cart />} />
          <Route element={<VerifyAdmin />}>
            {/* admin only routes */}
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

export default App;