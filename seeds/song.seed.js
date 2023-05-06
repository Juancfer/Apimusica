const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Song } = require("../models/Song.js");
const { Artist } = require("../models/Artist.js");
const { generateRandom } = require("../utils.js");

let songList = [
  {
    title: "Coco Chanel",
    duration: 198,
    releaseYear: 2023,
  },
  {
    title: "La Mamá de la Mamá",
    duration: 230,
    releaseYear: 2021,
  },
  {
    title: "Luz Apaga",
    duration: 314,
    releaseYear: 2019,
  },
  {
    title: "Se Va",
    duration: 216,
    releaseYear: 2021,
  },
  {
    title: "Safaera",
    duration: 295,
    releaseYear: 2020,
  },
  {
    title: "Bandido",
    duration: 201,
    releaseYear: 2021,
  },
  {
    title: "Hablamos Manaña",
    duration: 281,
    releaseYear: 2020,
  },
  {
    title: "Bellaquita",
    duration: 187,
    releaseYear: 2019,
  },
  {
    title: "Machuqueo",
    duration: 196,
    releaseYear: 2021,
  },
  {
    title: "Cuidao",
    duration: 238,
    releaseYear: 2021,
  },
  {
    title: "Otro Trago",
    duration: 226,
    releaseYear: 2019,
  },
];

const songSeed = async () => {
  try {
    // CONEXION
    const database = await connect();
    console.log("Tenemos conexion")

    const artists = await Artist.find();

    // BORRADO
    await Song.collection.drop();
    console.log("Borrado de canciones");

    // CREACION DOCUMENTOS
    songList = songList.map((song) => {
      const randomArtist = artists[generateRandom(0, artists.length - 1)]
      song.artist = randomArtist.id;
      return new Song(song)
    });

    await Song.insertMany(songList);
    console.log("Canciones creadas correctamente");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

songSeed();
