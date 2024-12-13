// pages/christmas.js
import React, { useState, useEffect } from 'react';

const ChristmasPage = () => {
  const [isClient, setIsClient] = useState(false);  // 클라이언트 렌더링 여부
  const [comments, setComments] = useState([]);     // 댓글 상태
  const [newComment, setNewComment] = useState('');  // 새 댓글 입력 상태

  useEffect(() => {
    setIsClient(true); // 클라이언트 렌더링을 설정
  }, []);

  const handleCommentSubmit = async () => {
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newComment }),
    });
    if (res.ok) {
      setComments([...comments, { content: newComment }]);
      setNewComment('');
    }
  };

  if (!isClient) {
    return null;  // 클라이언트에서만 렌더링하도록
  }

  return (
    <div>
      <h1>Merry Christmas! 🎄</h1>
      <div>
        <h2>Comments</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment.content}</li>
          ))}
        </ul>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleCommentSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ChristmasPage;
