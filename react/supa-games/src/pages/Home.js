import "../styles/pages/home.css";
import { useEffect, useState } from "react";
import getRandomInt from "../utils/mathRandom";
import BigGameCard from "../components/BigGameCard";
import SmallGameCard from "../components/SmallGameCard";


function Home() {

  const token = localStorage.getItem('token');

  let [topRated, setTopRated] = useState();
  let [apiGames, setApiGames] = useState();
  let [bestOffer, setBestOffer] = useState();
  let [featuredGames, setFeaturedGames] = useState();
  let [indexCarroussel1, setIndexCarroussel1] = useState(0);
  let [indexCarroussel2, setIndexCarroussel2] = useState(0);
  localStorage
  .setItem(
    'token', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibm9tZSI6IkNsaWVudGUiLCJwZXJmaWwiOiJDbGllbnRlIiwiaWF0IjoxNzYzODM5MTczLCJleHAiOjE3NjM4NDI3NzN9.ySgDFN86iAczyR4sDg66zxW8jJju9ScNq51LEhX7knw'
  );

  async function getGames() {
    try {
      const response = await axiosInstance.get('/jogos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const games = response.data;
      setGames(games);
    } catch(error) {
      console.log(error.message)
    }

  };

  async function getBestOffer() {
    try {
      const response = await axiosInstance.get('/relatorios/jogos-mais-vendidos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const gamesResponse = response.data

      if(gamesResponse) {
        setBestOffer(gamesResponse);
      } 
    } catch(error) {
      console.log(error.message)
      // console.log(apiGames)
      // if(apiGames) {
      //   // setBestOffer(arrayRandom(allGames, 4))
      // }
    }
  };

  async function getTopRated() {
    try {
      const response = await axiosInstance.get('/relatorios/jogos-mais-vendidos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const gamesResponse = response.data

      if(gamesResponse) {
        setTopRated(gamesResponse)
      }
    } catch(error) {
      console.log(error.message)
      // setTopRated(arrayRandom(allGames, 4))
    }
  };

  function setGames(gamesArray) {
    setApiGames(gamesArray);
    const randomGames = arrayRandom(gamesArray, 4)
    setFeaturedGames(randomGames);
  }

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

  useEffect(() => {
    getGames();
    getTopRated();
    getBestOffer();
  }, []);

  return (
    <main className="content">
      <section className="home-carrousel">
        <section className="bestseller">
          <h3>Melhores Ofertas</h3>

            <div className="bestseller-slider">
              <button className="arrow left" onClick={prevTitleCarroussel1}> E </button>
              {bestOffer && <BigGameCard
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
                <BigGameCard
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
                />
              )
            })}
          </section>
        </section>
      </main >
    </Layout >
  );
};

export default Home;
