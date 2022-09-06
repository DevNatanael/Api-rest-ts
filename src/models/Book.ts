import mongoose, { Document, Schema } from "mongoose";

export interface Ibook {
  title: string;
  author: string;
  category: string;
  value: number;
}

export interface IbookModel extends Ibook, Document {}

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: "Author" },
    category: { type: String, required: true },
    value: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IbookModel>("Book", BookSchema);
