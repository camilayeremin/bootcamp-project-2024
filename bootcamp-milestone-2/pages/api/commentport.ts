import { NextApiRequest, NextApiResponse } from 'next';
import { getProjectModel } from '@/src/app/Project'; // Updated import path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { slug } = req.query;
    console.log('Request query:', req.query); // Log the query parameters
    const { user, comment } = req.body;
    console.log('Request body:', req.body); // Log the body

    if (!slug || typeof slug !== 'string') {
      console.log('Invalid slug:', slug);
      return res.status(400).json({ error: 'Invalid slug' });
    }

    try {
      console.log(`Adding comment for project with slug: ${slug}`);
      console.log('Request body:', req.body);

      const Project = await getProjectModel();

      const project = await Project.findOneAndUpdate(
        { slug },
        { $push: { comments: { user, comment, time: new Date() } } },
        { new: true }
      );

      if (!project) {
        console.log('Project could not be found');
        return res.status(404).json({ error: 'Project not found' });
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