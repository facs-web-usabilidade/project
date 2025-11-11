function BigGameCard({ id, game, imgSrc, altTxt }) {
  return (
    <div className="carde" id={id}>
      <img src={imgSrc} alt={altTxt} />
      <p id="card-slider-toprated">{game.title}</p>
    </div>
  );
}

export default BigGameCard;