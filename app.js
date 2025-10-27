const express = require('express');
const app = express();
const path = require("path");
const cors = require("cors");
const Advertisement_Model = require("./models/Advertisement");
require("dotenv").config();
const connecting = require("./common/connect");
const multer = require("multer");

// ✅ CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pakclassified.onrender.com",
      "https://pakclassified.vercel.app",
      "https://pak-classified-02.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ FIX: Multer Memory Storage (Render compatible)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Database connect
connecting();

// ✅ Routes
app.get('/', (req, res) => {
  res.send('Backend Running Successfully on Render!');
});

// ... your routes (same as before)

// ✅ FIX: Form route with memory storage
app.post("/creatform", upload.single("image"), async (req, res) => {
  try {
    const { Name, Description, EndsOn, Features, Price, StartsOn, CityArea, Category } = req.body;
    
    // ✅ Memory storage mein file buffer milta hai
    const Image = req.file ? {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      filename: Date.now() + "-" + req.file.originalname
    } : null;

    if (!Name || !Description || !EndsOn || !Features || !Price || !StartsOn || !Image || !CityArea || !Category) {
      return res.status(400).json({ message: "Please fulfill all the required fields." });
    }

    const Data = await Advertisement_Model.create({
      Name,
      Description,
      EndsOn,
      Features,
      Price,
      StartsOn,
      CityArea,
      Image, // ✅ Ab yeh object hoga
      Category
    });

    res.status(200).json({
      message: "Advertisement created successfully",
      data: Data,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ Error: e.message });
  }
});

// ✅ FIX: Render compatible PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));