import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

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

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('comments');

    if (req.method === 'GET') {
      const comments = await collection.find({}).toArray();
      console.log("댓글 목록:", comments);
      res.status(200).json(comments);
    } else if (req.method === 'POST') {
      const { name, comment } = req.body;
      if (!name || !comment) {
        res.status(400).json({ error: '이름과 댓글은 필수 항목입니다.' });
        return;
      }

      const result = await collection.insertOne({ name, comment, createdAt: new Date() });
      console.log("데이터 저장 성공:", result);
      res.status(201).json({ message: '댓글 저장 성공' });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("API 처리 중 오류:", error);
    res.status(500).json({ error: '서버 오류' });
  }
}
