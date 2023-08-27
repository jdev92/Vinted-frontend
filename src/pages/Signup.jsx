import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ handleToken }) => {
  // Gérer les données du formulaire
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  // Utilisation du hook useNavigate pour la navigation
  const navigate = useNavigate();

  // Fonction de soumission du formulaire
  const handleSubmit = async event => {
    event.preventDefault();
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
      // Appel de la fonction de gestion du token avec le token reçu
      handleToken(response.data.token);
      // Navigation vers la page d'accueil après l'inscription réussie
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <main>
        <div className="signup-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>S'inscrire</h2>
            <input
              type="text"
              value={username}
              placeholder="Nom d'utlisateur"
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Mot de passe"
              onChange={e => setPassword(e.target.value)}
            />
            <div className="checkbox-form">
              <div>
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={() => setNewsletter(!newsletter)}
                />
                <span>S'abonner à la newsletter</span>
                <p>
                  En m'inscrivant je confirme avoir lu et accepté les Termes &
                  Conditions et Politique de Confidentialité de Vinted. Je
                  confirme avoir au moins 18 ans.
                </p>
              </div>
            </div>
            <button className="button-submit" type="submit">
              S'inscrire
            </button>
            <Link className="checkbox-form-link" to="/login">
              Déjà un compte? Connectez-vous ici
            </Link>{" "}
          </form>
        </div>
      </main>
    </>
  );
};

export default Signup;
