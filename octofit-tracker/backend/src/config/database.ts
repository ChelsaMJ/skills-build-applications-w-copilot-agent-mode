import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB at ${mongoUri}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`MongoDB connection skipped: ${message}`);
  }
}
