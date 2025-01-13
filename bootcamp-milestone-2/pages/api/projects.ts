import { NextApiRequest, NextApiResponse } from 'next';
import { getProjects } from '@/src/app/Project';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      console.log('API request received to fetch projects');
      const projects = await getProjects();
      console.log('Projects fetched successfully');
      res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}