import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INewsImage {
  url: string;
  caption?: string;
  alt?: string;
}

export interface INews extends Document {
  slug: string;
  title: string;
  date: string;
  year: number;
  category: string;
  summary: string;
  coverImage?: string;
  contentHtml?: string;
  bodyParagraphs: string[];
  images?: INewsImage[];
  bulletPoints?: string[];
  author?: string;
  readTime?: string;
  featured?: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema: Schema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    year: { type: Number, required: true },
    category: {
      type: String,
      default: 'Press Release',
    },
    summary: { type: String, required: true },
    coverImage: { type: String, default: '' },
    contentHtml: { type: String, default: '' },
    bodyParagraphs: [{ type: String }],
    images: [
      {
        url: { type: String },
        caption: { type: String },
        alt: { type: String },
      },
    ],
    bulletPoints: [{ type: String }],
    author: { type: String, default: 'Impact Energies Corporate' },
    readTime: { type: String, default: '3 min read' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const News: Model<INews> =
  mongoose.models.News || mongoose.model<INews>('News', NewsSchema);

export default News;
