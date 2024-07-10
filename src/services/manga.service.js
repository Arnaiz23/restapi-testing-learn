import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

class MangaService {
  static async getMangas() {
    const mangas = await prisma.manga.findMany()

    if(!mangas) {
      throw new Error("The mangas array doesn't exists")
    }

return mangas
  }

  static async createManga(manga) {
    if(!manga.title) throw new Error("The title is required")

    const newManga = await prisma.manga.create({ data: manga })

    return newManga
  }
}

export default MangaService
