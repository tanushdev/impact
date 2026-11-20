import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INews extends Document {
  slug: string;
  title: string;
  date: string;
  year: number;
  category: string;
  summary: string;
  bodyParagraphs: string[];
  images?: { url: string; caption?: string }[];
  bulletPoints?: string[];
  featured?: boolean;
  order: number;
  createdAt: Date;
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
    bodyParagraphs: [{ type: String }],
    images: [
      {
        url: { type: String },
        caption: { type: String },
      },
    ],
    bulletPoints: [{ type: String }],
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

