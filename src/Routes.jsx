import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Calendar from "./components/Calendar/Calendar";
import Reservation from "./components/Reservation/Reservation";
import NotFound from "./components/NotFound/NotFound";
import WizardComponent from "./components/Wizard/Wizard";

export default function RoutesConfig() {
  return (
    <Routes>
      <Route
        path="/reservations/create-reservation"
        element={<WizardComponent />}
      />
      <Route path="/" element={<Calendar />} />
      <Route path="/reservations/" element={<Reservation />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
