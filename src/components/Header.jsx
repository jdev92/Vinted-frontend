import { Link } from "react-router-dom";
import logo from '../assets/logoVinted.png';


const Header = () => {
    return <>
        <div className="container">
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
                        <Link to="/signup">
                            <button>S'inscrire</button>
                        </Link>

                        <Link to="/login">
                            <button>Se connecter</button>
                        </Link>
                    </div>
                    <button className="button-sold">Vends tes articles</button>
                </div>
            </header>
        </div>

    </>

}

export default Header;