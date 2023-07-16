import "./App.css";
import Home from "./pages/Home";
import NavMenu from "./Components/Nav/Nav";
import Footer from "./Components/Footer/Footer";
import Projets from "./pages/Projets";
import Projet from "./pages/Projet";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import Admin from "./pages/admin/Admin";
import ProjetAdmin from "./pages/admin/ProjetAdmin";
import ImagesAdmin from "./pages/admin/ImagesAdmin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import AjouterProjet from "./pages/admin/AjouterProjet";
import ArticleAdmin from "./pages/admin/ArticleAdmin";
import AjouterArticle from "./pages/admin/AjouterArticle";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import AuthService from "./services/auth.service";
import { Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ProjetProvider from "./contexts/projetProvider";
import ArticleProvider from "./contexts/articleProvider";

function App() {
  const ProtectedRoute = ({ children }) => {
    const user = AuthService.getCurrentUser();

    if (!user) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <>
      <ArticleProvider>
        <ProjetProvider>
          <Router>
            <NavMenu />
            <Container fluid>
              <Toaster position="top-right" reverseOrder={false} />
              <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="/projets" exact element={<Projets />} />
                <Route path="/projets/:slug" exact element={<Projet />} />
                <Route path="/about" exact element={<About />} />
                <Route path="/contact" exact element={<Contact />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/projetAdmin/:slug"
                  exact
                  element={
                    <ProtectedRoute>
                      <ProjetAdmin />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/articleAdmin/:slug"
                  exact
                  element={
                    <ProtectedRoute>
                      <ArticleAdmin />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/images"
                  exact
                  element={
                    <ProtectedRoute>
                      <ImagesAdmin />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/ajout-projet"
                  exact
                  element={
                    <ProtectedRoute>
                      <AjouterProjet />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/ajout-article"
                  exact
                  element={
                    <ProtectedRoute>
                      <AjouterArticle />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Container>
            <Footer />
          </Router>
        </ProjetProvider>
      </ArticleProvider>
    </>
  );
}

export default App;
