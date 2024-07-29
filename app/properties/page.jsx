import PropertyCard from "@/app/_components/PropertyCard";
import { fetchProperties } from "@/app/_utils/requests";




const   Page = async () => {
  const properties = await fetchProperties()
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
      </div>
    </section>
  );
}

export default Page;
