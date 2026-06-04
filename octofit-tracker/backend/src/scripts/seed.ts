import 'dotenv/config';
import { connectDatabase } from '../config/database';
import Activity from '../models/activity.model';
import Leaderboard from '../models/leaderboard.model';
import Team from '../models/team.model';
import User from '../models/user.model';
import Workout from '../models/workout.model';

async function seedDatabase(): Promise<void> {
  console.log('Seeding octofit_db with OctoFit Tracker test data');
  await connectDatabase();

  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const team = await Team.create({ name: 'Octo Legends' });

  const users = await User.insertMany([
    { name: 'Mina Hart', email: 'mina@example.com', teamId: team._id, role: 'captain' },
    { name: 'Drew Vale', email: 'drew@example.com', teamId: team._id },
  ]);

  await Team.findByIdAndUpdate(team._id, { captainId: users[0]._id });

  await Promise.all([
    Activity.insertMany([
      { userId: users[0]._id, teamId: team._id, type: 'Run', minutes: 35, calories: 420 },
      { userId: users[1]._id, teamId: team._id, type: 'Strength', minutes: 50, calories: 360 },
    ]),
    Leaderboard.insertMany([{ teamId: team._id, score: 780, rank: 1 }]),
    Workout.insertMany([
      { userId: users[0]._id, title: 'Morning mobility', notes: 'Focus on hips and shoulders', durationMinutes: 20 },
      { userId: users[1]._id, title: 'Cardio interval set', notes: 'Treadmill and rowing', durationMinutes: 30 },
    ]),
  ]);

  console.log('Seed complete');
}

seedDatabase().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Seed failed: ${message}`);
  process.exit(1);
});