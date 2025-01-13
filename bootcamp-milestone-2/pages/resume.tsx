import React from "react";
import styles from "@/src/styles/resume.module.css";
import { getProjects } from "@/src/app/Project";
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps } from "next";
import CommentsSection from "@/src/components/CommentsSection";

type Project = {
  _id: string;
  title: string;
  description: string;
  technologies: string;
  image: string;
  link: string;
  date: string; // Change to string
  slug: string;
  comments: {
    user: string;
    comment: string;
    time: string; // Change to string
  }[];
};

type Comment = {
  user: string;
  comment: string;
  time: string; // Change to string
};

type ResumePageProps = {
  projects: Project[];
};

const ResumePage: React.FC<ResumePageProps> = ({ projects }) => {
  return (
    <div className={styles.resumeContainer}>
      <h1 className={styles.resumeTitle}>My Resume</h1>
      <object
        data="/CamilaYereminResumeWinter.pdf"
        type="application/pdf"
        className={styles.resumeObject}
      >
        <p>
          Your browser does not support PDFs.{" "}
          <a href="/CamilaYereminResumeWinter.pdf" download>
            Download the resume
          </a>
          .
        </p>
      </object>
      <a
        href="/CamilaYereminResumeWinter.pdf"
        download
        className={styles.downloadButton}
      >
        Download Resume
      </a>

      <div className={styles.projectsContainer}>
        <h2 className={styles.projectsTitle}>Highlighted Projects</h2>
        <div className={styles.projectList}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project._id} className={styles.projectItem}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={300}
                  height={200}
                  className={styles.projectImage}
                />
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDate}>
                  {new Date(project.date).toLocaleDateString()}
                </p>
                <p className={styles.projectDescription}>{project.description}</p>
                <p className={styles.projectTechnologies}>{project.technologies}</p>
                <Link href={`/portfolio/${project.slug}`} legacyBehavior>
               <a className={styles.readMoreButton}></a>
              </Link>
                <CommentsSection projectId={project._id} initialComments={project.comments} slug={project.slug} />
              </div>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let projects: Project[] = [];
  try {
    const fetchedProjects = await getProjects();
    projects = fetchedProjects.map((project: any) => {
      console.log('Project date:', project.date); // Add logging to verify date values
      const date = project.date ? new Date(project.date).toISOString() : new Date().toISOString(); // Handle missing or invalid date values
      console.log('Project comments:', project.comments); // Add logging to verify comments field
      return {
        _id: project._id,
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        image: project.image,
        link: project.link,
        date: date, // Use the handled date value
        slug: project.slug, // Add the slug property
        comments: project.comments ? project.comments.map((comment: any) => {
          const commentTime = comment.time ? new Date(comment.time).toISOString() : ''; // Handle missing or invalid comment time values
          return {
            user: comment.user,
            comment: comment.comment,
            time: commentTime, // Use the handled comment time value
          };
        }) : [], // Handle missing or invalid comments field
      };
    });
    console.log('Projects to render:', projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  return {
    props: {
      projects,
    },
  };
};

export default ResumePage;