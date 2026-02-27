import styles from "../sass/createclient.module.scss";
import commonStyles from "../styles/common.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";
import { uploadToCloudinary } from "../api/cloudinaryUpload";

const CreateObra = () => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState<
    "planning" | "in-progress" | "completed" | "on-hold"
  >("planning");
  const [cadernoFile, setCadernoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { clientId } = useParams<{ clientId: string }>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
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

  const handleCreateObra = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!name.trim()) {
      toast.error("Nome da obra é obrigatório");
      return;
    }

    try {
      let cadernoEncargos = null;

      // Upload caderno if file is selected
      if (cadernoFile) {
        cadernoEncargos = await handleUploadCaderno();
        if (!cadernoEncargos) {
          return; // Upload failed
        }
      }

      await axios.post(`${BACKEND_URL}/obras/createObra`, {
        obraName: name.trim(),
        obraDescription: description.trim(),
        obraLocation: location.trim(),
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        obraStatus: status,
        cadernoEncargos,
        faturas: [],
        totalExpenses: 0,
        clientId: clientId || "", // Associate obra with client
      });

      toast.success("Obra criada com sucesso!");

      // Reset form
      setName("");
      setDescription("");
      setLocation("");
      setStartDate("");
      setEndDate("");
      setStatus("planning");
      setCadernoFile(null);

      // Navigate back after a short delay
      setTimeout(() => {
        nav("/allobras");
      }, 1500);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to create obra. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className={styles.createClientWrapper}>
      <h1 className={styles.title}>Criar Nova Obra</h1>
      <form className={commonStyles.form} onSubmit={handleCreateObra}>
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
          <input
            type="file"
            accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleFileChange}
          />
          {cadernoFile && (
            <p className={styles.fileHint}>
              Ficheiro selecionado: {cadernoFile.name}
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
            {uploading ? "A carregar ficheiro..." : "Criar Obra"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateObra;
