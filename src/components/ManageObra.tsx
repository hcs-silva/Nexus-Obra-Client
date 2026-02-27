import styles from "../sass/createclient.module.scss";
import commonStyles from "../styles/common.module.css";
import tableStyles from "../styles/table.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import type { Obra, Fatura } from "../types/obra";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5005";

const ManageObra = () => {
  const nav = useNavigate();
  const { obraId } = useParams<{ obraId: string }>();
  const [loading, setLoading] = useState(true);
  const [obra, setObra] = useState<Obra | null>(null);
  const [showAddFatura, setShowAddFatura] = useState(false);

  // Fatura form state
  const [faturaDescription, setFaturaDescription] = useState("");
  const [faturaAmount, setFaturaAmount] = useState("");
  const [faturaDate, setFaturaDate] = useState("");
  const [faturaCategory, setFaturaCategory] = useState("");

  useEffect(() => {
    fetchObra();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obraId]);

  const fetchObra = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/obras/${obraId}`);
      setObra(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching obra:", error);
      toast.error("Failed to load obra");
      nav("/allobras");
    }
  };

  const handleAddFatura = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!faturaDescription.trim() || !faturaAmount || !faturaDate) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const amount = parseFloat(faturaAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Valor inválido");
      return;
    }

    try {
      const newFatura: Omit<Fatura, "_id"> = {
        description: faturaDescription.trim(),
        amount,
        date: new Date(faturaDate),
        category: faturaCategory.trim() || undefined,
      };

      await axios.post(`${BACKEND_URL}/obras/${obraId}/faturas`, newFatura);

      toast.success("Fatura adicionada com sucesso!");

      // Reset form
      setFaturaDescription("");
      setFaturaAmount("");
      setFaturaDate("");
      setFaturaCategory("");
      setShowAddFatura(false);

      // Refresh obra data
      fetchObra();
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to add fatura. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleDeleteFatura = async (faturaId: string) => {
    if (!window.confirm("Tem a certeza que deseja apagar esta fatura?")) {
      return;
    }

    try {
      await axios.delete(`${BACKEND_URL}/obras/${obraId}/faturas/${faturaId}`);

      toast.success("Fatura apagada com sucesso!");
      fetchObra();
    } catch (error) {
      console.error("Error deleting fatura:", error);
      toast.error("Failed to delete fatura");
    }
  };

  if (loading) {
    return <div>A carregar...</div>;
  }

  if (!obra) {
    return <div>Obra não encontrada</div>;
  }

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
    <div className={styles.createClientWrapper}>
      <h1 className={styles.title}>Gerir Obra: {obra.obraName}</h1>

      <div className={styles.sectionSpacing}>
        <h2>Detalhes da Obra</h2>
        <p>
          <strong>Nome:</strong> {obra.obraName}
        </p>
        <p>
          <strong>Descrição:</strong> {obra.obraDescription || "N/A"}
        </p>
        <p>
          <strong>Localização:</strong> {obra.obraLocation || "N/A"}
        </p>
        <p>
          <strong>Estado:</strong> {getStatusLabel(obra.obraStatus)}
        </p>
        {obra.startDate && (
          <p>
            <strong>Data de Início:</strong>{" "}
            {new Date(obra.startDate).toLocaleDateString()}
          </p>
        )}
        {obra.endDate && (
          <p>
            <strong>Data de Fim:</strong>{" "}
            {new Date(obra.endDate).toLocaleDateString()}
          </p>
        )}
        {obra.cadernoEncargos && (
          <p>
            <strong>Caderno de Encargos:</strong>{" "}
            <a
              href={obra.cadernoEncargos.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {obra.cadernoEncargos.fileName}
            </a>
          </p>
        )}
      </div>

      <div className={styles.sectionSpacing}>
        <div className={styles.sectionHeader}>
          <h2>Faturas</h2>
          <button
            onClick={() => setShowAddFatura(!showAddFatura)}
            className={commonStyles.submitBtn}
          >
            {showAddFatura ? "Cancelar" : "Adicionar Fatura"}
          </button>
        </div>

        {showAddFatura && (
          <form
            className={`${commonStyles.form} ${styles.formTopSpacing}`}
            onSubmit={handleAddFatura}
          >
            <label>
              Descrição:*
              <input
                type="text"
                value={faturaDescription}
                onChange={(e) => setFaturaDescription(e.target.value)}
                required
              />
            </label>
            <label>
              Valor (€):*
              <input
                type="number"
                step="0.01"
                min="0"
                value={faturaAmount}
                onChange={(e) => setFaturaAmount(e.target.value)}
                required
              />
            </label>
            <label>
              Data:*
              <input
                type="date"
                value={faturaDate}
                onChange={(e) => setFaturaDate(e.target.value)}
                required
              />
            </label>
            <label>
              Categoria:
              <input
                type="text"
                value={faturaCategory}
                onChange={(e) => setFaturaCategory(e.target.value)}
              />
            </label>
            <button type="submit" className={commonStyles.submitBtn}>
              Adicionar Fatura
            </button>
          </form>
        )}

        <table className={`${tableStyles.table} ${styles.tableTopSpacing}`}>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Data</th>
              <th>Valor</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {obra.faturas.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.centerCell}>
                  Nenhuma fatura adicionada
                </td>
              </tr>
            ) : (
              obra.faturas.map((fatura) => (
                <tr key={fatura._id}>
                  <td>{fatura.description}</td>
                  <td>{fatura.category || "N/A"}</td>
                  <td>{new Date(fatura.date).toLocaleDateString()}</td>
                  <td>€{fatura.amount.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteFatura(fatura._id!)}
                      className={`${commonStyles.cancelBtn} ${styles.compactActionBtn}`}
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className={styles.totalsRow}>
          <h3>Total de Despesas: €{obra.totalExpenses.toFixed(2)}</h3>
        </div>
      </div>

      <div className={commonStyles.actions}>
        <button
          onClick={() => nav("/allobras")}
          className={commonStyles.cancelBtn}
        >
          Voltar à Lista
        </button>
        <button
          onClick={() => nav(`/editobra/${obraId}`)}
          className={commonStyles.submitBtn}
        >
          Editar Obra
        </button>
      </div>
    </div>
  );
};

export default ManageObra;
