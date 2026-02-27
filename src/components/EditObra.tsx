import styles from "../sass/createclient.module.scss";
import commonStyles from "../styles/common.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import type { Obra } from "../types/obra";
import { BACKEND_URL } from "../config";
import { uploadToCloudinary } from "../api/cloudinaryUpload";

const EditObra = () => {
  const nav = useNavigate();
  const { obraId } = useParams<{ obraId: string }>();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState<
    "planning" | "in-progress" | "completed" | "on-hold"
  >("planning");
  const [cadernoFile, setCadernoFile] = useState<File | null>(null);
  const [existingCaderno, setExistingCaderno] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchObra();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obraId]);

  const fetchObra = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/obras/${obraId}`);
      const obra: Obra = response.data;
      setName(obra.obraName);
      setDescription(obra.obraDescription || "");
      setLocation(obra.obraLocation || "");
      setStartDate(
        obra.startDate
          ? new Date(obra.startDate).toISOString().split("T")[0]
          : "",
      );
      setEndDate(
        obra.endDate ? new Date(obra.endDate).toISOString().split("T")[0] : "",
      );
      setStatus(obra.obraStatus);
      setExistingCaderno(obra.cadernoEncargos?.fileName || "");
      setLoading(false);
    } catch (error) {
      console.error("Error fetching obra:", error);
      toast.error("Failed to load obra");
      nav("/allobras");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (
        !validTypes.includes(file.type) &&
        !file.name.match(/\.(xls|xlsx)$/i)
      ) {
        toast.error("Please upload a valid .xls or .xlsx file");
        return;
      }
      setCadernoFile(file);
    }
  };

  const handleUploadCaderno = async () => {
    if (!cadernoFile) {
      return null;
    }

    setUploading(true);

    try {
      const fileUrl = await uploadToCloudinary(cadernoFile, "raw");

      return {
        fileName: cadernoFile.name,
        fileUrl,
        uploadDate: new Date(),
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload caderno de encargos");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateObra = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Nome da obra é obrigatório");
      return;
    }

    try {
      let cadernoEncargos = undefined;

      // Upload new caderno if file is selected
      if (cadernoFile) {
        cadernoEncargos = await handleUploadCaderno();
        if (!cadernoEncargos) {
          return; // Upload failed
        }
      }

      const updateData: Partial<Obra> = {
        obraName: name.trim(),
        obraDescription: description.trim(),
        obraLocation: location.trim(),
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        obraStatus: status,
      };

      if (cadernoEncargos) {
        updateData.cadernoEncargos = cadernoEncargos;
      }

      await axios.patch(`${BACKEND_URL}/obras/${obraId}`, updateData);

      toast.success("Obra atualizada com sucesso!");

      setTimeout(() => {
        nav("/allobras");
      }, 1500);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to update obra. Please try again.";
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return <div>A carregar...</div>;
  }

  return (
    <div className={styles.createClientWrapper}>
      <h1 className={styles.title}>Editar Obra</h1>
      <form className={commonStyles.form} onSubmit={handleUpdateObra}>
        <label>
          Nome da Obra:*
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Descrição:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </label>
        <label>
          Localização:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          Data de Início:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Data de Fim:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <label>
          Estado:
          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as
                  | "planning"
                  | "in-progress"
                  | "completed"
                  | "on-hold",
              )
            }
          >
            <option value="planning">Planeada</option>
            <option value="in-progress">Em Progresso</option>
            <option value="completed">Concluída</option>
            <option value="on-hold">Em Espera</option>
          </select>
        </label>
        <label>
          Caderno de Encargos (.xls/.xlsx):
          {existingCaderno && (
            <p className={styles.fileHintBottom}>
              Ficheiro atual: {existingCaderno}
            </p>
          )}
          <input
            type="file"
            accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleFileChange}
          />
          {cadernoFile && (
            <p className={styles.fileHint}>
              Novo ficheiro selecionado: {cadernoFile.name}
            </p>
          )}
        </label>
        <div className={commonStyles.actions}>
          <button
            type="button"
            onClick={() => nav("/allobras")}
            className={commonStyles.cancelBtn}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={uploading}
            className={commonStyles.submitBtn}
          >
            {uploading ? "A carregar ficheiro..." : "Atualizar Obra"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditObra;
