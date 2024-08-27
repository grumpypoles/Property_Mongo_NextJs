'use server'

import connectDB from "@/app/_config/database";
import { auth } from "@/app/_utils/auth";
import User from "@/app/_models/User";


async function checkBookmarkStatus(propertyId){

    await connectDB();

    const session = await auth();
    if (!session) throw new Error("You must be logged in");
   
    const userId = session.user.id;

    const user = await User.findById(userId)
    let isBookmarked = user.bookmarks.includes(propertyId)

    return { isBookmarked}

}

export default checkBookmarkStatus