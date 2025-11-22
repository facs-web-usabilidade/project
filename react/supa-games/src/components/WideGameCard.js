function WideGameCard({ classId, game, imgSrc, altTxt }) {
  return (
    <div>
      <a href={game.id ? `/games/${game.id}` : `#`}>
        <div className="carde" id={classId? classId : 'default'}>
          <img src={game.img ? game.img : imgSrc} alt={game.altTxt ? game.altTxt : altTxt} />
          <p id="card-slider-toprated">{game.nome? game.nome : 'no data'}</p>
        </div>
      </a>
    </div >
  );
}

export default WideGameCard;