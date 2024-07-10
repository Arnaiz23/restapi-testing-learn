import { describe, it, expect, vi, beforeEach } from 'vitest';
import MangaService from './manga.service';
import { PrismaClient } from '@prisma/client';

vi.mock('@prisma/client', () => {
  const PrismaClient = vi.fn();
  PrismaClient.prototype.manga = {
    findMany: vi.fn(),
    create: vi.fn(),
  };
  return { PrismaClient };
});

const prisma = new PrismaClient();

describe('MangaService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getMangas', () => {
    it('should return the mangas array', async () => {
      // Arrange
      const mockMangas = [
        {
          id: 1,
          title: 'Mock Manga 1',
          poster: 'https://example.com/manga1.jpg',
        },
        {
          id: 2,
          title: 'Mock Manga 2',
          poster: 'https://example.com/manga2.jpg',
        },
      ];
      prisma.manga.findMany.mockResolvedValue(mockMangas);

      // Act
      const mangas = await MangaService.getMangas();

      // Assert
      expect(mangas).toEqual(mockMangas);
    });

    it('should throw an error if mangas array does not exist', async () => {
      // Arrange
      prisma.manga.findMany.mockResolvedValue(null);

      // Act & Assert
      await expect(MangaService.getMangas()).rejects.toThrow("The mangas array doesn't exist");
    });
  });

  describe('createManga', () => {
    it('should add a manga to the mangas array', async () => {
      // Arrange
      const newManga = {
        title: 'New Manga',
        poster: 'https://example.com/newmanga.jpg',
      };
      const savedManga = { ...newManga, id: 3 };
      prisma.manga.create.mockResolvedValue(savedManga);

      // Act
      const result = await MangaService.createManga(newManga);

      // Assert
      expect(result).toEqual(savedManga);
    });

    it('should throw an error if saving the manga fails', async () => {
      // Arrange
      const newManga = {
        title: 'New Manga',
        poster: 'https://example.com/newmanga.jpg',
      };
      prisma.manga.create.mockRejectedValue(new Error('Save failed'));

      // Act & Assert
      await expect(MangaService.createManga(newManga)).rejects.toThrow('Save failed');
    });
  });
});
