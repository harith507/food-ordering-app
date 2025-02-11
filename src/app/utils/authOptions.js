import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import {User} from '@/models/User';

import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
    secret: process.env.SECRET,
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        id: 'credentials',
        credentials: {
          username: { label: "Email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const email = credentials?.email;
          const password = credentials?.password;
  
          mongoose.connect(process.env.MONGO_URL);
          const user = await User.findOne({email});
          const passwordOk = user && bcrypt.compareSync(password, user.password);
  
          if (passwordOk) {
            return user;
          }
  
          return null
        }
      })
    ],
  };