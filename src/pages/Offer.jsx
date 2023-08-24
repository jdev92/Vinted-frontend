import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import logo from '../assets/logoVinted.png';

const Offer = ({ data, setData }) => {
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
            <header>
                <div className="header">
                    <div className="header-logo">
                        <Link to={"/"}>
                            <img src={logo} alt="Logo Vinted" />
                        </Link>
                    </div>
                    <div className="shearch">
                        <input type="text" placeholder="Rechercher des articles" />
                    </div>
                    <div className="login">
                        <button>S'inscrire</button>
                        <button>Se connecter</button>
                    </div>
                    <button>Vends tes articles</button>
                </div>
            </header>
            <main>
                {isLoading ? (
                    <span>Loading...</span>
                ) : (
                    <div className="container">
                        <div className="offer">
                            {/* Affichage de l'image de l'offre à partir des données */}
                            <img src={data.product_image.url} alt="" />
                            <div className="offer-price">
                                <ul className="offer-list">
                                    <span>{data.product_price} €</span>
                                    <li>MARQUE {data.product_details[0]?.MARQUE} </li>
                                    <li>TAILLE {data.product_details[1]?.TAILLE} </li>
                                    <li>ETAT {data.product_details[2]?.ETAT} </li>
                                    <li>COULEUR {data.product_details[3]?.COULEUR}</li>
                                    <li>EMPLACEMENT {data.product_details[4]?.EMPLACEMENT}</li>
                                </ul>
                                <div className="offer-content">
                                    <p>{data.product_name}</p>
                                    <p>{data.product_description}</p>
                                    <div className="avatar">
                                        <img src={data.owner.account.avatar.url} alt="" />
                                        <span>{data.owner.account.username}</span>
                                    </div>
                                </div>

                                <button>Acheter</button>
                            </div>
                        </div>
                    </div>


                )}
            </main>
        </>

    )
}

export default Offer;