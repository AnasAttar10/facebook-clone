// import { NextFunction, Request, Response } from "express";
// import cloudinary from "../../config/cloudinary";
// import expressAsyncHandler from "express-async-handler";
// import ApiError from "../../utils/ApiError";
// export interface CustomRequest<T = any> extends Request {
//   customParams?: T;
// }
// const uploadToCloudinary = (
//   file: Express.Multer.File,
//   folder: string
// ): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder, resource_type: "auto" },
//       (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result?.secure_url ?? "");
//         }
//       }
//     );
//     stream.end(file.buffer); // Pass the file buffer to the Cloudinary upload stream
//   });
// };

// export const uploadMultipleToCloudinary = expressAsyncHandler(
//   async (req: CustomRequest, res: Response, next: NextFunction) => {
//     const images = req.files as Express.Multer.File[];
//     const folder = req.body.folder || "default-folder";
//     if (!images || images.length === 0) {
//       next(new ApiError("No files uploaded ", 400));
//     }
//     // Map each file upload to Cloudinary
//     const uploadPromises = images.map((file) =>
//       uploadToCloudinary(file, folder)
//     );

//     // Wait for all files to be uploaded
//     await Promise.all(uploadPromises)
//       .then(() => {
//         req.body.images = images;
//         next();
//       })
//       .catch(() =>
//         next(
//           new ApiError(
//             "there is error in uploading the images to cloudinary ",
//             400
//           )
//         )
//       );
//   }
// );

// export const uploadSingleToCloudinary = expressAsyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const file = req.file as Express.Multer.File;
//     const folder = req.body.folder || "default-folder";
//     if (!file) {
//       next(new ApiError("No file uploaded", 400));
//     }
//     const image = await uploadToCloudinary(file, folder);
//     if (!image) {
//       next(
//         new ApiError(
//           "there is error in uploading the images to cloudinary ",
//           400
//         )
//       );
//     }
//     next();
//   }
// );
