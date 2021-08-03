import mongoose, { Document, Schema, Model } from "mongoose";
import { STATUSES, Status } from "../constants";

const CourseInformationSchema: Schema = new Schema({
  campus: String,
  department: String,
  code: String,
  term: {
    type: String,
    enum: ["Fall", "Winter", "Summer", "Year", "N/A"],
    default: "Fall",
  },
  year: String,
});

const GroupChatSchema: Schema = new Schema(
  {
    name: String,
    createdBy: String,
    description: String,
    isCommunity: Boolean,
    links: [String],
    image: String,
    courseInformation: CourseInformationSchema,
    status: {
      type: String,
      enum: STATUSES,
      default: [Status.pending],
    },
    created: Date,
    updated: Date,
    views: Number,
    likes: Number,
  },
  { toObject: { versionKey: false } }
);

// Schema for User
const UserSchema: Schema = new Schema(
  {
    email: String,
    password: String,
    verified: Boolean,
    verifyHash: String,
    groupChatsCreated: [Schema.Types.ObjectId],
    status: {
      type: String,
      enum: ["admin", "banned", "user"],
      default: "user",
    },
  },
  { toObject: { versionKey: false } }
);

interface IUser extends Document {
  email: string;
  password: string;
  groupChatsCreated: [string];
  status: string;
  verified: boolean;
  verifyHash: string;
}

interface ICourseInformation extends Document {
  campus: string;
  department: string;
  code: string;
  term: string;
  year: number;
}
interface IGroupChat extends Document {
  name: string;
  createdBy: string;
  description: string;
  isCommunity: boolean;
  links: [string];
  image: string;
  courseInformation: ICourseInformation;
  status: string;
  created: Date;
  updated: Date;
  views: number;
  likes: number;
}

const User: Model<IUser> = mongoose.model("Users", UserSchema);

const GroupChat: Model<IGroupChat> = mongoose.model(
  "GroupChats",
  GroupChatSchema
);

export { mongoose, User, GroupChat, IUser, IGroupChat };
