import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiUserAdd, ApiAvatarUpload } from "../../utils/api";
import FormFieldError from "./FormFieldError";

const MainUserAdd = () => {
  const BASE_URL = (process.env.REACT_APP_BASE_URL || "").replace(/['";]/g, "");

  const [error, setError] = useState({});
  const [label, setLabel] = useState("Nom du fichier");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const formValues = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      avatar: formData.get("avatar")?.name || "",
    };

    const response = await ApiUserAdd(formValues);

    if (response?.status === 200) {
      localStorage.setItem("message", response.data.message);

      const file = formData.get("avatar");
      if (file && file.name) {
        const pictureData = new FormData();
        pictureData.append("file", file);
        await ApiAvatarUpload(pictureData);
      }

      navigate("/admin/users");
    } else if (response) {
      setError(response);
    } else {
      setError({ global: "Une erreur est survenue." });
    }
  };

  const handleLabelPicture = (e) => {
    setLabel(e.target.files[0]?.name || "Nom du fichier");
  };

  return (
    <section className="section is-main-section">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            <span className="icon">
              <i className="mdi mdi-ballot"></i>
            </span>
            Ajouter un administrateur
          </p>
        </header>

        <div className="card-content">
          <form
            method="post"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            {/* Prénom */}
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Prénom</label>
              </div>
              <div className="field-body field-user-add">
                <input
                  className="input"
                  name="firstName"
                  type="text"
                  placeholder="Prénom"
                />
                <FormFieldError message={error.firstName} />
              </div>
            </div>

            {/* Nom */}
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Nom</label>
              </div>
              <div className="field-body field-user-add">
                <input
                  className="input"
                  name="lastName"
                  type="text"
                  placeholder="Nom"
                />
                <FormFieldError message={error.lastName} />
              </div>
            </div>

            {/* Email */}
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Email</label>
              </div>
              <div className="field-body field-user-add">
                <input
                  className="input"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <FormFieldError message={error.email} />
              </div>
            </div>

            {/* Avatar */}
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Avatar</label>
              </div>
              <div className="field-body field-user-add">
                <div className="file has-name mb-1">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      name="avatar"
                      onChange={handleLabelPicture}
                    />
                    <span className="file-cta">
                      <span className="file-label">Choisir un fichier</span>
                    </span>
                    <span className="file-name">{label}</span>
                  </label>
                </div>
                <FormFieldError message={error.avatar} />
              </div>
            </div>

            {/* Mot de passe */}
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Mot de passe</label>
              </div>
              <div className="field-body field-user-add">
                <input
                  className="input"
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                />
                <FormFieldError message={error.password} />
              </div>
            </div>

            {/* Bouton */}
            <div className="field is-horizontal">
              <div className="field-label"></div>
              <div className="field-body">
                <button type="submit" className="button is-primary">
                  Enregistrer
                </button>
              </div>
            </div>

            {error.global && <p className="help is-danger">{error.global}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default MainUserAdd;
