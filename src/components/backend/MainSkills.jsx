import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiSkills, ApiSkillDelete } from "../../utils/api";
import moment from "moment";
import Pagination from "./Pagination";
import Loader from "./Loader";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState();
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
        const response = await getApiSkills();
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
    setNotification(false);
  };

  const handleDeleteItem = async (e, id) => {
    e.preventDefault();
    const message = "La compétence a été supprimée.";
    localStorage.setItem("message", message);
    setNotification(message);
    await ApiSkillDelete(id);
    setData((prev) => prev.filter((item) => item.id !== id));
    setTimeout(() => {
      setNotification(false);
      localStorage.removeItem("message");
    }, "3000");
    setOpenModalIndex(null);
    navigate("/admin/skills");
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
                <li>Technologies</li>
              </ul>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <a href="/admin/skill/add" className="button is-primary">
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
          <h1 className="title">Outils & Technologies</h1>
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
              {data.length} Technologie{data.length > 1 ? "s" : ""}
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
                      <th>Date d’enregistrement</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((element, index) => (
                      <tr key={element.id}>
                        <td className="is-image-cell is-vcentered">
                          <i className={element.cssClass}></i>
                        </td>
                        <td className="is-vcentered">{element.name}</td>
                        <td className="is-vcentered">
                          {moment(element.created).format("DD/MM/YYYY")}
                        </td>
                        <td className="is-actions-cell is-vcentered">
                          <div className="buttons is-right">
                            <a
                              href={`/admin/skill/update/${element.id}`}
                              className="button is-small is-primary"
                            >
                              <span className="icon">
                                <span className="mdi mdi-pencil-outline"></span>
                              </span>
                            </a>
                            <button
                              className="button is-small is-danger"
                              onClick={() => setOpenModalIndex(index)}
                            >
                              <span className="icon">
                                <i className="mdi mdi-trash-can"></i>
                              </span>
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
                                    onClick={() => setOpenModalIndex(null)}
                                  ></button>
                                </header>
                                <section className="modal-card-body">
                                  <p>
                                    Voulez-vous supprimer cette compétence ?
                                  </p>
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

export default Main;
