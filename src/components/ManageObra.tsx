import styles from "../sass/createclient.module.scss";
import commonStyles from "../styles/common.module.css";
import tableStyles from "../styles/table.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import type { Obra, Fatura } from "../types/obra";
import { useAuth } from "../hooks/useAuth";
import apiClient from "../api/httpClient";

type ObraOption = {
  _id: string;
  obraName: string;
};

const ManageObra = () => {
  const nav = useNavigate();
  const { obraId, clientId } = useParams<{
    obraId: string;
    clientId: string;
  }>();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [obra, setObra] = useState<Obra | null>(null);
  const [obraOptions, setObraOptions] = useState<ObraOption[]>([]);
  const [showAddFatura, setShowAddFatura] = useState(false);
  const [editingFaturaId, setEditingFaturaId] = useState<string | null>(null);

  const resolvedClientId = clientId || user?.clientId;
  const allObrasPath = resolvedClientId
    ? `/${resolvedClientId}/obras`
    : "/masterdash";

  // Fatura form state
  const [faturaDescription, setFaturaDescription] = useState("");
  const [faturaAmount, setFaturaAmount] = useState("");
  const [faturaDate, setFaturaDate] = useState("");
  const [faturaCategory, setFaturaCategory] = useState("");
  const [faturaObraId, setFaturaObraId] = useState(obraId || "");

  // Edit fatura form state
  const [editDescription, setEditDescription] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editObraId, setEditObraId] = useState(obraId || "");

  useEffect(() => {
    fetchObra();
    fetchObraOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obraId]);

  const fetchObra = async () => {
    try {
      const response = await apiClient.get(`/obras/${obraId}`);
      setObra(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching obra:", error);
      toast.error("Failed to load obra");
      nav(allObrasPath);
    }
  };

  const fetchObraOptions = async () => {
    try {
      const response = await apiClient.get("/obras");
      const options = (response.data || []).map((currentObra: ObraOption) => ({
        _id: currentObra._id,
        obraName: currentObra.obraName,
      }));
      setObraOptions(options);
    } catch (error) {
      console.error("Error fetching obras for fatura form:", error);
    }
  };

  const handleAddFatura = async (e: React.SubmitEvent<HTMLFormElement>) => {
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
      const selectedObraId = faturaObraId || obraId || "";

      if (!selectedObraId) {
        toast.error("Selecione a obra");
        return;
      }

      const newFatura: Omit<Fatura, "_id"> = {
        obraId: selectedObraId,
        description: faturaDescription.trim(),
        amount,
        date: new Date(faturaDate),
        category: faturaCategory.trim() || undefined,
      };

      await apiClient.post(`/obras/${selectedObraId}/faturas`, newFatura);

      toast.success("Fatura adicionada com sucesso!");

      // Reset form
      setFaturaDescription("");
      setFaturaAmount("");
      setFaturaDate("");
      setFaturaCategory("");
      setFaturaObraId(obraId || "");
      setShowAddFatura(false);

      if (selectedObraId !== obraId) {
        nav(`/manageobra/${selectedObraId}`);
        return;
      }

      fetchObra();
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to add fatura. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleStartEditFatura = (fatura: Fatura) => {
    setEditingFaturaId(fatura._id || null);
    setEditDescription(fatura.description);
    setEditAmount(String(fatura.amount));
    setEditDate(new Date(fatura.date).toISOString().split("T")[0]);
    setEditCategory(fatura.category || "");
    setEditObraId((fatura.obraId as string) || obraId || "");
  };

  const handleCancelEditFatura = () => {
    setEditingFaturaId(null);
    setEditDescription("");
    setEditAmount("");
    setEditDate("");
    setEditCategory("");
    setEditObraId(obraId || "");
  };

  const handleUpdateFatura = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingFaturaId) {
      return;
    }

    if (!editDescription.trim() || !editAmount || !editDate) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const parsedAmount = parseFloat(editAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error("Valor inválido");
      return;
    }

    try {
      const selectedObraId = editObraId || obraId;

      await apiClient.patch(`/obras/${obraId}/faturas/${editingFaturaId}`, {
        obraId: selectedObraId,
        description: editDescription.trim(),
        amount: parsedAmount,
        date: new Date(editDate),
        category: editCategory.trim() || undefined,
      });

      toast.success("Fatura atualizada com sucesso!");

      const movedToAnotherObra = selectedObraId && selectedObraId !== obraId;
      handleCancelEditFatura();

      if (movedToAnotherObra) {
        nav(`/manageobra/${selectedObraId}`);
        return;
      }

      fetchObra();
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to update fatura. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleDeleteFatura = async (faturaId: string) => {
    if (!window.confirm("Tem a certeza que deseja apagar esta fatura?")) {
      return;
    }

    try {
      await apiClient.delete(`/obras/${obraId}/faturas/${faturaId}`);

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
              Obra:*
              <select
                value={faturaObraId}
                onChange={(e) => setFaturaObraId(e.target.value)}
                required
              >
                <option value="">Selecione uma obra</option>
                {obraOptions.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.obraName}
                  </option>
                ))}
              </select>
            </label>
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
                      onClick={() => handleStartEditFatura(fatura)}
                      className={`${commonStyles.submitBtn} ${styles.compactActionBtn}`}
                    >
                      Editar
                    </button>
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

      {editingFaturaId && (
        <div className={styles.sectionSpacing}>
          <h2>Atualizar Fatura</h2>
          <form className={commonStyles.form} onSubmit={handleUpdateFatura}>
            <label>
              Obra:*
              <select
                value={editObraId}
                onChange={(e) => setEditObraId(e.target.value)}
                required
              >
                <option value="">Selecione uma obra</option>
                {obraOptions.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.obraName}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Descrição:*
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                required
              />
            </label>
            <label>
              Valor (€):*
              <input
                type="number"
                step="0.01"
                min="0"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                required
              />
            </label>
            <label>
              Data:*
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                required
              />
            </label>
            <label>
              Categoria:
              <input
                type="text"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              />
            </label>
            <div className={commonStyles.actions}>
              <button
                type="button"
                onClick={handleCancelEditFatura}
                className={commonStyles.cancelBtn}
              >
                Cancelar
              </button>
              <button type="submit" className={commonStyles.submitBtn}>
                Guardar Fatura
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={commonStyles.actions}>
        <button
          onClick={() => nav(allObrasPath)}
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
