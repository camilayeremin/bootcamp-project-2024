import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/src/database/db';
import Comment from '@/src/database/commentSchema';

const dbUri = process.env.MONGO_URI; // Use the URI for the `comments` database

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(dbUri!);

  const { commentId } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const comment = await Comment.findById(commentId).lean();
        if (!comment) {
          return res.status(404).json({ error: 'Comment not found' });
        }
        res.status(200).json(comment);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comment' });
      }
      break;

    case 'PUT':
      try {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, req.body, { new: true }).lean();
        if (!updatedComment) {
          return res.status(404).json({ error: 'Comment not found' });
        }
        res.status(200).json(updatedComment);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update comment' });
      }
      break;

    case 'DELETE':
      try {
        const deletedComment = await Comment.findByIdAndDelete(commentId).lean();
        if (!deletedComment) {
          return res.status(404).json({ error: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete comment' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}