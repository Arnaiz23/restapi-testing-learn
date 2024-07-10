const mangas = [
  {
    "title": "Ore no shibou flag ga todomaru tokoro wo shiranai",
    "poster": "https://otakuteca.com/images/books/cover/5f69395c8e793.webp"
  },
  {
    "title": "Days",
    "poster": "https://otakuteca.com/images/books/cover/5e39b0fbaf9b4.webp"
  }
]

class MangaService {
  static async getMangas() {
    if(!mangas) {
      throw new Error("The mangas array doesn't exists")
    }

    return new Promise((resolve, rejext) => {
      setTimeout(() => {
        resolve(mangas)
      }, 500)
    })

  }

  static async createManga(manga) {
    if(!manga.title) throw new Error("The title is required")

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        mangas.push(manga);
        resolve();
      }, 500);
    });
  }
}

export default MangaService
