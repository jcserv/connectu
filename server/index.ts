import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import Express from "express";
import { AuthChecker, buildSchema } from "type-graphql";
import mongoose from "mongoose";
import "dotenv/config";
import jwt, { secretType } from "express-jwt";
import { User } from "./database";

import { emailTypeToContent, sendEmail } from "./helpers/email";

import {
  AuthenticationResolver,
  UserResolver,
  GroupChatResolver,
} from "./resolvers";

mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const customAuthChecker: AuthChecker<any> = (
  { context: { req } },
  roles
): boolean => {
  if (!req.user) {
    return false;
  }
  return roles.some((role) => role === req.user.status);
};

const path = "/graphql";

// TO DO: figure out how to allow vercel preview apps
const allowedOrigins = ["http://localhost:3000", "http://ulinks.io"];

const main = async () => {
  const schema = await buildSchema({
    resolvers: [AuthenticationResolver, UserResolver, GroupChatResolver],
    authChecker: customAuthChecker,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
  });

  const app = Express();

  app.set("view engine", "ejs");
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg =
            "The CORS policy for this site does not allow access from the specified domain";
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    })
  );

  app.use(
    path,
    jwt({
      secret: process.env.SECRET as secretType,
      credentialsRequired: false,
      algorithms: ["HS256"],
    })
  );

  app.use( Express.static( "public" ) );

  // Verification
  app.get("/verify/:hashId", async function (req, res) {
    const { hashId } = req.params;
    const user = await User.findOne({ verifyHash: hashId });
    if (!user) {
      res.sendStatus(404);
      return;
    }
    if (user.verifyHash == hashId && !user.verified) {
      user.verified = true;
      await user.save();
      res.sendStatus(200);
      return;
    }
    res.sendStatus(404);
  });

  // Resend verification email
  app.get("/resend/:email", async function (req, res) {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      res.sendStatus(404);
      return;
    }
    try {
      await sendEmail(
        email,
        await emailTypeToContent("confirmEmail", user.verifyHash)
      );
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
      return;
    }
    res.sendStatus(200);
    return;
  });

  apolloServer.applyMiddleware({ app, path });

  app.listen(process.env.PORT || 4000, () => {
    console.log(
      `Server started on http://localhost:${process.env.PORT || 4000}/graphql`
    );
  });
};

main();
