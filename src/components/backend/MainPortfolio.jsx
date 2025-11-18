import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getApiPortfolio, ApiPortfolioDelete } from "../../utils/api";
import moment from "moment";
import Pagination from "./Pagination";
import Loader from "./Loader";

const MainPortfolio = () => {
  const BASE_URL_AWS = (
    import.meta.env.VITE_BASE_URL_AWS ||
    process.env.REACT_BASE_URL_AWS ||
    ""
  ).replace(/['";]/g, "");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState(null);
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getApiPortfolio();
        setData(response.data);

        const message = localStorage.getItem("message");
        if (message) {
          setNotification(message);
          setTimeout(() => {
            setNotification(null);
            localStorage.removeItem("message");
          }, 3000); // <-- supprime après 3 secondes
        }
      } catch (err) {
        setError(err.message || "Erreur lors de la requête");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const closeNotification = () => {
    localStorage.removeItem("message");
    setNotification(null);
  };

  const handleDeleteItem = async (e, id) => {
    e.preventDefault();
    const message = "Le site web a été supprimé.";
    localStorage.setItem("message", message);
    setNotification(message);
    await ApiPortfolioDelete(id);
    setData((prev) => prev.filter((item) => item.id !== id));
    setTimeout(() => {
      setNotification(null);
      localStorage.removeItem("message");
    }, "3000");
    setOpenModalIndex(null);
  };

  if (loading) return <Loader />; // Affiche le loader animé

  if (error) return <div>Erreur: {error}</div>;

  return (
    <>
      <section className="section is-title-bar">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <ul>
                <li>Admin</li>
                <li>Portfolios</li>
              </ul>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <a href="/admin/portfolio/add" className="button is-primary">
                <span className="icon">
                  <span className="mdi mdi-plus"></span>
                </span>
                <span>Ajouter</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="hero is-hero-bar">
        <div className="hero-body">
          <h1 className="title">Portfolios</h1>
        </div>
      </section>
      <section className="section is-main-section">
        {notification && (
          <div className="notification is-primary">
            <button className="delete" onClick={closeNotification}></button>
            {notification}
          </div>
        )}

        <div className="card has-table">
          <header className="card-header">
            <p className="card-header-title">
              <span className="icon">
                <span className="mdi mdi-wallet"></span>
              </span>
              {data.length} sites Web
            </p>
          </header>

          <div className="card-content">
            <table className="table is-fullwidth is-striped is-hoverable">
              <thead>
                <tr>
                  <th></th>
                  <th>Titre</th>
                  <th>Technologies</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((element, index) => (
                  <tr key={element.id}>
                    <td className="mainportfolio-td mainportfolio-td-img is-vcentered">
                      <img
                        src={`${BASE_URL_AWS}logos/${element.image}`}
                        alt={element.title}
                        className="portfolio__picture"
                      />
                    </td>
                    <td className="mainportfolio-td is-vcentered">
                      {element.title}
                    </td>
                    <td className="mainportfolio-td is-vcentered">
                      {element.skills}
                    </td>
                    <td className="mainportfolio-td is-vcentered">
                      {moment(element.created).format("DD/MM/YYYY")}
                    </td>
                    <td className="is-actions-cell is-vcentered">
                      <div className="buttons is-right">
                        <Link
                          to={`/admin/portfolio/update/${element.id}`}
                          className="button is-small is-primary"
                        >
                          <span className="icon mdi mdi-pencil-outline"></span>
                        </Link>
                        <button
                          className="button is-small is-danger"
                          onClick={() => setOpenModalIndex(index)}
                        >
                          <span className="icon mdi mdi-trash-can"></span>
                        </button>
                      </div>

                      {openModalIndex === index && (
                        <div className="modal openModal">
                          <div
                            className="modal-background"
                            onClick={() => setOpenModalIndex(null)}
                          ></div>
                          <div className="modal-card">
                            <header className="modal-card-head">
                              <p className="modal-card-title">
                                Confirmer la suppression
                              </p>
                              <button
                                className="delete"
                                aria-label="close"
                                onClick={() => setOpenModalIndex(null)}
                              ></button>
                            </header>
                            <section className="modal-card-body">
                              <p>Voulez-vous supprimer le portfolio ?</p>
                            </section>
                            <footer className="modal-card-foot">
                              <button
                                className="button"
                                onClick={() => setOpenModalIndex(null)}
                              >
                                Annuler
                              </button>
                              <button
                                className="button is-danger"
                                onClick={(e) => handleDeleteItem(e, element.id)}
                              >
                                Valider
                              </button>
                            </footer>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={data.length}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default MainPortfolio;
