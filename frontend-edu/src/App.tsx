import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import SplashScreen from "./pages/SplashScreen";
import BoasVindas from "./pages/BoasVindas";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Perfil from "./pages/Perfil";
import Materia from "./pages/Materia";
import Editar_Materia from "./pages/Editar_Materia";
import Listar_Materia from "./pages/Listar_Materia";
import Materias_Disponiveis from "./pages/Materias_Disponiveis";
import Pacote from "./pages/Pacote";
import Exercicio from "./pages/Exercicio";
import Editar_Pacote from "./pages/Editar_Pacote";
import Assinatura from "./pages/Assinatura";
import Editar_Exercicio from "./pages/Editar_Exercicio";
import Materia_Usuario from "./pages/Materia_Usuario";

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
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/materia" element={<Materia />} />
        <Route path="/listar-materia" element={<Listar_Materia />} />
        <Route
          path="/materias-disponiveis"
          element={<Materias_Disponiveis />}
        />
        <Route path="/editar-materia" element={<Editar_Materia />} />
        <Route path="/pacote" element={<Pacote />} />
        <Route path="/editar-pacote" element={<Editar_Pacote />} />
        <Route path="/exercicio" element={<Exercicio />} />
        <Route path="/editar-exercicio" element={<Editar_Exercicio />} />
        <Route path="/assinatura" element={<Assinatura />} />
        <Route path="/materia-usuario/:id" element={<Materia_Usuario />} />
      </Routes>
    </BrowserRouter>
  );
}
