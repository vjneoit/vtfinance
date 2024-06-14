import dbConnect from "@/lib/dbConnect";
import InsuranceModel from "@/model/Insurance";



export const GET = async (request) => {
  await dbConnect();

  try {
    const insurances = await InsuranceModel.find({});
    return Response.json(
      {
        message: "All insurances fetched!",
        success: true,
        insurances,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error on getting insurance list:", error);
    return Response.json(
      {
        message: "Error on getting insurance list!",
        success: false,
      },
      { status: 500 }
    );
  }
};
