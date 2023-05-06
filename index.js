const express = require("express");
const { userRouter } = require("./routes/user.routes.js");
const { artistRouter } = require("./routes/artist.routes.js");
const { songRouter } = require("./routes/song.routes.js");
const { playlistRouter } = require("./routes/playlist.routes.js");

const main = async () => {
  // Conexión a la BBDD
  const { connect } = require("./db.js");
  const database = await connect();

  // Configuración del server
  const PORT = 3000;
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  // Rutas
  const router = express.Router();
  router.get("/", (req, res) => {
    res.send(`Esta es la home de nuestra API. Estamos utilizando la BBDD de ${database.connection.name} `);
  });
  router.get("*", (req, res) => {
    res.status(404).send("Lo sentimos :( No hemos encontrado la página solicitada.");
  });

  // Usamos las rutas
  server.use("/user", userRouter);
  server.use("/artist", artistRouter);
  server.use("/song", songRouter);
  server.use("/playlist", playlistRouter);
  server.use("/", router);

  server.listen(PORT, () => {
    console.log(`Server levantado en el puerto ${PORT}`);
  });
};

main();