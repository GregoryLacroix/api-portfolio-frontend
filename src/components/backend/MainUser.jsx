import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApiUsers, ApiUserDelete } from "../../utils/api";
import moment from "moment";
import Pagination from "./Pagination";
import Loader from "./Loader";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const Main = () => {
  const BASE_URL_AWS = process.env.REACT_BASE_URL_AWS?.replace(/"/g, "") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState(null);
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isAuth = useIsAuthenticated();

  // Fetch users once
  useEffect(() => {
    if (!isAuth) navigate("/admin/login");

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getApiUsers();
        setData(response.data);

        const message = localStorage.getItem("message");
        if (message) setNotification(message);
      } catch (err) {
        console.log(error);
        setError(err.message || "Erreur lors de la requête");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const handleDeleteItem = async (id) => {
    await ApiUserDelete(id);
    setData((prev) => prev.filter((user) => user.id !== id));
    setNotification("L'administrateur a été supprimé.");
    setOpenModalIndex(null);
  };

  if (loading) return <Loader />; // Affiche le loader animé

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <section className="section is-title-bar">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <ul>
                <li>BackOffice</li>
                <li>Utilisateurs</li>
              </ul>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <div className="buttons is-right mb-0">
                <Link to="/admin/user/add" className="button is-primary mb-0">
                  <span className="icon">
                    <span className="mdi mdi-plus"></span>
                  </span>
                  <span>Ajouter</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section is-main-section">
        {notification && (
          <div className="notification is-primary">
            <button
              className="delete"
              onClick={() => setNotification(null)}
            ></button>
            {notification}
          </div>
        )}

        <div className="card has-table">
          <header className="card-header">
            <p className="card-header-title">
              <span className="icon">
                <span className="mdi mdi-wallet"></span>
              </span>
              {data.length} Administrateur{data.length > 1 ? "s" : ""}
            </p>
          </header>
          <div className="card-content">
            <div className="b-table has-pagination">
              <div className="table-wrapper has-mobile-cards">
                <table className="table is-fullwidth is-striped is-hoverable">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Prénom</th>
                      <th>Nom</th>
                      <th>Email</th>
                      <th>Date d’enregistrement</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((user, index) => (
                      <tr key={user.id}>
                        <td className="is-image-cell is-vcentered">
                          <div className="avatar">
                            <img
                              src={`${BASE_URL_AWS}avatar/${user.avatar}`}
                              alt="avatar"
                              className="user__picture"
                            />
                          </div>
                        </td>
                        <td className="is-vcentered">{user.firstName}</td>
                        <td className="is-vcentered">{user.lastName}</td>
                        <td className="is-vcentered">{user.email}</td>
                        <td className="is-vcentered">
                          {moment(user.created).format("DD/MM/YYYY")}
                        </td>
                        <td className="is-actions-cell is-vcentered">
                          <div className="buttons is-right">
                            <button
                              className="button is-small is-danger jb-modal"
                              onClick={() => setOpenModalIndex(index)}
                            >
                              <span className="icon">
                                <i className="mdi mdi-trash-can"></i>
                              </span>
                            </button>
                          </div>

                          {/* Modal */}
                          {openModalIndex === index && (
                            <div className="modal openModal">
                              <div
                                className="modal-background jb-modal-close"
                                onClick={() => setOpenModalIndex(null)}
                              ></div>
                              <div className="modal-card">
                                <header className="modal-card-head">
                                  <p className="modal-card-title">
                                    Confirmer la suppression
                                  </p>
                                  <button
                                    className="delete jb-modal-close"
                                    aria-label="close"
                                    onClick={() => setOpenModalIndex(null)}
                                  ></button>
                                </header>
                                <section className="modal-card-body">
                                  Voulez-vous supprimer cet administrateur ?
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
                                    onClick={() => handleDeleteItem(user.id)}
                                  >
                                    Valider
                                  </button>
                                </footer>
                              </div>
                              <button
                                className="modal-close is-large jb-modal-close"
                                aria-label="close"
                                onClick={() => setOpenModalIndex(null)}
                              ></button>
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
