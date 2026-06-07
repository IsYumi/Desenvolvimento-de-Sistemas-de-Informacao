import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logoPag from "../assets/logo_pag.png";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logoPag} alt="logo" className="logo" />
      </div>

      <div className="nav-center">
        <button
          type="button"
          className="nav-link active"
          onClick={() => navigate("/home")}
        >
          MATÉRIAS
        </button>
        <button type="button" className="nav-link">
          DESEMPENHO
        </button>
        <button
          type="button"
          className="nav-link"
          onClick={() => navigate("/perfil")}
        >
          MEU PERFIL
        </button>
      </div>

      <div className="nav-right">
        <button className="btn-sair" type="button" onClick={handleLogout}>
          SAIR
        </button>
      </div>
    </nav>
  );
}
