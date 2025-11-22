import { useEffect, useState } from "react";
import "../styles/pages/wishlist.css";
import Layout from "../components/Layout";
import axiosInstance from "../services/apiService";
import { useNavigate } from "react-router-dom";
import parseJwt from "../utils/jwtUtils";

function Wishlist() {
  const [user, setUser] = useState({id: '', nome: ''})
  const [ReloadPage, setReloadPage] = useState(false);
  const [wishList, setWishList] = useState();
  const [sameCompany, setSameCompany] = useState();
  const [sameCategory, setSameCategory] = useState();
  localStorage
  .setItem(
    'token', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibm9tZSI6IkNsaWVudGUiLCJwZXJmaWwiOiJDbGllbnRlIiwiaWF0IjoxNzYzNzY5MTQ0LCJleHAiOjE3NjM3NzI3NDR9.604UhRNfwd9XP07ob9TIoTveeZpTvvY8IzY_gTX-dv4'
  )
  
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  async function GetUserInfo() {
    try {
      const { data } = await axiosInstance.get('/usuarios', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser({ ...user, ...data })
      setReloadPage(false);

    } catch (error) {
      console.log(error.message)
    }
  }
  
  async function getUserWishList() {
    try {
      const response = await axiosInstance('/jogos/10', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    }
    catch(error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (!token) {
      return navigate('/login')
    }

    GetUserInfo()
    console.log(parseJwt(token))
  }, []);

  return (
    <Layout>
      <main className="content">
        <aside className="left">
          <h2>Lista de desejo</h2>

        </aside>
        <aside className="right">
          <h1>right container</h1>
        </aside>
      </main>
    </Layout>
  );
};

export default Wishlist;
