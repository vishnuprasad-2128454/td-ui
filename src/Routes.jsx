import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./components/Home/Home"));
const Calendar = lazy(() => import("./components/Calendar/Calendar"));
const Reservation = lazy(() => import("./components/Reservation/Reservation"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const WizardComponent = lazy(() => import("./components/Wizard/Wizard"));

export default function RoutesConfig() {
  return (
    <Routes>
      <Route
        path="/reservations/create-reservation"
        element={<WizardComponent />}
      />
      <Route path="/" element={<Calendar />} />
      <Route path="/test" element={<Home />} />
      <Route path="/reservations/" element={<Reservation />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
