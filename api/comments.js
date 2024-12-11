app.post("/api/comments", async (req, res) => {
  console.log(req.body); // 요청 본문 출력

  // 나머지 처리
  try {
    // DB에 댓글 저장
  } catch (error) {
    console.error("에러 발생:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});
