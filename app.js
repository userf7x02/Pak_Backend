const express = require('express');
const app = express();
const path = require("path");
const cors = require("cors");

// ✅ TOP LEVEL IMPORTS - Vercel compatible
const Advertisement_Model = require("./models/Advertisement");
// const Category = require("./models/Category");

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

// ✅ Database connect - Make it async
connecting().then(() => {
  console.log("Database connection attempted");
}).catch(err => {
  console.log("Database connection failed:", err.message);
});

// ✅ ROUTES IMPORT KAREIN
const createCategory = require("./routes/category");
const createStatus = require("./routes/status");
const createArea = require("./routes/city_area");
const createCity = require("./routes/city");
const createCountry = require("./routes/country");
const createProvince = require("./routes/province");
const createRole = require("./routes/role");
const createAdvertisement = require("./routes/Advertisment");
const signupROUTER = require("./routes/Signup");
const loginROUTER = require("./routes/Login");
const updateUserRouter = require("./routes/Update");
const createAuth = require("./routes/Forgot");
const createContact = require("./routes/Contact");

// ✅ ROUTES USE KAREIN
app.use("/createCategory", createCategory);
app.use("/createStatus", createStatus);
app.use("/createuser", signupROUTER);
app.use("/createlogin", loginROUTER);
app.use("/createArea", createArea);
app.use("/createCity", createCity);
app.use("/createCountry", createCountry);
app.use("/createProvince", createProvince);
app.use("/createRole", createRole);
app.use("/createAdvertisement", createAdvertisement);
app.use("/createAuth", createAuth);
app.use("/createContact", createContact);
app.use("/createuser", updateUserRouter);

// ✅ Routes
app.get('/', (req, res) => {
  res.send('Backend Running Successfully on Render!');
});

app.get('/test-simple', async (req, res) => {
    try {
        res.json({ success: true, message: "Server working", timestamp: new Date() });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

// ✅ FIXED TEST ROUTE - Dynamic import
app.get('/test-db', async (req, res) => {
    try {
        const Category = require("./models/Category");
        const categories = await Category.find().limit(1);
        res.json({ success: true, categories: categories.length });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

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
