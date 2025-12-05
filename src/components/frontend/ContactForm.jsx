import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import stylesFrontEnd from "../../css/frontend/style.module.css";

export default function ContactForm() {
  const [state, handleSubmitFormspree] = useForm("xovglnay");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rgpd: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "L'email est invalide";
    if (!formData.message.trim()) newErrors.message = "Le message est requis";
    if (!formData.rgpd)
      newErrors.rgpd = "Vous devez accepter la politique de confidentialité";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({}); // clear errors
    handleSubmitFormspree(e); // envoi vers Formspree
  };

  if (state.succeeded) {
    return (
      <p className={stylesFrontEnd.status}>
        Votre message a bien été envoyé!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={stylesFrontEnd.form__contact}>
      <div className={stylesFrontEnd.form__input__block}>
        <label htmlFor="name">Nom</label>
        <div>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={stylesFrontEnd.form__input}
          />
          {errors.name && <small className={stylesFrontEnd.error}>{errors.name}</small>}
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </div>
      </div>

      <div className={stylesFrontEnd.form__input__block}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={stylesFrontEnd.form__input}
        />
        {errors.email && <p className={stylesFrontEnd.error}>{errors.email}</p>}
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div className={stylesFrontEnd.form__input__block}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={stylesFrontEnd.form__input}
        />
        {errors.message && (
          <p className={stylesFrontEnd.error}>{errors.message}</p>
        )}
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>

      <input
        type="text"
        name="_honeypot"
        className={stylesFrontEnd.form__honeypot}
      />

      <div className={stylesFrontEnd.rgpd__container}>
        <label className={stylesFrontEnd.checkbox__container}>
          <input
            type="checkbox"
            name="rgpd"
            checked={formData.rgpd}
            onChange={handleChange}
          />
          <span>
            &nbsp;J’accepte que mes informations soient utilisées pour être
            recontacté(e) dans le cadre de ma demande. Aucune autre utilisation
            ne sera faite.
          </span>
        </label>
        {errors.rgpd && <p className={stylesFrontEnd.error}>{errors.rgpd}</p>}

        <p className={stylesFrontEnd.rgpd__info}>
          Pour en savoir plus sur la gestion de vos données personnelles ou
          demander leur suppression, consultez notre&nbsp;
          <a
            href="/politique-confidentialite"
            target="_blank"
            rel="noopener noreferrer"
          >
            politique de confidentialité
          </a>
          .
        </p>
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className={stylesFrontEnd.form__submit}
      >
        Envoyer
      </button>
    </form>
  );
}
