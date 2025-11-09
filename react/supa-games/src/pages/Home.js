import { useEffect } from "react";
import "../styles/pages/home.css";

const Home = () => {
    useEffect(() => {
        const games = [
            { title: "Hollow Knight: Silksong", genre: "Ação", href: "../gameInfo/gameInfo.html" },
            { title: "Death Stranding", genre: "Ação" },
            { title: "Split Fiction", genre: "Ação" },
            { title: "Stardew Valley", genre: "Ação" },
            { title: "Pokémon Emerald", genre: "RPG" },
        ];

        const container = document.getElementById('game-list');

        games.forEach(game => {
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

        //Slider.js aq
        const bestsellers = [
            "Hollow Knight: Silksong",
            "Death Stranding",
            "Split Fiction",
            "Stardew Valley",
            "Pokémon Emerald"
        ];

        const toprated = [
            "Stardew Valley",
            "Death Stranding",
            "Split Fiction",
            "Hollow Knight: Silksong",
            "Pokémon Emerald"
        ];

        let index1 = 0,  index2 = 0;
        const card_bestsellers = document.getElementById("card-slider-bestsellers");
        const card_toprated = document.getElementById("card-slider-toprated");

        function showTitle1(i) {
            index1 = (i + bestsellers.length) % bestsellers.length;
            setTimeout(() => {
                card_bestsellers.textContent = bestsellers[index1];
            }, 200); // delay para mudar o content do card, apenas para parecer mais suave - CSS também tem transition ease
        };

        function showTitle2(i) {
            index2 = (i + toprated.length) % toprated.length;
            setTimeout(() => {
                card_toprated.textContent = toprated[index2];
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
    }, []);

    return (
        <main className="content">
            <section className="home-carrousel">
                <section className="bestseller">
                    <h3>Melhores Ofertas</h3>

                    <div className="bestseller-slider">
                    <button className="arrow left" onclick="prevTitle1()"> E </button>
                    <div className="carde" id="bestseller-slider-card">
                        <img src="images/card_340w_240h.png"/>
                        <p id="card-slider-bestsellers">Hollow Knight: Silksong</p>
                    </div>
                    <button className="arrow right" onclick="nextTitle1()"> D </button>
                    </div>
                </section>
                <section className="toprated">
                    <h3>Melhores avaliados</h3>

                    <div className="toprated-slider">
                    <button className="arrow left" onclick="prevTitle2()"> E </button>
                    <div className="carde" id="toprated-slider-card">
                        <img src="/images/card_340w_240h.png"/>
                        <p id="card-slider-toprated">Stardew Valley</p>
                    </div>
                    <button className="arrow right" onclick="nextTitle2()"> D </button>
                    </div>
                </section>
            </section>

            <hr id="home-splitter"/>

            <section className="featured">
                <div className="same-line">
                    <h3>Mais Vendidos</h3>
                    <a href="#">
                    <h4>Descubra mais</h4>
                    </a>
                </div>
                <section className="cards" id="game-list"></section> 
            </section>
        </main>
    );
};

export default Home;
