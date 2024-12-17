// script.js (클라이언트 코드)
const fetchComments = async () => {
  try {
    const response = await fetch('https://comments-b51s753wq-yeonjus-projects-b2ee6582.vercel.app/api/comments');
    if (!response.ok) throw new Error('댓글 목록을 가져오는 데 실패했습니다.');
    const comments = await response.json();
    displayComments(comments); // 댓글 화면에 표시
  } catch (error) {
    console.error('댓글 목록 가져오기 실패:', error);
  }
};

// 댓글을 화면에 표시하는 함수
const displayComments = (comments) => {
  const commentsList = document.getElementById('commentsList');
  commentsList.innerHTML = ''; // 기존 댓글 목록 초기화
  comments.forEach(comment => {
    const listItem = document.createElement('li');
    listItem.textContent = `${comment.name}: ${comment.comment}`;
    commentsList.appendChild(listItem);
  });
};

// 페이지 로드 시 댓글 목록 가져오기
window.onload = fetchComments;
