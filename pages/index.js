import { useState, useEffect } from 'react';

export default function Home() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  // 댓글 목록 가져오기
  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch('/api/comments');
      const data = await res.json();
      if (res.status === 200) {
        setComments(data);
      } else {
        setError(data.error || '댓글 목록을 가져오는 데 실패했습니다.');
      }
    };
    
    fetchComments();
  }, []);

  // 댓글 작성
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) {
      setError('댓글 내용을 입력해주세요.');
      return;
    }
    
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    
    const data = await res.json();
    if (res.status === 201) {
      setComments((prev)
