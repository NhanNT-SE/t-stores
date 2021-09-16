import { RoleAccount } from '@tstores/common';
import { Document, Model, model, Schema, Types } from 'mongoose';

interface ProfileProps {
  id: string;
  email: string;
  username: string;
  role?: RoleAccount;
  isMFA?: boolean;
}
interface ProfileDoc extends Document {
  id: string;
  email: string;
  username: string;
  role?: RoleAccount;
  isMFA?: boolean;
}
interface ProfileModel extends Model<ProfileDoc> {
  build(user: ProfileProps): ProfileDoc;
}
const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    isMFA: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(RoleAccount),
      default: RoleAccount.User,
    },
  },
  {
    collection: 'profiles',
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

schema.statics.build = (profile: ProfileProps) => {
  return new Profile({ ...profile, _id: profile.id });
};
const Profile = model<ProfileDoc, ProfileModel>('Profile', schema);
export { Profile };

