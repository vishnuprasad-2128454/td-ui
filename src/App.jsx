import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header/Header";
import RoutesConfig from "./Routes";

import "./styles/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Drawer />
        <Container>
          <RoutesConfig />
        </Container>
      </div>
    </Router>
  );
}

export default App;
