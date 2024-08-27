'use server';

import cloudinary from "@/app/_config/cloudinary";
import connectDB from "@/app/_config/database";
import Property from "@/app/_models/Property";
import { auth, signIn, signOut } from "@/app/_utils/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function deleteProperty(propertyId) {
  await connectDB();

  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const userId = session.user.id;

  const property = await Property.findById(propertyId);

  if (!property) throw new Error("Property not Found");

  // Verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  //Extract public ID from image URLs
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });

  //Delete images from Cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy('propertypulse/' + publicId);
    }
  }

  await property.deleteOne();
  revalidatePath('/', 'layout')
}
export default deleteProperty;

// https://res.cloudinary.com/dvmnwyia5/image/upload/v1724100996/propertypulse/a5teggz0atjmpyqgmndx.jpg
