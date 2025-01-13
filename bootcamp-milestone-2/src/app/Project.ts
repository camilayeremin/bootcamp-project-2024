import mongoose, { Schema, Model, Document } from 'mongoose';
import connectDBProjects from '@/src/database/dbProjects';

// TypeScript interface for Project documents
export interface ProjectDocument extends Document {
  _id: mongoose.Types.ObjectId | string;
  title: string;
  description: string;
  technologies: string;
  image: string;
  link: string;
  date: Date;
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

const projectSchema = new Schema<ProjectDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
  date: { type: Date, required: true },
  slug: { type: String, required: true, unique: true },
  comments: { type: [commentSchema], default: [] },
});

// Initialize the Project model
let Project: Model<ProjectDocument> | undefined;

const initializeProjectModel = async (): Promise<Model<ProjectDocument>> => {
  const dbUriProjects = process.env.MONGO_URI_PROJECTS || process.env.MONGO_URI;
  if (!dbUriProjects) {
    throw new Error('MONGO_URI_PROJECTS or MONGO_URI is not defined in the environment variables.');
  }

  const connection = await connectDBProjects(dbUriProjects);
  console.log('Database connection established:', connection.name);
  if (!Project) {
    console.log('Initializing Project model');
    Project = connection.model<ProjectDocument>('Project', projectSchema);
  }
  return Project;
};

export const getProjectModel = async (): Promise<Model<ProjectDocument>> => {
  if (!Project) {
    await initializeProjectModel();
  }
  return Project!;
};

export const getProjects = async () => {
  const Project = await getProjectModel();

  try {
    console.log('Fetching projects from the database');
    const projects = await Project.find({}).sort({ date: -1 }).lean();
    console.log('Projects fetched:', projects);
    return projects.map((project) => ({
      ...project,
      _id: (project._id as mongoose.Types.ObjectId).toString(),
    }));
  } catch (err) {
    console.error('Error fetching projects:', err);
    return [];
  }
};

export const getProjectBySlug = async (slug: string) => {
  const Project = await getProjectModel();

  try {
    console.log('Fetching project by slug from the database');
    const project = await Project.findOne({ slug }).lean<ProjectDocument>();
    console.log('Project fetched:', project);
    return project ? { ...project, _id: project._id.toString() } : null;
  } catch (err) {
    console.error('Error fetching project by slug:', err);
    return null;
  }
};

export default Project;