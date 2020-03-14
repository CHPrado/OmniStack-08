import { Schema, Document } from 'mongoose';

export interface DevProps extends Document {
  name: string;
  user: string;
  bio?: string;
  avatar: string;
  likes?: Schema.Types.ObjectId[];
  dislikes?: Schema.Types.ObjectId[];
}
