import { Request, Response } from "express";
import cloudinary from "../../config/cloudinary";

const uploadToCloudinary = (
  file: Express.Multer.File,
  folder: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url ?? "");
        }
      }
    );
    stream.end(file.buffer); // Pass the file buffer to the Cloudinary upload stream
  });
};

export const uploadMultiple = async (req: Request, res: Response) => {
  const images = req.files as Express.Multer.File[];
  const folder = req.body.folder || "default-folder";
  if (!images || images.length === 0) {
    return "";
  }
  try {
    // Map each file upload to Cloudinary
    const uploadPromises = images.map((file) =>
      uploadToCloudinary(file, folder)
    );

    // Wait for all files to be uploaded
    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    res.status(500).json({ message: "Server error during upload." });
  }
};

export const uploadSingle = async (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;
  const folder = req.body.folder || "default-folder";
  if (!file) {
    res.status(400).json({ message: "No file uploaded ." });
  }
  try {
    const image = await uploadToCloudinary(file, folder);
    return image;
  } catch (error) {
    res.status(500).json("server Error");
  }
};
