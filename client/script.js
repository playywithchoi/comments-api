async function fetchComments() {
  const apiUrl = import.meta.env.VITE_API_URL;  // 환경 변수 사용
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const comments = await response.json();
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = comments
      .map(comment => `<p>${comment.text}</p>`)
      .join('');
  } catch (error) {
    console.error('댓글 목록 가져오기 실패:', error);
  }
}

fetchComments();
