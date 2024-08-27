'use server'

import connectDB from "@/app/_config/database";
import Property from "@/app/_models/Property";
import { auth } from "@/app/_utils/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updateProperty(propertyId, formData){

 await connectDB();

 const session = await auth();
 if (!session) throw new Error("You must be logged in");

 const userId = session.user.id;

 
const existingProperty = await Property.findById(propertyId);

//Verify Ownership
if (existingProperty.owner.toString() !== userId) {
    throw new Error('Current user does not own this property')
}




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
    amenities: formData.getAll("amenities"),
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

  const updatedProperty = await Property.findByIdAndUpdate(propertyId, propertyData)
  revalidatePath('/', 'layout')
  redirect(`/properties/${updatedProperty._id}`);

}

export default updateProperty