const express = require('express');
const app = express();
const path = require("path");
const cors = require("cors");
const Advertisement_Model = require("./models/Advertisement");
require("dotenv").config();
const connecting = require("./common/connect");
const multer = require("multer");


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pakclassified.onrender.com",
       "https://pakclassified.vercel.app",
      "https://pak-classified-02.vercel.app" // agar future mein frontend deploy ho to
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);


app.use(cors());







// ✅ Middlewares (must be before routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Database connect
connecting();

// ✅ Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.get('/', (req, res) => {
  res.send('Running Successfully!');
});

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

// ✅ Form route with image upload
app.post("/creatform", upload.single("image"), async (req, res) => {
  try {
    const { Name, Description, EndsOn, Features, Price, StartsOn, CityArea, Category } = req.body;
    const Image = req.file ? req.file.filename : null;

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
      Image,
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


const PORT = process.env.PORT || 3300;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
