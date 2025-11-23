import { useEffect, useState } from "react";
import "../styles/pages/wishlist.css";
import axiosInstance from "../services/apiService";
import { useNavigate } from "react-router-dom";
import parseJwt from "../utils/jwtUtils";

function Wishlist() {
  const [user, setUser] = useState({id: '', nome: ''})
  const [ReloadPage, setReloadPage] = useState(false);
  const [wishList, setWishList] = useState();
  const [sameCompany, setSameCompany] = useState();
  const [sameCategory, setSameCategory] = useState();
  
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // async function GetUserInfo() {
  //   try {
  //     const { data } = await axiosInstance.get('/usuarios', {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });

  //     console.log(data)

  //     // setUser({ ...user, ...data })
  //     // setReloadPage(false);

  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }
  
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
    // if (!token) {
    //   return navigate('/login')
    // }

    // GetUserInfo()
    // getUserWishList()
  }, []);

  return (
    <main className="wishlist-page">
      <aside>
        <h1>left container</h1>
      </aside>
      <aside>
        <h1>right container</h1>
      </aside>
    </main>
  );
};

export default Wishlist;
