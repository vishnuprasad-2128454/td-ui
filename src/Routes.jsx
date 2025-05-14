import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home'
import Calendar from "./components/Calendar/Calendar";
import Reservation from "./components/Reservation/Reservation";
import NotFound from "./components/NotFound/NotFound";

export default function RoutesConfig() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/reservations" element={<Calendar />} />
    <Route path="/reservations/create-reservation" element={<Reservation />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
  )
}
