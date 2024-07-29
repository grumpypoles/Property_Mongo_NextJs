import connectDB from "@/app/_config/database"
import Property from "@/app/_models/Property"

//GET /api/properties
export const GET = async (request) => {
    try {
        await connectDB()

        const properties = await Property.find({})
        return new Response(JSON.stringify(properties), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong', {status: 500 })
    }
}