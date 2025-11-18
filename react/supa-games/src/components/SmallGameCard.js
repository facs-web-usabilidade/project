function SmallGameCard({ classId, game, imgSrc, altTxt }) {
  return (
    <a className="card-link" href={game.id ? `/games/${game.id}` : `#`}>
      <div className="card" id={classId}>
        <img src={game.img ? game.img : imgSrc} alt={game.altTxt ? game.altTxt : altTxt} />
        <p className="game-title-img">{game.nome}</p>
      </div>
    </a>
  );
}

export default SmallGameCard;