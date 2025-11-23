import "../styles/pages/home.css";
import { useEffect, useState } from "react";
import getRandomInt from "../utils/mathRandom";
import WideGameCard from "../components/WideGameCard";
import SmallGameCard from "../components/SmallGameCard";
import AllGamesMock from "../utils/gamesMock";


function Home() {
  let [games, setGames] = useState();
  let [bestOffer, setBestOffer] = useState();
  let [topRated, setTopRated] = useState();
  let [indexCarroussel1, setIndexCarroussel1] = useState(0);
  let [indexCarroussel2, setIndexCarroussel2] = useState(0);
  const instanceGamesMock = new AllGamesMock();

  const container = document.getElementById('game-list');
  // const card_bestsellers = document.getElementById("card-slider-bestsellers");
  // const card_toprated = document.getElementById("card-slider-toprated");

  useEffect(() => {
    setGames(getGames());
    setBestOffer(getBestOffer());
    setTopRated(getTopRated());
  }, []);

  function getGames() {
    const apiGames = instanceGamesMock.gamesMock();
    const randomIndex = getRandomInt(apiGames.length - 4);
    const randomGames = apiGames.slice(randomIndex, randomIndex + 5);
    return randomGames;
  }

  function getBestOffer() {
    const bestOffer = instanceGamesMock.bestOffer();
    return bestOffer;
  }

  function getTopRated() {
    topRated = instanceGamesMock.topRated();
    return topRated;
  }

  // function setGameCardProperties(object_games) {
  //   object_games.forEach(game => {
  //     const link = document.createElement('a');
  //     link.classList.add('card-link');
  //     link.href = game.href || '#';

  //     const card = document.createElement('div');
  //     card.classList.add('card');
  //     card.dataset.genre = game.genre;

  //     const img = document.createElement('img');
  //     img.src = game.img || "images/card_205w_305h.png";
  //     card.appendChild(img);

  //     const title = document.createElement('p');
  //     title.classList.add('game-title-img');
  //     title.textContent = game.title;

  //     link.appendChild(card);
  //     link.appendChild(title);

  //     container.appendChild(link);
  //   });
  // }

  function prevTitleCarroussel1() {
    if (indexCarroussel1 === 0) {
      setIndexCarroussel1(bestOffer.length - 1);
    } else {
      setIndexCarroussel1(indexCarroussel1 - 1);
    }
  };

  function nextTitleCarroussel1() {
    if (indexCarroussel1 === bestOffer.length - 1) {
      setIndexCarroussel1(0);
    } else {
      setIndexCarroussel1(indexCarroussel1 + 1);
    }
  };

  function prevTitleCarroussel2() {
    if (indexCarroussel2 === 0) {
      setIndexCarroussel2(topRated.length - 1);
    } else {
      setIndexCarroussel2(indexCarroussel2 - 1);
    }
  };

  function nextTitleCarroussel2() {
    if (indexCarroussel2 === topRated.length - 1) {
      setIndexCarroussel2(0);
    } else {
      setIndexCarroussel2(indexCarroussel2 + 1);
    }
  };

  return (
    <main className="content">
      <section className="home-carrousel">
        <section className="bestseller">
          <h3>Melhores Ofertas</h3>

          <div className="bestseller-slider">
            <button className="arrow left" onClick={prevTitleCarroussel1}> E </button>
            {bestOffer && <WideGameCard
              id={"bestseller-slider-card"}
              game={bestOffer[indexCarroussel1]}
              imgSrc={"images/card_340w_240h.png"}
              altTxt={"imagem de jogo"}
            />}
            <button className="arrow right" onClick={nextTitleCarroussel1}> D </button>
          </div>
        </section>
        <section className="toprated">
          <h3>Melhores avaliados</h3>
          <div className="toprated-slider">
            <button className="arrow left" onClick={prevTitleCarroussel2}> E </button>
            {topRated &&
              <WideGameCard
                id={"toprated-slider-card"}
                game={topRated[indexCarroussel2]}
                imgSrc={"images/card_340w_240h.png"}
                altTxt={"imagem de jogo"}
              />
            }
            <button className="arrow right" onClick={nextTitleCarroussel2}> D </button>
          </div>
        </section>
      </section>

      <hr id="home-splitter" />

      <section className="featured">
        <div className="same-line">
          <h3>Mais Vendidos</h3>
          <a href="#">
            <h4>Descubra mais</h4>
          </a>
        </div>
        <section className="cards" id="game-list">
          {games && games.map(game => {
            return (
              <SmallGameCard
                key={game.id}
                classId={"card"}
                game={game}
                imgSrc={"images/card_205w_305h.png"}
                altTxt={"imagem de jogo"}
                path="/games/gameInfo/"
                usarGameId={true}
              />
            )
          })}
        </section>
      </section>
    </main >
  );
};

export default Home;
