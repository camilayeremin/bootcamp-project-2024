import mongoose, { Schema, Document } from 'mongoose';

export interface CommentDocument extends Document {
  user: string;
  comment: string;
  time: Date;
}

const commentSchema = new Schema<CommentDocument>({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  time: { type: Date, default: Date.now, required: true },
});

const Comment = mongoose.models.Comment || mongoose.model<CommentDocument>('Comment', commentSchema);

export default Comment;