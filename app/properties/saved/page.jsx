import React from 'react'
import PropertyCard from "@/app/_components/PropertyCard";
import { auth } from "@/app/_utils/auth";
import connectDB from "@/app/_config/database";
import User from '@/app/_models/User';

const SavedPropertiesPage = async () => {
  await connectDB();

  const session = await auth();

  if (!session) throw new Error("You must be logged in");
 
  const userId = session.user.id;

  const { bookmarks } = await User.findById(userId).populate('bookmarks')


  return <section className='px-4 py-6'>
    <div className='container lg:container m-auto px-4 py-6'></div>
   <h1 className='text-2xl mb-4'>Saved Properties</h1>
   { bookmarks.length === 0 ? (<p> No Saved properties</p>) :
    ( <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {bookmarks.map((property) =>(
        <PropertyCard key={property._id} property={property}/>
      ))}
    </div>)
   }
    

  </section>
}

export default SavedPropertiesPage