const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Artist } = require("./Artist.js");

const songSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: false,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: Artist,
    },
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("Song", songSchema);
module.exports = { Song };
