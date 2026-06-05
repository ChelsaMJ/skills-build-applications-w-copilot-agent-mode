import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    role: { type: String, default: 'member', trim: true },
  },
  { timestamps: true }
);

export default mongoose.models.User ?? mongoose.model('User', userSchema);
