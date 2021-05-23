import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";
import HomePage from "../../pages/HomePage/HomePage";
import IndexPage from "../../pages/IndexPage/IndexPage";
import UserProfilePage from "../../pages/UserProfilePage/UserProfilePage";
import AddPhotoPage from "../../pages/AddPhotoPage/AddPhotoPage";
import NavBar from '../../components/NavBar/NavBar.jsx';


export default function App() {
  return (
    <Router>
      <main>
        <NavBar />
        <Container>
          <Route path="/" component={HomePage} exact />
          <Route path="/photos" component={IndexPage} exact />
          <Route path="/profile" component={UserProfilePage} exact />
          <Route path="/addphoto" component={AddPhotoPage} exact />
        </Container>
      </main>
    </Router>

    // <div className="App">
    //   My React + Django App
    // </div>
    
  );
}
