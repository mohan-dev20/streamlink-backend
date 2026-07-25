import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const uploadLargeToCloudinary = (
  filePath,
  folder,
  resourceType = "video"
) => {

  return new Promise((resolve, reject) => {

    cloudinary.uploader.upload_large(
      filePath,
      {
        folder,
        resource_type: resourceType,
        chunk_size: 6000000, // 6MB chunks
      },

      (error, result) => {

        if (error) {
          reject(error);
        } else {
          resolve(result);
        }

      }
    );

  });

};