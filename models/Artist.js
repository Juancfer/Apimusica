const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    activeSince: {
      type: Number,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Artist = mongoose.model("Artist", artistSchema);
module.exports = { Artist };
