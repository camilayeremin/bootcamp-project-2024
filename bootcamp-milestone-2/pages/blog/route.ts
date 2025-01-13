import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/src/database/db';
import Blog from '@/src/database/blogSchema';

const dbUri = process.env.MONGO_URI; // Use the URI for the `test` database
console.log('MONGO_URI:', process.env.MONGO_URI);
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log('API route hit'); // Add log to verify if the route is hit

  await connectDB(dbUri!);

  try {
    const blogs = await Blog.find().sort({ date: -1 }).lean();
    console.log('Fetched blogs from database:', blogs); // Log the fetched data
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
}