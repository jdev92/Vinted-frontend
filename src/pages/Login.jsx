import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

const Login = ({ handleToken }) => {
  // Gérer les données du formulaire
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email,
          password,
        }
      )
      handleToken(response.data.token)
      // Navigation vers la page d'accueil après la connexion réussie
      navigate("/")
    } catch (error) {
      console.log(error.message)
    }
  }
  // Utilisation du hook useNavigate pour la navigation
  const navigate = useNavigate()

  return (
    <>
      <main>
        <div className="signup-container">
          <h2>Se connecter</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
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

            <button>Se connecter</button>
            <Link to="/signup">
              <p>Pas encore de compte ? Inscris-toi !</p>
            </Link>
          </form>
        </div>
      </main>
    </>
  )
}

export default Login
