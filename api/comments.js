// pages/api/comments.js

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { comment } = req.body;

    try {
      // MongoDB 연동 코드
      await client.connect();
      const collection = client.db("comments").collection("posts");
      await collection.insertOne(newComment);
      res.status(200).json({ message: '댓글이 성공적으로 저장되었습니다.' });
    } catch (error) {
      console.error('Error occurred:', error);  // error를 사용하여 콘솔에 출력
      res.status(500).json({ error: '댓글 저장 중 오류가 발생했습니다.' });
    }
    
