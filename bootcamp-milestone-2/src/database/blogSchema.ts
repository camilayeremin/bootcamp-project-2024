import mongoose, { Document, Model, Schema } from 'mongoose';
import connectDB from '@/src/database/db';

// Define the BlogDocument interface
interface BlogDocument extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  date: Date;
  image: string;
  slug: string;
  comments: {
    user: string;
    comment: string;
    time: Date;
  }[];
}

// Define the Mongoose schema
const commentSchema = new Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  time: { type: Date, default: Date.now, required: true },
});

const blogSchema = new Schema<BlogDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  comments: { type: [commentSchema], default: [] },
});

// Initialize the Blog model
let Blog: Model<BlogDocument> | undefined;

const initializeBlogModel = async (): Promise<Model<BlogDocument>> => {
  const dbUriBlogs = process.env.MONGO_URI;
  if (!dbUriBlogs) {
    throw new Error('MONGO_URI is not defined in the environment variables.');
  }

  const connection = await connectDB(dbUriBlogs);
  console.log('Database connection established:', connection.name);
  if (!Blog) {
    console.log('Initializing Blog model');
    Blog = connection.model<BlogDocument>('Blog', blogSchema);
  }
  return Blog;
};

export const getBlogModel = async (): Promise<Model<BlogDocument>> => {
  if (!Blog) {
    await initializeBlogModel();
  }
  return Blog!;
};

export const getBlogs = async () => {
  const Blog = await getBlogModel();

  try {
    console.log('Fetching blogs from the database');
    const blogs = await Blog.find({}).sort({ date: -1 }).lean();
    console.log('Blogs fetched:', blogs);
    return blogs.map((blog) => ({
      ...blog,
      _id: (blog._id as mongoose.Types.ObjectId).toString(),
    }));
  } catch (err) {
    console.error('Error fetching blogs:', err);
    return [];
  }
};

export const getBlogBySlug = async (slug: string) => {
  const Blog = await getBlogModel();

  try {
    console.log('Fetching blog by slug from the database');
    const blog = await Blog.findOne({ slug }).lean<BlogDocument>();
    console.log('Blog fetched:', blog);
    return blog ? { ...blog, _id: blog._id.toString() } : null;
  } catch (err) {
    console.error('Error fetching blog by slug:', err);
    return null;
  }
};