import styles from "../sass/editclient.module.scss";
import commonStyles from "../sass/common.module.scss";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";

const EditClient = () => {
  const { clientId } = useParams<{ clientId: string }>();

  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    subStatus: false,
  });

  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/clients/${clientId}`)
      .then((response) => {
        // Handle the response data here
        console.log("Fetched client:", response.data);
        setFormData({
          clientName: response.data.clientName || "",
          clientEmail: response.data.clientEmail || "",
          clientPhone: response.data.clientPhone || "",
          subStatus: response.data.subStatus || false,
        });
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching client:", error);
      });
  }, [clientId]);
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      axios.patch(`${BACKEND_URL}/clients/${clientId}`, formData);

      toast.success("Client updated successfully!");
      nav("/allclients");

      // Optionally, show a success message or redirect the user
    } catch (error) {
      console.log("Error updating client:", error);
    }
  };

  const handleDelete = () => {
    axios
      .delete(`${BACKEND_URL}/clients/${clientId}`)
      .then(() => {
        toast.success("Client deleted successfully!");
        nav("/allclients");
      })
      .catch((error) => {
        console.error("Error deleting client:", error);
        toast.error("Failed to delete client.");
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Client</h1>
      <form onSubmit={handleSubmit} className={commonStyles.form}>
        <label>
          Client Name:
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
          />
        </label>
        <label>
          Client Email:
          <input
            type="email"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
          />
        </label>
        <label>
          Client Phone:
          <input
            type="tel"
            name="clientPhone"
            value={formData.clientPhone}
            onChange={handleChange}
          />
        </label>
        <label>
          Subscription Status:
          <select
            value={formData.subStatus ? "active" : "inactive"}
            name="subStatus"
            onChange={(e) =>
              setFormData({
                ...formData,
                subStatus: e.target.value === "active",
              })
            }
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <button type="submit" className={commonStyles.submitBtn}>
          Save Changes
        </button>
      </form>
      <button className={styles.deleteBtn} onClick={handleDelete}>
        Delete Client
      </button>
    </div>
  );
};
export default EditClient;
