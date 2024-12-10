import { MongoClient } from 'mongodb';

// MongoDB URI 환경 변수로 설정
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  // GET 요청은 처리하지 않음
  if (req.method === 'GET') {
    return res.status(405).json({ error: 'GET 요청은 지원하지 않습니다.' });
  }

  // POST 요청 처리
  if (req.method === 'POST') {
    const { name, comment } = req.body;

    // 이름과 댓글이 모두 있는지 확인
    if (!name || !comment) {
      return res.status(400).json({ error: '이름과 댓글을 모두 입력해주세요.' });
    }

    // 새로운 댓글 객체 생성
    const newComment = {
      name,
      comment,
      createdAt: new Date(),
    };

    try {
      // MongoDB 연결
      await client.connect();
      const collection = client.db("comments").collection("posts");

      // 댓글 저장
      await collection.insertOne(newComment);

      // 성공적으로 저장된 경우
      res.status(200).json({ message: '댓글이 성공적으로 저장되었습니다.' });
    } catch (err) {
      // 에러가 발생하면 500 에러 반환
      res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    } finally {
      // MongoDB 연결 종료
      await client.close();
    }
  }
}
