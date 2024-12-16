function fetchComments() {
  fetch('https://comments-f747lkvso-yeonjus-projects-b2ee6582.vercel.app/api/comments')  // 새로운 URL
    .then((response) => response.json())
    .then((data) => {
      // 댓글 목록 처리
      console.log(data);
    })
    .catch((error) => {
      console.error('댓글 목록 가져오기 실패:', error);
    });
}

function submitComment(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const comment = document.getElementById('comment').value;
  
  const commentData = {
    name: name,
    comment: comment,
  };

  fetch('https://comments-f747lkvso-yeonjus-projects-b2ee6582.vercel.app/api/comments', {  // 새로운 URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
  })
    .then((response) => response.json())
    .then((data) => {
      // 댓글 저장 후 처리
      console.log('댓글 저장 성공:', data);
    })
    .catch((error) => {
      console.error('댓글 저장 중 오류:', error);
    });
}
