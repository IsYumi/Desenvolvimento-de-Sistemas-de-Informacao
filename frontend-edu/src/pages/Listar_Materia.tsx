import { useNavigate } from "react-router-dom";
import "../styles/Listar_Materia.css";

export default function Listar_Materia() {
  const navigate = useNavigate();

  return (
    <div className="listar-materia-container">
      <div className="listar-materia-header">
        <h1 className="listar-materia-title">LISTAR MATÉRIA</h1>
        <button className="btn-voltar" onClick={() => navigate(-1)}>
          VOLTAR
        </button>
      </div>

      <div className="listar-materia-table-wrapper">
        <table className="listar-materia-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>MATÉRIA</th>
              <th>TÓPICO</th>
              <th>TÓPICO</th>
              <th>QUESTÃO</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 3 }).map((_, index) => (
              <tr key={index}>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td>
                  <div className="action-buttons">
                    <button className="btn-editar" type="button">
                      EDITAR
                    </button>
                    <button className="btn-deletar" type="button">
                      DELETAR
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
