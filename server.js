// server.js
import express from 'express';
import connectToDatabase from './utils/mongodb.js'; // MongoDB 연결 함수 import

const app = express();
const port = 5000;

// 서버 시작 전 DB 연결
connectToDatabase();

app.use(express.json());  // POST 요청의 JSON 바디를 처리할 수 있게 함

// 간단한 GET 요청 예시
app.get('/', (req, res) => {
  res.send('Server is running');
});

// 댓글 데이터를 다룰 엔드포인트 예시
app.get('/api/comments', async (req, res) => {
  try {
    // 데이터베이스에서 댓글 데이터를 가져오는 로직 추가
    res.status(200).json({ message: 'Comments fetched successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching comments', error: err.message });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
