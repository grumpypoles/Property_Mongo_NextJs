"use server";

import connectDB from "@/app/_config/database";
import Message from "@/app/_models/Message";
import { auth, signIn, signOut } from "@/app/_utils/auth";

async function AddMessage(formData) {
//   await connectDB();

//   const session = await auth();
//   if (!session) throw new Error("You must be logged in");

//   const userId = session.user.id;

//   const recipient = formData.get("recipient");

//   if (userId === recipient) {
//     return { error: "You can not send a message to yourself" };
//   }

//   const newMessage = new Message({
//     sender: userId,
//     recipient,
//     property: formData.get("property"),
//     name: formData.get("name"),
//     email: formData.get("email"),
//     phone: formData.get("phone"),
//     body: formData.get("body"),
//   });

//   await newMessage.save();
//   return {submitted: true}
}

export default AddMessage;
