import { useNavigate } from "react-router-dom";
import "../styles/Materias_Disponiveis.css";
import alfabetoImg from "../assets/alfabeto.jpg";
import animaisImg from "../assets/animais.jpg";
import numerosImg from "../assets/numeros.jpg";

export default function Materias_Disponiveis() {
  const navigate = useNavigate();

  return (
    <div className="materias-disponiveis-container">
      <div className="materias-disponiveis-header">
        <h1 className="materias-disponiveis-title">MATÉRIAS DISPONÍVEIS</h1>
        <button className="btn-voltar" onClick={() => navigate(-1)}>
          VOLTAR
        </button>
      </div>

      <div className="materias-disponiveis-body">
        <div className="materia-section">
          <span className="materia-section-label">PORTUGUÊS</span>
          <div className="cards-row">
            <div className="card-item">
              <h4>ALFABETO</h4>
              <img src={alfabetoImg} alt="Alfabeto" className="card-image" />
            </div>
            <div className="card-item">
              <h4>ANIMAIS</h4>
              <img src={animaisImg} alt="Animais" className="card-image" />
            </div>
            <div className="card-item">
              <h4>PLANETAS</h4>
              <img src={numerosImg} alt="Planetas" className="card-image" />
            </div>
          </div>
        </div>

        <div className="materia-section">
          <span className="materia-section-label">MATEMÁTICA</span>
          <div className="cards-row single-row">
            <div className="card-item">
              <h4>NÚMEROS</h4>
              <img src={numerosImg} alt="Números" className="card-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
