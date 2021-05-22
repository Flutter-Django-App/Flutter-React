import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";
import HomePage from "../../pages/HomePage/HomePage";
import IndexPage from "../../pages/IndexPage/IndexPage";

export default function App() {
  return (
    <Router>
      <main>
        <Container>
          <Route path="/" component={HomePage} exact />
          <Route path="/photos" component={IndexPage} exact />
        </Container>
      </main>
    </Router>

    // <div className="App">
    //   My React + Django App
    // </div>
    
  );
}
