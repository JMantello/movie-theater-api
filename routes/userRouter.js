const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator");
const { User } = require("../models/User")
const { Show } = require("../models/Show")
const { sequelize } = require("../config/db");

router.get("/", async (req, res) => {
    res.send(await User.findAll());
})

router.get("/:id", async (req, res) => {
    const id = req.params.id
    const user = await User.findByPk(id)
    res.send(user)
})

router.get("/:id/shows", async (req, res) => {
    const user = await User.findByPk(req.params.id)
    const shows = user.getShows()
    res.send(shows)
})

router.put("/:id/shows/:showID", async (req, res) => {
    try {
        // Find user and show
        const user = await User.findByPk(req.params.id)
        const show = await Show.findByPk(req.params.showID)

        user.addShow(show)

        const updatedData = await User.findOne({
            where: {
                id: user.id
            },
            include: {
                model: Show
            }
        })

        res.send(updatedData)
    } catch {
        res.sendStatus(404)
    }
})

module.exports = router