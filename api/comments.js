import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const port = 5000; // 원하는 포트

// MongoDB 연결 설정
const uri = 'mongodb://localhost:27017'; // MongoDB 서버 주소 (로컬 환경의 경우)
const client = new MongoClient(uri);

app.use(cors()); // CORS 설정
app.use(express.json()); // JSON 요청 본문을 파싱

// MongoDB 연결
let db;
client.connect()
  .then(() => {
    db = client.db('commentsDB'); // 사용할 DB 이름
    console.log('MongoDB connected');
  })
  .catch(err => console.error('MongoDB connection error:', err));

// CORS 설정 추가
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // 모든 도메인 허용
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// GET: 모든 댓글 가져오기
app.get('/api/comments', async (req, res) => {
  try {
    const comments = await db.collection('comments').find().toArray();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: '댓글을 가져오는 중 오류가 발생했습니다.' });
  }
});

// POST: 새로운 댓글 저장하기
app.post('/api/comments', async (req, res) => {
  const { name, comment } = req.body;
  if (!name || !comment) {
    return res.status(400).json({ error: '이름과 댓글은 필수 항목입니다.' });
  }
  
  try {
    await db.collection('comments').insertOne({ name, comment, createdAt: new Date() });
    res.status(201).json({ message: '댓글 저장 성공' });
  } catch (err) {
    res.status(500).json({ error: '댓글을 저장하는 중 오류가 발생했습니다.' });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
