const express = require("express");
const app = express();
const { db } = require("./config/db");
const syncSeed = require("./seeders/seed")

// configurations
const port = 3000;
app.use(express.json())
app.use(express.urlencoded())
syncSeed()

// routers
const userRouter = require("./routes/userRouter")
app.use("/users", userRouter)

const showRouter = require("./routes/showRouter")
app.use("/shows", showRouter)

app.listen(port, () => {
    db.sync();
    console.log("Your server is listening on port " + port);
})