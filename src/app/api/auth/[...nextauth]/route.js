import mongoose from "mongoose";
import { User } from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";


const handler = NextAuth({
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
          const username = credentials?.username;
          const password = credentials?.password;
            
            mongoose.connect(process.env.MONGO_URL);
            const user = await User.findOne({username});
            const passwordOk = user && bcrypt.compareSync(password, user.password)


            if(passwordOk){
              console.log("Authorized user:", user);
              return {
                _id: user._id.toString(),
                username: user.username,
                email: user.email,
                role: user.role,
                phone: user.phone,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt

                
              };
            }

            
           return null
        }
      })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id.toString();
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
      session.user._id = token._id;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.phone = token.phone;
      session.user.createdAt = token.createdAt;
      session.user.updatedAt = token.updatedAt;
      return session;
    }
  }
});

export { handler as GET, handler as POST }