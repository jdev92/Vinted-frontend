import logo from '../assets/logoVinted.png';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Signup = () => {
    // Gérer les données du formulaire
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newsletter, setNewsletter] = useState(false);

    // Utilisation du hook useNavigate pour la navigation
    const navigate = useNavigate();


    return <>
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
                    <Link to="/login">
                        <button>Se connecter</button>
                    </Link>
                </div>
                <button>Vends tes articles</button>
            </div>
        </header>

        <main>
            <div className="signup-container">
                <h2>S'inscrire</h2>
                <form className="signup-form"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                            // Appel à l'API pour l'inscription
                            const response = await axios.post(
                                "https://lereacteur-vinted-api.herokuapp.com/user/signup",
                                {
                                    email,
                                    username,
                                    password,
                                    newsletter,
                                }
                            );
                            // Enregistrement du token dans les cookies
                            Cookies.set("token", response.data.token, { expires: 7 });
                            // Navigation vers la page d'accueil après l'inscription réussie
                            navigate("/");

                        } catch (error) {
                            console.log(error.message)
                        }

                    }}
                >
                    <input
                        type="text"
                        value={username}
                        placeholder="Nom d'utlisateur"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        value={password}
                        placeholder='Mot de passe'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input type="checkbox"
                        checked={newsletter}
                        onChange={() => setNewsletter(!newsletter)}
                    />
                    <span>S'abonner à la newsletter</span>
                    <button type='submit'>S'inscrire</button>
                </form>
                <p>Déjà un compte? <Link to="/login">Connectez-vous ici</Link> </p>
            </div>
        </main>
    </>
}

export default Signup;