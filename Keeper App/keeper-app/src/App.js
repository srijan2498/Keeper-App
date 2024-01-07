import './App.css'
import Header from "./components/header/Header"
import Addkeeper from "./components/addkeeper/Addkeeper"
import Showkeeper from "./components/showkeeper/Showkeeper"
import UpdateCompo from './components/updateCompo/updateCompo'
import { useState, useEffect } from "react"
import axios from "axios"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  const [keeperList, setKeeperList] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/getAll")
      .then(res => setKeeperList(res.data))
  }, [])

  return (
    <div className="App">
      <Router basename='/'>
        <Header />
        <Routes>
          <Route exact path="/" element={<div> <Addkeeper keeperList={keeperList} setKeeperList={setKeeperList} />
            <Showkeeper keeperList={keeperList} setKeeperList={setKeeperList} />
          </div>}></Route>
          <Route path="/update/:id" element={<UpdateCompo setKeeperList={setKeeperList} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;