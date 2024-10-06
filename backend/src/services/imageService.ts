import { v2 as cloudinary } from "cloudinary";
const uploadMultipleImages = () => {
  try {
    const uploader = async (path: string) =>
      await cloudinary.uploader.upload(path);

    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath.secure_url);
    }

    // You can save the urls in the database
    const newImages = new Image({
      title: req.body.title,
      imageUrls: urls, // Store an array of image URLs in MongoDB
    });

    await newImages.save();
    res.json({ message: "Images uploaded successfully", urls });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
export default { uploadMultipleImages };
