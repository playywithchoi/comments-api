import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors'; // cors 미들웨어 import

const app = express();
const client = new MongoClient(process.env.MONGODB_URI);

app.use(express.json()); // JSON 파싱
app.use(cors({
  origin: ['http://localhost:3002', 'https://comments-api-e7k1.vercel.app'], // 허용할 도메인
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// MongoDB 연결
async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    console.log("MongoDB 연결 성공");
    return db;
  } catch (error) {
    console.error("MongoDB 연결 실패:", error);
    throw new Error("DB 연결 오류");
  }
}

// API 요청 처리
app.post('/api/comments', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('comments');
    const { name, comment } = req.body;

    if (!name || !comment) {
      return res.status(400).json({ error: '이름과 댓글은 필수 항목입니다.' });
    }

    const result = await collection.insertOne({ name, comment, createdAt: new Date() });
    res.status(201).json({ message: '댓글 저장 성공' });
  } catch (error) {
    res.status(500).json({ error: '서버 오류' });
  }
});

app.get('/api/comments', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('comments');
    const comments = await collection.find({}).toArray();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: '서버 오류' });
  }
});

// 서버 시작
app.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중');
});
