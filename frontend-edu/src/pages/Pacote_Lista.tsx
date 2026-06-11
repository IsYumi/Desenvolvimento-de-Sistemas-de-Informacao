import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Pacote_Lista.css";
import Navbar from "../components/Navbar";
import { apiGet } from "../service/api";

interface Exercicio {
  id: number;
  titulo: string;
  nivel: number;
}

interface RespostaExercicios {
  ok: boolean;
  exercicios?: Exercicio[];
  mensagem?: string;
}

export default function Pacote_Lista() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarExercicios() {
      if (!id) {
        setErro("ID do pacote não fornecido.");
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        setErro(null);

        const dados = await apiGet<RespostaExercicios>(`/exercicio/get/${id}`);

        if (dados && dados.ok) {
          setExercicios(
            Array.isArray(dados.exercicios) ? dados.exercicios : [],
          );
        } else {
          throw new Error(
            dados?.mensagem || "O backend não retornou dados válidos.",
          );
        }
      } catch (err: any) {
        setErro(err.message || "Erro ao buscar os exercícios.");
      } finally {
        setCarregando(false);
      }
    }

    carregarExercicios();
  }, [id]);

  return (
    <div className="home-container">
      <Navbar />

      <div className="content">
        {/* Cabeçalho reorganizado para não encavalar */}
        <div className="pacote-lista-cabecalho">
          <button className="botao-voltar" onClick={() => navigate(-1)}>
            ← Voltar
          </button>
          <div className="titulo-container">
            <h1>Exercícios do Pacote</h1>
            <p>Escolha um exercício para começar a praticar.</p>
          </div>
        </div>

        {carregando && (
          <p className="status-mensagem">Carregando exercícios...</p>
        )}

        {erro && (
          <div className="status-mensagem erro">
            <strong>Erro:</strong> {erro}
          </div>
        )}

        {!carregando && !erro && exercicios.length === 0 && (
          <p className="status-mensagem">
            Nenhum exercício encontrado neste pacote ainda.
          </p>
        )}

        {!carregando && !erro && exercicios.length > 0 && (
          <div className="lista-exercicios-container">
            {exercicios.map((exercicio) => (
              <div key={exercicio.id} className="exercicio-card">
                <div className="exercicio-info">
                  <span className="exercicio-nivel">
                    Nível {exercicio.nivel || 1}
                  </span>
                  <h3>{exercicio.titulo || `Exercício ${exercicio.id}`}</h3>
                </div>

                {/* Botão que leva para a nova tela */}
                <button
                  className="botao-abrir"
                  onClick={() => navigate(`/lista/exercicio/${exercicio.id}`)}
                >
                  Fazer Exercício
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
