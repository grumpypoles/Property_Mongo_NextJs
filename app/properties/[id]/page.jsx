"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProperty } from "@/app/_utils/requests";
import PropertyHeaderImage from "@/app/_components/PropertyHeaderImage";
import PropertyDetails from "@/app/_components/PropertyDetails";
import PropertyImages from "@/app/_components/PropertyImages";
import {FaArrowLeft, FaBookmark, FaShare} from 'react-icons/fa'
import Link from "next/link";
import Spinner from "@/app/_components/Spinner";


const Page =  (params) => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };
    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className="mt-10 text-2xl font-bold text-center">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading}/>}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
      <div className="container px-6 py-6 m-auto">
        <Link
          href="/properties"
          className="flex items-center text-blue-500 hover:text-blue-600"
        >
          <FaArrowLeft className="mr-2"/> Back to Properties
        </Link>
      </div>
    </section>

    <section className="bg-blue-50">
      <div className="container px-6 py-10 m-auto">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-70/30">
        <PropertyDetails property={property}/>

          {/* <!-- Sidebar --> */}
          <aside className="space-y-4">       
            <button
              className="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600"
            >
              <FaBookmark className="mr-2"/> Bookmark Property
            </button>
            <button
              className="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600"
            >
              <FaShare className="mr-2"/>Share Property
            </button>

            {/* <!-- Contact Form --> */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-6 text-xl font-bold">Contact Property Manager</h3>
              <form>
              <div className='mb-4'>
                <label
                  className='block mb-2 text-sm font-bold text-gray-700'
                  htmlFor='name'
                >
                  Name:
                </label>
                <input
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  id='name'
                  type='text'
                  placeholder='Enter your name'             
                  required
                />
              </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label
                    className='block mb-2 text-sm font-bold text-gray-700'
                    htmlFor='phone'
                  >
                    Phone:
                  </label>
                  <input
                    className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    id='phone'
                    type='text'
                    placeholder='Enter your phone number'
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="message"
                  >
                    Message:
                  </label>
                  <textarea
                    className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none h-44 focus:outline-none focus:shadow-outline"
                    id="message"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <div>
                  <button
                    className="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    <i className="mr-2 fas fa-paper-plane"></i> Send Message
                  </button>
                </div>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <PropertyImages images={property.images}/>
          
        </>
      )}
    </>
  );
};

export default Page;
