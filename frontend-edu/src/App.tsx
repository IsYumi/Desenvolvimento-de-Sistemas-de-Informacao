import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import SplashScreen from "./pages/SplashScreen";
import BoasVindas from "./pages/BoasVindas";
import Home from "./pages/Home";
import Update from "./pages/Update";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/boasvindas" element={<BoasVindas />} />
        <Route path="/home" element={<Home />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}
