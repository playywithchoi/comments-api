// 댓글 가져오기 (GET 요청)
function fetchComments() {
  fetch('https://comments-api-e7k1.vercel.app/api/comments')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('댓글 목록 가져오기 실패:', error));
}

// 댓글 저장 (POST 요청)
function submitComment(comment) {
  fetch('https://comments-api-e7k1.vercel.app/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
    .then(response => response.json())
    .then(data => console.log('댓글 저장 성공:', data))
    .catch(error => console.error('댓글 저장 중 오류:', error));
}
