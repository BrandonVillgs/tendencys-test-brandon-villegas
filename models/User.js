import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  img_profile: { type: String },
});

export default mongoose.model('User', UserSchema, 'users');
