import React, { useEffect, useState } from "react";
import { getApiPortfolioById, ApiPortfolioUpdate } from "../../utils/api";

export default function BulmaSwitch({ id, initialValue }) {
  const [isActive, setIsActive] = useState(initialValue);
  const [data, setData] = useState(null);

  // Récupère le portfolio au montage
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await getApiPortfolioById(id);
        if (response?.data) {
          setData(response.data);
          setIsActive(response.data.isActive); // synchronisation
        }
      } catch (err) {
        console.error("Erreur lors de la récupération du portfolio :", err);
      }
    };

    fetchPortfolio();
  }, [id]);

  const handleChange = async (e) => {
    const newValue = e.target.checked;
    setIsActive(newValue);

    if (!data) return;

    // Crée une copie de l'objet et modifie isActive
    const updatedPortfolio = { ...data, isActive: newValue };

    try {
      await ApiPortfolioUpdate(id, updatedPortfolio);
      // Met à jour le state local avec l'objet modifié
      setData(updatedPortfolio);
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      // rollback UI si l'API échoue
      setIsActive(!newValue);
    }
  };

  if (!data) return null; // ou loader

  return (
    <label className={`switch ${isActive ? "is-active" : ""} is-rounded`}>
      <input type="checkbox" checked={isActive} onChange={handleChange} />
      <span className="check"></span>
    </label>
  );
}
