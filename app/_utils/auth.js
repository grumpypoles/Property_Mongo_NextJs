import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import connectDB from "@/app/_config/database";
import User from "../_models/User";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        // 1. Connect to Database
        await connectDB();
        
        // 2. Check if user exists
        const userExist = await User.findOne({ email: profile.email });
        
        // 3. If not, then add user to database
        if (!userExist) {
          const username = profile.name.slice(0, 20);
          await User.create({
            email: profile.email,
            username,
            image: profile.picture,
          });
        }
        
        // 4. Return true to allow sign in
        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Return false to deny access
      }
    },
    async session({ session }) {
      try {
        // 1. Get user from database
        const user = await User.findOne({ email: session.user.email });
        
        // 2. Assign the user id from the session
        if (user) {
          session.user.id = user._id.toString();
        }
        
        // 3. Return the session
        return session;
      } catch (error) {
        console.error("Error during session callback:", error);
        return session; // Return the original session if an error occurs
      }
    },
  },
};

export const { auth, handlers: { GET, POST } } = NextAuth(authConfig);

// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
// import { getAppUser, createAppUser } from "@/app/_lib/data-service";

// const authConfig = {
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//   ],
//   callbacks: {
//     authorized({ auth, request }) {
//       return !!auth?.user;
//     },
//     async signIn({ user, account, profile }) {
//       try {
//         const existingUser = await getAppUser(user.email);

//         if (!existingUser)
         
//         return "/login/admin";
//         //   await createAppUser({
//         //     email: user.email,
//         //     fullname: user.name,
//         //     access_type: "user",
//         //     is_active: true,
//         //   });
//         return true;
//       } catch {
//         return false;
//       }
//     },
//     async session({ session, user }) {
//       const appUser = await getAppUser(session.user.email);
//       session.user.appUserId = appUser.id;
//       return session;
//     },

//   },
//   pages: {
//     signIn: "/login",
//   },
// };

// export const {
//   auth,
//   signIn,
//   signOut,
//   handlers: { GET, POST },
// } = NextAuth(authConfig);

