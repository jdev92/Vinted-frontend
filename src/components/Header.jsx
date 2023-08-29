import { Link } from "react-router-dom";
import logo from "../assets/logoVinted.png";

const Header = ({ handleToken, userToken, search, setSearch }) => {
  return (
    <>
      <div className="container">
        <header>
          <div className="header">
            <div className="header-logo">
              <Link to={"/"}>
                <img src={logo} alt="Logo Vinted" />
              </Link>
            </div>
            <div className="search">
              <input
                type="text"
                placeholder="Rechercher des articles"
                value={search}
                onChange={event => {
                  setSearch(event.target.value);
                }}
              />
            </div>
            <div className="login">
              {!userToken ? (
                <>
                  {" "}
                  <Link to="/signup">
                    <button>S'inscrire</button>
                  </Link>
                  <Link to="/login">
                    <button>Se connecter</button>
                  </Link>{" "}
                </>
              ) : (
                <button
                  className="logout"
                  onClick={() => {
                    handleToken();
                  }}
                >
                  Déconnexion
                </button>
              )}
            </div>
            <Link to={userToken ? "/publish" : "/login"}>
              <button className="button-sold">Vends tes articles</button>
            </Link>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
