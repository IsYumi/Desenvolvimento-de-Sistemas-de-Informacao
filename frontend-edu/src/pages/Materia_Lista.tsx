import "../styles/Materia_Lista.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Materia.css";
import Navbar from "../components/Navbar";
import { apiGet } from "../service/api";

// Definição da estrutura de um Pacote
interface Pacote {
  id: string | number;
  nome: string;
  descricao?: string;
}

// NOVA INTERFACE: Reflete exatamente o que o Python devolve no jsonify
interface RespostaPacotes {
  ok: boolean;
  pacotes: Pacote[];
}

export default function Materia_Usuario() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [pacotes, setPacotes] = useState<Pacote[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarPacotes() {
      if (!id) return;

      try {
        setCarregando(true);
        setErro(null);

        // Atualizamos a tipagem para RespostaPacotes
        const dados = await apiGet<RespostaPacotes>(`/pacote/get/${id}`);

        // Agora acessamos a chave .pacotes de dentro da resposta
        if (dados && dados.ok) {
          setPacotes(dados.pacotes || []);
        } else {
          throw new Error("Falha ao carregar do servidor.");
        }
      } catch (err: any) {
        console.error("Erro ao buscar pacotes:", err);
        setErro(err.message || "Não foi possível carregar os pacotes.");
      } finally {
        setCarregando(false);
      }
    }

    carregarPacotes();
  }, [id]);

  return (
    <div className="home-container">
      <Navbar />

      {/* CONTAINER CENTRAL */}
      <div className="content">
        <h2>Pacotes Disponíveis</h2>

        {carregando && <p className="status-mensagem">Carregando pacotes...</p>}

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
                  onClick={() => navigate(`/pacote-lista/${pacote.id}`)}
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
