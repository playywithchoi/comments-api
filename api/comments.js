// pages/api/comments.js

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { comment } = req.body;

    try {
      await client.connect();
      const database = client.db("comments");
      const collection = database.collection("posts");

      // 댓글을 MongoDB에 저장
      const result = await collection.insertOne({ comment });
      
      res.status(200).json({ message: "Comment added successfully", result });
    } catch (error) {
      // error가 사용되지 않으면, 그냥 로그로만 출력하거나 삭제
      console.error("Error occurred:", error);
      res.status(500).json({ message: "Error adding comment" });
    } finally {
      // MongoDB 연결 종료
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
