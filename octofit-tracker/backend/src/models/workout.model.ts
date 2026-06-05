import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    notes: { type: String, default: '', trim: true },
    durationMinutes: { type: Number, default: 0 },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema);
