import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    const duracao = 2800; // segundos
    const inicio = Date.now();

    const timer = setInterval(() => {
      const tempoPassado = Date.now() - inicio;
      const porcentagem = Math.min((tempoPassado / duracao) * 100, 100);

      setProgresso(porcentagem);

      if (porcentagem >= 100) {
        clearInterval(timer);

        setTimeout(() => {
          navigate("/cadastro");
        }, 200);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#fffcfc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* GIF */}
      <img
        src="/cubes.gif"
        alt="loading"
        style={{
          width: "180px",
          marginBottom: "80px",
        }}
      />

      {/* Barra de progresso */}
      <div
        style={{
          width: "60%",
          maxWidth: "700px",
          height: "18px",
          background: "#e5e5e5",
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progresso}%`,
            background: "linear-gradient(90deg, #5f7fff, #f7b980)",
            transition: "width 0.05s linear",
          }}
        />
      </div>

      {/* Porcentagem */}
      <div
        style={{
          marginTop: "15px",
          fontSize: "28px",
          fontWeight: "bold",
          color: "#000",
        }}
      >
        {Math.floor(progresso)}%
      </div>
    </div>
  );
}