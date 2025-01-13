import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogModel } from '@/src/database/blogSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { slug } = req.query;
    const { user, comment } = req.body;

    if (!slug || typeof slug !== 'string') {
      console.log('Invalid slug:', slug);
      return res.status(400).json({ error: 'Invalid slug' });
    }

    try {
      console.log(`Adding comment for blog with slug: ${slug}`);
      console.log('Request body:', req.body);

      const Blog = await getBlogModel();

      const blog = await Blog.findOneAndUpdate(
        { slug },
        { $push: { comments: { user, comment, time: new Date() } } },
        { new: true }
      );

      if (!blog) {
        console.log('Blog could not be found');
        return res.status(404).json({ error: 'Blog not found' });
      }

      console.log('Comment added successfully:', { user, comment, time: new Date() });
      res.status(201).json({ message: 'Comment added successfully', comment: { user, comment, time: new Date() } });
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ error: 'Failed to add comment' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}