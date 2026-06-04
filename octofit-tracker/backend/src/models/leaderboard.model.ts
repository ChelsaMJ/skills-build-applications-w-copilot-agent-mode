import mongoose, { Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Leaderboard ?? mongoose.model('Leaderboard', leaderboardSchema);
