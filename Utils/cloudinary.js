import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Normal upload (profile images, thumbnails)
export const uploadToCloudinary = (
  buffer,
  folder,
  resourceType = "auto"
) => {
  return new Promise((resolve, reject) => {

    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },

      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};


// Large video upload (500MB support)
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
        chunk_size: 6000000,
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