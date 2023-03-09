const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const { Show } = require("../models/Show")
const { sequelize } = require("../config/db")

router.get("/", async (req, res) => {
    res.send(await Show.findAll())
})

router.get("/:id", async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    if (!show)
        res.sendStatus(404)
    else
        res.send(show)
})

router.get("/genre/:genre", async (req, res) => {
    const shows = await Show.findAll({
        where: {
            genre: req.params.genre
        }
    })
    res.send(shows)
})

router.put("/rating/:id", async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id)
        show.rating = req.body.rating
        show.save()
        res.send(await Show.findAll())
    } catch {
        res.sendStatus(404)
    }
})

router.put("/status/:id",
    [check("status").not().isEmpty().trim()],
    [check("status").isLength({ min: 5, max: 25 })],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() })
            return
        }
        try {
            const show = await Show.findByPk(req.params.id)
            show.status = req.body.status
            show.save()
            res.send(await Show.findAll())
        } catch {
            res.sendStatus(404)
        }
    })

router.delete("/:id", async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    show.destroy()
    res.send(await Show.findAll())
})

module.exports = router