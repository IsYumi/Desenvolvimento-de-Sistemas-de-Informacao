import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import logoPag from "../assets/logo_pag.png";
import ursoGif from "../assets/urso.gif";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const resposta = await fetch("http://localhost:3333/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resultado = await resposta.json();
      if (resultado.ok) {
        alert("Logout realizado com sucesso!");
      } else {
        alert(resultado.mensagem || "Erro ao fazer logout");
      }
      navigate("/login");
    } catch (erro) {
      console.error("Erro ao fazer logout:", erro);
      alert("Erro ao fazer logout");
      navigate("/login");
    }
  };
  return (
    <div className="home-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <img src={logoPag} alt="logo" className="logo" />
        </div>

        <div className="nav-center">
          <a href="#">MATÉRIAS</a>
          <a href="#">DESEMPENHO</a>
          <a href="#">MEU PERFIL</a>
        </div>

        <div className="nav-right">
          <button className="btn-sair" onClick={handleLogout}>
            SAIR
          </button>
        </div>
      </nav>

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
              <img
                src="/assets/alfabeto.jpg"
                alt="alfabeto"
                className="card-image"
              />
            </div>

            <div className="card">
              <h4>ANIMAIS</h4>
              <img
                src="/assets/animais.jpg"
                alt="animais"
                className="card-image"
              />
            </div>
          </div>
        </div>

        {/* MATEMÁTICA */}
        <div className="materia">
          <h3>MATEMÁTICA</h3>

          <div className="grid">
            <div className="card">
              <h4>NÚMEROS</h4>
              <img
                src="/assets/numeros.jpg"
                alt="numeros"
                className="card-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
