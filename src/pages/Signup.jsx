import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const Signup = ({ handleToken }) => {
  // Gérer les données du formulaire
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newsletter, setNewsletter] = useState(false)

  // Utilisation du hook useNavigate pour la navigation
  const navigate = useNavigate()

  // Fonction de soumission du formulaire
  const handleSubmit = async event => {
    event.preventDefault()
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
      )
      // Appel de la fonction de gestion du token avec le token reçu
      handleToken(response.data.token)
      // Navigation vers la page d'accueil après l'inscription réussie
      navigate("/")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <main>
        <div className="signup-container">
          <h2>S'inscrire</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
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
            <input
              type="checkbox"
              checked={newsletter}
              onChange={() => setNewsletter(!newsletter)}
            />
            <span>S'abonner à la newsletter</span>
            <button type="submit">S'inscrire</button>
          </form>
          <p>
            Déjà un compte? <Link to="/login">Connectez-vous ici</Link>{" "}
          </p>
        </div>
      </main>
    </>
  )
}

export default Signup
