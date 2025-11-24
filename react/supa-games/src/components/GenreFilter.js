import "../styles/pages/genres.css"; 

export default function GenreFilter({ genreKeys, gamesByGenre, onScrollToGenre, activeGenre }) {
    return (
        <div className="genre-row">
            <h3>Gêneros</h3>

            <section className="genre-filters">
                {genreKeys.map((key) => (
                    <button
                        key={key}
                        className={`genre-btn ${activeGenre === key ? "active" : ""}`}
                        onClick={() => onScrollToGenre(key)}
                    >
                        {gamesByGenre[key].name}
                    </button>
                ))}
            </section>
        </div>
    );
}


