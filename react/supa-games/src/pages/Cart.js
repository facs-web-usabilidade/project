import React, { useState } from "react";
import GameListItem from "../components/GameListItem";
import "../styles/pages/cart.css"; 

function Cart() {
  const [cartItems, setCartItems] = useState([]); 

  const handleRemove = (fkJogo) => {
    const novaLista = cartItems.filter(item => item.fkJogo !== fkJogo);
    setCartItems(novaLista); 
  };

  const handleAddItem = () => {
    const novoJogo = {
      id: Math.random(),
      fkJogo: Math.floor(Math.random() * 100) + 10,
      title: "Jogo Teste R$ 50.00",
      quantity: 1,
      price: 50.00,
      image: "",
    };
    const novaLista = [...cartItems, novoJogo];
    setCartItems(novaLista);
  };

  return (
    <main className="content-grid">
      <div className="cart-container">
        
        <section className="cart-items">
          <h2>Itens no carrinho:</h2>

          <button onClick={handleAddItem} style={{ marginBottom: '15px', padding: '8px' }}>
            Teste (Adicionar Jogo)
          </button>
          
          <div className="cart-list">
            {cartItems.map((item) => {
              const formattedPrice = item.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              });

              return (
                <GameListItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                  type="cart"
                  priceText={formattedPrice}
                />
              );
            })}

            {cartItems.length === 0 && (
              <p>Seu carrinho está vazio.</p>
            )}
          </div>
        </section>

        <aside className="cart-summary">
          <h2>Valor total:</h2>
          <p className="total-price">R$ 0,00</p>
          <button className="checkout-btn">Continuar para o pagamento</button>
        </aside>
        
      </div>
    </main>
  );
}

export default Cart;