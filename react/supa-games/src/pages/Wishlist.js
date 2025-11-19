import { useEffect } from "react";
import "../styles/pages/wishlist.css";
import Layout from "../components/Layout";

function Wishlist() {
  useEffect(() => {

  }, []);

  return (
    <Layout>
      <main className="content">
        <aside>
          <h1>left container</h1>
        </aside>
        <aside>
          <h1>right container</h1>
        </aside>
      </main>
    </Layout>
  );
};

export default Wishlist;
