const express = require("express");

// Modelos
const { PlayList } = require("../models/Playlist.js");
const { Song } = require("../models/Song.js");


// Router propio de usuarios
const router = express.Router();

// CRUD: READ
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const playlist = await PlayList.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .populate(["user", "song"]);

    // Num total de elementos
    const totalElements = await PlayList.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: playlist,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: READ
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const playlist = await PlayList.findById(id)
    .populate({
      path: "song",
      populate: {
        path: "artist"
      }
    }).populate("user")

    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: Operación custom
router.get("/name/:name", async (req, res) => {
  const playListName = req.params.name;

  try {
    const playlist = await PlayList.find({ name: new RegExp("^" + playListName.toLowerCase(), "i") });
    if (playlist?.length) {
      res.json(playlist);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// CRUD: CREATE
router.post("/", async (req, res) => {
  try {
    const playList = new PlayList(req.body);
    const createPlayList = await playList.save();
    return res.status(201).json(createPlayList);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: Add Song
router.post("/:id/song", async (req, res) => {
  try {
    const playListId = req.params.id;
    const playList = await PlayList.findById(playListId);
    
    if(playList) {
      const songId = req.body.id;
      const song = await Song.findById(songId);

      if(song) {
        if(playList.song.includes(songId)) {
          res.status(409).json({ message: "La cancion ya existe en la playlist" });
        } else {
          playList.song.push(songId)
          await playList.save();
          res.status(200).json(playList)
        }
      } else {
        res.status(400).json({ message: "El ID de la cancion es requerido" });
      }
    } else {
      res.status(404).json({});
    }
  } catch(error){
    res.status(500).json(error);
  }
});

// CRUD: Delete Song
router.delete("/:id/song", async (req, res) => {
  try {
    const playListId = req.params.id;
    const playList = await PlayList.findById(playListId);
    
    if(playList) {
      const songId = req.body.id;
      const song = await Song.findById(songId);

      if(song) {
        const index = playList.song.indexOf(songId);

        if(index > -1) {
          playList.song.splice(index, 1);
          await playList.save();
          res.status(200).json(playList)
        } else {
          res.status(404).json({ message: "La cancion no existe en la playlist" });
        }
      } else {
        res.status(400).json({ message: "El ID de la cancion es requerido" });
      }
    } else {
      res.status(404).json({});
    }
  } catch(error){
    res.status(500).json(error);
  }
});

// CRUD: DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const playlistDeleted = await PlayList.findByIdAndDelete(id);
    if (playlistDeleted) {
      res.json(playlistDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: UPDATE
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const playlistUpdated = await PlayList.findByIdAndUpdate(id, req.body, { new: true });
    if (playlistUpdated) {
      res.json(playlistUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { playlistRouter: router };
