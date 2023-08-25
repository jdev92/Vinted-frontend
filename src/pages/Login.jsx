import logo from '../assets/logoVinted.png';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                    <button>Se connecter</button>
                </div>
                <button>Vends tes articles</button>
            </div>
        </header>
        <main>
            <div className="signup-container">
                <h2>Se connecter</h2>
                <form className="signup-form"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                            const response = await axios.post(
                                "https://lereacteur-vinted-api.herokuapp.com/user/login",
                                {
                                    email,
                                    password,
                                }
                            );
                            console.log(response.data);
                            navigate("/");
                        } catch (error) {
                            console.log(error.message);
                        }
                    }}
                >
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

                    <button>Se connecter</button>
                    <Link to="/signup" >
                        <p>Pas encore de compte ? Inscris-toi !</p>
                    </Link>
                </form>
            </div>
        </main>
    </>


}

export default Login;