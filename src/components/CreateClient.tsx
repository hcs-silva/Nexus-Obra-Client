import styles from "../sass/createclient.module.scss";
import commonStyles from "../styles/common.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";
import { uploadToCloudinary } from "../api/cloudinaryUpload";

const CreateClient = () => {
  const nav = useNavigate();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [clientName, setClientName] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const DEFAULT_CLIENT_LOGO =
    "https://res.cloudinary.com/dzdrwiugn/image/upload/v1767800594/defaultUser_wqi7iy.jpg";

  async function handleCreateClient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validate required fields
    if (!clientName.trim() || !adminUsername.trim() || !adminPassword.trim()) {
      toast.error("All fields are required");
      return;
    }

    // Validate password length
    if (adminPassword.length < 8) {
      toast.error("Administrator password must be at least 8 characters long");
      return;
    }

    const uploadedUrl = await handleUpload();
    const finalLogoUrl = uploadedUrl || DEFAULT_CLIENT_LOGO;

    try {
      await axios.post(`${BACKEND_URL}/clients/createClient`, {
        clientName: clientName.trim(),
        adminUsername: adminUsername.trim(),
        adminPassword: adminPassword,
        clientLogo: finalLogoUrl,
      });

      toast.success("Client created successfully!");

      // Reset form
      setClientName("");
      setAdminUsername("");
      setAdminPassword("");
      setImageFile(null);

      // Navigate back after a short delay
      setTimeout(() => {
        nav("/masterdash");
      }, 1500);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to create client. Please try again.";
      toast.error(errorMessage);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) {
      return null;
    }

    setUploading(true);

    try {
      return await uploadToCloudinary(imageFile, "image");
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to upload image. Please try again.";
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.createClientWrapper}>
      <h1 className={styles.title}>Create Client</h1>
      <form className={commonStyles.form} onSubmit={handleCreateClient}>
        <label>
          Client Name:
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </label>
        <label>
          Client Logo:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border-cream-300 text-cream-700"
          />
        </label>
        <label>
          Administrator Username:
          <input
            type="text"
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
          />
        </label>
        <label>
          Administrator Password:
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </label>
        <div className={commonStyles.actions}>
          <button
            onClick={() => nav("/masterdash")}
            className={commonStyles.cancelBtn}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={uploading}
            className={commonStyles.submitBtn}
          >
            {uploading ? "Uploading..." : "Create Client"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateClient;
