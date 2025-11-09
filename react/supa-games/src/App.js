import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Genres from "./pages/Genres";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import myGames from "./pages/myGames";
import History from "./pages/History";
import Settings from "./pages/Settings";

const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/games" element={<Games />}/>
        <Route path="/genres" element={<Genres />}/>
        <Route path="/wishlist" element={<Wishlist />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/myGames" element={<myGames />}/>
        <Route path="/history" element={<History />}/>
        <Route path="/settings" element={<Settings />}/>
      </Routes>
    </Layout>
  </Router>
);

export default App;