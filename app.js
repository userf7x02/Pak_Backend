const express = require('express');
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require('mongoose');

require("dotenv").config();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  credentials: true
}));

// ✅ MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ BASIC ROUTES
app.get('/', (req, res) => {
  res.send('✅ Backend Running Successfully on Vercel!');
});

app.get('/env-check', (req, res) => {
    const envVars = {
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? "✅ SET" : "❌ MISSING",
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? "✅ SET" : "❌ MISSING", 
        MONGODB_URI: process.env.MONGODB_URI ? "✅ SET" : "❌ MISSING",
        NODE_ENV: process.env.NODE_ENV || 'development'
    };
    
    console.log("Environment Check:", envVars);
    res.json(envVars);
});

app.get('/test-simple', async (req, res) => {
    try {
        res.json({ 
          success: true, 
          message: "Server working perfectly", 
          timestamp: new Date(),
          environment: process.env.NODE_ENV || 'development'
        });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.get('/health', async (req, res) => {
    try {
        const dbStatus = mongoose.connection.readyState;
        const status = {
            0: 'Disconnected',
            1: 'Connected', 
            2: 'Connecting',
            3: 'Disconnecting'
        };
        
        res.json({
            server: 'Running ✅',
            database: status[dbStatus],
            databaseHost: mongoose.connection.host || 'Not connected',
            databaseName: mongoose.connection.name || 'Not connected',
            timestamp: new Date()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ MULTER SETUP
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const upload = multer({ storage });

// ✅ DATABASE CONNECT
const connecting = require("./common/connect");
connecting().then(() => {
  console.log("✅ Database connection attempted");
}).catch(err => {
  console.log("❌ Database connection failed:", err.message);
});

// ✅ IMPORTED ROUTES
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

// ✅ FORM ROUTE
app.post("/creatform", upload.single("image"), async (req, res) => {
  try {
    const { Name, Description, EndsOn, Features, Price, StartsOn, CityArea, Category } = req.body;
    const Image = req.file ? req.file.filename : null;

    if (!Name || !Description || !EndsOn || !Features || !Price || !StartsOn || !Image || !CityArea || !Category) {
      return res.status(400).json({ message: "Please fulfill all the required fields." });
    }

    const Advertisement_Model = require("./models/Advertisement");
    const Data = await Advertisement_Model.create({
      Name,
      Description,
      EndsOn,
      Features,
      Price,
      StartsOn,
      CityArea,
      Image,
      Category
    });

    res.status(200).json({
      message: "Advertisement created successfully",
      data: Data,
    });
  } catch (e) {
    console.log("Form Error:", e.message);
    res.status(500).json({ Error: e.message });
  }
});

// ✅ ERROR HANDLERS
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;