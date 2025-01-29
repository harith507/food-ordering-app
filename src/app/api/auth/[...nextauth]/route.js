import mongoose from "mongoose";
import { User } from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "test" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const username = credentials?.username;
          const password = credentials?.password;

          if (!username || !password) {
            throw new Error("Missing username or password");
          }

          await mongoose.connect(process.env.MONGO_URL);
          const user = await User.findOne({ username });

          if (!user) {
            throw new Error("User not found");
          }

          const passwordOk = bcrypt.compareSync(password, user.password);

          if (passwordOk) {
            return {
              _id: user._id.toString(),
              username: user.username,
              email: user.email,
              role: user.role,
              phone: user.phone,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt
            };
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
        token.phone = user.phone;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.phone = token.phone;
      session.user.createdAt = token.createdAt;
      session.user.updatedAt = token.updatedAt;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }