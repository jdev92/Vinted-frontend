import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Home from "./pages/Home"
import Offer from "./pages/Offer"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Header from "./components/Header"
import Cookies from "js-cookie"
import "./App.css"

function App() {
  const [data, setData] = useState([])
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null)

  const handleToken = token => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 })
      setUserToken(token)
    } else {
      Cookies.remove("userToken")
      setUserToken(null)
    }
  }

  return (
    <>
      <Router>
        <Header handleToken={handleToken} userToken={userToken} />
        <Routes>
          <Route path="/" element={<Home data={data} setData={setData} />} />
          <Route
            path="/offers/:id"
            element={<Offer data={data} setData={setData} />}
          />
          <Route
            path="/signup"
            element={
              <Signup data={data} setData={setData} handleToken={handleToken} />
            }
          />
          <Route
            path="/login"
            element={
              <Login data={data} setData={setData} handleToken={handleToken} />
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
