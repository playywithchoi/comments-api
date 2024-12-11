export default async function handler(req, res) {
  // 요청 본문 출력
  console.log(req.body);

  // DB 연결 및 처리
  try {
    const db = await connectToDatabase();
    console.log("DB 연결 성공: ", db); // DB 연결 확인 로그
    // 댓글 처리 로직
    if (req.method === "POST") {
      // DB에 댓글 추가
    }
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("에러 발생:", error);
    res.status(500).json({ error: "서버 오류" });
  }
}
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    console.log("MongoDB 연결 성공:", db);  // DB 연결 상태 출력
    return db;
  } catch (error) {
    console.error("MongoDB 연결 실패:", error);
    throw error; // 에러가 발생하면 던짐
  }
}
