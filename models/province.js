const { Schema, SchemaTypes, model } = require("mongoose")
const ProvinceSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    City: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "City"
    }
})
const Province = model("Province", ProvinceSchema)
module.exports = Province;