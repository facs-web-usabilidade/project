import { useEffect, useState } from "react";
import "../styles/pages/wishlist.css";
import axiosInstance from "../services/apiService";
import { getLocalItem } from "../utils/localStorage";
import GameListItem from "../components/GameListItem";
import SmallGameCard from "../components/SmallGameCard";

function Wishlist() {
  const [wishListItems, setWishListItems] = useState([]);
  const [sameCategory, setSameCategory] = useState([]);
  const [sameCompany, setSameCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = getLocalItem("supa_token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchWishListData();
  }, []);

  const fetchWishListData = async () => {
    setLoading(true);

    if (!token) {
        setLoading(false);
        return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const responseWishlist = await axiosInstance.get("/lista-desejo", config);

      if (!responseWishlist.data || responseWishlist.data.length === 0) {
          setWishListItems([]);
          setLoading(false);
          return;
      }

      const responseToPage = responseWishlist.data.map((item) => {
        return {
          id: item.id,
          fkJogo: item.id,
          title: item.nome ,   
          price: item.preco,
          image: "/images/card_205w_305h.png",
        }
      })

      setWishListItems(responseToPage);

      const gameReference = responseWishlist.data[0];
      const categoryReferenceId = gameReference.fk_categoria;
      const companyReferenceId = gameReference.fk_empresa;

      const allGamesResponse = await axiosInstance.get(`/jogos`, config);

      const filteredSameCategoryGames = allGamesResponse.data.filter((game) => game.fkCategoria === categoryReferenceId)
      const slicedSameCategory = filteredSameCategoryGames.slice(filteredSameCategoryGames.length-3, filteredSameCategoryGames.length);
      setSameCategory(slicedSameCategory);

      console.log(slicedSameCategory);

      const filteredSameCompanyGames = allGamesResponse.data.filter((game) => game.fkEmpresa === companyReferenceId);
      const slicedSameCompany = filteredSameCompanyGames.slice(filteredSameCompanyGames.length - 3, filteredSameCompanyGames.length);
      setSameCompany(slicedSameCompany);

      console.log(slicedSameCompany);

    } catch (error) {
      console.error("Erro ao carregar lista de desejos:", error.msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await axiosInstance.delete(
        `/lista-desejo`, {
          data: { jogoId: id },
          headers: { 'Authorization': `Bearer ${token}`}
      }); 
      const filtered = wishListItems.filter((game) => game.id !== id);
      setWishListItems(filtered);
    } catch (error) {
      alert("Erro ao remover jogo.");
    }
  };

  const handleAddToCart = async (jogo) => {
    try {
      const response = await axiosInstance.post(`/carrinho/add`, {jogoId: jogo.id}, config);
      alert(response.data?.message || 'Adicionado ao carrinho!');
      handleRemove(jogo.id);
    } catch (err) {
      let msg = "Erro ao enviar para carrinho";
      if(err.response.message) {
          msg = err.response.message      
      } 
      console.error(err.message);
      alert(msg);
    }
  };
    
    const style = {
      gap:10
    };

  return (
    <main className="content-grid">
      <div className="cart-container">
        
        <section className="cart-items">
          <h1>Lista de desejos</h1>
          
          <div className="cart-list">
            {loading ? (
              <p style={{color: "#fff", fontSize: "1.2rem"}}>Carregando...</p>
            ) : (
              <>
                {wishListItems.map((item) => (
                  <GameListItem
                    key={item.id}
                    item={item}
                    onRemove={handleRemove}
                    onAdd={handleAddToCart}
                    type="wishlist"
                    priceText={item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  />
                ))}

                {wishListItems.length === 0 && (
                  <p>Sua lista de desejos está vazia.</p>
                )}
              </>
            )}
          </div>
        </section>

        <aside style={style}>
          <div className="cart-summary">
            <h2>Da mesma empresa:</h2>  
            {sameCompany && sameCompany.map((game) => {
              return(
                <SmallGameCard
                  key={game.id}
                  classId={"tiny_card"}
                  game={game}
                  imgSrc={"images/card_205w_305h.png"}
                  altTxt={"imagem de jogo"}
                  path="/games/gameInfo/"
                  usarGameId={true}
                />
              )
            })}
          </div>
          <div className="cart-summary">
            <h2>Da mesma categoria:</h2>
            {sameCategory && sameCategory.map((game) => {
              return(
                <SmallGameCard
                key={game.id}
                  classId={"card"}
                  game={game}
                  imgSrc={"images/card_205w_305h.png"}
                  altTxt={"imagem de jogo"}
                  path="/games/gameInfo/"
                  usarGameId={true}
                />
              )
            })}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Wishlist;
