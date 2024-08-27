"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProperty } from "@/app/_utils/requests";
import PropertyHeaderImage from "@/app/_components/PropertyHeaderImage";
import PropertyDetails from "@/app/_components/PropertyDetails";
import PropertyImages from "@/app/_components/PropertyImages";
import { FaArrowLeft, FaBookmark, FaShare } from 'react-icons/fa';
import Link from "next/link";
import Spinner from "@/app/_components/Spinner";
import BookmarkButton from "@/app/_components/BookmarkButton";
import ShareButtons from "@/app/_components/ShareButtons";
import PropertyContactForm from "@/app/_components/PropertyContactForm";


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
          <BookmarkButton property={property}/>
          <ShareButtons property={property}/>
          <PropertyContactForm property={property}/>
                
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
