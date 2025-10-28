const express = require('express');
const app = express();
const cors = require("cors");
require("dotenv").config();
const connecting = require("./common/connect");

// ✅ CORS
app.use(cors({
    origin: ["http://localhost:5173", "https://pakclassified.vercel.app", "https://pak-classified-02.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Database connect
connecting();

// ✅ ROUTES
const createCategory = require("./routes/category");
const createArea = require("./routes/city_area");
const createAdvertisement = require("./routes/Advertisment");

app.use("/createCategory", createCategory);
app.use("/createArea", createArea);
app.use("/createAdvertisement", createAdvertisement);

// ✅ Test Routes
app.get('/', (req, res) => {
    res.send('Backend Running Successfully!');
});

app.get('/test-simple', (req, res) => {
    res.json({ success: true, message: "Server working" });
});

app.get('/test-db', async (req, res) => {
    try {
        const Category = require("./models/Category");
        const categories = await Category.find().limit(1);
        res.json({ success: true, categories: categories.length });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

// ✅ PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
