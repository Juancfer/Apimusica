const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { PlayList } = require("../models/Playlist.js");
const { Song } = require("../models/Song.js");
const { User } = require("../models/User.js");
const { generateRandom } = require("../utils.js");

let playList = [
  {
    name: "Alex",
  },
  {
    name: "Dani",
  },
];

const playListSeed = async () => {
  try {
    // CONEXION
    const database = await connect();
    console.log("Tenemos conexion")

    const songs = await Song.find();
    const users = await User.find();

    // BORRADO
    await PlayList.collection.drop();
    console.log("Borrado de playList");

    // CREACION DOCUMENTOS
    playList = playList.map((playList) => {
      const randomSongs = songs[generateRandom(0, songs.length - 1)]
      const randomUsers = users[generateRandom(0, users.length - 1)]

      playList.song = randomSongs.id;
      playList.user = randomUsers.id

      return new PlayList(playList)
    });

    await PlayList.insertMany(playList);
    console.log("PlayList creadas correctamente");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

playListSeed();
