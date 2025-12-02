import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Only for email auth
  googleId: { type: String }, // Only for Google auth
  resumes: [
    {
      fileUrl: String,
      uploadedAt: { type: Date, default: Date.now },
      analysis: Object
    }
  ]
});

export default model('User', userSchema);
