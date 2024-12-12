async function fetchComments() {
    try {
      const response = await fetch('https://comments-api-e7k1.vercel.app/api/comments');
      const comments = await response.json();
      console.log("API 응답 데이터:", comments);
  
      const commentsList = document.getElementById('comments-list');
      commentsList.innerHTML = ''; // 기존 목록 초기화
  
      comments.forEach(comment => {
        const listItem = document.createElement('li');
        listItem.textContent = `${comment.name}: ${comment.comment}`;
        commentsList.appendChild(listItem);
      });
    } catch (error) {
      console.error('댓글 목록 가져오기 실패:', error);
    }
  }
  
  async function submitComment(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
  
    if (!name || !comment) {
      alert('이름과 댓글을 모두 입력해주세요.');
      return;
    }
  
    try {
      const response = await fetch('https://comments-api-e7k1.vercel.app/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, comment }),
      });
  
      if (response.ok) {
        console.log("댓글 저장 성공");
        fetchComments(); // 저장 후 목록 갱신
      } else {
        const errorData = await response.json();
        console.error("댓글 저장 실패:", errorData);
      }
    } catch (error) {
      console.error('댓글 저장 중 오류:', error);
    }
  }
  
  document.getElementById('comment-form').addEventListener('submit', submitComment);
  window.onload = fetchComments;
  