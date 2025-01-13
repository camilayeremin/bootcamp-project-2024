import React from 'react';
//for blogs 

type CommentProps = {
  comment: {
    user: string;
    comment: string;
    time: Date;
  };
};

function parseCommentTime(time: Date) {
  // Implementation to format the date
  return new Date(time).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div style={{ marginBottom: '1em', padding: '1em', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h4 style={{ margin: '0 0 0.5em 0' }}>{comment.user}</h4>
      <p style={{ margin: '0 0 0.5em 0' }}>{comment.comment}</p>
      <span style={{ fontSize: '0.85em', color: '#555' }}>{parseCommentTime(comment.time)}</span>
    </div>
  );
};

export default Comment;