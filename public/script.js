const API_BASE_URL = '/api'; // 백엔드와 동일 도메인 기준

// 댓글 가져오기
const fetchComments = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/comments`);
        if (!response.ok) throw new Error('댓글 목록을 가져오는 데 실패했습니다.');
        const comments = await response.json();
        displayComments(comments);
    } catch (error) {
        console.error('댓글 목록 가져오기 실패:', error);
    }
};

// 댓글 화면에 표시
const displayComments = (comments) => {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '';
    comments.forEach(comment => {
        const listItem = document.createElement('li');
        listItem.textContent = `${comment.name}: ${comment.comment}`;
        commentsList.appendChild(listItem);
    });
};

// 댓글 저장
const submitComment = async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    try {
        const response = await fetch(`${API_BASE_URL}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, comment }),
        });
        if (!response.ok) throw new Error('댓글 저장에 실패했습니다.');
        fetchComments(); // 댓글 목록 새로고침
    } catch (error) {
        console.error('댓글 저장 중 오류:', error);
    }
};

// 페이지 로드 시 초기화
window.onload = () => {
    fetchComments();
    document.getElementById('commentForm').addEventListener('submit', submitComment);
};
