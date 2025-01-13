import React, { useEffect, useState } from 'react';
import BlogPreview from '@/src/components/blogPreview';
import styles from '@/src/styles/blogPage.module.css';

type Blog = {
  title: string;
  description: string;
  image: string;
  date: string;
  slug: string;
};

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data: Blog[] = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className={styles.blogContainer}>
      <h1 className={styles.blogTitle}>Blogs</h1>
      <div className={styles.blogList}>
        {blogs.map((blog) => (
          <BlogPreview
            key={blog.slug} // Ensure each child has a unique key
            title={blog.title}
            description={blog.description}
            date={new Date(blog.date).toLocaleDateString()}
            slug={blog.slug}
            image={blog.image}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;