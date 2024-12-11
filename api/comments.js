import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

async function connectToDatabase() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  return client.db(MONGODB_DB);
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const db = await connectToDatabase();
      const comments = await db.collection('comments').find({}).toArray();
      if (!comments) {
        return res.status(404).json({ error: '댓글을 찾을 수 없습니다.' });
      }
      return res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: '서버 오류' });
    }
  } else if (req.method === 'POST') {
    try {
      // 요청 본문에서 데이터를 추출
      const { text } = req.body;
      
      // 데이터 검증
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: '유효하지 않은 데이터' });
      }
      
      const db = await connectToDatabase();
      const result = await db.collection('comments').insertOne({ text });
      
      return res.status(201).json({ message: '댓글이 성공적으로 저장되었습니다.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: '서버 오류' });
    }
  } else {
    return res.status(405).json({ error: '허용되지 않은 메서드' });
  }
}
