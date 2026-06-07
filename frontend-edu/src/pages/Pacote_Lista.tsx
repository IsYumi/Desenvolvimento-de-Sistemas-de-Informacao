import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Pacote_Lista.css";
import Navbar from "../components/Navbar";
import { apiGet } from "../service/api";

// Tipagem baseada no seu model exercicio.py
interface Exercicio {
  id: number;
  titulo: string;
  pergunta: string;
  resposta: string;
  nivel: number;
}

interface RespostaExercicios {
  ok: boolean;
  exercicios: Exercicio[];
}

export default function Pacote_Lista() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // ID do pacote

  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Controle de quais respostas estão visíveis (abre e fecha)
  const [respostasVisiveis, setRespostasVisiveis] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    async function carregarExercicios() {
      if (!id) return;

      try {
        setCarregando(true);
        setErro(null);

        // ATENÇÃO: Verifique se a sua rota no Flask é exatamente essa para buscar exercícios pelo ID do pacote
        const dados = await apiGet<RespostaExercicios>(`/exercicio/get/${id}`);

        if (dados && dados.ok) {
          setExercicios(dados.exercicios || []);
        } else {
          throw new Error("Falha ao carregar os exercícios do servidor.");
        }
      } catch (err: any) {
        console.error("Erro ao buscar exercícios:", err);
        setErro(err.message || "Não foi possível carregar as perguntas.");
      } finally {
        setCarregando(false);
      }
    }

    carregarExercicios();
  }, [id]);

  // Função para mostrar/esconder a resposta de um exercício específico
  const alternarResposta = (exercicioId: number) => {
    setRespostasVisiveis((prev) => ({
      ...prev,
      [exercicioId]: !prev[exercicioId],
    }));
  };

  return (
    <div className="home-container">
      <Navbar />

      <div className="content">
        <div className="pacote-lista-cabecalho">
          <button className="botao-voltar" onClick={() => navigate(-1)}>
            ← Voltar
          </button>
          <h1>Exercícios do Pacote</h1>
          <p>
            Teste seus conhecimentos. Tente responder antes de olhar a solução!
          </p>
        </div>

        {carregando && (
          <p className="status-mensagem">Carregando perguntas...</p>
        )}
        {erro && <p className="status-mensagem erro">Erro: {erro}</p>}

        {!carregando && !erro && exercicios.length === 0 && (
          <p className="status-mensagem">
            Nenhum exercício encontrado neste pacote ainda.
          </p>
        )}

        {!carregando && !erro && exercicios.length > 0 && (
          <div className="lista-exercicios-container">
            {exercicios.map((exercicio) => (
              <div key={exercicio.id} className="exercicio-card">
                <div className="exercicio-header">
                  <span className="exercicio-nivel">
                    Nível {exercicio.nivel}
                  </span>
                  <h3>{exercicio.titulo}</h3>
                </div>

                <div className="exercicio-corpo">
                  <p className="pergunta-texto">{exercicio.pergunta}</p>
                </div>

                {/* Botão de Revelar Resposta */}
                <button
                  className="botao-revelar"
                  onClick={() => alternarResposta(exercicio.id)}
                >
                  {respostasVisiveis[exercicio.id]
                    ? "Esconder Resposta"
                    : "Ver Resposta"}
                </button>

                {/* Área da Resposta (Só aparece se o usuário clicar no botão) */}
                {respostasVisiveis[exercicio.id] && (
                  <div className="exercicio-resposta-area">
                    <strong>Resposta:</strong>
                    <p>{exercicio.resposta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
