import React, { useEffect, useRef, useState } from "react";

const Modal = (id) => {
  const modalRef = useRef();


  const closeModal = () => {
    modalRef.current.classList.remove("openModal");
  };

  return (
    <div id="sample-modal" className="modal" ref={modalRef}>
      <div className="modal-background jb-modal-close"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Confirmer la suppression</p>
          <button
            className="delete jb-modal-close"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <p>Voulez-vous supprimer le portfolio ?</p>
        </section>
        <footer className="modal-card-foot">
          <button className="button jb-modal-close" onClick={closeModal}>
            Annuler
          </button>
          <a
            href={"/admin/portfolio/delete/" + id}
            className="button is-danger jb-modal-close"
          >
            Valider
          </a>
        </footer>
      </div>
      <button
        className="modal-close is-large jb-modal-close"
        aria-label="close"
        onClick={closeModal}
      ></button>
    </div>
  );
};

export default Modal;
