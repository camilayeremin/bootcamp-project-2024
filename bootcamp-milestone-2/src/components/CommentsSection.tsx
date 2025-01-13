"use client";
//for projects

import React, { useState } from "react";
import styles from "@/src/styles/commentsSection.module.css";

type Comment = {
  user: string;
  comment: string;
  time: string; // Change to string
};

type CommentsSectionProps = {
  projectId: string;
  slug: string; // Add slug prop
  initialComments: Comment[];
};

const CommentsSection: React.FC<CommentsSectionProps> = ({ projectId, slug, initialComments }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [comment, setComment] = useState('');
  const [user, setUser] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Submitting comment for project ID: ${projectId}`); // Log the project ID
    console.log(`Using slug: ${slug}`); // Log the slug

    // Proceed with submitting the comment
    try {
      console.log(`Submitting comment for slug: ${slug}`); // Log the slug
      const postUrl = `/api/commentport?slug=${slug}`; // Ensure the correct API endpoint with slug
      console.log(`Submitting comment with URL: ${postUrl}`); // Log the URL

      const response = await fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, comment, slug }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add comment: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Received non-JSON response");
      }

      const data = await response.json();
      setComments([...comments, data.comment]);
      setComment('');
      setUser('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className={styles.commentsContainer}>
      <h2>Comments</h2>
      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} className={styles.comment}>
            <p><strong>{comment.user}</strong> ({new Date(comment.time).toLocaleString()}):</p>
            <p>{comment.comment}</p>
          </div>
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
  );
};

export default CommentsSection;