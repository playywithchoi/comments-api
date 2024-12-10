import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(405).json({ error: 'GET 요청은 지원하지 않습니다.' });
  }

  if (req.method === 'POST') {
    const { name, comment } = req.body;

    if (!name || !comment) {
      return res.status(400).json({ error: '이름과 댓글을 모두 입력해주세요.' });
    }

    const newComment = {
      name,
      comment,
      createdAt: new Date(),
    };

    try {
      await client.connect();
      const collection = client.db("comments").collection("posts");

      await collection.insertOne(newComment);

      res.status(200).json({ message: '댓글이 성공적으로 저장되었습니다.' });
    } catch (err) {
      // ESLint 경고를 피하기 위해 error 변수를 사용하지 않음
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    } finally {
      await client.close(); // MongoDB 연결 종료
    }
  }
}
