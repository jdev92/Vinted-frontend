import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Publish = ({ userToken }) => {
  // State pour gérer les données du formulaire
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  // State pour stocker l'url de l'image hébergée sur Cloudinary
  const [cloudinaryPicture, setCloudinaryPicture] = useState("");

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Création d'un objet FormData pour envoyer les données
      const formData = new FormData();

      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);

      // Envoi de la requête POST avec le token d'authentification
      const reponse = await axios.post(
        " https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Mise à jour de l'url de l'image hébergée sur Cloudinary
      setCloudinaryPicture(reponse.data.product_image.secure_url);
    } catch (error) {
      console.log(error.message);
    }
  };
  // Rendu du formulaire et de l'image hébergée sur Cloudinary
  return userToken ? (
    <div className="publish-container">
      <h2>Vends ton article</h2>
      <form className="publish-form" onSubmit={handleSubmit}>
        <div className="publish-picture">
          <span>Image</span>
          <input
            type="file"
            id="file"
            onChange={(event) => setPicture(event.target.files[0])}
          />
        </div>

        <div className="publish-section">
          <div className="input-group">
            <span>Titre</span>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="ex: Chemise Sézane verte"
            />
          </div>

          <div className="input-group">
            <span>Décris ton article</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="ex: porté quelquefois..."
            />
          </div>
        </div>

        <div className="publish-section">
          <div className="input-group">
            <span>Marque</span>
            <input
              type="text"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              placeholder="ex: Zara"
            />
          </div>

          <div className="input-group">
            <span>Taille</span>
            <input
              type="text"
              value={size}
              onChange={(event) => setSize(event.target.value)}
              placeholder="ex: L / 40 / 12"
            />
          </div>

          <div className="input-group">
            <span>Couleur</span>
            <input
              type="text"
              value={color}
              onChange={(event) => setColor(event.target.value)}
              placeholder="ex: Fushia"
            />
          </div>

          <div className="input-group">
            <span>État</span>
            <input
              type="text"
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
              placeholder="ex: Neuf avec étiquette"
            />
          </div>

          <div className="input-group">
            <span>Lieu</span>
            <input
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="ex: Paris"
            />
          </div>

          <div className="input-group">
            <span>Prix</span>
            <input
              type="text"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="0,00 €"
            />
            <div className="checkbox-input">
              <input type="checkbox" value={false} />
              <span>Je suis intéressé(e) par les échanges</span>
            </div>
          </div>
        </div>

        <button className="publish-button-submit" type="submit">
          Ajouter
        </button>
      </form>
      {/* Affichage de l'image hébergée sur Cloudinary */}
      {cloudinaryPicture && <img src={cloudinaryPicture} alt="" />}
    </div>
  ) : (
    <Navigate to="login" />
  );
};

export default Publish;
