const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Artist } = require("../models/Artist.js");

let artistList = [
  {
    name: "Alex",
    gender: "male",
    activeSince: 2017,
    country: "Spain",
  },
  {
    name: "Daniela",
    gender: "female",
    activeSince: 2000,
    country: "Italia",
  },
];

const artistSeed = async () => {
  try {
    // CONEXION
    const database = await connect();

    // BORRADO
    await Artist.collection.drop();
    console.log("Borrado de artistas");

    // CREACION DE DOCUMENTOS
    artistList = artistList.map((artist) => new Artist(artist));

    await Artist.insertMany(artistList);
    console.log("Artistas creados correctamente");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

artistSeed();
