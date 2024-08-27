'use server'

import connectDB from "@/app/_config/database";
import { auth } from "@/app/_utils/auth";
import { revalidatePath } from "next/cache";
import User from "@/app/_models/User";

async function bookmarkProperty (propertyId){
    await connectDB();

    const session = await auth();
    if (!session) throw new Error("You must be logged in");
   
    const userId = session.user.id;

    const user = await User.findById(userId)
    let isBookmarked = user.bookmarks.includes(propertyId)

    let message

    if(isBookmarked) {
        //If already bookmarked, then remove
        user.bookmarks.pull(propertyId)
        message = 'Bookmark Removed'
        isBookmarked = false
    } else{
         //If not bookmarked, then add
         user.bookmarks.push(propertyId)
         message = 'Bookmark Addded'
         isBookmarked = true
    }

    await user.save()
    revalidatePath('/properties/saved', 'page')

    return {
        message,
        isBookmarked
    }
}

export default bookmarkProperty