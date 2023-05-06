const express = require("express");

// Modelos
const { Artist } = require("../models/Artist.js");

// Router propio de usuarios
const router = express.Router();

// CRUD: READ
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const artists = await Artist.find()
      .limit(limit)
      .skip((page - 1) * limit);

    // Num total de elementos
    const totalElements = await Artist.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: artists,
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
    const artist = await Artist.findById(id);
    if (artist) {
      res.json(artist);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: Operación custom
router.get("/name/:name", async (req, res) => {
  const artistName = req.params.name;

  try {
    const artist = await Artist.find({ name: new RegExp("^" + artistName.toLowerCase(), "i") });
    if (artist?.length) {
      res.json(artist);
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
    const artist = new Artist(req.body);
    const createArtist = await artist.save();
    return res.status(201).json(createArtist);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const artistDeleted = await Artist.findByIdAndDelete(id);
    if (artistDeleted) {
      res.json(artistDeleted);
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
    const artistUpdated = await Artist.findByIdAndUpdate(id, req.body, { new: true });
    if (artistUpdated) {
      res.json(artistUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { artistRouter: router };
