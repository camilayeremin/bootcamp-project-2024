import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogBySlug } from '@/src/database/blogSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (req.method === 'GET') {
    try {
      console.log(`Fetching blog with slug: ${slug}`); // Log the slug
      const blog = await getBlogBySlug(slug as string);
      if (!blog) {
        console.log(`Blog not found with slug: ${slug}`); // Log if blog not found
        return res.status(404).json({ error: 'Blog not found' });
      }

      console.log(`Blog found: ${JSON.stringify(blog)}`); // Log the found blog
      res.status(200).json(blog);
    } catch (error) {
      console.error('Error fetching blog:', error);
      res.status(500).json({ error: 'Failed to fetch blog', details: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}