export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*'); // 모든 도메인 허용
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Preflight 요청 처리
    res.status(204).end();
    return;
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection('comments');

    if (req.method === 'GET') {
      const comments = await collection.find({}).toArray();
      res.status(200).json(comments);
    } else if (req.method === 'POST') {
      const { name, comment } = req.body;
      if (!name || !comment) {
        res.status(400).json({ error: '이름과 댓글은 필수 항목입니다.' });
        return;
      }

      const result = await collection.insertOne({ name, comment, createdAt: new Date() });
      res.status(201).json({ message: '댓글 저장 성공' });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: '서버 오류' });
  }
}
