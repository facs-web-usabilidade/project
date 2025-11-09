import "../styles/topbar.css";

const Topbar = () => (
    <header className="topbar">
        <section className="search-box">
            <input type="text" placeholder="Buscar..." />
            <button>
                <img src="/images/search_button.png"/>
            </button>
        </section>
    </header>
);

export default Topbar;