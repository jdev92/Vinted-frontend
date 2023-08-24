import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from './pages/Home';
import Offer from './pages/Offer';
import './App.css'

function App() {

  const [data, setData] = useState([]);


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home data={data} setData={setData} />} />
          <Route path="/offers/:id" element={<Offer data={data} setData={setData} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
