import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiSkillAdd, ApiSkillUpdate, getApiSkillById } from "../../utils/api";
import FormFieldError from "./FormFieldError";
import Loader from "./Loader";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const MainSkillAdd = () => {
  const [error, setError] = useState({});
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isAuth = useIsAuthenticated();
  const params = useParams();

  const nameRef = useRef();
  const cssClassRef = useRef();

  useEffect(() => {
    if (!isAuth) navigate("/admin/login");

    const fetchSkill = async () => {
      if (params.id) {
        const request = await getApiSkillById(params.id);
        if (!request) return;

        setData(request.data);
        nameRef.current.value = request.data.name;
        cssClassRef.current.value = request.data.cssClass;
      }
    };

    fetchSkill();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Affiche le loader dès le clic

    const formValues = {
      name: nameRef.current.value.trim(),
      cssClass: cssClassRef.current.value.trim(),
    };

    try {
      let response;
      if (params.id) {
        response = await ApiSkillUpdate(params.id, formValues);
      } else {
        response = await ApiSkillAdd(formValues);
      }

      // Vérifie que response existe et contient status
      if (response.status === 200) {
        const message = response.data.message;
        localStorage.setItem("message", message);
        navigate("/admin/skills");
      } else {
        setError(response || { global: "Erreur inconnue" });
      }
    } catch (err) {
      console.error("Erreur API :", err);
      setError({ global: "Une erreur est survenue. Vérifiez la console." });
    } finally {
      setLoading(false); // Masque le loader après l’opération
    }
  };

  return (
    <section className="section is-main-section">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            <span className="icon">
              <i className="mdi mdi-ballot"></i>
            </span>
            {params.id ? "Modifier" : "Ajouter"} une technologie &nbsp;&nbsp;
            <a
              href="https://devicon.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Site icônes Devicon&nbsp;&nbsp;
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </p>
        </header>

        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Titre</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <input
                    className="input"
                    name="name"
                    type="text"
                    disabled={loading}
                    placeholder="Saisir le titre de la compétence"
                    ref={nameRef}
                  />
                  <FormFieldError message={error.name} />
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Classes CSS</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <input
                    className="input"
                    name="cssClass"
                    type="text"
                    disabled={loading}
                    placeholder="Saisir les classes CSS optionnelles"
                    ref={cssClassRef}
                  />
                  <FormFieldError message={error.cssClass} />
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label"></div>
              <div className="field-body">
                <button
                  type="submit"
                  className={`button is-primary mt-3 ${
                    loading ? "is-loading" : ""
                  }`}
                  disabled={loading}
                >
                  Enregistrer {params.id ? "les modifications" : ""}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MainSkillAdd;
