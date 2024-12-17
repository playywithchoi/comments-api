// script.js

// 클라이언트에서 API URL 직접 설정
const apiUrl = 'https://comments-b51s753wq-yeonjus-projects-b2ee6582.vercel.app/api/comments';

const fetchComments = async () => {
  try {
    const response = await fetch(apiUrl);  // 직접 설정한 API URL 사용
    
    if (!response.ok) {
      throw new Error(`댓글 목록을 가져오는 데 실패했습니다. 상태: ${response.status}`);
    }
    
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

  if (comments.length === 0) {
    commentsList.innerHTML = '댓글이 없습니다.';
    return;
  }

  comments.forEach(comment => {
    const listItem = document.createElement('li');
    listItem.textContent = `${comment.name}: ${comment.comment}`;
    commentsList.appendChild(listItem);
  });
};

// 페이지 로드 시 댓글 목록 가져오기
window.onload = fetchComments;
