import express from "express"

import MangaController from "./src/controllers/manga.controllers.js"

const app = express()
app.use(express.json())

app.get("/", MangaController.getMangas)
app.post("/", MangaController.createManga)

app.listen(3000, () => {
  console.log(`Server running in port: 3000`)
})

export { app }
