import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Materia.css";
import Navbar from "../components/Navbar";
import { apiGet } from "../service/api";

interface Pacote {
  id: string | number;
  nome: string;
  descricao?: string;
}

interface RespostaPacotes {
  ok: boolean;
  pacotes: Pacote[];
}

interface RespostaMateria {
  ok: boolean;
  materia: {
    id: number | string;
    nome: string;
  };
}

export default function Materia_Usuario() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [pacotes, setPacotes] = useState<Pacote[]>([]);
  const [nomeMateria, setNomeMateria] = useState<string>("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDados() {
      if (!id) {
        setCarregando(false);
        setNomeMateria("Matéria Não Encontrada");
        return;
      }

      try {
        setCarregando(true);
        setErro(null);

        // 1. Busca a lista de pacotes
        const dadosPacotes = await apiGet<RespostaPacotes>(`/pacote/get/${id}`);

        if (dadosPacotes && dadosPacotes.ok) {
          setPacotes(dadosPacotes.pacotes || []);
        } else {
          throw new Error("Falha ao carregar pacotes.");
        }

        // 2. Busca as informações da Matéria para o cabeçalho
        try {
          const dadosMateria = await apiGet<RespostaMateria>(
            `/materia/get/${id}`,
          );

          if (dadosMateria && dadosMateria.ok && dadosMateria.materia) {
            setNomeMateria(dadosMateria.materia.nome);
          } else {
            setNomeMateria("Matéria Sem Nome");
          }
        } catch (err) {
          setNomeMateria("Erro ao Carregar Nome");
        }
      } catch (err: any) {
        console.error("Erro ao buscar dados:", err);
        setErro(err.message || "Não foi possível carregar os dados.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [id]);

  return (
    <div className="home-container">
      <Navbar />

      <div className="content">
        {/* CABEÇALHO DA MATÉRIA */}
        <div
          className="materia-cabecalho"
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <h1
            style={{
              fontSize: "36px",
              textTransform: "uppercase",
              margin: "0 0 10px 0",
              color: "#000",
            }}
          >
            {nomeMateria || "CARREGANDO MATÉRIA..."}
          </h1>
          <p style={{ color: "#666", fontSize: "16px" }}>
            Selecione um pacote abaixo para iniciar os exercícios.
          </p>
        </div>

        <h2>Pacotes Disponíveis</h2>

        {carregando && <p className="status-mensagem">Carregando...</p>}
        {erro && <p className="status-mensagem erro">Erro: {erro}</p>}

        {!carregando && !erro && pacotes.length === 0 && (
          <p className="status-mensagem">
            Nenhum pacote encontrado para esta matéria.
          </p>
        )}

        {!carregando && !erro && pacotes.length > 0 && (
          <div className="lista-pacotes-container">
            {pacotes.map((pacote) => (
              <div key={pacote.id} className="pacote-card">
                <div className="pacote-info">
                  <h3>{pacote.nome}</h3>
                  {pacote.descricao && <p>{pacote.descricao}</p>}
                </div>

                <button
                  className="botao-abrir"
                  onClick={() => navigate(`/lista/pacote/${pacote.id}`)}
                >
                  Abrir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
