import { connect } from 'mongoose';

const connectMongo = async () => {
  try {
    await connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mydb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

export default { connectMongo };
