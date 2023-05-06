const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Song } = require("./Song.js");
const { User } = require("./User.js");

const playListSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    song: [{
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: Song,
    }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: User,
    },
  },
  {
    timestamps: true,
  }
);

const PlayList = mongoose.model("PlayList", playListSchema);
module.exports = { PlayList };
