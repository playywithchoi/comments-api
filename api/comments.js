const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URI);

async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    console.log("MongoDB 연결 성공:", db); // DB 연결 성공 확인
    return db;
  } catch (error) {
    console
