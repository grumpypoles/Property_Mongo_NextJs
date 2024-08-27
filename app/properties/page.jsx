import PropertyCard from "@/app/_components/PropertyCard";
import { fetchProperties } from "@/app/_utils/requests";
import Property from "@/app/_models/Property";
import PropertySearchForm from '@/app/_components/PropertySearchForm';
// import Properties from '@/app/_components/Properties';
import connectDB from "@/app/_config/database";
import Pagination from "@/app/_components/Pagination";



const   Page = async ({searchParams: {page = 1, pageSize = 3}}) => {

  const skip = (page - 1) * pageSize;

  const total = await Property.countDocuments({});
  const properties = await Property.find({}).skip(skip).limit(pageSize);
  
  return (
    <section className="px-4 py-6">
      <div className="px-4 py-6 m-auto container-xl lg:container">
        {properties.length === 0 ? (
          <p>No properties available</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property}/>
            ))}
          </div>
        )}
        <Pagination page={parseInt(page)} pageSize={parseInt(pageSize)} totalItems={parseInt(total)} />
      </div>
    </section>
  );
}

export default Page;
