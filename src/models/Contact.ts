import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContact extends Document {
  fullName: string;
  email: string;
  company?: string;
  enquiryType: string;
  message: string;
  createdAt: Date;
}

const ContactSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, default: '' },
    enquiryType: { type: String, default: 'General enquiry' },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;

