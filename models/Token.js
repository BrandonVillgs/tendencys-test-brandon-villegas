import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  token: { type: String, required: true },
});

export default mongoose.model('Token', TokenSchema, 'access_tokens');
