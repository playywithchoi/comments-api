import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI; // .env에서 환경변수로 DB URI 가져오기
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};
