import mongoose from "mongoose";
export interface IImage {
  title?: string;
  imageUrls: string[];
}
const ImageSchema = new mongoose.Schema({
  title: { type: String },
  imageUrls: [String], // Array of URLs
});

export const Image = mongoose.model<IImage>("Image", ImageSchema);
