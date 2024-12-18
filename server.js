import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';  // dotenv 패키지 임포트

dotenv.config();  // .env 파일을 로드

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
