// 댓글 입력 폼과 목록 요소 가져오기
const commentForm = document.getElementById('comment-form');
const commentList = document.getElementById('comment-list');

// 폼 제출 이벤트 처리
commentForm.addEventListener('submit', function (event) {
  event.preventDefault(); // 폼 기본 제출 막기

  // 입력 필드 값 가져오기
  const username = document.getElementById('username').value.trim();
  const comment = document.getElementById('comment').value.trim();

  // 유효성 검사
  if (!username || !comment) {
    alert('모든 필드를 채워주세요!');
    return;
  }

  // 댓글 목록에 추가
  addCommentToList(username, comment);

  // 입력 필드 초기화
  commentForm.reset();
});

// 댓글을 목록에 추가하는 함수
function addCommentToList(username, comment) {
  // 새로운 리스트 아이템 생성
  const listItem = document.createElement('li');
  listItem.textContent = `${username}: ${comment}`;

  // 목록에 아이템 추가
  commentList.appendChild(listItem);
}
