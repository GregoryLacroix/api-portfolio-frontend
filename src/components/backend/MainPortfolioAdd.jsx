import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ApiPortfolioAdd,
  ApiPortfolioUpdate,
  ApiPortfolioUpload,
  getApiPortfolioById,
} from "../../utils/api";
import FormFieldError from "./FormFieldError";
import Loader from "./Loader";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const MainPortfolioAdd = () => {
  const BASE_URL_AWS = (
    import.meta.env.VITE_BASE_URL_AWS ||
    process.env.REACT_BASE_URL_AWS ||
    ""
  ).replace(/['";]/g, "");

  const FOLDER_PORTFOLIO =
    import.meta.env.VITE_FOLDER_PORTFOLIO ||
    process.env.REACT_APP_FOLDER_PORTFOLIO ||
    "";

  const [error, setError] = useState({});
  const [label, setLabel] = useState("Nom du fichier");
  const [data, setData] = useState({});
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const labelPicture = useRef();

  const navigate = useNavigate();
  const isAuth = useIsAuthenticated();
  const params = useParams();

  const titleRef = useRef();
  const skills = useRef();
  const url = useRef();
  const bgColor = useRef();

  useEffect(() => {
    if (!isAuth) navigate("/admin/login");

    const fetchData = async () => {
      if (params.id) {
        setLoading(true); // Affiche le loader dès le clic
        try {
          const request = await getApiPortfolioById(params.id);
          if (!request) return;
          setData(request.data);

          titleRef.current.value = request.data.title;
          skills.current.value = request.data.skills;
          url.current.value = request.data.url;
          bgColor.current.value = request.data.bgColor;
          labelPicture.current.innerText =
            request.data.image || "Nom du fichier";
        } catch (err) {
          console.error("Erreur lors de la récupération du portfolio :", err);
        } finally {
          setLoading(false); // Masque le loader après l’opération
        }
      }
    };
    fetchData();
  }, [params.id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLabel(file.name);
      setPreview(URL.createObjectURL(file)); // crée une URL temporaire
      if (labelPicture.current) labelPicture.current.innerText = file.name;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Affiche le loader dès le clic
    const formData = new FormData(e.target);

    const fileInput = e.target.elements.image;
    const file = fileInput.files[0];

    const formValues = {
      title: formData.get("title"),
      skills: formData.get("skills"),
      url: formData.get("url"),
      bgColor: formData.get("bgColor") || null,
      image: file ? file.name : data.image || "",
    };

    try {
      let response;
      if (params.id) {
        response = await ApiPortfolioUpdate(params.id, formValues);
      } else {
        response = await ApiPortfolioAdd(formValues);
      }

      // Vérifie que response existe et contient status
      if (response && response.status === 200) {
        const message = response.data.message;
        localStorage.setItem("message", message);

        setTimeout(() => {
          localStorage.removeItem("message");
        }, 3000);

        // Upload de l'image uniquement si un fichier est sélectionné
        if (file) {
          const uploadData = new FormData();
          uploadData.append("image", file);

          // DEBUG réel du FormData
          for (let pair of uploadData.entries()) {
            console.log("UploadData:", pair[0], pair[1]);
          }

          await ApiPortfolioUpload(uploadData);
        }

        navigate("/admin/portfolios");
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
            {params.id ? "Modifier" : "Ajouter"} un projet
          </p>
        </header>

        <div className="card-content">
          {loading && <Loader />}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Titre / Technologies */}
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Titre / Technologies</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <input
                    className="input"
                    name="title"
                    type="text"
                    placeholder="Saisir un titre"
                    ref={titleRef}
                  />
                  <FormFieldError message={error.title} />
                </div>
                <div className="field">
                  <input
                    className="input"
                    name="skills"
                    type="text"
                    placeholder="Saisir les technologies"
                    ref={skills}
                  />
                  <FormFieldError message={error.skills} />
                </div>
              </div>
            </div>

            {/* URL */}
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">URL site Web</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <input
                    className="input"
                    name="url"
                    type="text"
                    placeholder="Saisir l'URL du site Web"
                    ref={url}
                  />
                  <FormFieldError message={error.url} />
                </div>
              </div>
            </div>

            {/* Class CSS */}
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Class CSS</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <input
                    className="input"
                    name="bgColor"
                    type="text"
                    placeholder="Saisir les classes CSS optionnelles"
                    ref={bgColor}
                  />
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Photo site Web</label>
              </div>
              <div className="field-body viche">
                <div className="file has-name mb-1">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                    />
                    <span className="file-cta">
                      <span className="file-label">Choisir un fichier</span>
                    </span>
                    <span className="file-name" ref={labelPicture}>
                      {label}
                    </span>
                  </label>
                </div>
                <FormFieldError message={error.image} />

                {params.id && data.image && (
                  <div className="image">
                    <img
                      src={`${BASE_URL_AWS}${FOLDER_PORTFOLIO}/${data.image}`}
                      alt={data.title || "portfolio image"}
                      className="portfolio__picture"
                    />
                  </div>
                )}

                {preview && (
                  <div className="image">
                    <img
                      src={preview}
                      alt="aperçu"
                      className="portfolio__picture"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="field is-horizontal">
              <div className="field-label"></div>
              <div className="field-body">
                <button type="submit" className="button is-primary">
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

export default MainPortfolioAdd;
