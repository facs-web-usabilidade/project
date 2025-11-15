import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import CartItem from "../components/CartItem";
import "../styles/pages/cart.css"; 

function Cart() {
    const [cartItems, setCartItems] = useState([]); 
    const [totalValue, setTotalValue] = useState("R$ 0,00");

  useEffect(() => {
    let calculatedTotal = 0;
    for (const item of cartItems) {
      calculatedTotal = calculatedTotal + (item.price * item.quantity);
    }

    const formattedTotal = calculatedTotal.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    setTotalValue(formattedTotal);
  }, [cartItems]);

  const handleRemove = (fkJogo) => {
    const novaLista = cartItems.filter(item => item.fkJogo !== fkJogo);
    setCartItems(novaLista); 
  };

  
  // função temporaria de adicinar jogo (para teste)
const handleAddItem = () => {
    const priceOptions = [10.00, 100.00, 25.50];
    const newPrice = priceOptions[Math.floor(Math.random() * priceOptions.length)];

    const novoJogo = {
      id: Math.random(),
      fkJogo: Math.floor(Math.random() * 100) + 10,
      title: `Jogo Teste (R$ ${newPrice.toFixed(2)})`, // Nome do jogo mostra o preço
      quantity: 1,
      price: newPrice, // O preço real do item
      image: "",
    };
    const novaLista = [...cartItems, novoJogo];
    setCartItems(novaLista);
  };
    // 

  
    return (
    <Layout>
      <main className="content-grid">
        <div className="cart-container">
          
          <section className="cart-items">
            <h2>Itens no carrinho:</h2>

            <button onClick={handleAddItem} style={{ marginBottom: '15px', padding: '8px' }}>
              Teste (Adicionar Jogo)
            </button>
            
            <div className="cart-list">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                />
              ))}

              {cartItems.length === 0 && (
                <p>Seu carrinho está vazio.</p>
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
    </Layout>
  );
}

export default Cart;