"use server";

import connectDB from "@/app/_config/database";
import Property from "@/app/_models/Property";
import { auth, signIn, signOut } from "@/app/_utils/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/app/_config/cloudinary";

async function addProperty(formData) {
  await connectDB();
  //   const sessionUser = await getSessionUser();

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  //   if (!sessionUser || !sessionUser.userId) {
  //     throw new Error("User ID is required");
  //   }

  const userId = session.user.id;

  const amenities = formData.getAll("amenities");

  const images = formData.getAll("images").filter((image) => image.name !== "");

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities,
    rates: {
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
      nightly: formData.get("rates.nightly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };
  const imageUrls = [];

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert to base64
    const imageBase64 = imageData.toString("base64");

    // Make request to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: "propertypulse",
      }
    );

    imageUrls.push(result.secure_url);
  }

  propertyData.images = imageUrls
  
  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath("/", "layout");
  console.log(newProperty._id);
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
