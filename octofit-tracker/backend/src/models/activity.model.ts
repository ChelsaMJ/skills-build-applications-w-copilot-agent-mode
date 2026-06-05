import mongoose, { Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    type: { type: String, required: true, trim: true },
    minutes: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Activity ?? mongoose.model('Activity', activitySchema);
