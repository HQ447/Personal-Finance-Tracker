import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "finance-tracker-profiles-images", // folder name in your Cloudinary account
    resource_type: "image",
    format: async (req, file) => undefined,
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const fileUploader = multer({ storage });

export default fileUploader;
