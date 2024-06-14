import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";


export const GET = async (request) => {
  await dbConnect();

  try {
    const users = await UserModel.find({});
    return Response.json(
      {
        message: "All users fetched!",
        success: true,
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error on getting user list:", error);
    return Response.json(
      {
        message: "Error on getting user list!",
        success: false,
      },
      { status: 500 }
    );
  }
};
