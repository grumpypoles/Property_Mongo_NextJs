
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GoogleProvider({
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
    //Invoke on successful sign in
    async signIn({ profile }) {
      //1. Connect to Database
      //2. Check if user exists
      //3. If not, then add user to database
      //4. Return true to allow sign in
    },
    //Modify session object
    async session({ session }) {
      //1. Get user from database
      //2. Assign the user id from the session
      //3. Return the session
      },
  },
};
