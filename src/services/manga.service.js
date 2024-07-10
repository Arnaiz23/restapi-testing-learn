import { Manga } from "../models/manga.model.js"

class MangaService {
  static async getMangas() {
    const mangas = await Manga.find().exec()

    if(!mangas) {
      throw new Error("The mangas array doesn't exists")
    }

    return mangas
  }

  static async createManga(manga) {
    if(!manga.title) throw new Error("The title is required")

    const newManga = new Manga(manga)

    await newManga.save()

    return newManga
  }
}

export default MangaService
