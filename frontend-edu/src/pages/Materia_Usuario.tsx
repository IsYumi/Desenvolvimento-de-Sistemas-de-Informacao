import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Materia.css";
import Navbar from "../components/Navbar";
import { apiGet } from "../service/api"; // Ajuste o caminho se necessário

// Definição da estrutura de um Pacote baseado no que você precisa exibir e navegar
interface Pacote {
  id: string; // ou number, dependendo da sua API
  nome: string;
  descricao?: string;
}

export default function Materia_Usuario() {
  const navigate = useNavigate();
  // Pega o id da matéria/página atual que está no final do endereço URL
  const { id } = useParams<{ id: string }>();

  // Estado para armazenar a lista de pacotes que vem da API
  const [pacotes, setPacotes] = useState<Pacote[]>([]);

  // Estados para controle de feedback visual
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarPacotes() {
      if (!id) return;

      try {
        setCarregando(true);
        setErro(null);

        const dados = await apiGet<Pacote[]>(`/pacote/get/${id}`);

        setPacotes(dados || []);
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
          // Caixa/Container principal que lista os pacotes
          <div className="lista-pacotes-container">
            {pacotes.map((pacote) => (
              <div key={pacote.id} className="pacote-card">
                <div className="pacote-info">
                  <h3>{pacote.nome}</h3>
                  {pacote.descricao && <p>{pacote.descricao}</p>}
                </div>

                {/* Botão que leva o usuário para /exercicio-fazer/:idDoPacote */}
                <button
                  className="botao-abrir"
                  onClick={() => navigate(`/exercicio-fazer/${pacote.id}`)}
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
