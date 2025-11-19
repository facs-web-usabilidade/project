function GameListItem({ item, type, onRemove, onAdd, priceText }) {
  const handleRemoveClick = (event) => {
    event.preventDefault(); 
    onRemove(item.fkJogo); 
  };
  
  const handleAddClick = (event) => {
    event.preventDefault(); 
    onAdd(item); 
  };

  const isWishlist = type === 'wishlist';

  return (
    <div className="cart-item">
      <div className="cart-item-image">
      </div>
      <div className="cart-item-details">
        <h4>{item.title}</h4>
        <p>Quantidade: {item.quantity || 1}</p>
        <p className="cart-item-price">{priceText}</p>
      </div>

      <div className="item-controls">
        {isWishlist && (
          <button onClick={handleAddClick} className="add-to-cart-btn">
            Adicionar ao Carrinho
          </button>
        )}
        
        <a href="#" onClick={handleRemoveClick} className="cart-item-remove">
          Remover <span className="remove-icon">X</span>
        </a>
      </div>
    </div>
  );
}

export default GameListItem;