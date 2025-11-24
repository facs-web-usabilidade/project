import { Link } from "react-router-dom";

function GameListItem({ item, type, onRemove, onAdd, priceText }) {

  const handleRemoveClick = (event) => {
    event.preventDefault();
    if(window.confirm(`Certeza que deseja remover ${item.title}?`) === true) {
      if(type === 'cart') {
        onRemove(item.fkJogo); 
      } else if (type === 'wishlist') {
        onRemove(item.id)
      }
    } 
  };
  
  const handleAddClick = (event) => {
    event.preventDefault(); 
    onAdd(item); 
  };

  const isWishlist = type === 'wishlist';

  const isHistory = type === 'history';

  const imageSrc = item.image || "/images/card_205w_305h.png";

  const gameLink = `/games/gameInfo/${item.fkJogo}`;

  return (
    <div className="cart-item">

      <Link to={gameLink} className="cart-item-image-link">
        <img 
          src={imageSrc} 
          alt={item.title} 
          className="cart-item-image" 
        />
      </Link>

      <div className="cart-item-details">
        <Link to={gameLink} className="cart-item-title-link">
            <h4>{item.title}</h4>
        </Link>
        
        <p>Quantidade: {item.quantity || 1}</p>
        {isHistory && (
          <p>Data: {item.data || "Informação não disponível"}</p>
        )}
        <p className="cart-item-price">{priceText}</p> 
      </div>

      <div className="item-controls">
        {isWishlist && (
          <button onClick={handleAddClick} className="add-to-cart-btn">
            Adicionar ao Carrinho
          </button>
        )}
        
        {!isHistory && (
          <a href="#" onClick={handleRemoveClick} className="cart-item-remove">
            Remover <span className="remove-icon">X</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default GameListItem;