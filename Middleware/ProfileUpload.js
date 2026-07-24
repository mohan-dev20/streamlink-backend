import multer from "multer";

const storage = multer.memoryStorage();

const uploadProfile = multer({
  storage,
});

export default uploadProfile;