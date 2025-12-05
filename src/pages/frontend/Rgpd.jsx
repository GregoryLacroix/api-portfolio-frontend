import React, { useEffect } from "react";
import Canvas from "../../components/frontend/Canvas";
import Header from "../../components/frontend/Header";
import Main from "../../components/frontend/Main";
import Footer from "../../components/frontend/Footer";
import stylesFrontEnd  from "../../css/frontend/style.module.css";

const Home = () => {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove(
      "has-aside-left",
      "has-aside-mobile-transition",
      "has-navbar-fixed-top",
      "has-aside-expanded"
    );
  }, []); // [] => s’exécute une seule fois au montage

  return (
    <section className={stylesFrontEnd.privacy__policy}>
      <h1 className={stylesFrontEnd.privacy__policy__title}>Politique de Confidentialité</h1>

      <p>
        Nous attachons une grande importance à la protection de vos données
        personnelles. Cette politique de confidentialité explique quelles
        données nous collectons, comment elles sont utilisées et vos droits
        concernant vos informations.
      </p>

      <h2 className={stylesFrontEnd.privacy__policy__undertitle}>1. Données collectées</h2>
      <p>
        Lorsque vous utilisez notre formulaire de contact, nous collectons :
      </p>
      <ul>
        <li>Votre nom</li>
        <li>Votre adresse e-mail</li>
        <li>Le contenu de votre message</li>
      </ul>

      <h2 className={stylesFrontEnd.privacy__policy__undertitle}>2. Finalité du traitement</h2>
      <p>
        Ces informations sont utilisées uniquement pour répondre à vos demandes
        de contact et améliorer nos services. Aucune autre utilisation n’est
        faite.
      </p>

      <h2 className={stylesFrontEnd.privacy__policy__undertitle}>3. Destinataires</h2>
      <p>
        Les données collectées sont accessibles uniquement à notre équipe et
        sont stockées de manière sécurisée par notre prestataire Formspree, qui
        agit en tant que sous-traitant.
      </p>

      <h2 className={stylesFrontEnd.privacy__policy__undertitle}>4. Durée de conservation</h2>
      <p>
        Vos informations seront conservées tant que nécessaire pour répondre à
        votre demande. Vous pouvez demander leur suppression à tout moment.
      </p>

      <h2 className={stylesFrontEnd.privacy__policy__undertitle}>5. Vos droits</h2>
      <p>Conformément au RGPD, vous avez le droit de :</p>
      <ul>
        <li>Accéder à vos données</li>
        <li>Demander leur rectification</li>
        <li>Demander leur suppression</li>
        <li>Retirer votre consentement à tout moment</li>
      </ul>
      <p>
        Pour exercer ces droits, contactez-nous à :{" "}
        <a href="mailto:gregorylacroix78@gmail.com">gregorylacroix78@gmail.com</a>
      </p>

      <h2 className={stylesFrontEnd.privacy__policy__undertitle}>6. Sécurité</h2>
      <p>
        Nous mettons en place des mesures techniques et organisationnelles pour
        protéger vos données contre tout accès non autorisé, modification ou
        suppression.
      </p>

      <h2 className={stylesFrontEnd.privacy__policy__undertitle}>7. Modifications</h2>
      <p>
        Cette politique peut être mise à jour régulièrement. Nous vous invitons
        à la consulter périodiquement.
      </p>
    </section>
  );
};

export default Home;
