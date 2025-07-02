import { connect } from 'mongoose';
import { env } from './env';

console.log('Conectando a MongoDB con URI:', env.mongoUri || 'mongodb://localhost:27017/mydb');

const connectMongo = async () => {
  try {
    await connect( env.mongoUri|| 'mongodb://localhost:27017/mydb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

export default connectMongo;
