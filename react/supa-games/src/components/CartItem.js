function CartItem({ item, onRemove }) {
  const itemPrice = item.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  const handleRemoveClick = (event) => {
    event.preventDefault(); 
    onRemove(item.fkJogo); 
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
      </div>
      <div className="cart-item-details">
        <h4>{item.title}</h4>
        <p>Quantidade: {item.quantity}</p>
        <p className="cart-item-price">{itemPrice}</p> 
      </div>
      <a href="#" onClick={handleRemoveClick} className="cart-item-remove">
        Remover <span className="remove-icon">X</span>
      </a>
    </div>
  );
}

export default CartItem;