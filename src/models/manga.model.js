import { Schema, model } from "mongoose";

const MangaSchema = new Schema({
  title: String,
  poster: String
})

export const Manga = model('Manga', MangaSchema)
