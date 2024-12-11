// mongodb.js

const { MongoClient } = require('mongodb');

// MongoDB URI를 환경 변수에서 가져옵니다.
const client = new MongoClient(process.env.MONGODB_URI);

// 데이터베이스에 연결하는 함수입니다.
async function connectToDatabase() {
  try {
    // MongoDB에 연결합니다.
    await client.connect();
    console.log("MongoDB connected successfully");
    return client.db(process.env.MONGODB_DB); // 데이터베이스 반환
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error; // 연결 오류 발생 시 예외를 던집니다.
  }
}

// API 핸들러 코드 예시 (comments.js)
export default async function handler(req, res) {
  // 데이터베이스 연결
  const db = await connectToDatabase();

  if (req.method === 'GET') {
    try {
      // MongoDB에서 댓글 목록을 가져옵니다.
      const comments = await db.collection('comments').find({}).toArray();
      res.status(200).json(comments); // 댓글 목록을 반환
    } catch (error) {
      console.error("Failed to fetch comments", error);
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  } else if (req.method === 'POST') {
    const { text } = req.body;

    // 요청 본문에서 텍스트 데이터가 없으면 400 상태 코드 반환
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: "유효하지 않은 데이터" });
    }

    try {
      // MongoDB에 새 댓글을 추가합니다.
      const result = await db.collection('comments').insertOne({ text });
      res.status(201).json(result.ops[0]); // 성공적으로 추가된 댓글 반환
    } catch (error) {
      console.error("Failed to insert comment", error);
      res.status(500).json({ error: 'Failed to insert comment' });
    }
  } else {
    // 다른 HTTP 메서드에 대해서는 405 상태 코드 반환
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
