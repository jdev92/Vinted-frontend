import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Header from "./components/Header";
import Cookies from "js-cookie";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [search, setSearch] = useState("");

  // Stocker le token dans le state et les cookies
  const handleToken = token => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
    } else {
      // Supprime le token dans le state et les cookies
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <>
      <Router>
        <Header
          handleToken={handleToken}
          userToken={userToken}
          search={search}
          setSearch={setSearch}
        />
        <Routes>
          <Route
            path="/"
            element={<Home data={data} setData={setData} search={search} />}
          />
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
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
