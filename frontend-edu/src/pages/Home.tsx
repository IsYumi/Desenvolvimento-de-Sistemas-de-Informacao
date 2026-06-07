import "../styles/Home.css";
import Navbar from "../components/Navbar";
import ursoGif from "../assets/urso.gif";
import alfabetoImg from "../assets/alfabeto.jpg";
import animaisImg from "../assets/animais.jpg";
import numerosImg from "../assets/numeros.jpg";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />

      {/* CONTAINER CENTRAL */}
      <div className="content">
        {/* TÍTULO */}
        <div className="titulo-section">
          <div className="titulo-text">
            <h2>O QUE VAMOS FAZER HOJE?</h2>
          </div>
          <img src={ursoGif} alt="urso mascote" className="urso-mascote" />
        </div>

        {/* PORTUGUÊS */}
        <div className="materia">
          <h3>PORTUGUÊS</h3>

          <div className="grid">
            <div className="card">
              <h4>ALFABETO</h4>
              <img src={alfabetoImg} alt="alfabeto" className="card-image" />
            </div>

            <div className="card">
              <h4>ANIMAIS</h4>
              <img src={animaisImg} alt="animais" className="card-image" />
            </div>
          </div>
        </div>

        {/* MATEMÁTICA */}
        <div className="materia">
          <h3>MATEMÁTICA</h3>

          <div className="grid">
            <div className="card">
              <h4>NÚMEROS</h4>
              <img src={numerosImg} alt="numeros" className="card-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
