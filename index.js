import express from "express"
import mongoose from "mongoose"

import MangaController from "./src/controllers/manga.controllers.js"

const app = express()
app.use(express.json())

app.get("/", MangaController.getMangas)
app.post("/", MangaController.createManga)

app.listen(3000, async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/mangas')
  console.log(`Server running in port: 3000`)
})

export { app }
