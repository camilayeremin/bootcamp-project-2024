import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogs } from '@/src/database/blogSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const blogs = await getBlogs();
      res.status(200).json(blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).json({ error: 'Failed to fetch blogs' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}