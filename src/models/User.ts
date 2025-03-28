import mongoose, { Schema, Document } from 'mongoose'
import { hashPassword } from '@/services/auth'

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  refreshToken: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  refreshToken: { type: String, default: null },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hashPassword(this.password);
  next()
})

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);