import express from 'express';
import path from 'path'; // path 모듈

const app = express();
const PORT = process.env.PORT || 5000;

// client/public 폴더를 정적 파일 제공 경로로 설정
app.use(express.static(path.join(__dirname, '../client/public')));

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
