import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/src/styles/blogPreview.module.css';

type BlogPreviewProps = {
  title: string;
  description: string;
  date: string;
  slug: string;
  image: string;
};

const BlogPreview: React.FC<BlogPreviewProps> = ({ title, description, date, slug, image }) => {
  return (
    <div className={styles.blogPreview}>
      <h3 className={styles.blogTitle}>{title}</h3>
      <div className={styles.blogContent}>
        <Image src={image} alt={title} width={300} height={200} className={styles.blogImage} priority />
        <p className={styles.blogDescription}>{description}</p>
        <p className={styles.blogDate}>Posted on: {date}</p>
        <Link href={`/blog/${slug}`} className={styles.readMore}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default BlogPreview;