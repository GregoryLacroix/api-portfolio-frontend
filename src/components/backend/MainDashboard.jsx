import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getApiPortfolio, ApiPortfolioDelete, getApiSkills, getApiUsers } from "../../utils/api";
import BulmaSwitch from "./BulmaSwitch";
import moment from "moment";
import Pagination from "./Pagination";
import Loader from "./Loader";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const MainPortfolio = () => {
  const BASE_URL_AWS = (
    import.meta.env.VITE_BASE_URL_AWS ||
    process.env.REACT_BASE_URL_AWS ||
    ""
  ).replace(/['";]/g, "");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [dataSkills, setDataSkills] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);
  const [notification, setNotification] = useState(null);
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isAuth = useIsAuthenticated();

  useEffect(() => {
    if (!isAuth) navigate("/admin/login");

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getApiPortfolio();
        setData(response.data);

        const responseSkills = await getApiSkills();
        setDataSkills(responseSkills.data);

        const responseUsers = await getApiUsers();
        setDataUsers(responseUsers.data);

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
    const message = "Le projet a été supprimé.";
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
                <li>BackOffice</li>
                <li>Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section is-main-section">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="card tile is-child">
              <div className="card-content">
                <div className="level is-mobile">
                  <div className="level-item">
                    <div className="is-widget-label">
                      <h3 className="subtitle is-spaced">Utilisateurs</h3>
                      <h1 className="title">{dataUsers.length}</h1>
                    </div>
                  </div>
                  <div className="level-item has-widget-icon">
                    <div className="is-widget-icon">
                      <span className="icon has-text-primary is-large">
                        <i className="mdi mdi-account-multiple mdi-48px"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tile is-parent">
            <div className="card tile is-child">
              <div className="card-content">
                <div className="level is-mobile">
                  <div className="level-item">
                    <div className="is-widget-label">
                      <h3 className="subtitle is-spaced">Projets</h3>
                      <h1 className="title">{data.length}</h1>
                    </div>
                  </div>
                  <div className="level-item has-widget-icon">
                    <div className="is-widget-icon">
                      <span className="icon has-text-info is-large">
                        <i className="mdi mdi-wallet-travel mdi-48px"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tile is-parent">
            <div className="card tile is-child">
              <div className="card-content">
                <div className="level is-mobile">
                  <div className="level-item">
                    <div className="is-widget-label">
                      <h3 className="subtitle is-spaced">
                        Outils & technologies
                      </h3>
                      <h1 className="title">{dataSkills.length}</h1>
                    </div>
                  </div>
                  <div className="level-item has-widget-icon">
                    <div className="is-widget-icon">
                      <span className="icon has-text-success is-large">
                        <i className="mdi mdi-hammer-wrench mdi-48px"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card has-table">
          <header className="card-header">
            <p className="card-header-title">
              <span className="icon">
                <span className="mdi mdi-wallet"></span>
              </span>
              {data.filter((element) => element.isActive === false).length}{" "}
              Projet
              {data.filter((element) => element.isActive === false).length > 1
                ? "s"
                : ""}

              &nbsp;désactivés
            </p>
          </header>

          <div className="card-content">
            <div className="b-table has-pagination">
              <div className="table-wrapper has-mobile-cards">
                <table className="table is-fullwidth is-striped is-hoverable">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Titre</th>
                      <th>État</th>
                      <th>Technologies</th>
                      <th>Date d’enregistrement</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts
                      .filter((element) => element.isActive === false)
                      .map((element, index) => (
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
                            <BulmaSwitch
                              key={element.id}
                              id={element.id}
                              initialValue={element.isActive}
                            />
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
                                      onClick={(e) =>
                                        handleDeleteItem(e, element.id)
                                      }
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
              </div>
            </div>

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
