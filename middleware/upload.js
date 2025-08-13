const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (![".jpg", ".png", ".gif", ".jpeg"].includes(ext)) {
    return cb(new Error("only image you can add"), false);
  }
   cb(null, true);
};

const upload = multer({
  // 5mb image limit
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
module.exports =upload