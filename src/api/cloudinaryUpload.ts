import axios from "axios";
import apiClient from "./httpClient";

type CloudinaryResourceType = "image" | "raw";

interface CloudinarySignatureResponse {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
  resourceType: CloudinaryResourceType;
}

export const uploadToCloudinary = async (
  file: File,
  resourceType: CloudinaryResourceType,
): Promise<string> => {
  const { data } = await apiClient.post<CloudinarySignatureResponse>(
    "/uploads/cloudinary/signature",
    { resourceType },
  );

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", data.apiKey);
  formData.append("timestamp", String(data.timestamp));
  formData.append("signature", data.signature);
  formData.append("folder", data.folder);

  const uploadUrl = `https://api.cloudinary.com/v1_1/${data.cloudName}/${resourceType}/upload`;
  const uploadResponse = await axios.post(uploadUrl, formData);

  return uploadResponse.data.secure_url as string;
};
