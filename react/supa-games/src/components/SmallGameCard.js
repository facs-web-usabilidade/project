function SmallGameCard({ classId, game, imgSrc, altTxt }) {
  return (
    <a className="card-link" href={game.id ? `/games/${game.id}` : `#`}>
      <div className="card" id={classId ? classId : 'default'}>
        <img src={game.img ? game.img : imgSrc} alt={game.altTxt ? game.altTxt : altTxt} />
        <p className="game-title-img">{game.nome? game.nome : 'no data'}</p>
      </div>
    </a>
  );
}

export default SmallGameCard;