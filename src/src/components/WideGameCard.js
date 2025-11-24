import { useState } from "react";

function WideGameCard({ gameArray, classId, imgSrc, altTxt }) {
  const [indexCarroussel, setIndexCarroussel] = useState(0);
  const [games, setGames] = useState(gameArray);

  function prevTitleCarroussel() {
    if (indexCarroussel === 0) {
      setIndexCarroussel(games.length - 1);
    } else {
      setIndexCarroussel(indexCarroussel - 1);
    }
  };

  function nextTitleCarroussel() {
    if (indexCarroussel === games.length - 1) {
      setIndexCarroussel(0);
    } else {
      setIndexCarroussel(indexCarroussel + 1);
    }
  };
  
  return (
    <div className="bestseller-slider">
      <button className="arrow left" onClick={prevTitleCarroussel}> E </button>
        <div>
          <a href={games[indexCarroussel].id ? `/games/gameInfo/${games[indexCarroussel].id}` : `#`}>
            <div className="carde" id={classId? classId : 'default'}>
              <img src={games[indexCarroussel].img ? games[indexCarroussel].img : imgSrc} alt={games[indexCarroussel].altTxt ? gameArray[indexCarroussel].altTxt : altTxt} />
              <p id="card-slider-toprated">{games[indexCarroussel].nome? games[indexCarroussel].nome : 'no data'}</p>
            </div>
          </a>
        </div>
      <button className="arrow right" onClick={nextTitleCarroussel}> D </button>
    </div>
  );
}

export default WideGameCard;