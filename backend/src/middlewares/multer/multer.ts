import multer, { FileFilterCallback, StorageEngine } from "multer";
import ApiError from "../../utils/ApiError";
import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import cloudinary from "../../config/cloudinary";
export interface CustomRequest<T = any> extends Request {
  customParams?: T;
}
const storage: StorageEngine = multer.memoryStorage();
const multerFilter = function (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    const error = new ApiError("Only image or video files are allowed", 400);
    return cb(error);
  }
};
export const upload = multer({ storage, fileFilter: multerFilter });
export const uploadSingleImage = upload.single("image");
export const uploadMultipleImages = upload.array("images", 10);

// till now it's not important because I use cloudinary
// export const resizeImage = async (file: Express.Multer.File) => {
//   return sharp(file.buffer)
//     .resize(600, 600)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 });
// };

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

export const uploadMultipleToCloudinary = expressAsyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const images = req.files as Express.Multer.File[];
    if (!req.body.folder)
      return next(new ApiError(`folder name with userId is required `, 400));
    const folder = `facebook/${req.body.folder}/` || "default-folder";
    if (!images || images.length === 0) {
      req.body.imgs = [""];
      return next();
    }

    // Map each file upload to Cloudinary
    const uploadPromises = images.map((file) =>
      uploadToCloudinary(file, folder)
    );

    // Wait for all files to be uploaded
    await Promise.all(uploadPromises)
      .then((results) => {
        req.body.imgs = results;
        next();
      })
      .catch(() =>
        next(
          new ApiError(
            "there is error in uploading the images to cloudinary ",
            400
          )
        )
      );
  }
);

export const uploadSingleToCloudinary = expressAsyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const file = req.file as Express.Multer.File;
    const folder =
      `facebook/${req.body.userId}/${req.body.folder}/` || "default-folder";
    if (!file) {
      next(new ApiError("No file uploaded", 400));
    }
    const image = await uploadToCloudinary(file, folder);

    if (!image) {
      next(
        new ApiError(
          "there is error in uploading the images to cloudinary ",
          400
        )
      );
    }
    if (req.originalUrl.includes("personal")) {
      req.body.image = image;
    }
    if (req.originalUrl.includes("cover")) {
      req.body.coverImage = image;
    }

    next();
  }
);
