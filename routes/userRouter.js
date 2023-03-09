const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator");
const { User } = require("../models/User")
const { Show } = require("../models/Show")
const { sequelize } = require("../config/db");

router.get("/", async (req, res) => {
    res.send(await getUsers());
})

router.get("/:id", async (req, res) => {
    const id = req.params.id
    const user = await User.findByPk(id)
    res.send(await User.findAll())
})

router.get("/:id/shows", async (req, res) => {
    const user = await User.findByPk(req.params.id)
    const shows = user.getShows()
    res.send(shows)
})

router.put("/:id/addShow/:showID", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        const show = await Show.findByPk(req.params.showID)
        user.addShow(show)
        res.send(await User.findAll())
    } catch {
        res.sendStatus(404)
    }
})

module.exports = router