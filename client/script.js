// C:\Users\CFT\my-project\client\script.js

async function fetchComments() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/comments`);
    if (!response.ok) {
      throw new Error("댓글 목록을 가져오는 데 실패했습니다.");
    }
    const data = await response.json();
    console.log("댓글 목록:", data);
  } catch (error) {
    console.error("댓글 목록 가져오기 실패:", error);
    alert("댓글 목록을 가져오는 데 실패했습니다.");
  }
}

// 페이지 로드 시 댓글 목록 가져오기
fetchComments();
