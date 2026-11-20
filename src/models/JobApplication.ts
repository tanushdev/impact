import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IJobApplication extends Document {
  role: string;
  fullName: string;
  email: string;
  phone?: string;
  experience?: string;
  resumeUrl?: string;
  coverLetter?: string;
  createdAt: Date;
}

const JobApplicationSchema: Schema = new Schema(
  {
    role: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    experience: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    coverLetter: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const JobApplication: Model<IJobApplication> =
  mongoose.models.JobApplication ||
  mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);

export default JobApplication;

