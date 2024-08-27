import PropertyEditForm from "@/app/_components/PropertyEditForm";
import connectDB from "@/app/_config/database";
import Property from "@/app/_models/Property";
import { convertToSerializeableObject } from "@/app/_utils/convertToObject";


const  PropertyEditPage = async(params) => {
    // await connectDB();
   
    
    const obj = params
    const id = obj.params.id
    

  // query the property in the DB
  const propertyDoc = await Property.findById(id).lean();
  // convert the document to a plain js object so we can pass to client
  // components
  const property = convertToSerializeableObject(propertyDoc);


  if (!property) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );
  }
    return <section className="bg-blue-50 ">
        <div className=" container m-auto max-w-2xl py-24 ">
            <div className=" bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 ">
            {propertyDoc.name}
                <PropertyEditForm property = {property}/>
            </div>
        </div>

    </section>
}
 
export default PropertyEditPage ;