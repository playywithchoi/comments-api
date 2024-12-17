const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI; // MongoDB 연결 정보

module.exports = async function (req, res) {
  if (req.method === "POST") {
    // 댓글 저장하기
    const { username, comment } = req.body;

    if (!username || !comment) {
      return res.status(400).json({ error: "Missing username or comment" });
    }

    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db("commentsDB");
      const collection = db.collection("comments");

      await collection.insertOne({ username, comment, date: new Date() });

      client.close();
      res.status(201).json({ message: "Comment added!" });
    } catch (err) {
      res.status(500).json({ error: "Failed to add comment" });
    }
  } 
  else if (req.method === "GET") {
    // 댓글 목록 가져오기
    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db("commentsDB");
      const collection = db.collection("comments");

      const comments = await collection.find({}).sort({ date: -1 }).toArray();

      client.close();
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  } 
  else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
