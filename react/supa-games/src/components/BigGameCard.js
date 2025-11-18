function BigGameCard({ id, game, imgSrc, altTxt }) {
  return (
    <div>
      <a href={game ? `/games/${game.id}` : `#`}>
        <div className="carde" id={id}>
          <img src={imgSrc} alt={altTxt} />
          <p id="card-slider-toprated">{game.nome}</p>
        </div>
      </a>
    </div >
  );
}

export default BigGameCard;