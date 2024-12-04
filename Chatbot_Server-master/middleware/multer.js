import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploadedFiles/');
  },
  filename: (req, file, cb) => {
    const { adminID, version } = req.body;
    const uniqueSuffix = `${version}-${adminID}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
