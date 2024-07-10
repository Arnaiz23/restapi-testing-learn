import { describe, it, expect, beforeEach } from "vitest"
import MangaService from "./manga.service.js"
import { Manga } from "../models/manga.model"
import sinon from "sinon"
import { afterEach } from "vitest"

describe('MangaService', () => {
  let findStub;
  let saveStub;

  beforeEach(() => {
    findStub = sinon.stub(Manga, 'find');
    saveStub = sinon.stub(Manga.prototype, 'save');
  })

  afterEach(() => {
    findStub.restore()
    saveStub.restore()
  })

  describe('getMangas', () => {
    it('should return the mangas array', async () => {
      // Arrange
      const mockMangas = [
        {
          _id: '60d5fbd5f0d5c6361a4a8b12',
          title: 'Mock Manga 1',
          poster: 'https://example.com/manga1.jpg',
        },
        {
          _id: '60d5fbd5f0d5c6361a4a8b13',
          title: 'Mock Manga 2',
          poster: 'https://example.com/manga2.jpg',
        },
      ];
      findStub.returns({
        exec: sinon.stub().resolves(mockMangas)
      })

      // Act
      const mangas = await MangaService.getMangas();

      // Assert
      expect(mangas).toEqual(mockMangas);
    })


    it('should throw an error if mangas array does not exist', async () => {
      // Arrange
      findStub.returns({
        exec: sinon.stub().resolves(null),
      });

      // Act 
      const errorMessage = "The mangas array doesn't exist"

      // Assert
      await expect(MangaService.getMangas()).rejects.toThrow(errorMessage);
    });
  })

  describe('createManga', () => {
    it('should add a manga to the mangas array', async () => {
      // Arrange
      const newManga = {
        title: 'New Manga',
        poster: 'https://example.com/newmanga.jpg',
      };
      const savedManga = { ...newManga, _id: '60d5fbd5f0d5c6361a4a8b14' };
      saveStub.resolves(savedManga);

      // Act
      const result = await MangaService.createManga(newManga);

      console.log(result)

      // Assert
      expect(result).toEqual(savedManga);
    });

    it('should throw an error if saving the manga fails', async () => {
      // Arrange
      const newManga = {
        title: 'New Manga',
        poster: 'https://example.com/newmanga.jpg',
      };
      saveStub.rejects(new Error('Save failed'));

      // Act & Assert
      await expect(MangaService.createManga(newManga)).rejects.toThrow('Save failed');
    });
  });
});
