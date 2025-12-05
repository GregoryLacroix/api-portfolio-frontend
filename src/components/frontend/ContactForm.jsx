import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import stylesFrontEnd from "../../css/frontend/style.module.css";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xovglnay");
  if (state.succeeded) {
    return <p>Votre message a bien été envoyé!</p>;
  }
  return (
    <form onSubmit={handleSubmit} className={stylesFrontEnd.form__contact}>
      <div className={stylesFrontEnd.form__input__block}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          className={stylesFrontEnd.form__input}
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div className={stylesFrontEnd.form__input__block}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={stylesFrontEnd.form__input}
        />
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
          <input type="checkbox" name="rgpd" required />
          <span>
            &nbsp;J’accepte que mes informations soient utilisées pour être
            recontacté(e) dans le cadre de ma demande. Aucune autre utilisation
            ne sera faite.
          </span>
        </label>

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
