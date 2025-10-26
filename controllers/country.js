const Country_Model = require("../models/country")
async function Country(req, res) {
  try {
    const {Name} = req.body;   

    if (!Name) {
      return res.json({
        message: "fulfil the requirements"
      });
    }

    const createCountryData = await Country_Model.create({Name});

    res.json({
      message: "Country created successfully",
      data: createCountryData
    });

  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
}
module.exports=Country