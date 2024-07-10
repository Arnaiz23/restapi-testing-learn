import request from "supertest"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { app } from "../../index.js"
import MangaService from "../services/manga.service.js"

vi.mock("../services/manga.service.js")

describe("GET /", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return the mangas array", async () => {
    // Arrange
    const mockMangas = [
      {
        title: 'Mock Manga 1',
        poster: 'https://example.com/manga1.jpg',
      },
      {
        title: 'Mock Manga 2',
        poster: 'https://example.com/manga2.jpg',
      },
    ];
    MangaService.getMangas.mockResolvedValue(mockMangas)

    // Act
    const response = await request(app).get("/")

    // Assert
    const bodyResponse = {
      data: mockMangas, 
      error: null
    }

    expect(response.status).toBe(200)
    expect(response.body).toEqual(bodyResponse)
  })

  it("should return an empty array when there are no mangas", async () => {
    // Arrange
    MangaService.getMangas.mockResolvedValue([])

    // Act
    const response = await request(app).get("/")

    // Assert
    const responseBody = {
      data: [],
      error: null
    }
    const responseStatus = 200

    expect(response.status).toBe(responseStatus)
    expect(response.body).toEqual(responseBody)
  })

  it("should return a 400 error with the message error", async () => {
    // Arrange
    const errorMessage = "The mangas array doesn't exists"
    MangaService.getMangas.mockRejectedValue(new Error(errorMessage))

    // Act
    const response = await request(app).get("/")

    // Assert
    const responseStatus = 400

    // const responseBody = {
    //   data: null,
    //   error: errorMessage
    // }

    expect(response.status).toBe(responseStatus)
    // expect(response.body).toEqual(responseBody)
    expect(response.body.error).toBe(errorMessage)
    expect(response.body.data).toBeNull()
  })
})

describe('POST /', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a manga and return 201 status', async () => {
    // Arrange
    const newManga = {
      title: 'New Manga',
      poster: 'https://example.com/newmanga.jpg',
    };
    MangaService.createManga.mockResolvedValue();

    // Act
    const response = await request(app).post('/').send(newManga);

    // Assert
    expect(response.status).toBe(201);
  });

  it('should return a 400 error with the message error', async () => {
    // Arrange
    const newManga = {
      title: 'New Manga',
      poster: 'https://example.com/newmanga.jpg',
    };
    const errorMessage = "Error creating manga";
    MangaService.createManga.mockRejectedValue(new Error(errorMessage));

    // Act
    const response = await request(app).post('/').send(newManga);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      data: null,
      error: errorMessage,
    });
  });
});
