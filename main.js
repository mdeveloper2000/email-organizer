const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes/routes")

const app = express()

app.use(express.static("public"))
app.use(express.static("public/css"))
app.use(express.static("public/js"))
app.use(express.json())
app.set("view engine", "ejs")

mongoose.set("strictQuery", true)
const dbURI = "mongodb://127.0.0.1:27017/email-organizer"
mongoose.connect(dbURI)
.then((result) => app.listen(3000))
.catch((err) => console.log(err))

app.use(routes)