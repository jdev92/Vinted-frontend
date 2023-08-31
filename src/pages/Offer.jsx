import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Offer = ({ data, setData, userToken }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    // Récupérer les détails de l'offre
    const fetchData = async () => {
      try {
        // Utilisation d'axios pour effectuer une requête GET à l'API avec l'ID de l'offre
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        // Mise à jour des données avec les détails de l'offre
        setData(response.data);
        // Désactivation du chargement une fois que les données sont chargées
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    // Appel de la fonction fetchData lorsque l'ID change ou les données sont mises à jour
    fetchData();
  }, [id, setData]); // Utilisation de l'ID et de setData comme dépendances de useEffect

  return (
    <>
      <main>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <div className="offer">
            {/* Affichage de l'image de l'offre */}
            <img src={data.product_image.url} alt="" />
            <div className="offer-price">
              <span className="price">{data.product_price} €</span>
              <ul className="offer-list">
                {/* Affichage des détails du produit */}
                <li>
                  <span>MARQUE</span>
                  <span> {data.product_details[0]?.MARQUE}</span>
                </li>
                <li>
                  <span>TAILLE</span>
                  <span> {data.product_details[1]?.TAILLE}</span>
                </li>
                <li>
                  <span>ETAT</span>
                  <span> {data.product_details[2]?.ETAT}</span>
                </li>
                <li>
                  <span>COULEUR</span>
                  <span>{data.product_details[3]?.COULEUR} </span>
                </li>
                <li>
                  <span>EMPLACEMENT</span>
                  <span>{data.product_details[4]?.EMPLACEMENT} </span>
                </li>
              </ul>
              <div className="offer-content">
                {/* Affichage du nom et de la description du produit */}
                <p>{data.product_name}</p>
                <p>{data.product_description}</p>
                <div className="avatar">
                  {/* Affichage de l'avatar du propriétaire */}
                  <img src={data.owner.account.avatar.url} alt="" />
                  <span>{data.owner.account.username}</span>
                </div>
              </div>
              {/* Lien vers la page de paiement */}
              <Link
                to={userToken ? "/payment" : "/login"}
                state={{ data: data }}
              >
                <button>Acheter</button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Offer;
