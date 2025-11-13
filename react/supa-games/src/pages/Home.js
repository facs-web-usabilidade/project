import { useEffect, useState } from "react";
import BigGameCard from "../components/BigGameCard";
import "../styles/pages/home.css";


function Home() {
  let [games, setGames] = useState();
  let [bestSellers, setBestSellers] = useState();
  let [topRated, setTopRated] = useState();
  let index1 = 0, index2 = 0;

  const container = document.getElementById('game-list');
  const card_bestsellers = document.getElementById("card-slider-bestsellers");
  const card_toprated = document.getElementById("card-slider-toprated");

  useEffect(() => {
    setGames(getGames());
    setBestSellers(getBestSellers());
    setTopRated(getTopRated());
    // setGameCardProperties(games);
  }, []);

  function getGames() {
    return [
      { id: 1, title: "Hollow Knight: Silksong", genre: "Ação", href: "../gameInfo/gameInfo.html" },
      { id: 2, title: "Death Stranding", genre: "Ação" },
      { id: 3, title: "Split Fiction", genre: "Ação" },
      { id: 4, title: "Stardew Valley", genre: "Ação" },
      { id: 5, title: "Pokémon Emerald", genre: "RPG" },
    ];
  }

  function getBestSellers() {
    return [
      "Hollow Knight: Silksong",
      "Death Stranding",
      "Split Fiction",
      "Stardew Valley",
      "Pokémon Emerald"
    ];
  }

  function getTopRated() {
    return [
      "Stardew Valley",
      "Death Stranding",
      "Split Fiction",
      "Hollow Knight: Silksong",
      "Pokémon Emerald"
    ];
  }

  function setGameCardProperties(object_games) {
    object_games.forEach(game => {
      const link = document.createElement('a');
      link.classList.add('card-link');
      link.href = game.href || '#';

      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.genre = game.genre;

      const img = document.createElement('img');
      img.src = game.img || "images/card_205w_305h.png";
      card.appendChild(img);

      const title = document.createElement('p');
      title.classList.add('game-title-img');
      title.textContent = game.title;

      link.appendChild(card);
      link.appendChild(title);

      container.appendChild(link);
    });
  }

  function showTitle1(i) {
    if (bestSellers) {
      index1 = (i + bestSellers.length) % bestSellers.length;
    }
    setTimeout(() => {
      // card_bestsellers.p = bestSellers[index1];
    }, 200); // delay para mudar o content do card, apenas para parecer mais suave - CSS também tem transition ease
  };

  function showTitle2(i) {
    if (topRated) {
      index2 = (i + topRated.length) % topRated.length;
    }
    setTimeout(() => {
      // card_toprated.textContent = topRated[index2];
    }, 200); // delay para mudar o content do card, apenas para parecer mais suave - CSS também tem transition ease
  };

  function prevTitle1() {
    showTitle1(index1 - 1);
  };

  function nextTitle1() {
    showTitle1(index1 + 1);
  };

  function prevTitle2() {
    showTitle2(index2 - 1);
  };

  function nextTitle2() {
    showTitle2(index2 + 1);
  };

  return (
    <main className="content">
      <section className="home-carrousel">
        <section className="bestseller">
          <h3>Melhores Ofertas</h3>

          <div className="bestseller-slider">
            <button className="arrow left" onClick={prevTitle1}> E </button>
            {games && <BigGameCard
              id={"bestseller-slider-card"}
              game={games[0]}
              imgSrc={"images/card_340w_240h.png"}
              altTxt={"imagem de jogo"}
            />}
            <button className="arrow right" onClick={nextTitle1}> D </button>
          </div>
        </section>
        <section className="toprated">
          <h3>Melhores avaliados</h3>

          <div className="toprated-slider">
            <button className="arrow left" onClick={prevTitle2}> E </button>
            <div className="carde" id="toprated-slider-card">
              <img src="/images/card_340w_240h.png" />
              <p id="card-slider-toprated">Stardew Valley</p>
            </div>
            <button className="arrow right" onClick={nextTitle2}> D </button>
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
        <section className="cards" id="game-list"></section>
      </section>
    </main >
  );
};

export default Home;
