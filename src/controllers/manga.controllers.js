import MangaService from "../services/manga.service.js"

class MangaController {
  static async getMangas(req, res) {
    try {
      const mangas = await MangaService.getMangas()

      return res.json({
        data: mangas,
        error: null
      })
    } catch (error) {
      return res.status(400).json({
        data: null,
        error: error.message
      }) 
    }
  }

  static async createManga(req, res) {
    try {
      const manga = req.body;

      if(!manga) throw new Error("The manga is required")

      await MangaService.createManga(manga);
      return res.status(201).send();
    } catch (error) {
      return res.status(400).json({
        data: null,
        error: error.message,
      });
    }
  }
}

export default MangaController
