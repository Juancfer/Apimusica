const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { User } = require("../models/User.js");

let userList = [
  {
    name: "Karl",
    lastname: "Feliz",
    email: "juan@juan.com",
  },
  {
    name: "Juan",
    lastname: "Fernandez",
    email: "juan@juan.com",
  },
  {
    name: "Dani",
    lastname: "Rodriguez",
    email: "juan@juan.com",
  },
  {
    name: "Fran",
    lastname: "Linde",
    email: "juan@juan.com",
  },
];

const userSeed = async () => {
  try {
    // CONEXION
    const database = await connect();

    // BORRADO
    await User.collection.drop();
    console.log("Borrado de usuarios");

    // CREACION DE DOCUMENTOS
    userList = userList.map((user) => new User(user));

    await User.insertMany(userList);
    console.log("Usuarios creados correctamente");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

userSeed();
