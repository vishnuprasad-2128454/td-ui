import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header/Header";
import RoutesConfig from "./Routes";
import { useSelector } from "react-redux";

import "./styles/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { darkMode } = useSelector((state) => state.theme);
  return (
    <Router>
      <div className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>
        <Header />
        <Drawer />
        <RoutesConfig />
      </div>
    </Router>
  );
}

export default App;
