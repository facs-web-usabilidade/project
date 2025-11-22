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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibm9tZSI6IkNsaWVudGUiLCJwZXJmaWwiOiJDbGllbnRlIiwiaWF0IjoxNzYzODI1ODg5LCJleHAiOjE3NjM4Mjk0ODl9.YCMhmGhS6rTsZxuCQAsM54GBMPzJ7zSUUbquye1wbEQ'
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

      console.log(data)

      // setUser({ ...user, ...data })
      // setReloadPage(false);

    } catch (error) {
      console.log(error.message)
    }
  }
  
  // async function getUserWishList() {
  //   try {
  //     const response = await axiosInstance.get('/lista-desejo', {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       },
  //       user: {
  //         id: user.id
  //       }
  //     });
  //     // console.log(user.id)
  //     // console.log(response.data);
  //   }
  //   catch(error) {
  //     console.log(error.message)
  //   }
  // }

  useEffect(() => {
    if (!token) {
      return navigate('/login')
    }

    GetUserInfo
    // getUserWishList()
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
