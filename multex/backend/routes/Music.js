const multer = require("multer");
const path = require("path");
const router = require('express').Router();
const Music = require('../models/Music')
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const { originalname } = req.file;
  const name = path.parse(originalname).name;
  const filePath = req.file.path;

  try {
    const music = new Music({ name, filePath });
    await music.save();
    res.send({ name, filePath });
  } catch (err) {
    console.error("Error saving file to database:", err);
    res.status(500).send("Error uploading file.");
  }
});

router.get('/all',async (req,res)=>{
    const data = await Music.find({},{name:1, _id:0});
    res.send(data);
})

router.get("/:filename", async (req, res) => {
  const filename = req.params.filename;
  const music = await Music.findOne({ name: filename });

  if (!music) {
    return res.status(404).send("Music file not found.");
  }

  const filePath = path.join(__dirname,"..",music.filePath);
  console.log(filePath);
  res.sendFile(filePath);
});

module.exports = router;
