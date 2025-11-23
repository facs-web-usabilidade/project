import "../styles/pages/home.css";
import { useEffect, useState, useCallback, use } from "react";
import WideGameCard from "../components/WideGameCard";
import SmallGameCard from "../components/SmallGameCard";
import axiosInstance from "../services/apiService";
import arrayRandom from "../utils/arrayRandom";


function Home() {
  const [apiGames, setApiGames] = useState([]);
  const [bestDescount, setBestDescount] = useState([]);
  const [topSeller, setTopSeller] = useState([]);
  const [featuredGames, setFeaturedGames] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHomeData = useCallback(async(abortController) => {
    const token = localStorage.getItem('supa_token');
    if(!token) {
      setError('Token inválido');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const gamesResponse = await axiosInstance.get('/jogos', {
        headers: { Authorization: `Bearer ${token}`},
        signal: abortController.signal,
      });

      const apiGamesData = gamesResponse.data;
      setApiGames(apiGamesData);
      setFeaturedGames(arrayRandom(apiGamesData, 4));
 
      const topSellerPromise = await axiosInstance.get('/relatorios/jogos-mais-vendidos?top=10', {
        headers: {Authorization: `Bearer ${token}`},
        signal: abortController.signal,
      });

      const [topSellerResult] = await Promise.allSettled([topSellerPromise])

      if(topSellerResult.status === 'fulfilled' && topSellerResult.value.data.length > 0) {
        getGameIdByName(topSellerResult.value.data, apiGamesData);
      } else {
        if(topSellerResult.status === 'rejected') {
          console.error('Falha ao resgatar melhores ofertas ')
        }
        setTopSeller(arrayRandom(apiGamesData, 4))
      }

      orderApiGamesbyDescount(apiGamesData);
    } catch(error) {
      if(error.name === 'CanceledError') {
        console.error('Abortado ao montar componente')
        return;
      }
      const msg = 'Falha ao pegar dados de jogos da API'
      console.error(msg + error.message);
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, []);

  function orderApiGamesbyDescount(gamesArray) {
    const filteredArray = gamesArray.filter((game) => game.desconto);
    if(filteredArray.length > 0) {
      const sortedArray = filteredArray.sort((a, b) => b.desconto - a.desconto);
      setBestDescount(sortedArray);
    } else {
      setBestDescount(arrayRandom(gamesArray, 4));
    }
  }

  function getGameIdByName(topSellerArray, gamesArray) {
    const filteredArray = gamesArray.filter(game =>
      topSellerArray.some(topGame => topGame.nome === game.nome))
    setTopSeller(filteredArray);
  }
  
  useEffect(() => {
    const abortController = new AbortController();
    fetchHomeData(abortController);
  }, []);

  return (
    <main className="content">
      <section className="home-carrousel">
        <section className="bestseller">
          <h3>Mais vendidos</h3>
            {topSeller.length > 0
              && 
              <WideGameCard
                id={"bestseller-slider-card"}
                gameArray={topSeller}
                imgSrc={"images/card_340w_240h.png"}
                altTxt={"imagem de jogo"}/>
            }
        </section>
        <section className="toprated">
          <h3>Melhores descontos</h3>
              {bestDescount.length > 0
                && 
                <WideGameCard
                  id={"bestseller-slider-card"}
                  gameArray={bestDescount}
                  imgSrc={"images/card_340w_240h.png"}
                  altTxt={"imagem de jogo"}/>
              }
          </section>
        </section>
      <hr id="home-splitter" />
      <section className="featured">
        <div className="same-line">
          <h3>Jogos em destaque</h3>
          <a href="/games">
            <h4>Descubra mais</h4>
          </a>
        </div>
        <section className="cards" id="game-list">
          {featuredGames && featuredGames.map(game => {
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
