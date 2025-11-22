import React, { useState, useEffect } from "react";
import GameListItem from "../components/GameListItem";
import "../styles/pages/cart.css";
import apiService from "../services/apiService";
import { getLocalItem } from "../utils/localStorage";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalValue, setTotalValue] = useState("R$ 0,00");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    let calculatedTotal = 0;
    for (const item of cartItems) {
      calculatedTotal += Number(item.price) * (item.quantity || 1);
    }
    setTotalValue(calculatedTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
  }, [cartItems]);

  const fetchCartData = async () => {
    setLoading(true);
    const token = getLocalItem("supa_token");

    if (!token) {
        setLoading(false);
        return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const responseCart = await apiService.get("/carrinho/ativo", config);

      if (!responseCart.data.carrinho?.itens) {
          setCartItems([]);
          setLoading(false);
          return;
      }

      const requests = responseCart.data.carrinho.itens.map(async (item) => {
        try {
            const gameResponse = await apiService.get(`/jogos/${item.fkJogo}`, config);
            
            return {
              id: item.id,            
              fkJogo: item.fkJogo,    
              title: gameResponse.data.nome,
              price: gameResponse.data.preco,
              quantity: 1,
              image: "/images/card_205w_305h.png",
            };
        } catch (err) {
            console.error(`Erro ao carregar jogo ${item.fkJogo}`);
            return null;
        }
      });

      const fullItems = (await Promise.all(requests)).filter(i => i !== null);
      setCartItems(fullItems);

    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (fkJogo) => {
    const token = getLocalItem("supa_token");
    try {
      await apiService.delete(`/carrinho/${fkJogo}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(prev => prev.filter(item => item.fkJogo !== fkJogo));
    } catch (error) {
      alert("Erro ao remover jogo.");
    }
  };

  return (
    <main className="content-grid">
      <div className="cart-container">
        
        <section className="cart-items">
          <h2>Itens no carrinho:</h2>
          
          <div className="cart-list">
            {loading ? (
              <p style={{color: "#fff", fontSize: "1.2rem"}}>Carregando...</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <GameListItem
                    key={item.id}
                    item={item}
                    onRemove={handleRemove}
                    type="cart"
                    priceText={item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  />
                ))}

                {cartItems.length === 0 && (
                  <p>Seu carrinho está vazio.</p>
                )}
              </>
            )}
          </div>
        </section>

        <aside className="cart-summary">
          <h2>Valor total:</h2>
          <p className="total-price">{totalValue}</p>
          <button className="checkout-btn">Continuar para o pagamento</button>
        </aside>
        
      </div>
    </main>
  );
}

export default Cart;