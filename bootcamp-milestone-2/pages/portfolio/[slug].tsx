import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/src/styles/blogPage.module.css';
import CommentsSection from '@/src/components/CommentsSection';

type Project = {
  title: string;
  description: string;
  technologies: string;
  image: string;
  link: string;
  date: string;
  _id: string;
  slug: string;
  comments: {
    user: string;
    comment: string;
    time: Date;
  }[];
};

async function getProject(slug: string) {
  console.log(`Fetching project with slug: ${slug}`); // Add print statement
  try {
    console.log(`Fetching project with slug: ${slug}`); // Add print statement
    const res = await fetch(`/api/portfolio/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch project");
    }
    const data = await res.json();
    console.log(`Fetched project data: ${JSON.stringify(data)}`); // Add print statement
    return data;
  } catch (err: unknown) {
    console.log(`Error fetching project: ${err}`); // Add print statement
    return null;
  }
}

export default function ProjectPage() {
  const router = useRouter();
  const { slug } = router.query;
  console.log(`slug: ${slug}`); // Add print statement
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (slug) {
      console.log(`useEffect triggered with slug: ${slug}`); // Add print statement
      const fetchProject = async () => {
        const data = await getProject(slug as string);
        if (data) {
          console.log(`Setting project data: ${JSON.stringify(data)}`); // Add print statement
          setProject(data);
        } else {
          console.error('Failed to fetch project');
        }
      };

      fetchProject();
    }
  }, [slug]);

  if (!project) {
    console.log('Project not found'); // Add print statement
    return (
      <div className={styles.blogContainer}>
        <h1>Project not found</h1>
        <Image src="/path/to/default-image.jpg" alt="Default Image" width={600} height={400} />
      </div>
    );
  }

  console.log(`Rendering project: ${project.title}`); // Add print statement
  return (
    <div className={styles.blogContainer}>
      <h1 className={styles.blogTitle}>{project.title}</h1>
      <p className={styles.blogDate}>{new Date(project.date).toLocaleDateString()}</p>
      <div className={styles.blogDescription}>{project.description}</div>
      <Image src={project.image} alt={project.title} width={600} height={400} />
      <CommentsSection projectId={project._id as string} slug={project.slug} initialComments={project.comments.map(comment => ({ ...comment, time: comment.time.toISOString() }))} />
    </div>
  );
}