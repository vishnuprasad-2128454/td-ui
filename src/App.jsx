import { lazy, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
const Drawer = lazy(() => import("./components/Drawer/Drawer"));
const Header = lazy(() => import("./components/Header/Header"));
import RoutesConfig from "./Routes";
import { useSelector } from "react-redux";

import "./styles/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { darkMode } = useSelector((state) => state.theme);
  return (
    <Router>
      <Suspense>
        <div className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>
          <Header />
          <Drawer />
          <RoutesConfig />
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
