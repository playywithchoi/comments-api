import { MongoClient } from 'mongodb';

// MongoDB 연결 URL과 클라이언트 설정
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  // GET 요청은 지원하지 않음
  if (req.method === 'GET') {
    return res.status(405).json({ error: 'GET 요청은 지원하지 않습니다.' });
  }

  // POST 요청 처리
  if (req.method === 'POST') {
    const { name, comment } = req.body;

    // 이름과 댓글이 없으면 에러 응답
    if (!name || !comment) {
      return res.status(400).json({ error: '이름과 댓글을 모두 입력해주세요.' });
    }

    const newComment = {
      name,
      comment,
      createdAt: new Date(),
    };

    try {
      // MongoDB 연결
      await client.connect();
      const collection = client.db("comments").collection("posts");

      // MongoDB에 새로운 댓글 저장
      await collection.insertOne(newComment);

      // 성공 응답
      res.status(200).json({ message: '댓글이 성공적으로 저장되었습니다.' });
    } catch (error) {
      // 'error' 변수를 사용하지 않더라도 ESLint 경고를 피하기 위해 아래 코드를 추가
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      res.status(500).json({ error: '
