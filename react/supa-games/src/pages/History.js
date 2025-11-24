import { useEffect, useState } from "react";
import "../styles/pages/history.css";
import axiosInstance from "../services/apiService";
import { getLocalItem } from "../utils/localStorage";
import GameListItem from "../components/GameListItem";

function History() {
    const [totalValue, setTotalValue] = useState(0);
    const [historyItems, setHistoryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = getLocalItem("supa_token");

    useEffect(() => {
        fetchHistoryData();
    }, []);

    function formatDate(date) {
        const d = new Date(date);

        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();

        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");

        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    }

    const fetchHistoryData = async () => {
    setLoading(true);

    if (!token) {
        setLoading(false);
        return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
        const responseHistory = await axiosInstance.get("/vendas", config);

        console.log(responseHistory)

        if (!responseHistory.data || responseHistory.data.length === 0) {
            setHistoryItems([]);
            setLoading(false);
            setTotalValue(0);
            return;
        }

        const total = responseHistory.data.reduce(
            (sum, item) => sum + item.valor_total,
            0
        );

        setTotalValue(total);

        const responseToPage = responseHistory.data.map((item) => {
            return {
                id: item.id,
                fkJogo: 0,
                title: `Compra ID: ${item.id}`,
                data: formatDate(item.date),
                price: item.valor_total,
                quantity: item.quantidade,
                image: "/images/card_205w_305h.png",
            }
        })

        setHistoryItems(responseToPage);

        } catch (error) {
        console.error("Erro ao carregar histórico de compras:", error.msg);
        } finally {
        setLoading(false);
        }
    };

    return (
        <main className="content-grid">
        <div className="cart-container">
            
            <section className="cart-items">
            <h1>Histórico de compras</h1>
            
            <div className="cart-list">
                {loading ? (
                <p style={{color: "#fff", fontSize: "1.2rem"}}>Carregando...</p>
                ) : (
                <>
                    {historyItems.map((item) => (
                    <GameListItem
                        key={item.id} 
                        item={item} // era bom remover o link daqui...
                        type="history"
                        priceText={item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    />
                    ))}

                    {historyItems.length === 0 && (
                    <p>Seu histórico de compras está vazia.</p>
                    )}
                </>
                )}
            </div>
            </section>

            <aside className="cart-summary">
                <h2>Valor total:</h2>
                <p className="total-price">{totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </aside>
            
        </div>
        </main>
    );
};

export default History;
