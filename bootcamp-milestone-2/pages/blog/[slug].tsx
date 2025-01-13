import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/src/styles/blogPage.module.css';
import Comment from '@/src/components/Comment';

type Blog = {
  title: string;
  description: string;
  date: string;
  image: string;
  slug: string;
  comments: {
    user: string;
    comment: string;
    time: Date;
  }[];
};

async function getBlog(slug: string) {
  try {
    const res = await fetch(`/api/blog/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch blog");
    }
    return res.json();
  } catch (err: unknown) {
    console.log(`error: ${err}`);
    return null;
  }
}

export default function BlogPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comment, setComment] = useState('');
  const [user, setUser] = useState('');
  const [comments, setComments] = useState<Blog['comments']>([]);

  useEffect(() => {
    if (slug) {
      const fetchBlog = async () => {
        const data = await getBlog(slug as string);
        if (data) {
          setBlog(data);
          setComments(data.comments || []);
        } else {
          console.error('Failed to fetch blog');
        }
      };

      fetchBlog();
    }
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Submitting comment for slug: ${slug}`); // Log the slug

    // Proceed with submitting the comment
    try {
      const postUrl = `/api/blog/${slug}/comment`;
      console.log(`Submitting comment with URL: ${postUrl}`); // Log the URL

      const response = await fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, comment }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Comment added successfully:', data.comment);
        setComments([...comments, data.comment]);
        setComment('');
        setUser('');
      } else {
        console.error('Failed to add comment:', data.error);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!blog) {
    return (
      <div className={styles.blogContainer}>
        <h1>Blog not found</h1>
        <Image src="/path/to/default-image.jpg" alt="Default Image" width={600} height={400} />
      </div>
    );
  }

  return (
    <div className={styles.blogContainer}>
      <h1 className={styles.blogTitle}>{blog.title}</h1>
      <p className={styles.blogDate}>{new Date(blog.date).toLocaleDateString()}</p>
      <div className={styles.blogDescription}>{blog.description}</div>
      <Image src={blog.image} alt={blog.title} width={600} height={400} />
      <div className={styles.commentsContainer}>
        <h2>Comments</h2>
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Your Name"
            className={styles.commentInput}
            required
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your Comment"
            className={styles.commentTextarea}
            required
          />
          <button type="submit" className={styles.commentButton}>Add Comment</button>
        </form>
      </div>
    </div>
  );
}