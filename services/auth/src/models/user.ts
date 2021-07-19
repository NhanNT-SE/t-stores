import { Document, Model, model, Schema } from "mongoose";
import { hashPassword } from "../helpers/hash-password";
export enum EAccountRole {
  SupperAdmin = "Supper Admin",
  Admin = "Admin",
  User = "User",
}
interface IUser {
  email: string;
  username: string;
  password: string;
  role?: EAccountRole;
  isMFA?: boolean;
}
interface IUserDoc extends Document {
  email: string;
  username: string;
  password: string;
  role?: EAccountRole;
  isMFA?: boolean;
}
interface IUserModel extends Model<IUserDoc> {
  build(user: IUser): IUserDoc;
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
    password: {
      type: String,
      required: true,
    },
    isMFA: {
      type: Boolean,
      default: false,
    },
    role:{
      type: String,
      required: true,
      enum: Object.values(EAccountRole),
      default: EAccountRole.User,
    }
  },
  {
    collection: "users",
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
schema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const passHashed = await hashPassword(this.get("password"));
    this.set("password", passHashed);
  }
  done();
});
schema.statics.build = (user: IUser) => {
  return new User(user);
};
const User = model<IUserDoc, IUserModel>("User", schema);
export { User };
