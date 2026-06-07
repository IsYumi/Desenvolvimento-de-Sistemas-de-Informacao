import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoPag from "../assets/logo_pag.png";
import "../styles/Update.css";

export default function Update() {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    genero: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarPerfil() {
      try {
        const resposta = await fetch("http://localhost:3333/user/name", {
          method: "GET",
          credentials: "include",
        });

        if (!resposta.ok) {
          throw new Error("Erro ao buscar perfil");
        }

        const dados = await resposta.json();
        setPerfil({
          nome: dados.nome || "",
          sobrenome: dados.sobrenome || "",
          email: dados.email || "",
          telefone: dados.telefone || "",
          genero: dados.genero || "",
        });
      } catch (erro) {
        console.error("Erro ao buscar perfil:", erro);
      } finally {
        setLoading(false);
      }
    }

    buscarPerfil();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPerfil({ ...perfil, [name]: value });
  };

  const handleGeneroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerfil({ ...perfil, genero: e.target.value });
  };

  const handleEditarInformacoes = async () => {
    try {
      const resposta = await fetch("http://localhost:3333/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(perfil),
      });

      const resultado = await resposta.json();
      if (resultado.ok) {
        alert("Informações atualizadas com sucesso!");
      } else {
        alert(resultado.mensagem || "Erro ao atualizar");
      }
    } catch (erro) {
      console.error("Erro ao atualizar:", erro);
      alert("Erro ao atualizar informações");
    }
  };

  const handleDeletarConta = async () => {
    if (
      window.confirm(
        "Tem certeza que deseja deletar sua conta? Essa ação é irreversível.",
      )
    ) {
      try {
        const resposta = await fetch("http://localhost:3333/user/delete", {
          method: "DELETE",
          credentials: "include",
        });

        const resultado = await resposta.json();
        if (resultado.ok) {
          alert("Conta deletada com sucesso!");
          navigate("/login");
        } else {
          alert(resultado.mensagem || "Erro ao deletar conta");
        }
      } catch (erro) {
        console.error("Erro ao deletar:", erro);
        alert("Erro ao deletar conta");
      }
    }
  };

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

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="update-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <img src={logoPag} alt="logo" className="logo" />
        </div>

        <div className="nav-center">
          <a href="/home" className="nav-link">
            MATÉRIAS
          </a>
          <a href="#" className="nav-link">
            DESEMPENHO
          </a>
          <a href="/update" className="nav-link active">
            MEU PERFIL
          </a>
        </div>

        <div className="nav-right">
          <button className="btn-sair" onClick={handleLogout}>
            SAIR
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="content">
        <h1>MEU PERFIL</h1>

        <div className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label>NOME</label>
              <input
                type="text"
                name="nome"
                value={perfil.nome}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>SOBRENOME</label>
              <input
                type="text"
                name="sobrenome"
                value={perfil.sobrenome}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>TELEFONE</label>
              <input
                type="text"
                name="telefone"
                value={perfil.telefone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>E-MAIL</label>
              <input
                type="email"
                name="email"
                value={perfil.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group-full">
            <label>GÊNERO</label>
            <div className="genero-options">
              <label className="radio-label">
                <input
                  type="radio"
                  name="genero"
                  value="F"
                  checked={perfil.genero === "F"}
                  onChange={handleGeneroChange}
                />
                FEMININO
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="genero"
                  value="M"
                  checked={perfil.genero === "M"}
                  onChange={handleGeneroChange}
                />
                MASCULINO
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="genero"
                  value="O"
                  checked={perfil.genero === "O"}
                  onChange={handleGeneroChange}
                />
                NÃO INFORMAR
              </label>
            </div>
          </div>

          <div className="form-group-full">
            <label>TIPO DE PLANO</label>
            <div className="plan-type">FREE</div>
          </div>

          <div className="buttons-container">
            <button
              className="btn-assinar"
              onClick={() => navigate("/assinatura")}
            >
              ASSINAR PLANO
            </button>
            <button className="btn-editar" onClick={handleEditarInformacoes}>
              EDITAR INFORMAÇÕES
            </button>
          </div>

          <button className="btn-deletar" onClick={handleDeletarConta}>
            DELETAR CONTA
          </button>
        </div>
      </div>
    </div>
  );
}
