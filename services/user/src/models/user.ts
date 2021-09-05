import { SecretEncrypt, PasswordHelper, RoleAccount } from "@tstores/common";
import { Document, Model, model, Schema } from "mongoose";

interface IUser {
  email: string;
  username: string;
  password: string;
  role?: RoleAccount;
  isMFA?: boolean;
  secretMFA: SecretEncrypt;
  tokenVersion: number;
}
interface IUserDoc extends Document {
  email: string;
  username: string;
  password: string;
  role?: RoleAccount;
  isMFA?: boolean;
  secretMFA: SecretEncrypt;
  tokenVersion: number;
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
    secretMFA: {
      type: Object,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(RoleAccount),
      default: RoleAccount.User,
    },
    tokenVersion: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    collection: "users",
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.tokenVersion;
        delete ret.otpVersion;
        delete ret.secretMFA;
        delete ret.isMFA;
        delete ret.role;
      },
    },
  }
);
schema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const passHashed = await PasswordHelper.hashPassword(this.get("password"));
    this.set("password", passHashed);
  }
  done();
});
schema.statics.build = (user: IUser) => {
  return new User(user);
};
const User = model<IUserDoc, IUserModel>("User", schema);
export { User };
