import "./App.css";
import Home from "./pages/Home";
import NavMenu from "./Components/Nav/Nav";
import Projets from "./pages/Projets";
import Projet from "./pages/Projet";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import ProjetsAdmin from "./pages/admin/ProjetsAdmin";
import ProjetAdmin from "./pages/admin/ProjetAdmin";
import ImagesAdmin from "./pages/admin/ImagesAdmin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <>
      <Router>
        <NavMenu />
        <Container fluid>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/projets" exact element={<Projets />} />
            <Route path="/projets/:slug" exact element={<Projet />} />
            <Route path="/admin" element={<ProjetsAdmin />} />
            <Route path="/projetAdmin/:slug" exact element={<ProjetAdmin />} />
            <Route path="/admin/images" exact element={<ImagesAdmin />} />
            <Route path="/" element={() => <div>ERREUR 404</div>} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
