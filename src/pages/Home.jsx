import { Link } from "react-router-dom";
import homePicture from "../assets/banner-img.jpg";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ data, setData }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Récupérer les données de l'API
        const fetchData = async () => {
            try {
                // Requête GET à l'API pour obtenir les offres
                const response = await axios.get(
                    "https://lereacteur-vinted-api.herokuapp.com/offers"
                );
                // Mise à jour des données et désactivation du chargement
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, [setData]);

    return isLoading ? (
        <span>Loading...</span>
    ) : (
        <div className="container">
            <div className="home-hero">
                <img src={homePicture} alt="" />
            </div>
            <main>
                <div className="home-card">
                    {data.offers.map((offer) => (
                        <Link to={`/offers/${offer._id}`} key={offer._id} className="card">
                            <div className="avatar">
                                {offer.owner.account.avatar && (
                                    <img src={offer.owner.account.avatar.secure_url} alt="{offer.product_name}" />
                                )}
                                <p>{offer.owner.account.username}</p>
                            </div>
                            <div className="card-img">
                                <img src={offer.product_image.url} alt="" />
                                <p>{offer.product_price} €</p>
                                <p>{offer.product_details[1].TAILLE}</p>
                                <p>{offer.product_details[0].MARQUE}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>)

};

export default Home;
