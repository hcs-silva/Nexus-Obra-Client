import styles from "../sass/clientlist.module.scss";
import commonStyles from "../sass/common.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { Obra } from "../types/obra";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5005";

const ObraList = () => {
  const nav = useNavigate();
  const [obras, setObras] = useState<Obra[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredObras, setFilteredObras] = useState<Obra[]>([]);

  useEffect(() => {
    fetchObras();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredObras(obras);
    } else {
      const filtered = obras.filter(
        (obra) =>
          obra.obraName.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          obra.obraLocation?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          obra.obraStatus.toLowerCase().includes(searchTerm?.toLowerCase()),
      );
      setFilteredObras(filtered);
    }
  }, [searchTerm, obras]);

  const fetchObras = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/obras/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setObras(response.data);
      setFilteredObras(response.data);
    } catch (error) {
      console.error("Error fetching obras:", error);
      toast.error("Failed to fetch obras");
    }
  };

  const handleDelete = async (obraId: string) => {
    if (!window.confirm("Are you sure you want to delete this obra?")) {
      return;
    }

    try {
      await axios.delete(`${BACKEND_URL}/obras/${obraId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Obra deleted successfully");
      fetchObras();
    } catch (error) {
      console.error("Error deleting obra:", error);
      toast.error("Failed to delete obra");
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      planned: "Planeada",
      "in-progress": "Em Progresso",
      completed: "Concluída",
      cancelled: "Cancelada",
    };
    return statusMap[status] || status;
  };

  return (
    <div className={styles.clientListWrapper}>
      <h1 className={styles.title}>Lista de Obras</h1>
      <form className={commonStyles.form} onSubmit={handleSearch}>
        <label>
          Procurar Obra:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nome, localização ou estado..."
          />
        </label>
      </form>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Localização</th>
            <th>Estado</th>
            <th>Despesas Totais</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {filteredObras.length === 0 ? (
            <tr>
              <td colSpan={5} className={styles.centerCell}>
                Nenhuma obra encontrada
              </td>
            </tr>
          ) : (
            filteredObras.map((obra) => (
              <tr key={obra._id}>
                <td>{obra.obraName}</td>
                <td>{obra.obraLocation || "N/A"}</td>
                <td>{getStatusLabel(obra.obraStatus)}</td>
                <td>€{(obra.totalExpenses ?? 0).toFixed(2)}</td>
                <td>
                  <button
                    className={styles.editBtn}
                    onClick={() => nav(`/editobra/${obra._id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.editBtn}
                    onClick={() => nav(`/manageobra/${obra._id}`)}
                  >
                    Gerir
                  </button>
                  <button
                    className={`${styles.editBtn} ${styles.spacedActionBtn}`}
                    onClick={() => handleDelete(obra._id!)}
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className={commonStyles.actions}>
        <button
          onClick={() => nav("/masterdash")}
          className={commonStyles.cancelBtn}
        >
          Voltar
        </button>
        <button
          onClick={() => nav("/addobra")}
          className={commonStyles.submitBtn}
        >
          Adicionar Obra
        </button>
      </div>
    </div>
  );
};

export default ObraList;
