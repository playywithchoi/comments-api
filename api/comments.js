import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // req.body에서 필요한 필드 확인
  if (!req.body.field1 || typeof req.body.field2 !== "string") {
    return res.status(400).json({ error: "유효하지 않은 데이터" });
  }

  try {
    // MongoDB 연결
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("comments");

    // MongoDB에 데이터 삽입
    const result = await collection.insertOne(req.body);
    client.close();

    return res.status(201).json({ message: "데이터가 성공적으로 저장되었습니다", data: result });
  } catch (error) {
    return res.status(500).json({ error: "서버 오류" });
  }
};

export default handler;
